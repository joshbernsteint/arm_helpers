const {Types} = require('../constants');
module.exports = [
    // ANDS|ands|AND|and|EOR|eor|ORR|orr|ASR|asr|LSL|lsl|LSR|lsr
    {
        label: "ANDS",
        desc: "Bitwise AND(Modifies CPSR).",
        insertTextType: "basic3",
        docs: "Bitwise ands two numbers `Ra` and `Rb` and stores the result into `Rdest`. It then updates the current program status register (CPSR) accordingly.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Rdestination register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register 1.",
            },
            {
                name: "Rb",
                type: `${Types.REG} | ${Types.SIM9}`,
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
                desc: "Rdestination register.",
            },
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register 1.",
            },
            {
                name: "Rb",
                type: `${Types.REG} | ${Types.SIM9}`,
                desc: "Source register 2 or an immediate number.",
            },
        ]
    },
];