# IndexedDB Implementation Plan

> Ziel: Alle Prüfpunkte und Bilder während der Session persistent speichern

## Übersicht

### Problem
- Aktuell: localStorage speichert nur JSON-serialisierbare Daten
- `File[]` (Photos) gehen bei Page-Refresh verloren
- Keine Draft-Recovery möglich

### Lösung
- IndexedDB für strukturierte Datenspeicherung
- Blobs für Bilder (können direkt in IDB gespeichert werden)
- **Eine aktive Session** – einfach und robust

---

## Session-Lifecycle Konzept

### Kernprinzipien

1. **Immer genau eine aktive Session** (oder keine)
2. **Export ändert nichts** – mehrfach exportieren möglich
3. **Session bleibt aktiv** bis bewusster Abschluss
4. **Beim App-Start** wird aktive Session direkt geladen
5. **Anderer User** kann aktive Session sehen und abschließen/verwerfen

### Session-Status

```typescript
type SessionStatus = 'active' | 'completed';
```

| Status | Bedeutung |
|--------|-----------|
| `active` | Prüfung läuft, Daten werden gespeichert |
| `completed` | Prüfung abgeschlossen (Daten bleiben erhalten) |

### Wann startet eine Session?

**Nach Abschluss des Wizards** (letzter Schritt = Inspektions-Art auswählen):

```
Home → Device auswählen → Inspection-Type auswählen → [SESSION STARTET] → Checklist öffnet
```

### Wann endet eine Session?

| Aktion | Verhalten |
|--------|-----------|
| **Export (PDF/Word/Email)** | Daten bleiben, Status bleibt `active` ✅ |
| **"Prüfung abschließen" Button** | Status → `completed` (Daten bleiben!) |
| **App schließen / Refresh** | Daten bleiben in IndexedDB |
| **Neue Prüfung starten** | Dialog wenn `active` Session existiert |

### Automatische Bereinigung

Um zu verhindern, dass sich auf gemeinsam genutzten Geräten zu viele alte Sessions ansammeln, werden beim Abschließen einer Prüfung automatisch alte abgeschlossene Sessions bereinigt:

- **Maximal 5 abgeschlossene Sessions** werden behalten
- **Älteste Sessions werden zuerst gelöscht** (nach `completedAt`)
- **Aktive Sessions sind geschützt** (werden nie automatisch gelöscht)
- **Cleanup erfolgt bei jedem "Prüfung abschließen"**

```typescript
// In IndexedDbService
async cleanupOldSessions(maxCompleted = 5): Promise<void> {
  const completedSessions = await db.sessions
    .where('status').equals('completed')
    .toArray();
  
  // Sortiere nach completedAt absteigend (neueste zuerst)
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
```

### Flow-Diagramm

```
┌─────────────────────────────────────────────────────────────┐
│  HOME / APP-START                                            │
│                                                              │
│  Active Session?  ──YES──→  Direkt zur Checklist laden      │
│        │                    (kein Dialog, kein Wizard)       │
│       NO                                                     │
│        │                                                     │
│        ▼                                                     │
│  Wizard starten → Device → Inspection → [SESSION = active]  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CHECKLIST / PROTOKOLL                                       │
│                                                              │
│  Export (PDF/Word/Email) → Daten bleiben, mehrfach möglich  │
│                                                              │
│  "Prüfung abschließen" → Bestätigungsdialog                 │
│                          → Status = completed                │
│                          → Zurück zum Wizard (/wizard)       │
│                          → Daten bleiben für spätere Nutzung │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ANDERER USER / NEUE PRÜFUNG                                 │
│  (wenn active Session existiert)                             │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  📋 Aktive Prüfung gefunden                         │    │
│  │                                                      │    │
│  │  Drehleiter L32A-XS • UVV-Prüfung                   │    │
│  │  12 von 45 Prüfpunkte                               │    │
│  │                                                      │    │
│  │  ┌────────────────┐  ┌────────────────┐             │    │
│  │  │ Fortsetzen     │  │ Abschließen &  │             │    │
│  │  │                │  │ Neu starten    │             │    │
│  │  └────────────────┘  └────────────────┘             │    │
│  │                                                      │    │
│  │  ┌────────────────────────────────────┐             │    │
│  │  │ Verwerfen & Neu starten            │             │    │
│  │  └────────────────────────────────────┘             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Speicher-Management (Vereinfacht)

**Aktuell:** Keine automatische Bereinigung von `completed` Sessions.

**Später optional erweiterbar:**
- Liste der letzten Sessions anzeigen
- Erneuter Export von completed Sessions
- Automatische Bereinigung (z.B. max. 5 oder nach 30 Tagen)

---

## UI-Konzept

### Header: Session-Status Anzeige

Kleiner, unaufdringlicher Status-Indikator im Header:

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]    Drehleiter L32A-XS           🟢 Aktiv    [?]  [☰]    │
└──────────────────────────────────────────────────────────────────┘
```

**Status-Varianten:**

| Status | Anzeige | Farbe |
|--------|---------|-------|
| `active` | 🟢 Aktiv | Grün |
| `completed` | ✓ Abgeschlossen | Grau |
| Keine Session | (nichts) | - |

**CSS-Klassen:**
```scss
.session-status {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  
  &.active {
    color: var(--color-success);
  }
  
  &.completed {
    color: var(--color-text-muted);
  }
}

.session-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
}
```

### Protokoll-Seite: Footer mit Abschluss-Button

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ... Protokoll Inhalt ...                                        │
│                                                                   │
├──────────────────────────────────────────────────────────────────┤
│  EXPORT                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                 │
│  │  📄 PDF    │  │  📝 Word   │  │  ✉️ Email  │                 │
│  └────────────┘  └────────────┘  └────────────┘                 │
│                                                                   │
│  ──────────────────────────────────────────────────────────────  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  ✓ Prüfung abschließen                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Button-Hierarchie:**
- Export-Buttons: Sekundär (outline/ghost)
- Abschluss-Button: Primär, volle Breite, auffällig

**HTML-Struktur:**
```html
<footer class="protocol-footer">
  <section class="export-section">
    <h3>Export</h3>
    <div class="export-buttons">
      <button class="btn-export" (click)="exportPdf()">
        <span class="icon">📄</span> PDF
      </button>
      <button class="btn-export" (click)="exportWord()">
        <span class="icon">📝</span> Word
      </button>
      <button class="btn-export" (click)="sendEmail()">
        <span class="icon">✉️</span> Email
      </button>
    </div>
  </section>
  
  <hr class="divider" />
  
  <button class="btn-complete-inspection" (click)="completeInspection()">
    ✓ Prüfung abschließen
  </button>
</footer>
```

**CSS:**
```scss
.protocol-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}

.export-section h3 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: var(--color-text-secondary);
}

.export-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-export {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  
  &:hover {
    background: var(--color-surface-hover);
  }
}

.divider {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid var(--color-border);
}

.btn-complete-inspection {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: var(--color-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: var(--color-primary-dark);
  }
}
```

### Dialog: Aktive Session gefunden

Erscheint wenn User neue Prüfung starten will, aber aktive Session existiert:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  📋 Aktive Prüfung gefunden                                      │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Drehleiter L32A-XS                                        │ │
│  │  UVV-Prüfung • Basic                                       │ │
│  │                                                             │ │
│  │  12 von 45 Prüfpunkte ausgefüllt                           │ │
│  │  Zuletzt bearbeitet: vor 2 Stunden                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     Fortsetzen                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Abschließen & Neu starten                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Verwerfen & Neu starten                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Button-Hierarchie:**
1. **Fortsetzen** – Primär (grün/blau)
2. **Abschließen & Neu starten** – Sekundär (outline)
3. **Verwerfen & Neu starten** – Danger (rot, outline)

---

## Schritt 1: Dexie.js installieren

```bash
pnpm add dexie
```

**Warum Dexie?**
- Promise-basierte API (statt Callback-Hölle)
- TypeScript-Support out-of-the-box
- Einfache Schema-Migration
- ~15KB gzipped

---

## Schritt 2: Database Schema definieren

**Datei:** `src/app/shared/services/indexed-db/uvv-database.ts`

```typescript
import Dexie, { Table } from 'dexie';

// Types
export type SessionStatus = 'active' | 'completed';

// Interfaces
export interface SessionRecord {
  id: string;                    // UUID
  status: SessionStatus;         // 'active' | 'completed'
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;            // Wann abgeschlossen
  deviceType: string;
  inspectionType: string;
  inspectionPackage: string;
  totalCount: number;
  completedCount: number;        // Für Progress-Anzeige im Dialog
}

export interface ChecklistItemRecord {
  id: string;                    // "{sessionId}:{itemKey}"
  sessionId: string;
  itemKey: string;               // z.B. "sec-dl-1:dl-1-01"
  status: string | null;         // 'ok' | 'na' | 'nok' | null
  note: string;
  values: Record<string, unknown>;
  results: Record<string, unknown>;
  updatedAt: Date;
}

export interface PhotoRecord {
  id: string;                    // "{sessionId}:{itemKey}:{index}"
  sessionId: string;
  itemKey: string;
  index: number;
  blob: Blob;
  fileName: string;
  mimeType: string;
  createdAt: Date;
}

// Database
export class UvvDatabase extends Dexie {
  sessions!: Table<SessionRecord>;
  checklistItems!: Table<ChecklistItemRecord>;
  photos!: Table<PhotoRecord>;

  constructor() {
    super('uvv-checklist-db');

    this.version(1).stores({
      sessions: 'id, status, createdAt, completedAt',
      checklistItems: 'id, sessionId, itemKey',
      photos: 'id, sessionId, itemKey'
    });
  }
}

export const db = new UvvDatabase();
```

---

## Schritt 3: IndexedDB Service erstellen

**Datei:** `src/app/shared/services/indexed-db/indexed-db.service.ts`

```typescript
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
}
```

---

## Schritt 4: ChecklistPersistence anpassen

**Datei:** `src/app/pages/checklist/state/checklist.persistence.ts`

```typescript
import { Injectable, effect, inject, signal } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { ChecklistState } from './checklist.state';
import { IndexedDbService, type SessionRecord, type SessionStatus } from '@shared/services/indexed-db';

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

  async completeAndStartNew(config: {...}): Promise<string> {
    const activeSession = await this.indexedDb.getActiveSession();
    if (activeSession) {
      await this.indexedDb.completeSession(activeSession.id);
    }
    this.state.clear();
    return this.startNewSession(config);
  }

  async discardAndStartNew(config: {...}): Promise<string> {
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
      this.currentSessionId = null;
      this.isInitialized = false;
      this.sessionStatus.set(null);
      this.state.clear();
    }
  }

  // === Data Persistence ===

  private async persistCurrentState(): Promise<void> {
    if (!this.currentSessionId) return;

    try {
      const snapshot = this.state.snapshot();
      let completedCount = 0;

      for (const [itemKey, itemState] of Object.entries(snapshot.items)) {
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

        if (itemState.status !== null) completedCount++;
      }

      await this.indexedDb.updateSession(this.currentSessionId, { 
        completedCount,
        totalCount: snapshot.totalCount 
      });
    } catch (error) {
      console.error('[Persistence] Error saving state:', error);
      // Don't throw - auto-save should fail silently
    }
  }

  private async loadAllItems(): Promise<void> {
    if (!this.currentSessionId) return;

    try {
      const session = await this.indexedDb.getSession(this.currentSessionId);
      if (session) {
        this.state.setTotalCount(session.totalCount);
      }

      const items = await this.indexedDb.getAllChecklistItems(this.currentSessionId);
      
      for (const item of items) {
        const photos = await this.indexedDb.getPhotos(this.currentSessionId, item.itemKey);
        
        if (item.status) this.state.setItemStatus(item.itemKey, item.status as any);
        if (item.note) this.state.setItemNote(item.itemKey, item.note);
        if (photos.length > 0) this.state.setItemPhotos(item.itemKey, photos);
        if (item.values) {
          for (const [key, value] of Object.entries(item.values)) {
            this.state.setItemValue(item.itemKey, key, value);
          }
        }
        if (item.results) {
          for (const [key, value] of Object.entries(item.results)) {
            this.state.setItemResult(item.itemKey, key, value);
          }
        }
      }
    } catch (error) {
      console.error('[Persistence] Error loading state:', error);
    }
  }

  private async migrateLegacyData(): Promise<void> {
    // Clear legacy localStorage if exists
    try {
      window.localStorage.removeItem('uvv-checklist:checklist-state:v1');
    } catch { /* ignore */ }
  }
}
```

---

## Schritt 5: Home-Page Integration

**Datei:** `src/app/pages/home/home.ts`

```typescript
async ngOnInit() {
  // Prüfen ob aktive Session existiert
  const activeSession = await this.persistence.getActiveSession();
  
  if (activeSession) {
    // Direkt zur Checklist navigieren (kein Dialog, kein Wizard)
    await this.persistence.resumeSession(activeSession.id);
    this.router.navigate(['/checklist'], {
      queryParams: {
        device: activeSession.deviceType,
        inspection: activeSession.inspectionType,
        package: activeSession.inspectionPackage
      }
    });
  }
  // Sonst: Wizard anzeigen (normaler Flow)
}

// Wenn User neue Prüfung starten will (Wizard abgeschlossen)
async startNewInspection(config: InspectionConfig) {
  const activeSession = await this.persistence.getActiveSession();
  
  if (activeSession) {
    // Dialog anzeigen mit 3 Optionen
    const result = await this.showActiveSessionDialog(activeSession);
    
    switch (result) {
      case 'resume':
        // Zur bestehenden Session
        await this.persistence.resumeSession(activeSession.id);
        this.router.navigate(['/checklist']);
        return;
        
      case 'complete':
        // Abschließen & Neu starten
        await this.persistence.completeAndStartNew(config);
        break;
        
      case 'discard':
        // Verwerfen & Neu starten
        await this.persistence.discardAndStartNew(config);
        break;
    }
  } else {
    // Keine aktive Session → einfach starten
    await this.persistence.startNewSession(config);
  }
  
  this.router.navigate(['/checklist']);
}
```

---

## Schritt 6: Footer mit Abschluss-Button und Bestätigungsdialog

**Datei:** `src/app/layouts/footer/footer/footer.ts`

```typescript
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [UiButtonDirective, SignatureComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  private readonly persistence = inject(ChecklistPersistence);
  private readonly router = inject(Router);
  
  /** Confirmation dialog state */
  public showCompleteDialog = signal(false);

  // Export-Buttons - ändern NICHTS an der Session
  async print(type = 'pdf', download = true) {
    // ... Export-Logik, Session bleibt active
  }

  /** Opens the confirmation dialog */
  openCompleteDialog(): void {
    this.showCompleteDialog.set(true);
  }

  /** Closes the confirmation dialog */
  closeCompleteDialog(): void {
    this.showCompleteDialog.set(false);
  }

  /** Confirms and completes the inspection */
  async confirmComplete(): Promise<void> {
    this.showCompleteDialog.set(false);
    await this.persistence.completeSession();
    this.router.navigate(['/wizard']);
  }
}
```

**Template mit Bestätigungsdialog:**
```html
<!-- Prüfung abschließen -->
<div class="layout-footer__complete">
  <hr class="layout-footer__divider" />
  <button uibutton kind="success" (click)="openCompleteDialog()">
    ✓ Prüfung abschließen
  </button>
</div>

<!-- Confirmation Dialog -->
@if (showCompleteDialog()) {
  <div class="complete-dialog-overlay" (click)="closeCompleteDialog()">
    <div class="complete-dialog" (click)="$event.stopPropagation()">
      <div class="complete-dialog__icon">⚠️</div>
      <h3 class="complete-dialog__title">Prüfung abschließen?</h3>
      <p class="complete-dialog__message">
        Möchten Sie die Prüfung wirklich abschließen?<br/>
        <strong>Alle gespeicherten Daten werden gelöscht</strong> und Sie werden zur Startseite weitergeleitet.
      </p>
      <div class="complete-dialog__actions">
        <button uibutton kind="ghost" (click)="closeCompleteDialog()">
          Abbrechen
        </button>
        <button uibutton kind="danger" (click)="confirmComplete()">
          Ja, Prüfung abschließen
        </button>
      </div>
    </div>
  </div>
}
```

---

## Schritt 7: Header mit Session-Status (Reaktiv)

**Datei:** `src/app/layouts/header/header/header.ts`

```typescript
import { Component, input, inject, computed } from '@angular/core';
import { ChecklistPersistence } from '@pages/checklist/state/checklist.persistence';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProgressBarComponent, RouterLink, UiButtonDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private readonly persistence = inject(ChecklistPersistence, { optional: true });

  progress = input<number | null>(null);
  
  // Session status - reactive from persistence service (kein Polling!)
  readonly sessionStatus = computed(() => this.persistence?.sessionStatus() ?? null);
}
```

**Template:**
```html
@if (sessionStatus() === 'active') {
  <div class="header__session-status header__session-status--active">
    <span class="header__session-dot"></span>
    <span class="header__session-label">Aktiv</span>
  </div>
}
```

**Hinweis:** Der Header liest den Status reaktiv vom `ChecklistPersistence.sessionStatus` Signal.
Kein Polling notwendig - Updates erfolgen automatisch wenn sich der Status ändert.

---

## Dateistruktur nach Implementation

```
src/app/shared/services/
├── indexed-db/
│   ├── index.ts                    // Public exports
│   ├── uvv-database.ts             // Dexie DB + Interfaces
│   └── indexed-db.service.ts       // Service-Layer

src/app/pages/
├── home/
│   └── home.page.ts                // Session-Check + Dialog
├── checklist/
│   ├── checklist.page.ts           // Session Init beim Laden
│   └── state/
│       ├── checklist.state.ts      // State Management
│       └── checklist.persistence.ts // IndexedDB + Auto-Save + sessionStatus Signal

src/app/layouts/
├── header/
│   └── header.ts                   // Session-Status Anzeige (reaktiv)
└── footer/
    └── footer.ts                   // Export + Abschluss-Button mit Bestätigungsdialog
```

---

## Testplan

1. **Unit Tests für IndexedDbService**
   - Session CRUD mit Status-Handling
   - Photo CRUD
   - Bulk Operations

2. **Integration Tests**
   - Page Refresh → State bleibt erhalten
   - Photos überleben Refresh
   - Mehrfach exportieren → Daten bleiben
   - "Prüfung abschließen" → Status = completed, Daten bleiben
   - Anderer User sieht aktive Session → Dialog erscheint

3. **E2E Tests**
   - Kompletter Workflow mit Unterbrechung
   - App schließen und wieder öffnen → direkt laden
   - Dialog: Fortsetzen / Abschließen / Verwerfen

---

## Migration von localStorage

- [ ] Beim ersten Start: Alte localStorage-Daten importieren
- [ ] Nach erfolgreicher Migration: localStorage löschen
- [ ] Fallback wenn IndexedDB nicht verfügbar

---

## Zusammenfassung

| Aspekt | Verhalten |
|--------|-----------|
| **Session Start** | Nach Wizard-Abschluss |
| **Auto-Save** | Bei jeder Änderung (debounced 500ms) |
| **Export** | Daten bleiben, mehrfach möglich |
| **Session Ende** | "Prüfung abschließen" Button mit Bestätigungsdialog |
| **Nach Abschluss** | Status = `completed`, **Daten bleiben erhalten** |
| **App-Öffnen mit aktiver Session** | Direkt laden, kein Dialog |
| **Neue Prüfung bei aktiver Session** | Dialog mit 3 Optionen |
| **Header Status** | Reaktives Signal (kein Polling) |
| **Error Handling** | try/catch bei DB-Operationen |

---

## Später optional erweiterbar

- [ ] Liste der letzten (completed) Sessions anzeigen
- [ ] Erneuter Export von completed Sessions
- [ ] Automatische Bereinigung alter Sessions (z.B. max. 5 oder nach 30 Tagen)

---

## Nächste Schritte

1. [x] Dexie installieren
2. [x] Database Schema erstellen (`uvv-database.ts`)
3. [x] IndexedDbService implementieren
4. [x] ChecklistPersistence umbauen
5. [x] Home-Page: Session-Check + Dialog
6. [x] Auto-Save integrieren (in ChecklistPersistence)
7. [x] Protocol-Page: Abschluss-Button (mit Bestätigungsdialog)
8. [x] Header: Session-Status Anzeige (🟢 Aktiv)
9. [x] Migration von localStorage (Legacy-Daten werden beim Start gelöscht)
10. [ ] Unit Tests schreiben (optional)
