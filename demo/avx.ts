import {X64} from "../src/index";
import {rax, st, zmm} from "../src/plugins/x86/operand/generator";

const _ = X64();

_._('vaddps', [zmm(20), zmm(20), zmm(20)]);

console.log(_.toString());
console.log(_.compile());
console.log(_.toString());
