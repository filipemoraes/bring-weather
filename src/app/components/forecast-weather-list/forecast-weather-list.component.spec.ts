import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastWeatherListComponent } from './forecast-weather-list.component';

describe('ForecastWeatherListComponent', () => {
  let component: ForecastWeatherListComponent;
  let fixture: ComponentFixture<ForecastWeatherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastWeatherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastWeatherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
