import MnemonicX86 from '../../x86/MnemonicX86';
import MnemonicVariationsX86 from '../../x86/MnemonicVariationsX86';
import * as a from '../atoms';

const mnemonic_add_0 = new MnemonicX86;
mnemonic_add_0.mnemonic                = "maxpd";
mnemonic_add_0.operandSize             = 128;
mnemonic_add_0.opcode                  = 6688607;
mnemonic_add_0.operandTemplates        = [[a.xmm], [a.xmm, a.m]];
mnemonic_add_0.opreg                   = -1;
mnemonic_add_0.operandSizeDefault      = 32;
mnemonic_add_0.lock                    = false;
mnemonic_add_0.regInOp                 = false;
mnemonic_add_0.opcodeDirectionBit      = false;
mnemonic_add_0.useModrm                = true;
mnemonic_add_0.rep                     = false;
mnemonic_add_0.repne                   = false;
mnemonic_add_0.prefixes                = null;
mnemonic_add_0.opEncoding              = "rm";
mnemonic_add_0.rex                     = null;
mnemonic_add_0.vex                     = null;
mnemonic_add_0.evex                    = null;
mnemonic_add_0.mode                    = 63;
mnemonic_add_0.extensions              = [17];

const x86_mnemonic_variations_maxpd = new MnemonicVariationsX86([
    mnemonic_add_0,
]);
x86_mnemonic_variations_maxpd.defaultOperandSize = 32;

export default x86_mnemonic_variations_maxpd;
