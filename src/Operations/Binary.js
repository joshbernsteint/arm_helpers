module.exports = [
    // ANDS|ands|AND|and|EOR|eor|ORR|orr|ASR|asr|LSL|lsl|LSR|lsr
    {
        label: "ANDS",
        desc: "Bitwise AND(Modifies CPSR).",
        insertTextType: "basic3",
        docs: "`AND dest, op1, op2`: Bitwise ands two numbers `op1` and `op2` and stores the result into `dest`. It then updates the current program status register (CPSR) accordingly.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },
    {
        label: "AND",
        desc: "Bitwise AND.",
        insertTextType: "basic3",
        docs: "`AND dest, op1, op2`: Bitwise ands two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },
];