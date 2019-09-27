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

  constructor(data: IWeather) {
    Object.assign(this, data);
  }

  // TODO create property with local datetime
}

export class WeatherFactory {
  static create(data: IWeather): Weather {
    return new Weather(data);
  }
}
