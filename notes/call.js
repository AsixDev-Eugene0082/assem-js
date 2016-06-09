"use strict";
var operand_1 = require('../x86/operand');
var code_1 = require('../x86/x64/code');
var StaticBuffer = require('../../static-buffer/buffer').StaticBuffer;
var _ = code_1.Code.create();
_.movq(operand_1.rax, 26);
_.ret();
console.log(_.toString());
var sbuf = StaticBuffer.from(_.compile(), 'rwe');
var ret = sbuf.call();
console.log(ret);
_ = code_1.Code.create();
_.add(operand_1.rdi, operand_1.rsi);
_.mov(operand_1.rax, operand_1.rdi);
_.ret();
console.log(_.toString());
sbuf = StaticBuffer.from(_.compile(), 'rwe');
console.log(sbuf.call([-2, 3]));
var txt = new Buffer('This is text');
_ = code_1.Code.create();
