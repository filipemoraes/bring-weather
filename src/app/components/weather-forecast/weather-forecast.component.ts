import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  @Input() weather: Weather;

  constructor() {}

  ngOnInit() {}
}
