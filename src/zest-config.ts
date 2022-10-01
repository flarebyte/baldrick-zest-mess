import { dirname, relative, join, basename } from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import YAML from 'yaml';
import serializeJs from 'serialize-javascript';

const baseConfig = {
  snapshotDir: 'spec/snapshots',
  specDir: 'spec',
  reportDir: 'report',
};

const getMochaFilename = (specFile: string): string => {
  const specFileBase = basename(specFile).replace('.zest.yaml', '');
  const reportFilename = `report-${specFileBase}.mocha.json`;
  return join(baseConfig.reportDir, reportFilename);
};

const getSnapshotFilename = (
  specFile: string,
  testCaseName: string,
  opts: {
    parser: string;
  }
): string => {
  const specFileBase = relative(baseConfig.specDir, specFile).replace(
    '.zest.yaml',
    ''
  );
  const snapshotFilename = `${specFileBase}--${testCaseName}.${opts.parser.toLowerCase()}`;
  return join(baseConfig.snapshotDir, snapshotFilename);
};

const stringToObject = (
  content: string,
  opts: {
    parser: string;
  }
): object | string => {
  switch (opts.parser) {
    case 'JSON':
      return JSON.parse(content);
    case 'YAML':
      return YAML.parse(content);
    case 'JS':
      return eval('(' + content + ')');
    default:
      return content;
  }
};

const objectToString = (
  content: string | object,
  opts: {
    parser: string;
  }
): string => {
  switch (opts.parser) {
    case 'JSON':
      return JSON.stringify(content, null, 2);
    case 'YAML':
      return YAML.stringify(content);
    case 'JS':
      return serializeJs(content);
    default:
      return `${content}`;
  }
};

const readContent = async (
  path: string,
  opts: {
    parser: string;
  }
): Promise<string | object> => {
  const content = await readFile(path, { encoding: 'utf8' });
  return stringToObject(content, opts);
};

const writeContent = async (
  path: string,
  content: string | object,
  opts: {
    parser: string;
  }
): Promise<void> => {
  const stringContent = objectToString(content, opts);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, stringContent);
};

interface MessExternalInjection {
  parsers?: string[];
  readContent?: (
    path: string,
    opts: { parser: string }
  ) => Promise<string | object>;
  writeContent?: (
    path: string,
    content: string | object,
    opts: { parser: string }
  ) => Promise<void>;
  doImport: <A>(path: string) => Promise<A>;
  getMochaFilename?: (specFile: string) => string;
  getSnapshotFilename?: (
    specFile: string,
    testCaseName: string,
    opts: { parser: string }
  ) => string;
}
interface MessTestingRunOpts {
  snapshotDir?: string;
  specDir?: string;
  reportDir?: string;
  mochaJsonReport?: boolean;
  specFile?: string;
  flags?: string;
  inject: MessExternalInjection;
}
/**
 * Recommended configuration for Baldrick Zest Engine framework
 * Adds in `.baldrick-zest.ts` file under root
 */
export const defaultZestConfig = (opts: MessTestingRunOpts) => ({
  ...baseConfig,
  mochaJsonReport:
    opts.mochaJsonReport === undefined ? true : opts.mochaJsonReport,
  flags: opts.flags === undefined ? '' : opts.flags,
  specFile:
    opts.specFile === undefined ? 'spec/index.zest.yaml' : opts.specFile,
  inject: {
    io: {
      parsers:
        opts.inject.parsers === undefined
          ? ['YAML', 'JSON', 'Text', 'JS']
          : opts.inject.parsers,
      readContent:
        opts.inject.readContent === undefined
          ? readContent
          : opts.inject.readContent,
      writeContent:
        opts.inject.writeContent === undefined
          ? writeContent
          : opts.inject.writeContent,
      doImport: opts.inject.doImport,
    },
    filename: {
      getMochaFilename:
        opts.inject.getMochaFilename === undefined
          ? getMochaFilename
          : opts.inject.getMochaFilename,
      getSnapshotFilename:
        opts.inject.getSnapshotFilename === undefined
          ? getSnapshotFilename
          : opts.inject.getSnapshotFilename,
    },
  },
});
