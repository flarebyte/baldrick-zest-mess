import { defaultZestConfig } from '../src/zest-config.js';

describe('zest-config', () => {
  it('should provide a defaultZestConfig', () => {
    async function doImport<A>(path: string) {
      const func: A = await import(path);
      return func;
    }
    const actual = defaultZestConfig({ inject: { doImport } });
    expect(actual).toMatchInlineSnapshot(`
      Object {
        "flags": "",
        "inject": Object {
          "filename": Object {
            "getMochaFilename": [Function],
            "getSnapshotFilename": [Function],
          },
          "io": Object {
            "doImport": [Function],
            "parsers": Array [
              "YAML",
              "JSON",
              "Text",
            ],
            "readContent": [Function],
            "writeContent": [Function],
          },
        },
        "mochaJsonReport": true,
        "reportDir": "report",
        "snapshotDir": "spec/snapshots",
        "specDir": "spec",
        "specFile": undefined,
      }
    `);
  });
});
