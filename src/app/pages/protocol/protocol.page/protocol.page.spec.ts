import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolPageComponent } from './protocol.page';

describe('ProtocolPage', () => {
  let component: ProtocolPageComponent;
  let fixture: ComponentFixture<ProtocolPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtocolPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocolPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
