import { abstractObject, mutateObject, mutatorRules } from 'object-crumble';

interface OutputScript {
  key: string;
  value: string;
  onSuccess: string[];
  onFailure: string[];
}

type OutputScriptResult =
  | {
      status: 'success';
      value: OutputScript;
    }
  | {
      status: 'failure';
      error: string;
    };

const failOutScript = (error: string): OutputScriptResult => ({
  status: 'failure',
  error,
});

const isValidFlag = (flag: string) =>
  ['pass', 'abstract', 'sha256', 'count'].includes(flag);

export const parseOutputScript = (value: string): OutputScriptResult => {
  const tokens = value.trim().split(' ');
  const [
    ifToken,
    keyToken,
    equalToken,
    valueToken,
    thenToken,
    ...restOfTokens
  ] = tokens;
  if (ifToken !== 'if') {
    return failOutScript('Expected to start with if');
  }

  if (equalToken !== 'equals') {
    return failOutScript('Expected an equals operator');
  }

  if (thenToken !== 'then') {
    return failOutScript('Expected a then keyword');
  }

  if (restOfTokens.length < 3) {
    return failOutScript('Would expect at least 3 parameters after then');
  }

  if (typeof keyToken !== 'string') {
    return failOutScript('Missing key a key to compare');
  }

  if (typeof valueToken !== 'string') {
    return failOutScript('Missing a value to compare');
  }

  const elsePosition = restOfTokens.findIndex((token) => token === 'else');
  if (elsePosition === -1) {
    return failOutScript('Missing the else keyword');
  }

  const onSuccess = restOfTokens.slice(0, elsePosition);
  if (onSuccess.length === 0) {
    return failOutScript('In case of success you must have at least one flag');
  }

  const onFailure = restOfTokens.slice(elsePosition);
  if (onFailure.length === 0) {
    return failOutScript('In case of failure you must have at least one flag');
  }

  if (!onSuccess.every(isValidFlag)) {
    return failOutScript(
      `One of the success flags is not supported: ${onSuccess}`
    );
  }

  if (!onFailure.every(isValidFlag)) {
    return failOutScript(
      `One of the failure flags is not supported: ${onSuccess}`
    );
  }

  return {
    status: 'success',
    value: {
      key: keyToken,
      value: valueToken,
      onSuccess,
      onFailure,
    },
  };
};

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
export const crumble =
  (config: Record<string, string>, table: Record<string, string>[]) =>
  (func: CrumbleWrappedFunction, values: object[]): object[] => {
    const signature = config['signature'];
    const kind = config['kind'] || 'string';
    const pathName = config['path'];
    const mutation = config['mutation'];
    const outputConfig = config['output'];
    const outputScript =
      outputConfig === undefined ? undefined : parseOutputScript(outputConfig);
    if (outputScript && outputScript.status === 'failure') {
      return [{ message: `Crumble error: ${outputScript.error}` }];
    }

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
