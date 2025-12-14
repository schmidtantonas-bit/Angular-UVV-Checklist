import { Component, ViewEncapsulation, signal } from '@angular/core';
import { BatteryPhotoFieldComponent } from '@features/battery-check/battery-photo-field/battery-photo-field';

type BatteryStatus = 'ok' | 'replace' | null;

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
}
