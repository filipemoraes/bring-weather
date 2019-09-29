import { Injectable } from '@angular/core';
import { ICurrentWeatherCache } from '../models/cache.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {}

  public getCurrentWeather(cities: number[]): ICurrentWeatherCache {
    const cache: ICurrentWeatherCache = { cached: [], list: [] };
    cities.map(city => {
      const data = this.getCityCurrentWeather(city);
      if (data) {
        cache.list.push(data);
        cache.cached.push(city);
      }
    });

    return cache;
  }

  public getForecastWeather(city: number): null | any {
    return null;
  }

  public setCurrentWeather(response: any): void {}

  public setForecastWeather(city: number, response: any): void {}

  public flushCurrentWeather(cities: number[]): void {}

  public flushForecastWeather(city: number): void {}

  private getCityCurrentWeather(city: number): null | any {
    return null;
  }
}
