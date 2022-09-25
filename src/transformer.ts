import { abstractObject, mutateObject, mutatorRules } from 'object-crumble';
import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * Abstract an object using object-crumble
 * @param value the object to abstract
 * @returns a concise summary
 */
export const abstract = (value: object): object[] => abstractObject([])(value);

type CrumbleWrappedFunction = (values: object[]) => object;

/**
 * Run diverse variation of the parameter and record the result
 * @param config configuration with keys: signature, kind, path, mutation
 * @param table a list of rows with a path and mutation key
 * @returns a list of results
 */
export const tumble =
  (config: Record<string, string>, table: Record<string, string>[]) =>
  (func: CrumbleWrappedFunction, values: object[]): object[] => {
    const signature = config['signature'];
    const kind = config['kind'] || 'string';
    const pathName = config['path'];
    const mutation = config['mutation'];

    if (
      signature === undefined ||
      signature !== 'A' ||
      values[0] === undefined
    ) {
      throw new Error('Crumble should have a signature');
    }
    const value = values[0];
    let results = [];
    for (const row of table) {
      const path = pathName || `${row['path']}`;
      const mutationName = mutation || `${row['mutation']}`;
      const mutated = mutateObject(mutatorRules)({
        path,
        kind,
        mutationName,
      })(value);
      const result = func([mutated]);
      results.push({
        title: `Path: ${path}, mutation: ${mutationName}`,
        result: abstractObject([])(result),
      });
    }
    return results;
  };

/**
 * Produce a JSON Schema from a Zod model
 * @param config configuration with a name for the schema
 * @returns a JSON Schema object
 */
export const fromZodToJsonSchema =
  (config: Record<string, string>) =>
  (schema: any): object => {
    const name = config['name'];
    return zodToJsonSchema(schema, name);
  };
