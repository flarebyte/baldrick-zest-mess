import { createHash } from 'node:crypto';
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

  const onFailure = restOfTokens.slice(elsePosition + 1);
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
      `One of the failure flags is not supported: ${onFailure}`
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

interface TransformOutputInfo {
  count?: string;
  sha256?: string;
  abstract?: object;
}

const countStatsObject = (value: object): string => {
  const text = JSON.stringify(value, null, 2);
  const words = text.split(/\s+/);
  return `Words: ${words.length}, Characters ${text.length}`;
};

const sha256Object = (value: object): string => {
  const text = JSON.stringify(value, null, 2);
  const hash = createHash('sha256').update(text).digest('base64');
  return hash;
};

const produceOutputInfo = (
  flags: string[],
  value: object
): TransformOutputInfo => ({
  abstract:
    (flags.includes('abstract') && abstractObject([])(value)) || undefined,
  count: (flags.includes('count') && countStatsObject(value)) || undefined,
  sha256: (flags.includes('sha256') && sha256Object(value)) || undefined,
});

const generateOutput = (flags: string[], value: object): object => {
  if (flags.includes('pass')) {
    return value;
  }
  const info = produceOutputInfo(flags, value);

  if (
    typeof info.count === 'boolean' &&
    typeof info.sha256 === 'boolean' &&
    info.abstract !== undefined
  ) {
    return info.abstract;
  }
  if (info.abstract === undefined) {
    delete info.abstract;
  }
  if (info.count === undefined) {
    delete info.count;
  }
  if (info.sha256 === undefined) {
    delete info.sha256;
  }

  return info;
};

const transformResult =
  (outputScriptResult?: OutputScriptResult & { status: 'success' }) =>
  (value: { [index: string]: any }): object => {
    if (outputScriptResult === undefined) {
      return value;
    }
    const actualValue: string = value[outputScriptResult.value.key];
    const isSuccess = actualValue === outputScriptResult.value.value;
    return generateOutput(
      isSuccess
        ? outputScriptResult.value.onSuccess
        : outputScriptResult.value.onFailure,
      value
    );
  };

/**
 * Abstract an object using object-crumble
 * @param config the configuration that should include an output property
 * @returns a concise summary
 */
export const abstract =
  (config: Record<string, string>) =>
  (value: { [index: string]: any }): object => {
    const outputConfig = config['output'];
    const outputScript =
      outputConfig === undefined ? undefined : parseOutputScript(outputConfig);
    if (outputScript && outputScript.status === 'failure') {
      return [{ message: `Crumble error: ${outputScript.error}` }];
    }

    return transformResult(outputScript)(value);
  };

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
        result: transformResult(outputScript)(result),
      });
    }
    return results;
  };
