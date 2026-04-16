import { Injectable, effect, inject, signal } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ChecklistState, type ChecklistItemState, type PersistedChecklistStateSnapshot } from './checklist.state';
import { IndexedDbService, type SessionRecord, type SessionStatus } from '@shared/services/indexed-db';

const STORAGE_KEY = 'uvv-checklist:checklist-state:v1';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

// Legacy localStorage functions for migration
function readLegacySnapshot(): PersistedChecklistStateSnapshot | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as PersistedChecklistStateSnapshot;
  } catch {
    return null;
  }
}

function clearLegacyStorage() {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

@Injectable()
export class ChecklistPersistence {
  private readonly state = inject(ChecklistState);
  private readonly indexedDb = inject(IndexedDbService);
  
  private currentSessionId: string | null = null;
  private readonly saveSubject = new Subject<void>();
  private isInitialized = false;

  /** Reactive session status - updated when session changes */
  readonly sessionStatus = signal<SessionStatus | null>(null);

  constructor() {
    // Debounced Auto-Save (500ms)
    this.saveSubject.pipe(debounceTime(500)).subscribe(() => {
      this.persistCurrentState();
    });

    // Effect für State-Änderungen - nur wenn initialisiert
    effect(() => {
      const _items = this.state.snapshot(); // Signal read
      if (this.isInitialized && this.currentSessionId) {
        this.saveSubject.next();
      }
    });
  }

  // === Session Management ===

  async hasActiveSession(): Promise<boolean> {
    const session = await this.indexedDb.getActiveSession();
    return session !== undefined;
  }

  async getActiveSession(): Promise<SessionRecord | undefined> {
    return this.indexedDb.getActiveSession();
  }

  async resumeSession(sessionId: string): Promise<void> {
    this.currentSessionId = sessionId;
    await this.loadAllItems();
    this.isInitialized = true;
    this.sessionStatus.set('active');
  }

  async startNewSession(config: {
    deviceType: string;
    inspectionType: string;
    inspectionPackage: string;
    totalCount: number;
  }): Promise<string> {
    // Migrate legacy localStorage data if exists
    await this.migrateLegacyData();
    
    this.currentSessionId = await this.indexedDb.createSession(config);
    this.state.setTotalCount(config.totalCount);
    this.isInitialized = true;
    this.sessionStatus.set('active');
    return this.currentSessionId;
  }

  async completeAndStartNew(config: {
    deviceType: string;
    inspectionType: string;
    inspectionPackage: string;
    totalCount: number;
  }): Promise<string> {
    const activeSession = await this.indexedDb.getActiveSession();
    if (activeSession) {
      await this.indexedDb.completeSession(activeSession.id);
    }
    this.state.clear();
    return this.startNewSession(config);
  }

  async discardAndStartNew(config: {
    deviceType: string;
    inspectionType: string;
    inspectionPackage: string;
    totalCount: number;
  }): Promise<string> {
    const activeSession = await this.indexedDb.getActiveSession();
    if (activeSession) {
      await this.indexedDb.deleteSession(activeSession.id);
    }
    this.state.clear();
    return this.startNewSession(config);
  }

  async completeSession(): Promise<void> {
    if (this.currentSessionId) {
      // Final save before completing
      await this.persistCurrentState();
      await this.indexedDb.completeSession(this.currentSessionId);
      
      // Cleanup old sessions (keep only last 5 completed)
      await this.indexedDb.cleanupOldSessions(5);
      
      this.currentSessionId = null;
      this.isInitialized = false;
      this.sessionStatus.set(null);
      this.state.clear();
    }
  }

  // === Data Persistence ===

  private async persistCurrentState(): Promise<void> {
    if (!this.currentSessionId) {
      return;
    }

    try {
      const snapshot = this.state.snapshot();
      let completedCount = 0;

      for (const [itemKey, itemState] of Object.entries(snapshot.items)) {
        // Save item data
        await this.indexedDb.saveChecklistItem(this.currentSessionId, itemKey, {
          status: itemState.status,
          note: itemState.note,
          values: itemState.values,
          results: itemState.results
        });

        // Save photos
        await this.indexedDb.deletePhotosForItem(this.currentSessionId, itemKey);
        for (let i = 0; i < itemState.photos.length; i++) {
          await this.indexedDb.savePhoto(this.currentSessionId, itemKey, i, itemState.photos[i]);
        }

        if (itemState.status !== null) {
          completedCount++;
        }
      }

      // Update progress for dialog display
      await this.indexedDb.updateSession(this.currentSessionId, { 
        completedCount,
        totalCount: snapshot.totalCount 
      });
    } catch (error) {
      console.error('[Persistence] Error saving state:', error);
      // Don't throw - auto-save should fail silently to not disrupt user
    }
  }

  private async loadAllItems(): Promise<void> {
    if (!this.currentSessionId) {
      return;
    }

    try {
      const session = await this.indexedDb.getSession(this.currentSessionId);
      if (session) {
        this.state.setTotalCount(session.totalCount);
      }

      const items = await this.indexedDb.getAllChecklistItems(this.currentSessionId);
      
      for (const item of items) {
        const photos = await this.indexedDb.getPhotos(this.currentSessionId, item.itemKey);
        
        // Restore item state
        if (item.status) {
          this.state.setItemStatus(item.itemKey, item.status as any);
        }
        if (item.note) {
          this.state.setItemNote(item.itemKey, item.note);
        }
        if (photos.length > 0) {
          this.state.setItemPhotos(item.itemKey, photos);
        }
        if (item.values && Object.keys(item.values).length > 0) {
          for (const [key, value] of Object.entries(item.values)) {
            this.state.setItemValue(item.itemKey, key, value);
          }
        }
        if (item.results && Object.keys(item.results).length > 0) {
          for (const [key, value] of Object.entries(item.results)) {
            this.state.setItemResult(item.itemKey, key, value);
          }
        }
      }
    } catch (error) {
      console.error('[Persistence] Error loading state:', error);
      // Continue with empty state if load fails
    }
  }

  // === Migration ===

  private async migrateLegacyData(): Promise<void> {
    const legacySnapshot = readLegacySnapshot();
    if (!legacySnapshot) return;

    // Legacy data will be handled by hydrate in the old flow
    // Just clear it after IndexedDB is set up
    clearLegacyStorage();
  }

  // === Legacy API (for backwards compatibility) ===

  clearPersisted() {
    // Legacy method - now handled by session management
    if (this.currentSessionId) {
      this.indexedDb.deleteSession(this.currentSessionId);
      this.currentSessionId = null;
    }
    clearLegacyStorage();
  }
}


