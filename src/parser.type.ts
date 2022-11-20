export type Program = string;

export type Token = string | number | boolean | Token[];

export type ParsedTokens = [Token, Program];
