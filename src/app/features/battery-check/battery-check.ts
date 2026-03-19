import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ChecklistState } from '@app/pages/checklist/state/checklist.state';
import { BatteryPhotoFieldComponent } from '@features/battery-check/battery-photo-field/battery-photo-field';

export type BatteryStatus = 'ok' | 'replace' | null;

@Component({
  selector: 'app-battery-check',
  standalone: true,
  imports: [BatteryPhotoFieldComponent],
  templateUrl: './battery-check.html',
  styleUrl: './battery-check.scss',
  encapsulation: ViewEncapsulation.None
})
export class BatteryCheckComponent {
  readonly battery1Photos = signal<File[]>([]);
  readonly battery2Photos = signal<File[]>([]);

  readonly battery1Status = signal<BatteryStatus>(null);
  readonly battery2Status = signal<BatteryStatus>(null);

  private readonly checklist = inject(ChecklistState);

  private setStatus(key: string, status: BatteryStatus) {
    if (status === "ok") {
      this.checklist.setItemStatus(key, "ok");
      this.checklist.setItemNote(key, "");
    }
    else {
      this.checklist.setItemStatus(key, "nok");
      this.checklist.setItemNote(key, "Batterie muss ersetzt werden");
    }
  }

  setBattery1Status(status: BatteryStatus) {
    this.battery1Status.set(status);
    this.setStatus("battery1", status);
  }

  setBattery2Status(status: BatteryStatus) {
    this.battery2Status.set(status);
    this.setStatus("battery2", status);
  }

  setBattery1Photo(photos: File[]) {
    this.checklist.setItemPhotos("battery1", photos);
    this.battery1Photos.set(photos);
  }

  setBattery2Photo(photos: File[]) {
    this.checklist.setItemPhotos("battery2", photos);
    this.battery2Photos.set(photos);
  }
}
