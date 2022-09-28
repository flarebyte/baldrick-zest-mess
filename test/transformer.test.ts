import { parseOutputScript } from '../src/transformer';

describe('transformer', () => {
  it('should parse output script', () => {
    const actual = parseOutputScript(
      'if status equals success then abstract else pass'
    );
    expect(actual).toMatchInlineSnapshot();
  });
});
