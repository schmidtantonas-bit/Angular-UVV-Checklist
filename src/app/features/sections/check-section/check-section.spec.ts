import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSectionComponent } from './check-section';

describe('CheckSection', () => {
  let component: CheckSectionComponent;
  let fixture: ComponentFixture<CheckSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckSectionComponent);
    fixture.componentRef.setInput('model', {
      id: 'sec-1',
      title: 'Section',
      total: 0,
      completed: 0,
      items: []
    });
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
