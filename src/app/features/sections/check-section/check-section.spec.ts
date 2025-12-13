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
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
