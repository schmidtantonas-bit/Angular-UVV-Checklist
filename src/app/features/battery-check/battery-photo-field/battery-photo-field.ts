import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  input
} from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';

export type BatteryPhotoStatus = 'ok' | 'replace' | null;

@Component({
  selector: 'app-battery-photo-field',
  standalone: true,
  imports: [UiButtonDirective],
  templateUrl: './battery-photo-field.html',
  styleUrl: './battery-photo-field.scss'
})
export class BatteryPhotoFieldComponent implements OnDestroy {
  private objectUrls = new Map<File, string>();

  title = input.required<string>();
  photos = input<File[]>([]);
  status = input<BatteryPhotoStatus>(null);

  @Output() photosChange = new EventEmitter<File[]>();
  @Output() statusChange = new EventEmitter<BatteryPhotoStatus>();

  @ViewChild('fileInput', { static: true })
  private fileInput?: ElementRef<HTMLInputElement>;

  ngOnDestroy() {
    for (const url of this.objectUrls.values()) URL.revokeObjectURL(url);
    this.objectUrls.clear();
  }

  openCamera() {
    this.fileInput?.nativeElement.click();
  }

  onFilesSelected(event: Event) {
    const inputEl = event.target as HTMLInputElement | null;
    const file = inputEl?.files?.[0] ?? null;
    if (!file) return;

    const next = [file];
    this.syncObjectUrls(this.photos(), next);
    this.photosChange.emit(next);

    if (inputEl) inputEl.value = '';
  }

  clearPhoto() {
    this.syncObjectUrls(this.photos(), []);
    this.photosChange.emit([]);
  }

  thumbUrl(file: File): string {
    const cached = this.objectUrls.get(file);
    if (cached) return cached;

    const url = URL.createObjectURL(file);
    this.objectUrls.set(file, url);
    return url;
  }

  setStatus(next: Exclude<BatteryPhotoStatus, null>) {
    this.statusChange.emit(next);
  }

  private syncObjectUrls(prev: File[], next: File[]) {
    const nextSet = new Set(next);
    for (const file of prev) {
      if (!nextSet.has(file)) this.revokeObjectUrl(file);
    }
  }

  private revokeObjectUrl(file: File | undefined) {
    if (!file) return;
    const url = this.objectUrls.get(file);
    if (url) URL.revokeObjectURL(url);
    this.objectUrls.delete(file);
  }
}

