const {Types} = require('../constants');

module.exports = [
    {
        label: "MOV",
        desc: "Moves a value",
        insertTextType: "basic2",
        docs: "Copies the value from `src` to register `Rdest`. `Rsrc` can either be an immediate number or another register.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register."
            },
            {
                name: "src",
                type: `${Types.REG} | ${Types.SIM9}`,
                desc: "Source register or an immediate number."
            }
        ]
    },
    {
        label: "FMOV",
        desc: "Moves a floating point.",
        insertTextType: "basic2",
        docs: "Copies the value from `Dsrc` to register `Rdest`.\n\nFloating point numbers are not converted when they are moved if the destination is not a floating-point register.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register."
            },
            {
                name: "Dsrc",
                type: Types.FREG,
                desc: "Source register."
            }
        ]
    },
    {
        label: "ADR",
        desc: "Loads an address into a register.",
        insertTextType: "basic2",
        docs: "Loads an address found via `expr` into register `Rdest`.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register."
            },
            {
                name: "addr",
                type: `${Types.ADDS}( ${Types.LBL} | ${Types.SIM9} )`,
                desc: "Where to find the address, this can either be an immediate number or a labe;."
            }
        ]
    },
    {
        label: "FCVT",
        desc: "Changes floating point percision.",
        insertTextType: "basic2",
        docs: "Copies the value from `Dsrc` to register `Ddest`.\n\nFloating point numbers either gain or lose percision depending on the type of register `Ddest`. For example, `FCVT D0, S0` upcasts percision from 32-bit to 64-bit.",
        params: [
            {
                name: "Ddest",
                type: Types.FREG,
                desc: "Floating-point Destination register.",
            },
            {
                name: "Dsrc",
                type: Types.FREG,
                desc: "Floating-point source register.",
            },
        ]
    },
    {
        label: "SCVTF",
        desc: "Converts an integer to a float.",
        insertTextType: "basic2",
        docs: "Copies the value from `Rsrc` to register `Ddest`.\n\nInteger number from `Rsrc` is converted to a floating-point number and stored in `Ddest`.",
        params: [
            {
                name: "Ddest",
                type: Types.FREG,
                desc: "Floating-point destination register.",
            },
            {
                name: "Rsrc",
                type: Types.REG,
                desc: "Integer source register.",
            },
        ]
    },
    {
        label: "FCVTZS",
        desc: "Converts a float to an integer",
        insertTextType: "basic2",
        docs: "Copies the value from `Dsrc` to register `Rdest`.\n\nFloating-point numbner from `Dsrc` is converted to an integer and stored in `Rdest` (fractional part is removed).",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Integer destination register.",
            },
            {
                name: "Dsrc",
                type: Types.FREG,
                desc: "Floating-point source register.",
            },
        ]
    },
];