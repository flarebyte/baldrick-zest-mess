import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * Produce a JSON Schema from a Zod model
 * @param config configuration with a name for the schema
 * @returns a JSON Schema object
 */

export const fromZodToJsonSchema = (config: Record<string, string>) => (schema: any): object => {
  const name = config['name'];
  return zodToJsonSchema(schema, name);
};
