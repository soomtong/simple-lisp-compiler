import { parse } from './parser';

describe('Parse s-expression', () => {
  it('should parse basic expression', () => {
    const source = '(+ 3 (+ 1 2)';
    const expected = [[['+', 3, ['+', 1, 2]]], ''];

    const result = parse(source);

    expect(result).toEqual(expected);
  });

  it('should parse basic expression 2', () => {
    const source = '(+ 3 (+ 1 (+ 2 4))';
    const expected = [[['+', 3, ['+', 1, ['+', 2, 4]]]], ''];

    const result = parse(source);

    expect(result).toEqual(expected);
  });

  it('should parse def main function expression', () => {
    const source = '(def main () (+ 1 2))';
    const expected = [[['def', 'main', [], ['+', 1, 2]]], ''];

    const result = parse(source);

    expect(result).toEqual(expected);
  });
});
