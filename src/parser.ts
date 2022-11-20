import type { Program, Token, ParsedTokens } from './parser.type';

export const parse = (program: Program): ParsedTokens => {
  const tokens: Token[] = [];
  let currentToken: Token = '';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Array.from(program).forEach((char: string, index: number) => {
    switch (char) {
      case '(': {
        const [parsedToken, rest] = parse(program.substring(index + 1));
        tokens.push(parsedToken);
        // reset rest and index?
        break;
      }
      case ')':
        tokens.push(Number.isNaN(Number(currentToken)) ? currentToken : Number(currentToken));
        return [tokens, program.substring(index + 1)];
      case ' ':
        tokens.push(Number.isNaN(Number(currentToken)) ? currentToken : Number(currentToken));
        currentToken = '';
        break;
      default:
        currentToken += char;
        break;
    }
  });

  return [tokens, ''];
};
