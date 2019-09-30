import { addHours, format, isAfter } from 'date-fns';

export interface IWeather {
  id: number;
  city: string;
  temperature: ITemperature;
  icon: string;
  windspeed: number;
  timezone: number;
}

export interface ITemperature {
  current: number;
  max: number;
  min: number;
}

export class Weather {
  public id: number;
  public city: string;
  public temperature: ITemperature;
  public icon: string;
  public windspeed: number;
  public timezone: number;
  public localTime: string;
  public forecastDate: string;

  constructor(data: IWeather) {
    Object.assign(this, data);
    this.temperature.current = Math.round(this.temperature.current);
    this.temperature.min = Math.round(this.temperature.min);
    this.temperature.max = Math.round(this.temperature.max);
    this.setLocalTime();
  }

  private setLocalTime(): void {
    const date: Date = this.calculateTimezone(new Date());
    this.localTime = format(date, 'HH:mm');
  }

  private calculateTimezone(date: Date): Date {
    const currentTz = -date.getTimezoneOffset() * 60;
    const cityTz = this.timezone;
    const diff = (cityTz - currentTz) / 3600;

    return addHours(date, diff);
  }

  public getLocalForecastTime(): string {
    const date = new Date(this.forecastDate);
    return format(date, 'HH:mm');
  }

  public checkForecastTimeout(): boolean {
    const date = new Date(this.forecastDate);
    const dateTz = this.calculateTimezone(new Date());
    const timeout: boolean = isAfter(date, dateTz);

    return timeout;
  }
}

export class WeatherFactory {
  static create(data: IWeather): Weather {
    return new Weather(data);
  }
}
