import { Injectable } from '@angular/core';
import { addMinutes, isAfter, getTime } from 'date-fns';
import { ICurrentWeatherCache, IWeatherCache } from '../models/cache.model';

const FREQUENCY_WEATHER_UPDATE_IN_MINUTES = 10;
const CURRENT_WEATHER_PREFIX = 'current_weather_';
const FORECAST_WEATHER_PREFIX = 'forecast_weather_';

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

  public setCurrentWeather(data: any): void {
    data.forEach((city: any) => {
      const key = CURRENT_WEATHER_PREFIX + city.id;
      this.set(key, city);
    });
  }

  public setForecastWeather(city: number, data: any): void {
    const key = FORECAST_WEATHER_PREFIX + city;
    this.set(key, data);
  }

  public flushCurrentWeather(cities: number[]): void {
    cities.forEach(city => {
      const key = CURRENT_WEATHER_PREFIX + city;
      localStorage.removeItem(key);
    });
  }

  public flushForecastWeather(city: number): void {
    const key = FORECAST_WEATHER_PREFIX + city;
    localStorage.removeItem(key);
  }

  public getForecastWeather(city: number): any {
    const key = FORECAST_WEATHER_PREFIX + city;
    return this.get(key);
  }

  private getCityCurrentWeather(city: number): any {
    const key = CURRENT_WEATHER_PREFIX + city;
    return this.get(key);
  }

  private get(key: string): any {
    const cachedData: string = localStorage.getItem(key);

    if (cachedData) {
      const data: IWeatherCache = JSON.parse(cachedData);
      const expired: boolean = isAfter(new Date(), new Date(data.expires));
      if (!expired) {
        return data.value;
      }
    }

    return null;
  }

  private set(key: string, data: any): void {
    const expires = this.getExpires();
    localStorage.setItem(key, JSON.stringify({ value: data, expires }));
  }

  private getExpires(): number {
    return getTime(addMinutes(new Date(), FREQUENCY_WEATHER_UPDATE_IN_MINUTES));
  }
}
