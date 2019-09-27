const objectMapper = require('object-mapper');

export abstract class Mapper<T> {
  abstract map(src: any): T;

  protected create(src: any, map: any): T {
    return objectMapper(src, map);
  }
}
