import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  input
} from '@angular/core';

@Component({
  selector: 'app-check-item-media',
  standalone: true,
  imports: [],
  templateUrl: './check-item-media.html',
  styleUrl: './check-item-media.scss'
})
export class CheckItemMediaComponent implements OnDestroy {
  private objectUrls = new Map<File, string>();
  private _photos: File[] = [];

  @ViewChild('fileInput', { static: true })
  private fileInput?: ElementRef<HTMLInputElement>;

  maxPhotos = input<number>(Number.POSITIVE_INFINITY);
  allowMultiple = input<boolean>(true);

  @Input()
  set photos(value: File[] | null | undefined) {
    const next = value ?? [];
    this.syncObjectUrls(this._photos, next);
    this._photos = next;
  }
  get photos(): File[] {
    return this._photos;
  }

  @Output() photosChange = new EventEmitter<File[]>();

  ngOnDestroy() {
    for (const url of this.objectUrls.values()) URL.revokeObjectURL(url);
    this.objectUrls.clear();
  }

  openCamera() {
    if (!this.canAddOrReplace()) return;
    this.fileInput?.nativeElement.click();
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const files = input?.files ? Array.from(input.files) : [];
    if (files.length === 0) return;

    const next = this.nextPhotosAfterSelection(files);
    if (next) this.photosChange.emit(next);

    if (input) input.value = '';
  }

  removePhoto(index: number) {
    const next = this.photos.slice();
    const removed = next.splice(index, 1)[0];
    this.revokeObjectUrl(removed);
    this.photosChange.emit(next);
  }

  thumbUrl(file: File): string {
    const cached = this.objectUrls.get(file);
    if (cached) return cached;

    const url = URL.createObjectURL(file);
    this.objectUrls.set(file, url);
    return url;
  }

  canAddOrReplace(): boolean {
    const max = this.maxPhotos();
    if (!Number.isFinite(max)) return true;
    if (max <= 0) return false;
    if (max === 1) return true;
    return this.photos.length < max;
  }

  private nextPhotosAfterSelection(files: File[]): File[] | null {
    const max = this.maxPhotos();
    if (max <= 0) return null;

    if (max === 1) {
      const file = files[0];
      if (!file) return null;
      this.syncObjectUrls(this._photos, [file]);
      return [file];
    }

    const merged = [...this.photos, ...files];
    if (!Number.isFinite(max)) return merged;

    const capped = merged.slice(0, max);
    this.syncObjectUrls(this._photos, capped);
    return capped;
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
