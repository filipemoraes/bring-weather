import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Weather } from '../../models/weather.model';
import { WeatherForecastListComponent } from '../weather-forecast-list/weather-forecast-list.component';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {
  @Input() weather: Weather;

  constructor(private modalService: NgbModal) {}

  public openMore(): void {
    const modalRef = this.modalService.open(WeatherForecastListComponent);
    modalRef.componentInstance.weather = this.weather;
  }

  ngOnInit() {}
}
