import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {
  @Input() weather: Weather;

  constructor() {}

  ngOnInit() {}
}
