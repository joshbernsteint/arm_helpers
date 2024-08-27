const {Types} = require('../constants');
const registerOrImmediate = `${Types.REG} | ${Types.SIM9}`;

module.exports = [
    {
        label: "ANDS",
        desc: "Bitwise AND(Modifies CPSR).",
        insertTextType: "basic3",
        docs: "Bitwise ands two numbers `Ra` and `Rb` and stores the result into `Rdest`. It then updates the current program status register (CPSR) accordingly.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register 1.",
            },
            {
                name: "Rb",
                type: registerOrImmediate,
                desc: "Source register 2 or an immediate number.",
            },
        ],
    },
    {
        label: "AND",
        desc: "Bitwise AND.",
        insertTextType: "basic3",
        docs: "Bitwise ands two numbers `Ra` and `Rb` and stores the result into `Rdest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register 1.",
            },
            {
                name: "Rb",
                type: registerOrImmediate,
                desc: "Source register 2 or an immediate number.",
            },
        ]
    },
    {
        label: "EOR",
        desc: "Bitwise Exclusive OR (XOR).",
        insertTextType: "basic3",
        docs: "Bitwise Exclusive ORs two numbers `Ra` and `Rb` and stores the result into `Rdest`. Exclusive OR between bits is 1 if exactly 1 of the inputs is 1, but 0 if none or both are 1.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register 1.",
            },
            {
                name: "Rb",
                type: registerOrImmediate,
                desc: "Source register 2 or an immediate number.",
            },
        ]
    },
    {
        label: "ORR",
        desc: "Bitwise OR.",
        insertTextType: "basic3",
        docs: "Bitwise ORs two numbers `Ra` and `Rb` and stores the result into `Rdest`. OR between bits is 1 if one or more of the inputs is 1. Otherwise, it is 0.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register 1.",
            },
            {
                name: "Rb",
                type: registerOrImmediate,
                desc: "Source register 2 or an immediate number.",
            },
        ]
    },
    {
        label: "ASR",
        desc: "Arithmetic Shift Right.",
        insertTextType: "basic3",
        docs: "Shifts the value of register `Ra` arithmetically right by the value of `src`, which can be either a register or immediate value, and stores it into `Rdest`. This type of shifting pads the MSB of `Ra` while shifting.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination Register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register containing value to shift.",
            },
            {
                name: "src",
                type: registerOrImmediate,
                desc: "Value indicating the amount to shift. This value can either be from a register or an immediate number. The range of valid values depends on the register being used. 0-31 for W registers and 0-63 for X registers.",
            }
        ]
    },
    {
        label: "LSR",
        desc: "Logical Shift Right.",
        insertTextType: "basic3",
        docs: "Shifts the value of register `Ra` logically right by the value of `src`, which can be either a register or immediate value, and stores it into `Rdest`. This type of shifting pads 0 to the beginning of the destination register.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination Register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register containing value to shift.",
            },
            {
                name: "src",
                type: registerOrImmediate,
                desc: "Value indicating the amount to shift. This value can either be from a register or an immediate number. The range of valid values depends on the register being used. 0-31 for W registers and 0-63 for X registers.",
            }
        ]
    },
    {
        label: "LSL",
        desc: "Logical Shift Left.",
        insertTextType: "basic3",
        docs: "Shifts the value of register `Ra` logically left by the value of `src`, which can be either a register or immediate value, and stores it into `Rdest`. This type of shifting places 0 at the end of the destination register.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination Register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register containing value to shift.",
            },
            {
                name: "src",
                type: registerOrImmediate,
                desc: "Value indicating the amount to shift. This value can either be from a register or an immediate number. The range of valid values depends on the register being used. 0-31 for W registers and 0-63 for X registers.",
            }
        ]
    },
];