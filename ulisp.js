#!/usr/bin/env node
const { writeFileSync } = require('fs');
const { execSync } = require('child_process');

const { parse, compile } = require('./lib');

const CC = 'gcc';
const SOURCE = 'program.S';

function main(args) {
  const script = args[2];

  if (!script) {
    console.log('no source');

    return;
  }

  const program = compile(parse(script)[0][0]);

  writeFileSync(SOURCE, program);

  execSync(`${CC} -mstackrealign -masm=intel -o program ${SOURCE}`);

  console.log('done; \nrun ./program and echo $? for output');
}

main(process.argv);
