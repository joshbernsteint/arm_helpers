const { Types } = require('../constants');

module.exports = [
    {
        label: "B",
        desc: "Unconditional Branch.",
        insertTextType: "basic1",
        docs: "Modifies the program pointer(PC) to the instruction at `label`.",
        params: [
            {
                name: "label",
                type: Types.LBL,
                desc: "Label signifying next instruction after the jump.",
            },
        ],
        //Items that come after a B.
        members: [
            {
                label: "EQ",
                desc: "Branch if Equal.",
                insertTextType: "basic1",
                docs: "Branches to `label` if the Z flag of the CPSR is set to 1.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "NE",
                desc: "Branch if not Equal.",
                insertTextType: "basic1",
                docs: "Branches to `label` if the Z flag of the CPSR is set to 0.<br><br>The recommended usage is through an earlier call of the `CMP` instruction  to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "LT",
                desc: "Branch if Less than (Signed).",
                insertTextType: "basic1",
                docs: "Branches to `label` if the N flag is not equal to the V flag of the CPSR. This is for signed numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "LE",
                desc: "Branch if Less than or Equal (Signed).",
                insertTextType: "basic1",
                docs: "Branches to `label` if the Z flag of the CPSR is not 0 **OR** the N flag does not equal the V flag. This is for signed numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "GT",
                desc: "Branch if Greater Than (Signed).",
                insertTextType: "basic1",
                docs: "Branches to `label` Z flag of the CPSR is 0 **AND** the N and V flags are equal. This is for signed numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "GE",
                desc: "Branch if Greather than or Equal (Signed).",
                insertTextType: "basic1",
                docs: "Branches to `label` if the N flag of the CPSR equals the V flag. This is for signed numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "LO",
                desc: "Branch if Less than (Unsigned).",
                insertTextType: "basic1",
                docs: "Branches to `label` if the C flag of the CPSR equals 0. This is for unsigned numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "LS",
                desc: "Branch if Less than or Equal (Unsigned).",
                insertTextType: "basic1",
                docs: "Branches to `label` if the Z flag of the CPSR is not 0 **OR** the C flag does not equal 1. This is for unsigned numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "HI",
                desc: "Branch if Greater Than (Unsigned).",
                insertTextType: "basic1",
                docs: "Branches to `label` Z flag of the CPSR is 0 **AND** the C flag equals 1. This is for unsigned numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
            {
                label: "HS",
                desc: "Branch if Greather than or Equal (Unsigned).",
                insertTextType: "basic1",
                docs: "Branches to `label` if the C flag equals 1. This is for unsigned numbers.<br><br>The recommended usage is through an earlier call of the `CMP` instruction to set the CPSR.",
                params: [
                    {
                        name: "label",
                        type: Types.LBL,
                        desc: "Label signifying next instruction after the jump.",
                    }
                ]
            },
        ]
    },
    {
        label: "BR",
        desc: "Branch from Register.",
        insertTextType: "basic1",
        docs: "Modifies the program pointer(PC) to the value stored in register `Ra`.",
        params: [
            {
                name: "Ra",
                type: Types.REG,
                desc: "Register signifying the new value of the program counter.",
            }
        ],
    },
    {
        label: "BL",
        desc: "Branch and Link.",
        insertTextType: "basic1",
        docs: "Stores program counter (PC) + 4 into the link register (X30) and then modifies the PC to the instruction at `label`.",
        params: [
            {
                name: "label",
                type: Types.LBL,
                desc: "Label signifying next instruction after the jump.",
            }
        ],
    },
    {
        label: "CBZ",
        desc: "Branch if Zero.",
        insertTextType: "basic2",
        docs: "Checks to see if the register denoted by `Ra` is zero. If it is, it modifies the program counter (PC) to point to the instruction at label `label`.",
        params: [
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register to check if zero.",
            },
            {
                name: "label",
                type: Types.LBL,
                desc: "Label signifying next instruction after the jump.",
            }
        ],
    },
    {
        label: "CBNZ",
        desc: "Branch if not Zero.",
        insertTextType: "basic2",
        docs: "Checks to see if the register denoted by `Ra` is zero. If it isn't, it modifies the program counter (PC) to point to the instruction at label `label`.",
        params: [
            {
                name: "Ra",
                type: Types.REG,
                desc: "Source register to check if not zero.",
            },
            {
                name: "label",
                type: Types.LBL,
                desc: "Label signifying next instruction after the jump.",
            }
        ],
    },
    {
        label: "CMP",
        desc: "Compare two registers and modifies CPSR.",
        insertTextType: "basic2",
        docs: "Compares the two registers and modifies the current program status register (CPSR) accordingly.<br><br>After this call, you can use the conditional branching instructions `B.[check] [label]` to conditionally branch to a label. Specifically, it subtracts `Rb` from `Ra`, but instead of storing the value, it modifies the CPSR flags.",
        params: [
            {
                name: "Ra",
                type: Types.REG,
                desc: "First register for comparison.",
            },
            {
                name: "Rb",
                type: Types.REG,
                desc: "Second register for comparison.",
            },
        ],
    },
    {
        label: "RET",
        desc: "Changes PC to value in X30(LR).",
        insertTextType: "none",
        docs: "Modifies the program counter (PC) to the value in the link register (X30).<br><br>Warning, if `BL` was not called beforehand, this can have unpredictable behavior.",
    },
    {
        label: "NOP",
        desc: "No Operation.",
        insertTextType: "newline",
        docs: "No Operation does nothing, other than advance the value of the program counter by 4. This instruction can be used for instruction alignment purposes."
    }
];