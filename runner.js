const { parse } = require('./lib');

const program = '(+ 3 (+ 1 2)';
const parsed = parse(program);

console.dir(parsed, { colors: true, depth: 5, showHidden: false });
