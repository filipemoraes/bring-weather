import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather.model';
import { CacheService } from './cache.service';
import { ICurrentWeatherCache } from '../models/cache.model';
import { GroupResponseAdapter } from '../adapters/group-response.adapter';
import { ForecastResponseAdapter } from '../adapters/forecast-response.adapter';

const FORECAST_RESULT_LIMIT = 4;
const FORECAST_BASE_URL = `${environment.api.baseURL}forecast?appid=${environment.api.key}`;
const GROUP_BASE_URL = `${environment.api.baseURL}group?appid=${environment.api.key}`;
const UNITS = 'metric';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  public getCurrentWeatherList(cities: number[]): Observable<Weather[]> {
    const cache: ICurrentWeatherCache = this.cacheService.getCurrentWeatherCache(
      cities
    );
    const citiesWithoutCache: number[] = cities.filter(
      city => !cache.cached.includes(city)
    );
    const forkList: any[] = [of(cache)];

    if (citiesWithoutCache.length) {
      const URI = `${GROUP_BASE_URL}&id=${citiesWithoutCache}&units=${UNITS}`;
      forkList.push(this.http.get(URI));
    }

    return forkJoin(forkList).pipe(
      map((response: any[]) => {
        const adapter: GroupResponseAdapter = new GroupResponseAdapter();
        return adapter.adapt(response);
      })
    );
  }

  public getForecastWeather(city: number): Observable<Weather[]> {
    const cache = this.cacheService.getForecastWeatherCache(city);
    const URI = `${FORECAST_BASE_URL}&id=${city}&cnt=${FORECAST_RESULT_LIMIT}&units=${UNITS}`;

    return cache
      ? of(cache).pipe(map(this.adaptForecastResponse))
      : this.http.get(URI).pipe(map(this.adaptForecastResponse));
  }

  private adaptForecastResponse(response: any): Weather[] {
    const adapter: ForecastResponseAdapter = new ForecastResponseAdapter();
    return adapter.adapt(response);
  }
}
