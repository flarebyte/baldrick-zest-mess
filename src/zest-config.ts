import { dirname, relative, join, basename } from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import YAML from 'yaml';

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
  testCaseName: string
): string => {
  const specFileBase = relative(baseConfig.specDir, specFile).replace(
    '.zest.yaml',
    ''
  );
  const snapshotFilename = `${specFileBase}--${testCaseName}.yaml`;
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

const suggestedImport = `
async function doImport<A>(path: string) {
    const func: A = await import(path);
    return func;
}
`;

async function doImport(_path: string) {
  throw new Error(
    `You should provide a function for doImport in .baldrick-zest.ts , such as: ${suggestedImport}`
  );
}

/**
 * Recommended configuration for Baldrick Zest Engine framework
 * Adds in `.baldrick-zest.ts` file under root
 */
export const defaultZestConfig = {
  ...baseConfig,
  mochaJsonReport: true,
  flags: '',
  inject: {
    io: {
      parsers: ['YAML', 'JSON', 'Text'],
      readContent,
      writeContent,
      doImport,
    },
    filename: {
      getMochaFilename,
      getSnapshotFilename,
    },
  },
};
