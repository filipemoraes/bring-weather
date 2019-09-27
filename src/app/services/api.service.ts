import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Weather } from '../models/weather.model';
import { ForecastResponseAdapter } from '../adapters/forecast-response.adapter';

const FORECAST_RESULT_LIMIT = 4;
const FORECAST_BASE_URL = `${environment.api.baseURL}forecast?units=metric&appid=${environment.api.key}`;
const GROUP_BASE_URL = `${environment.api.baseURL}group?units=metric&appid=${environment.api.key}`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getCityForecast(cityID: number): Observable<Weather[]> {
    // TODO ApiCacheService

    const URI = `${FORECAST_BASE_URL}&id=${cityID}&cnt=${FORECAST_RESULT_LIMIT}`;
    return this.http.get(URI).pipe(
      map((response: any) => {
        const adapter: ForecastResponseAdapter = new ForecastResponseAdapter();
        return adapter.adapt(response);
      })
    );
  }
}
