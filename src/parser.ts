import type { Program, Token, ParsedTokens } from './parser.type';

const getToken = (source: Program): Token => (Number.isNaN(Number(source)) ? source : Number(source));

export const parse = (program: Program): ParsedTokens => {
  const tokens: Token[] = [];
  let currentToken: Token = '';

  for (let index = 0; index < program.length; index++) {
    const char = program.charAt(index);

    switch (char) {
      case '(': {
        const [parsedToken, restProgram] = parse(program.substring(index + 1));
        tokens.push(parsedToken);
        // reset program with skipped by recursive and index to 0
        program = restProgram;
        index = 0;
        break;
      }
      case ')':
        tokens.push(getToken(currentToken));
        return [tokens, program.substring(index + 1)];
      case ' ':
        tokens.push(getToken(currentToken));
        currentToken = '';
        break;
      default:
        currentToken += char;
        break;
    }
  }

  return [tokens, ''];
};
