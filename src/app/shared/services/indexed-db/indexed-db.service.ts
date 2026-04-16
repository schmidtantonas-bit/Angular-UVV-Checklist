import { Injectable } from '@angular/core';
import { db, SessionRecord, ChecklistItemRecord } from './uvv-database';

@Injectable({ providedIn: 'root' })
export class IndexedDbService {

  // === Sessions ===
  
  async createSession(session: Omit<SessionRecord, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'completedCount'>): Promise<string> {
    const id = crypto.randomUUID();
    await db.sessions.add({
      ...session,
      id,
      status: 'active',
      completedCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return id;
  }

  async getSession(id: string): Promise<SessionRecord | undefined> {
    return db.sessions.get(id);
  }

  async getActiveSession(): Promise<SessionRecord | undefined> {
    return db.sessions.where('status').equals('active').first();
  }

  async updateSession(id: string, updates: Partial<SessionRecord>): Promise<void> {
    await db.sessions.update(id, { ...updates, updatedAt: new Date() });
  }

  async completeSession(id: string): Promise<void> {
    // Nur Status ändern, NICHT löschen
    await db.sessions.update(id, {
      status: 'completed',
      completedAt: new Date(),
      updatedAt: new Date()
    });
  }

  async deleteSession(id: string): Promise<void> {
    await db.transaction('rw', [db.sessions, db.checklistItems, db.photos], async () => {
      await db.photos.where('sessionId').equals(id).delete();
      await db.checklistItems.where('sessionId').equals(id).delete();
      await db.sessions.delete(id);
    });
  }

  // === Checklist Items ===

  async saveChecklistItem(sessionId: string, itemKey: string, data: {
    status: string | null;
    note: string;
    values: Record<string, unknown>;
    results: Record<string, unknown>;
  }): Promise<void> {
    const id = `${sessionId}:${itemKey}`;
    await db.checklistItems.put({
      id,
      sessionId,
      itemKey,
      ...data,
      updatedAt: new Date()
    });
  }

  async getChecklistItem(sessionId: string, itemKey: string): Promise<ChecklistItemRecord | undefined> {
    return db.checklistItems.get(`${sessionId}:${itemKey}`);
  }

  async getAllChecklistItems(sessionId: string): Promise<ChecklistItemRecord[]> {
    return db.checklistItems.where('sessionId').equals(sessionId).toArray();
  }

  // === Photos ===

  async savePhoto(sessionId: string, itemKey: string, index: number, file: File): Promise<void> {
    const id = `${sessionId}:${itemKey}:${index}`;
    await db.photos.put({
      id,
      sessionId,
      itemKey,
      index,
      blob: file,
      fileName: file.name,
      mimeType: file.type,
      createdAt: new Date()
    });
  }

  async getPhotos(sessionId: string, itemKey: string): Promise<File[]> {
    const records = await db.photos
      .where('sessionId').equals(sessionId)
      .filter(r => r.itemKey === itemKey)
      .sortBy('index');
    
    return records.map(r => new File([r.blob], r.fileName, { type: r.mimeType }));
  }

  async deletePhoto(sessionId: string, itemKey: string, index: number): Promise<void> {
    await db.photos.delete(`${sessionId}:${itemKey}:${index}`);
  }

  async deletePhotosForItem(sessionId: string, itemKey: string): Promise<void> {
    await db.photos
      .where('sessionId').equals(sessionId)
      .filter(r => r.itemKey === itemKey)
      .delete();
  }

  // === Bulk Operations ===

  async saveAllItems(sessionId: string, items: Map<string, {
    status: string | null;
    note: string;
    values: Record<string, unknown>;
    results: Record<string, unknown>;
  }>): Promise<void> {
    const records: ChecklistItemRecord[] = [];
    const now = new Date();
    
    items.forEach((data, itemKey) => {
      records.push({
        id: `${sessionId}:${itemKey}`,
        sessionId,
        itemKey,
        ...data,
        updatedAt: now
      });
    });

    await db.checklistItems.bulkPut(records);
  }

  // === Cleanup Operations ===

  /**
   * Removes old completed sessions, keeping only the most recent ones.
   * @param maxCompleted Maximum number of completed sessions to keep (default: 5)
   */
  async cleanupOldSessions(maxCompleted = 5): Promise<void> {
    const completedSessions = await db.sessions
      .where('status').equals('completed')
      .toArray();
    
    // Sort by completedAt descending (newest first)
    completedSessions.sort((a, b) => {
      const dateA = a.completedAt?.getTime() ?? 0;
      const dateB = b.completedAt?.getTime() ?? 0;
      return dateB - dateA;
    });

    if (completedSessions.length > maxCompleted) {
      const toDelete = completedSessions.slice(maxCompleted);
      for (const session of toDelete) {
        await this.deleteSession(session.id);
      }
    }
  }
}
