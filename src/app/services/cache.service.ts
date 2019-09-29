import { Injectable } from '@angular/core';
import { ICurrentWeatherCache } from '../models/cache.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {}

  // TODO guardar um item por cada typo e cidade e dar a data de vencimento de cada um 10 minutos

  public getCurrentWeatherCache(cities: number[]): ICurrentWeatherCache {
    const cache: ICurrentWeatherCache = { cached: [], list: [] };
    cities.map(city => {
      const data = this.getCityWeather(city);
      if (data) {
        cache.list.push(data);
        cache.cached.push(city);
      }
    });

    return cache;
  }

  public getForecastWeatherCache(city: number): null | any {
    return null;
  }

  private getCityWeather(city: number): null | any {
    return null;
  }
}
