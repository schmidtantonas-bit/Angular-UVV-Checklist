import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
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
    this.fileInput?.nativeElement.click();
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const files = input?.files ? Array.from(input.files) : [];
    if (files.length === 0) return;

    this.photosChange.emit([...this.photos, ...files]);

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
