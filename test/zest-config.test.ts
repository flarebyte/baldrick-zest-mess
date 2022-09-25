import { defaultZestConfig } from '../src/zest-config.js';

describe('zest-config', () => {
  it('should provide a defaultZestConfig', () => {
    const actual = defaultZestConfig();
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
      }
    `);
  });
});
