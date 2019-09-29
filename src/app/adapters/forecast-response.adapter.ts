import { Adapter } from './adapter.interface';
import { Weather, WeatherFactory, IWeather } from '../models/weather.model';
import { ForecastMapper } from '../mappers/forecast.mapper';
import { Mapper } from '../mappers/mapper.interface';
import { schema } from '../schemas/forecast-response.schema';

export class ForecastResponseAdapter extends Adapter<Weather[]> {
  public adapt(response): Weather[] {
    this.checkSchema(response, schema);

    const forecasts: Weather[] = [];
    const forecastObject = (({ list, ...others }) => ({ ...others }))(response);

    response.list.forEach(forecast => {
      forecastObject.list = [forecast];
      const mapper: Mapper<IWeather> = new ForecastMapper();
      const objectMapper: IWeather = mapper.map(forecastObject);
      forecasts.push(WeatherFactory.create(objectMapper));
    });

    return forecasts;
  }
}
