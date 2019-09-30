import { Weather } from './../../models/weather.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';

const FORECAST_MAX_RESULTS = 5;

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.scss']
})
export class WeatherForecastListComponent implements OnInit {
  @Input() public weather: Weather;
  public forecast$ = new BehaviorSubject<Weather[]>(null);
  public error = false;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}

  private loadData(): void {
    this.error = false;
    this.apiService.getForecastWeather(this.weather.id).subscribe(
      data => {
        const excludeTimezoneTimeout = data
          .filter((weather: Weather) => weather.checkForecastTimeout())
          .slice(0, FORECAST_MAX_RESULTS);
        this.forecast$.next(excludeTimezoneTimeout);
      },
      error => {
        console.error(error);
        this.error = true;
      }
    );
  }

  ngOnInit() {
    this.loadData();
  }
}
