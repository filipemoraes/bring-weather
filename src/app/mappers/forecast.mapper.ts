import { Mapper } from './mapper.interface';
import { IWeather } from '../models/weather.model';

export class ForecastMapper extends Mapper<IWeather> {
  private readonly MAP = {
    'city.id': 'id',
    'city.name': 'city',
    'list[0].weather[0].icon': 'icon',
    'list[0].wind.speed': 'windspeed',
    'city.timezone': 'timezone',
    'list[0].main.temp': 'temperature.current',
    'list[0].main.temp_min': 'temperature.min',
    'list[0].main.temp_max': 'temperature.max'
  };

  public map(src): IWeather {
    return this.create(src, this.MAP);
  }
}
