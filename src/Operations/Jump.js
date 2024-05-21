module.exports = [
    {
        label: "B",
        desc: "Branch",
        insertTextType: "basic3",
        docs: "`B dest op1 op2`: Adds two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    },
    {
        label: "EQ",
        desc: "Branch",
        insertTextType: "basic3",
        docs: "`B.EQ dest op1 op2`: Adds two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
        params: [
            ["dest", "Destination register."],
            ["op1", "Source register 1."],
            ["op2", "Source register 2 or an immediate number."]
        ]
    }
];