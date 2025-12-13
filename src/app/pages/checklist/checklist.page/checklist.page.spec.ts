import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistPageComponent } from './checklist.page';

describe('ChecklistPage', () => {
  let component: ChecklistPageComponent;
  let fixture: ComponentFixture<ChecklistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
