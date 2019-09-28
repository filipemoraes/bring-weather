import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-city-weather-list',
  templateUrl: './city-weather-list.component.html',
  styleUrls: ['./city-weather-list.component.scss']
})
export class CityWeatherListComponent implements OnInit {
  constructor(private apiService: ApiService) {
    this.apiService
      .getCityForecast(524901) // TODO dynamic lack
      .subscribe(data => console.log(data), error => console.error(error)); // TODO show a user friendly message
  }

  ngOnInit() {}
}
