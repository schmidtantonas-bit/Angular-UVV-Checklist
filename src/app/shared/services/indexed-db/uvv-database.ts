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
  inspectionPackage?: string;    // Optional für Überlastprüfung
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
