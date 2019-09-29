import { Adapter } from './adapter.interface';
import { Weather, WeatherFactory, IWeather } from '../models/weather.model';
import { Mapper } from '../mappers/mapper.interface';
import { GroupMapper } from '../mappers/group.mapper';
import { schema } from '../schemas/group-response.schema';

export class GroupResponseAdapter extends Adapter<Weather[]> {
  public adapt(response): Weather[] {
    this.checkSchema(response, schema);
    const currentWeathers: Weather[] = [];
    const list = [...response[0].list];

    if (response.length === 2) {
      list.push(...response[1].list);
    }

    list.forEach(current => {
      const mapper: Mapper<IWeather> = new GroupMapper();
      const objectMapper: IWeather = mapper.map(current);
      currentWeathers.push(WeatherFactory.create(objectMapper));
    });

    return currentWeathers;
  }
}
