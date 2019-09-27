import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ForecastWeatherComponent } from './components/forecast-weather/forecast-weather.component';
import { ForecastWeatherListComponent } from './components/forecast-weather-list/forecast-weather-list.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastWeatherComponent,
    ForecastWeatherListComponent,
    CurrentWeatherComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
