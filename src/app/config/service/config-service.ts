import { Injectable } from '@angular/core';
import { ChecklistConfig } from '../build/checklist-config';

@Injectable({ providedIn: 'root' })
export class ConfigChecklistService {
  private currentConfig?: ChecklistConfig;

  setCurrentConfig(config: ChecklistConfig) {
    this.currentConfig = config;
  }

  getCurrentConfig() {
    return this.currentConfig;
  }

  clearCurrentConfig() {
    this.currentConfig = undefined;
  }
}
