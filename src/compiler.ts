import { platform } from 'node:os';

import { ArgRegisters, BuiltinFunctions, ExitCode, OpCode, Register } from './compiler.constant';

import type { Literal } from './compiler.type';

const getExitCode = (platform: string): string => {
  return ExitCode[platform] ?? ExitCode.default;
};

const makeIndent = (length: number) => {
  let indentSpace = '';

  for (let i = length; i > 0; i -= 1) {
    indentSpace += '\t';
  }

  return indentSpace;
};

export function emit(indentDepth: number, code: string, print: boolean = false): string {
  const dump = `${makeIndent(indentDepth)}${code}`;

  if (print) {
    console.log(dump);
  }

  return `${dump}\n`;
}

export function compileFnCall(functionLabel: OpCode, args: Literal[], destination?: string): string {
  let dump = '';

  dump += args.reduce((acc, _, index) => {
    return acc + emit(1, `PUSH ${ArgRegisters[index]}`);
  }, '');

  dump += args.reduce((acc, arg, index) => {
    return acc + compileArgument(arg, ArgRegisters[index]);
  }, '');

  dump += emit(1, `CALL ${BuiltinFunctions[functionLabel] || functionLabel}`);

  dump += args.reduceRight((acc, _, index) => {
    return acc + emit(1, `POP ${ArgRegisters[index]}`);
  }, '');

  if (destination) {
    dump += emit(1, `MOV ${destination}, ${Register.RAX}`);
  }

  return dump;
}

export function compileArgument(arg: Literal | Literal[], destination?: string): string {
  if (Array.isArray(arg)) {
    const [opcode, ...rest] = arg;
    return compileFnCall(opcode as OpCode, rest, destination);
  }

  return emit(1, `MOV ${destination}, ${arg}`);
}

export function emitPrefix() {
  let dump = '';
  dump += emit(1, '.global _main');
  dump += emit(1, '.text');

  dump += emit(0, 'plus:');
  dump += emit(1, 'ADD RDI, RSI');
  dump += emit(1, 'MOV RAX, RDI');
  dump += emit(1, 'RET');

  dump += emit(0, '_main:');

  return dump;
}

export function emitPostfix() {
  const exitCode = getExitCode(platform());
  let dump = '';

  dump += emit(1, 'MOV RDI, RAX');
  // Set exit arg
  dump += emit(1, `MOV RAX, ${exitCode}`);
  // Set syscall number
  dump += emit(1, 'SYSCALL');

  return dump;
}

export function compile(ast: Literal[]) {
  const [opcode, ...rest] = ast;

  let dump = '';

  dump += emitPrefix();
  dump += compileFnCall(opcode as OpCode, rest);
  dump += emitPostfix();

  return dump;
}
