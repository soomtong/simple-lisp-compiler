export enum OpCode {
  '+' = '+',
}

export enum Register {
  RDI = 'RDI',
  RSI = 'RSI',
  RDX = 'RDX',
  RAX = 'RAX',
}

export const ArgRegisters: Register[] = [Register.RDI, Register.RSI, Register.RDX];

export const BuiltinFunctions: Record<OpCode, string> = {
  '+': 'plus',
};

export const ExitCode: Record<string, string> = {
  darwin: '0x2000001',
  default: '60',
};
