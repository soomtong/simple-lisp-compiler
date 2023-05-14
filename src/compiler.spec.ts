import { compileFnCall, compileArgument, compile, emit } from './compiler';
import { OpCode } from './compiler.constant';

import type { Literal } from './compiler.type';

describe('Emit tab spaces', () => {
  it('should return tabbed spaces with text', () => {
    const expected1 = 'hello\n';
    const result1 = emit(0, 'hello');

    expect(result1).toEqual(expected1);

    const expected2 = '\thello\n';
    const result2 = emit(1, 'hello');

    expect(result2).toEqual(expected2);

    const expected3 = '\t\thello\n';
    const result3 = emit(2, 'hello');

    expect(result3).toEqual(expected3);
  });
});

describe('Emit compiled code for arguments with destication', () => {
  it('should return single move statement', () => {
    const expected = '\tMOV RDI, 1\n';
    const result = compileArgument(1, 'RDI');

    expect(result).toEqual(expected);
  });

  it('should call compileCall function when got array of arguments', () => {
    const expected = `\tPUSH RDI
\tPUSH RSI
\tMOV RDI, 1
\tMOV RSI, 2
\tCALL plus
\tPOP RSI
\tPOP RDI
\tMOV RSI, RAX
`;

    const result = compileArgument(['+', 1, 2], 'RSI');

    expect(result).toEqual(expected);
  });
});

describe('Emit compiled code for function call with opcode and arguments', () => {
  it('should return basic assembly code', () => {
    const expected = `\tPUSH RDI
\tPUSH RSI
\tMOV RDI, 1
\tMOV RSI, 2
\tCALL plus
\tPOP RSI
\tPOP RDI
`;
    const result = compileFnCall('+' as OpCode, [1, 2]);

    expect(result).toEqual(expected);
  });
});

describe('Emit basic AST into assembly code', () => {
  it('should emit a assembly code!', () => {
    const expected = `\t.global _main
\t.text
plus:
\tADD RDI, RSI
\tMOV RAX, RDI
\tRET
_main:
\tPUSH RDI
\tPUSH RSI
\tMOV RDI, 1
\tPUSH RDI
\tPUSH RSI
\tMOV RDI, 2
\tMOV RSI, 3
\tCALL plus
\tPOP RSI
\tPOP RDI
\tMOV RSI, RAX
\tCALL plus
\tPOP RSI
\tPOP RDI
\tMOV RDI, RAX
\tMOV RAX, 0x2000001
\tSYSCALL
`;
    const result = compile(['+', 1, ['+', 2, 3]] as Literal[]);

    expect(result).toEqual(expected);
  });
});
