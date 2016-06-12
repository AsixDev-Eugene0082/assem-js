import {extend} from '../util';
import {S, rel, rel8, rel16, rel32, imm, imm8, imm16, imm32, imm64, immu, immu8, immu16, immu32, immu64} from '../table';
import * as t from '../table';
import {Register, Register8, Register16, Register32, Register64, RegisterSegment,
    RegisterMmx, RegisterXmm, RegisterYmm, RegisterZmm,
    Memory, Memory8, Memory16, Memory32, Memory64} from './operand';


export enum MODE {
    X32     = 0b01,
    X64     = 0b01,
    BOTH    = MODE.X32 | MODE.X64,
}


export enum CPUID {
    NONE    = 0b00000,
    MMX     = 0b00001,
    SSE2    = 0b00010,
    AVX     = 0b00100,
    AVX2    = 0b01000,
}


export var M        = MODE;

// Operands
export var r        = Register;
export var r8       = Register8;
export var r16      = Register16;
export var r32      = Register32;
export var r64      = Register64;
export var sreg     = RegisterSegment;
export var mmx      = RegisterMmx;
export var xmm      = RegisterXmm;
export var ymm      = RegisterYmm;
export var zmm      = RegisterZmm;
export var m        = Memory;
export var m8       = Memory8;
export var m16      = Memory16;
export var m32      = Memory32;
export var m64      = Memory64;
export var rm8      = [Register8,  Memory];
export var rm16     = [Register16, Memory];
export var rm32     = [Register32, Memory];
export var rm64     = [Register64, Memory];


export type TOperandTemplate = t.TOperandTemplate |
    typeof Register8 | typeof Register16 | typeof Register32 | typeof Register64 |
    typeof RegisterMmx | typeof RegisterXmm | typeof RegisterYmm | typeof RegisterZmm |
    typeof Memory8 | typeof Memory16 | typeof Memory32 | typeof Memory64;


// "VEX.DDS.LIG.66.0F38.W1" => {vvvv: 'DDS', L: 0, pp: 1, mmmmm: 2, W: 1}
export interface IVexDefinition {
    L: number;
    vvvv: string;
    pp: number;
    mmmmm: number;
    W: number;
    WIG: boolean;
}


export interface Definition extends t.Definition {
    ds?: number;                                    // Default size, usually 32 bits on x64, some instructions default to 64 bits.
    lock?: boolean;                                 // Whether LOCK prefix allowed.
    ops?: (TOperandTemplate|TOperandTemplate[])[];  // Operands this instruction accepts.
    or?: number;                                    // Opreg - 3bit opcode part in modrm.reg field, -1 if none.
    r?: boolean;                                    // 3bit register encoded in lowest opcode bits.
    dbit?: boolean;                                 // Whether it is allowed to change `d` bit in opcode. `en` encoding field is ignored then.
    rex?: boolean;                                  // Whether REX prefix is mandatory for this instruction.
    mr?: boolean;                                   // Whether to include Mod-REG-R/M byte if deemed necessary.
    rep?: boolean;                                  // REP and REPE/REPZ prefix allowed.
    repne?: boolean;                                // REPNE/REPNZ prefix allowed.
    pfx?: number[];                                 // List of mandatory prefixes.
    vex?: string|IVexDefinition;                    // VEX prefix definitions string as it appears in manual, e.g. "256.66.0F3A.W0"
    en?: string;                                    // Operand encoding, e.g. "rvmr" -> (1) modmr.reg; (2) VEX.vvv; (3) modrm.rm; (4) imm8
    mod?: MODE;                                     // CPU mode
    cpu?: CPUID;                                    // CPUID feature required.
}
export type GroupDefinition = Definition[];
export type TableDefinition = {[s: string]: GroupDefinition};


// x86 global defaults
export var defaults: Definition = extend<Definition>({}, t.defaults,
    {ds: S.D, lock: false, or: -1, r: false, dbit: false, rex: false, mr: true, rep: false, repne: false,
        pfx: null, vex: null, en: 'rm', mod: MODE.BOTH, cpu: CPUID.NONE});


// Instruction are divided in groups, each group consists of list
// of possible instructions. The first object is NOT an instruction
// but defaults for the group.
export var table: TableDefinition = {

    cpuid: [{o: 0x0FA2}],
    // INT Software interrupt
    int: [{},
        // CC INT 3 NP Valid Valid Interrupt 3—trap to debugger.
        {o: 0xCC, ops: [3]},
        // CD ib INT imm8 I Valid Valid Interrupt vector specified by immediate byte.
        {o: 0xCD, ops: [immu8]},
    ],
};
