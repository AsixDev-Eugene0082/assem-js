# Assembler.js

Assembler implemented in JavaScript:

  - Pluggable design, X64 architecture implemented
  - See [supported mnemonics](./mnemonics/x64/)
  - Standalone, use it in browser or Node.js

## Installation

```shell
npm i ass-js
```

## Getting started

Store `0xBABE` in `RAX` register

```js
import {X64} from 'ass-js';

const asm = X64();
asm._('mov', ['rax', 0xBABE]);
```

Compile to machine code

```js
console.log(code.compile()); // <Buffer 48 c7 c0 be ba 00 00>
```

Show text representation

```js
console.log(String(code));
// 000 main:
// 001   movq rax, 0x0000BABE ; 000000|000000 0x48, 0xC7, 0xC0, 0xBE, 0xBA, 0x00, 0x00 7 bytes
```

Use templates

```js
const template = _ => {
    _('mov', ['rdx', 0xC001]);
    _('mov', ['rax', 0xBABE]);
};

asm.code(template);
```

## Docs

  - [Plugins](./docs/plugins.md)
    - X64
      - [Getting started](./docs/x64/getting-started.md)
      - [Operands](./docs/x64/operands.md)
      - [Expressions](./docs/x64/expressions.md)
    - Data
      - `d*` - [add binary data](./docs/data/db.md)
      - `res*` - [add uninitialized data](./docs/data/resb.md)
      - `incbin` - [include binary file](./docs/data/incbin.md)

## Examples

  - [Hello world](./docs/examples/hello_world.md)
  - [`cpuid`](./docs/examples/cpuid.md)

## License

[Unlicense](./LICENSE) - public domain.
