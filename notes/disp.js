"use strict";
var o = require('../x86/operand');
var code_1 = require('../x86/x64/code');
// Variable displacement that evaluates during compilation.
var code = code_1.Code.create();
var start = code.getStartLabel();
var db = code.db([1, 2, 3, 4, 5]);
code.lea(o.rax, o.rax.disp(db));
var db = code.db([1, 2, 3]);
console.log(code.toString() + '\n\n');
code.do2ndPass();
console.log(code.toString() + '\n\n');
var bin = code.do3rdPass();
console.log(code.toString() + '\n\n');
console.log(new Buffer(bin));
