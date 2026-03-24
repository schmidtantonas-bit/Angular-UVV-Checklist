import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckItemMediaComponent } from './check-item-media';

describe('CheckItemMedia', () => {
  let component: CheckItemMediaComponent;
  let fixture: ComponentFixture<CheckItemMediaComponent>;

  const photoA = new File(['a'], 'a.jpg', { type: 'image/jpeg' });
  const photoB = new File(['b'], 'b.jpg', { type: 'image/jpeg' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckItemMediaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckItemMediaComponent);
    component = fixture.componentInstance;
    component.photos = [photoA, photoB];
    fixture.detectChanges();
  });

  it('opens preview when clicking the thumbnail', () => {
    const thumb = fixture.nativeElement.querySelector('[data-ui="check-item-thumb"]') as HTMLButtonElement | null;
    expect(thumb).not.toBeNull();

    thumb?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-ui="check-item-preview-modal"]')).not.toBeNull();
  });

  it('removes only the selected image when clicking the delete button', () => {
    const emitted: File[][] = [];
    component.photosChange.subscribe((photos) => emitted.push(photos));

    const deleteButton = fixture.nativeElement.querySelector('[data-ui="check-item-thumb-delete"]') as HTMLButtonElement | null;
    expect(deleteButton).not.toBeNull();

    deleteButton?.click();

    expect(emitted).toEqual([[photoB]]);
  });
});
