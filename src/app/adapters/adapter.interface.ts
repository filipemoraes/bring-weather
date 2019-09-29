import { throwError } from 'rxjs';
import * as Ajv from 'ajv';

export abstract class Adapter<T> {
  abstract adapt(item: any): T;

  protected checkSchema(response, schema): void {
    const ajv = new Ajv({ allErrors: true });
    const test = ajv.compile(schema);

    if (!test(response)) {
      throw throwError(test.errors);
    }
  }
}
