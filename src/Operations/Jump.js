module.exports = [
    {
        label: "B",
        desc: "Unconditional Branch.",
        insertTextType: "basic1",
        docs: "`B label`: Modifies the program pointer(PC) to the instruction at `label`.",
        params: [
            ["label", "Label signifying next instruction after the jump."],
        ],
        //Items that come after a B.
        members: [
            // NE|ne|LT|lt|LE|le|GT|gt|GE|ge|LO|lo|LS|ls|HI|hi|HS|hs
            {
                label: "EQ",
                desc: "Branch if Equal.",
                insertTextType: "basic1",
                docs: "`B.EQ dest op1 op2`: Adds two numbers `op1` and `op2` and stores the result into `dest`.\n\nOperand 1 must be a register. Operand 2 can either be a register or an immediate number.",
                params: [
                    ["dest", "Destination register."],
                    ["op1", "Source register 1."],
                    ["op2", "Source register 2 or an immediate number."]
                ]
            }
        ]
    },
    {
        label: "BR",
        desc: "Branch from Register.",
        insertTextType: "basic1",
        docs: "`BR src`: Modifies the program pointer(PC) to the value stored in register `src`.",
        params: [
            ["src", "Register signifying the new value of the program counter."],
        ],
    },
    {
        label: "BL",
        desc: "Branch and Link.",
        insertTextType: "basic1",
        docs: "`BL label`: Stores program counter (PC) + 4 into the link register (X30) and then modifies the PC to the instruction at `label`.",
        params: [
            ["label", "Label signifying next instruction after the jump."],
        ],
    },
    {
        label: "CBZ",
        desc: "Branch if Zero.",
        insertTextType: "basic2",
        docs: "`CBZ src label`: Checks to see if the register denoted by `source` is zero. If it is, it modifies the program counter (PC) to point to the instruction at label `label`.",
        params: [
            ["src", "Source register to check."],
            ["label", "Label signifying next instruction after the jump."],
        ],
    },
    {
        label: "CBNZ",
        desc: "Branch if not Zero.",
        insertTextType: "basic2",
        docs: "`CBNZ src label`: Checks to see if the register denoted by `source` is zero. If it isn't, it modifies the program counter (PC) to point to the instruction at label `label`.",
        params: [
            ["src", "Source register to check."],
            ["label", "Label signifying next instruction after the jump."],
        ],
    },
    {
        label: "CMP",
        desc: "Compare two registers and modifies CPSR.",
        insertTextType: "basic2",
        docs: "`CMP op1, op2`: Compares the two registers and modifies the current program status register (CPSR) accordingly.\n\nAfter this call, you can use the conditional branching instructions `B.[check] [label]` to conditionally branch to a label.",
        params: [
            ["op1", "First register for comparison."],
            ["op2", "Second register for comparison."],
        ],
    },
    {
        label: "RET",
        desc: "Changes PC to value in X30(LR).",
        insertTextType: "none",
        docs: "`RET`: Modifies the program counter (PC) to the value in the link register (X30).\n\nWarning, if `BL` was not called beforehand, this can have unpredictable behavior.",
    }
    
];