import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Weather } from '../../models/weather.model';

const CITIES: number[] = [2267057, 524901, 2988507, 3117735, 1850147];

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
    this.apiService.getCurrentWeatherList(CITIES).subscribe(
      data => this.weather$.next(data),
      error => {
        console.error(error);
        this.error = true;
      }
    );
  }

  ngOnInit() {}
}
