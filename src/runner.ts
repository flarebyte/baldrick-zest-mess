import { fdir } from 'fdir';

const isStringArray = (value: unknown): value is string[] =>
  typeof value === 'object' && value !== null && Array.isArray(value);

/**
 * Generates a list of config
 * @param specDir the folder containing the spec files
 * @param toConfigWrapper  function that takes a specFile and return the config
 * @returns a list of configurations for the runner
 */
export async function toConfigList<A>(
  specDir: string,
  toConfigWrapper: (specFile: string) => A
): Promise<A[]> {
  const crawler = new fdir()
    .withBasePath()
    .filter((path) => path.endsWith('.zest.yaml'));
  const files = await crawler.crawl(specDir).withPromise();
  if (isStringArray(files)) {
    return files.map(toConfigWrapper);
  } else {
    return [];
  }
}
