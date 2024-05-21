module.exports = [
    {
        label: "ADD",
        desc: "Adds two numbers.",
        insertTextType: "basic3",
        docs: "`ADD dest op1 op2`: Adds two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },
    {
        label: "ADDS",
        desc: "Adds two numbers and modifies CPSR.",
        insertTextType: "basic3",
        docs: "`ADDS dest op1 op2`: Adds two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.\n\nThis instruction also modifies the current program status register (CPSR) depending on the result.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },
    {
        label: "SUB",
        desc: "Subtracts two numbers.",
        insertTextType: "basic3",
        docs: "`SUB dest op1 op2`: Subtracts two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },
    {
        label: "SUBS",
        desc: "Subtracts two numbers and modifies CPSR.",
        insertTextType: "basic3",
        docs: "`SUBS dest op1 op2`: Subtracts two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.\n\nThis instruction also modifies the current program status register (CPSR) depending on the result.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2."]
        ]
    },
    {
        label: "MUL",
        desc: "Multiplies two numbers.",
        insertTextType: "basic3",
        docs: "`MUL dest op1 op2`: Subtracts two numbers `op1` and `op2` and stores the result into `dest`.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2."]
        ]
    },
    {
        label: "SDIV",
        desc: "Divides two numbers (Signed)",
        insertTextType: "basic3",
        docs: "`SDIV dest op1 op2`: Divides two signed numbers stored in registers `op1` and `op2` and stores the result into register `dest`.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },
    {
        label: "UDIV",
        desc: "Divides two numbers (Unsigned)",
        insertTextType: "basic3",
        docs: "`UDIV dest op1 op2`: Divides two unisgned numbers stored in registers `op1` and `op2` and stores the result into register `dest`.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },

];