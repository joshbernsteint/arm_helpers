module.exports = [
    {
        label: "MOV",
        desc: "Moves a value",
        insertTextType: "basic2",
        docs: "`MOV dest, src`: Copies the value from `src` to register `dest`. `src` can either be an immediate number or another register.",
        params: [
            ["dest","Destination register."],
            ["src", "Source register or an immediate number."],
        ]
    },
    {
        label: "FMOV",
        desc: "Moves a floating point.",
        insertTextType: "basic2",
        docs: "`FMOV dest, src`: Copies the value from `src` to register `dest`.\n\nFloating point numbers are not converted when they are moved if the destination is not a floating-point register.",
        params: [
            ["dest","Destination register."],
            ["src", "Source register."],
        ]
    },
    {
        label: "ADR",
        desc: "Loads an address into a register.",
        insertTextType: "basic2",
        docs: "`ADR dest, expr`: Loads an address found via `expr` into register `dest`.",
        params: [
            ["dest","Destination register."],
            ["expr", "Where to find the address, this can either be an immediate number or a label."],
        ]
    },
    {
        label: "FCVT",
        desc: "Changes floating point percision.",
        insertTextType: "basic2",
        docs: "`FCVT dest, src`: Copies the value from `src` to register `dest`.\n\nFloating point numbers either gain or lose percision depending on the type of register `dest`. For example, `FCVT D0, S0` upcasts percision from 32-bit to 64-bit.",
        params: [
            ["dest","Floating-point Destination register."],
            ["src", "Floating-point Source register."],
        ]
    },
    {
        label: "SCVTF",
        desc: "Converts an integer to a float.",
        insertTextType: "basic2",
        docs: "`SCVTF dest, src`: Copies the value from `src` to register `dest`.\n\nInteger number from `src` is converted to a floating-point number and stored in `dest`.",
        params: [
            ["dest","Floating-point Destination register."],
            ["src", "Integer Source register."],
        ]
    },
    {
        label: "FCVTZS",
        desc: "Converts a float to an integer",
        insertTextType: "basic2",
        docs: "`FCVTZS dest, src`: Copies the value from `src` to register `dest`.\n\nFloating-point numbner from `src` is converted to an integer and stored in `dest` (fractional part is removed).",
        params: [
            ["dest","Integer Destination register."],
            ["src", "Floating-point Source register."],
        ]
    },
];