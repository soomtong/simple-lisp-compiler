#!/usr/bin/env node
const { writeFileSync, readFileSync } = require('fs');
const { execSync } = require('child_process');

const { parse, compile } = require('./lib');

const CC = 'gcc';
const SOURCE = 'program.S';

function main(args) {
  let script = args[2];

  if (!script) {
    console.log('no source');

    return;
  }

  if (script === '-f') {
    if (!args[3]) {
      console.log('no sourse by file');

      return;
    }

    script = readFileSync(args[3]).toString();
  }

  const sExpression = parse(script);
  console.warn('s-expression:');
  console.dir(sExpression, { depth: 8 });
  const program = compile(sExpression[0][0]);
  console.log('program:');
  console.log(program);

  writeFileSync(SOURCE, program);

  try {
    execSync(`${CC} -mstackrealign -masm=intel -o program ${SOURCE}`);
  } catch (error) {
    console.error(error);

    return;
  }

  console.log('done; \nrun ./program and echo $? for output');
}

main(process.argv);
