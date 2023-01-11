const { compile, parse } = require('./lib');

const program = '(+ 3 (+ 1 2)';
const [parsed] = parse(program);
const assmbled = compile(parsed[0]);

console.log('---------------------------------------------------');
console.dir(parsed, { colors: true, depth: 5, showHidden: false });
console.log('---------------------------------------------------');
console.log(assmbled);
