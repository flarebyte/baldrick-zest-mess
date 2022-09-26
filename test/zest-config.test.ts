import { defaultZestConfig } from '../src/zest-config.js';

interface ExternalInjection {
  io: {
    parsers: string[];
    readContent: (
      path: string,
      opts: { parser: string }
    ) => Promise<string | object>;
    writeContent: (
      path: string,
      content: string | object,
      opts: { parser: string }
    ) => Promise<void>;
    doImport: <A>(path: string) => Promise<A>;
  };
  filename: {
    getMochaFilename: (specFile: string) => string;
    getSnapshotFilename: (
      specFile: string,
      testCaseName: string,
      opts: { parser: string }
    ) => string;
  };
}
interface TestingRunOpts {
  snapshotDir: string;
  specDir: string;
  reportDir: string;
  mochaJsonReport: boolean;
  specFile: string;
  flags: string;
  inject: ExternalInjection;
}
describe('zest-config', () => {
  it('should provide a defaultZestConfig', () => {
    async function doImport<A>(path: string) {
      const func: A = await import(path);
      return func;
    }
    const actual: TestingRunOpts = defaultZestConfig({
      inject: { doImport },
      specFile: 'spec/build-model/safe-parse-build.zest.yaml',
    });
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
        "specFile": "spec/build-model/safe-parse-build.zest.yaml",
      }
    `);
  });
});
