import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePageComponent } from './home.page';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose all configured models in the wizard', () => {
    expect(component.modelsByFamily.drehleiter.map((model) => model.id)).toEqual([
      'l27',
      'l32',
      'l32a',
      'l32xs',
      'l39',
      'l39_lift'
    ]);

    expect(component.modelsByFamily.buhne.map((model) => model.id)).toEqual(['b32', 'b36', 'b42']);
  });
});
