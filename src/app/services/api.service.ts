import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
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
    const cachedCities: ICurrentWeatherCache = this.cacheService.getCurrentWeather(
      cities
    );
    const citiesWithoutCache: number[] = cities.filter(
      city => !cachedCities.cached.includes(city)
    );
    const forkList: any[] = [of(cachedCities)];

    if (citiesWithoutCache.length) {
      const URI = `${GROUP_BASE_URL}&id=${citiesWithoutCache}&units=${UNITS}`;
      forkList.push(this.http.get(URI));
    }

    return forkJoin(forkList).pipe(
      tap(response => {
        if (citiesWithoutCache.length) {
          this.cacheService.setCurrentWeather(response[1].list);
        }
      }),
      map((response: any[]) => {
        const adapter: GroupResponseAdapter = new GroupResponseAdapter();
        return adapter.adapt(response);
      }),
      catchError(err => {
        if (citiesWithoutCache.length) {
          this.cacheService.flushCurrentWeather(citiesWithoutCache);
        }
        return throwError(err);
      })
    );
  }

  public getForecastWeather(city: number): Observable<Weather[]> {
    const cache = this.cacheService.getForecastWeather(city);
    const URI = `${FORECAST_BASE_URL}&id=${city}&cnt=${FORECAST_RESULT_LIMIT}&units=${UNITS}`;

    return cache
      ? of(cache).pipe(map(this.adaptForecastResponse))
      : this.http.get(URI).pipe(
          tap(response => this.cacheService.setForecastWeather(city, response)),
          map(this.adaptForecastResponse),
          catchError(err => {
            this.cacheService.flushForecastWeather(city);
            return throwError(err);
          })
        );
  }

  private adaptForecastResponse(response: any): Weather[] {
    const adapter: ForecastResponseAdapter = new ForecastResponseAdapter();
    return adapter.adapt(response);
  }
}
