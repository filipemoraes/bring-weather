import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CityWeatherListComponent } from './components/city-weather-list/city-weather-list.component';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { WeatherForecastListComponent } from './components/weather-forecast-list/weather-forecast-list.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    CityWeatherListComponent,
    CityWeatherComponent,
    WeatherForecastListComponent,
    WeatherForecastComponent
  ],
  imports: [BrowserModule, HttpClientModule, NgbModule],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [WeatherForecastListComponent]
})
export class AppModule {}
