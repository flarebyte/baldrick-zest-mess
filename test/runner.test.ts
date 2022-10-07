import { it } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { toConfigList } from '../src/runner.js';

const toConfigFunction = (specFile: string) => ({ specFile });

it('should search for spec files', async () => {
  const actual = await toConfigList('spec', toConfigFunction);
  deepStrictEqual(actual, [
    {
      specFile: 'spec/dummy.zest.yaml',
    },
    {
      specFile: 'spec/level2/dummy2.zest.yaml',
    },
  ]);
});
