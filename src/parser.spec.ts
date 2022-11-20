import { parse } from './parser';

describe('Parse s-expression', () => {
  it('should parse basic expression', () => {
    const source = '(+ 3 (+ 1 2)';
    const expected = [[['+', 3, ['+', 1, 2]]], ''];

    const result = parse(source);

    expect(result).toEqual(expected);
  });
});
