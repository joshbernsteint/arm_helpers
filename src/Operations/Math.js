const {Types} = require('../constants');

const registerOrImmediate = `${Types.REG} | ${Types.SIM9}`;

module.exports = [
    {
        label: "ADD",
        desc: "Adds two numbers.",
        insertTextType: "basic3",
        docs: "Adds two numbers `Ra` and `Rb` and stores the result into `Rdest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
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
        label: "ADDS",
        desc: "Adds two numbers and modifies CPSR.",
        insertTextType: "basic3",
        docs: "Adds two numbers `Ra` and `Rb` and stores the result into `Rdest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.\n\nThis instruction also modifies the current program status register (CPSR) depending on the result.",
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
        label: "SUB",
        desc: "Subtracts two numbers.",
        insertTextType: "basic3",
        docs: "Subtracts two numbers `Ra` and `Rb` and stores the result into `Rdest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
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
        label: "SUBS",
        desc: "Subtracts two numbers and modifies CPSR.",
        insertTextType: "basic3",
        docs: "Subtracts two numbers `Ra` and `Rb` and stores the result into `Rdest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.\n\nThis instruction also modifies the current program status register (CPSR) depending on the result.",
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
        label: "MUL",
        desc: "Multiplies two numbers.",
        insertTextType: "basic3",
        docs: "Subtracts two numbers `Ra` and `Rb` and stores the result into `Rdest`.",
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
        label: "SDIV",
        desc: "Divides two numbers (Signed).",
        insertTextType: "basic3",
        docs: "Divides two signed numbers stored in registers `Ra` and `Rb` and stores the result into register `Rdest`.",
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
        label: "UDIV",
        desc: "Divides two numbers (Unsigned).",
        insertTextType: "basic3",
        docs: "Divides two unisgned numbers stored in registers `Ra` and `Rb` and stores the result into register `Rdest`.",
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
];