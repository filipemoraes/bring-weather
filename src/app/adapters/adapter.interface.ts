import { throwError } from 'rxjs';
import * as Ajv from 'ajv';
import { schema } from '../schemas/forecast-response.schema';

export abstract class Adapter<T> {
  abstract adapt(item: any): T;

  protected checkSchema(response): void {
    const ajv = new Ajv({ allErrors: true });
    const test = ajv.compile(schema);

    if (!test(response)) {
      throw throwError(test.errors);
    }
  }
}
