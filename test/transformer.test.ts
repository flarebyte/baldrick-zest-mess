import { it } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { parseOutputScript } from '../src/transformer.js';

it('should parse output script', () => {
  const actual = parseOutputScript(
    'if status equals success then abstract else pass'
  );
  const expected = {
    status: 'success',
    value: {
      key: 'status',
      value: 'success',
      onSuccess: ['abstract'],
      onFailure: ['pass'],
    },
  };
  deepStrictEqual(actual, expected);
});
it('should parse output script with multiple flags', () => {
  const actual = parseOutputScript(
    'if status equals success then abstract else count sha256'
  );
  const expected = {
    status: 'success',
    value: {
      key: 'status',
      value: 'success',
      onSuccess: ['abstract'],
      onFailure: ['count', 'sha256'],
    },
  };
  deepStrictEqual(actual, expected);
});
