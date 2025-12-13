import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckItemComponent } from './check-item';

describe('CheckItem', () => {
  let component: CheckItemComponent;
  let fixture: ComponentFixture<CheckItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckItemComponent);
    fixture.componentRef.setInput('model', {
      id: '1',
      title: 'Item',
      status: null
    });
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders accordion container for every item', () => {
    fixture.componentRef.setInput('model', {
      id: '1',
      title: 'Item',
      status: null
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.check-item__acc')).not.toBeNull();
  });

  it('keeps accordion closed and empty unless status is nok', () => {
    fixture.componentRef.setInput('model', {
      id: '1',
      title: 'Item',
      status: 'ok'
    });
    fixture.detectChanges();

    const acc = fixture.nativeElement.querySelector('.check-item__acc') as HTMLElement | null;
    expect(acc).not.toBeNull();
    expect(acc?.classList.contains('is-open')).toBe(false);
    expect(fixture.nativeElement.querySelector('textarea')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-ui="check-item-photo"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-ui="check-item-save"]')).toBeNull();
  });

  it('renders extras when status is nok', () => {
    fixture.componentRef.setInput('model', {
      id: '1',
      title: 'Item',
      status: 'nok'
    });
    fixture.detectChanges();

    const acc = fixture.nativeElement.querySelector('.check-item__acc') as HTMLElement | null;
    expect(acc).not.toBeNull();
    expect(acc?.classList.contains('is-open')).toBe(true);
    expect(fixture.nativeElement.querySelector('textarea')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-ui="check-item-photo"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-ui="check-item-save"]')).not.toBeNull();
  });

  it('toggles textarea open/closed when clicking NOK twice while keeping status nok', () => {
    fixture.componentRef.setInput('model', {
      id: '1',
      title: 'Item',
      status: null
    });
    fixture.detectChanges();

    const nokButton = fixture.nativeElement.querySelector(
      'button[aria-label="NOK"]'
    ) as HTMLButtonElement | null;
    expect(nokButton).not.toBeNull();

    nokButton?.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('textarea')).not.toBeNull();

    nokButton?.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('textarea')).toBeNull();
  });
});
