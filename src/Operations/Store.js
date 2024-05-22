
module.exports = [
    {
        label: "STR",
        desc: "Stores 4/8 bytes",
        insertTextType: "basic2",
        docs: "`STR src, [addr]`: Stores 4/8 bytes to `addr` from the source register `src`. \n\nAmount moved depends on the register type of the source register. 4 bytes if it is a W register, and 8 bytes with an X register.",
        params: [
            ["src", "Source register."],
            ["addr", "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."]
        ]
    },
    {
        label: "STRB",
        desc: "Stores 1 byte",
        insertTextType: "basic2",
        docs: "`STRB src, [addr]`: Stores 1 byte to `addr` from the source register `src`.",
        params: [
            ["src", "Source register."],
            ["addr", "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."]
        ]
    },
    {
        label: "STRH",
        desc: "Stores Half-World(2 bytes)",
        insertTextType: "basic2",
        docs: "`STRH src, [addr]`: Stores 2 bytes to `addr` from the source register `src`. \n\nAmount moved depends on the register type of the source register. 4 bytes if it is a W register, and 8 bytes with an X register.",
        params: [
            ["src", "Source register."],
            ["addr", "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."]
        ]
    },
];