import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Weather } from '../../models/weather.model';

const CITIES: number[] = [2643743, 2267057, 2988507, 3117735, 6539761];

@Component({
  selector: 'app-city-weather-list',
  templateUrl: './city-weather-list.component.html',
  styleUrls: ['./city-weather-list.component.scss']
})
export class CityWeatherListComponent implements OnInit {
  public weather$ = new BehaviorSubject<Weather[]>(null);
  public error = false;

  constructor(private apiService: ApiService) {
    this.loadData();
  }

  private loadData(): void {
    this.error = false;
    this.apiService
      .getCurrentWeatherList(CITIES)
      .subscribe(
        data => this.weather$.next(data),
        error => (this.error = true)
      );
  }

  ngOnInit() {}
}
