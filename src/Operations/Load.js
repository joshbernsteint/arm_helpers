module.exports = [
    {
        label: "LDR",
        desc: "Load 4/8 bytes from memory",
        insertTextType: "basic2",
        docs: "`LDR dest, [addr]`: Moves 4/8 bytes from `addr` to the destination register `dest`. \n\nAmount moved depends on the register type of destination. 4 bytes if it is a W register, and 8 bytes with an X register.",
        params: [
            ["dest", "Destination register."],
            ["addr", "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."]
        ]
    },
    {
        label: "LDRB",
        desc: "Loads 1 byte from memory",
        insertTextType: "basic2",
        docs: "`LDRB dest, [addr]`: Moves 1 byte from `addr` to the destination register `dest`.",
    },
    {
        label: "LDRH",
        desc: "Load 4 bytes from memory",
        insertTextType: "basic2",
        docs: "`LDRH dest, [addr]`: Moves 4 bytes from `addr` to the destination register `dest`.",
    },
    {
        label: "LDRSH",
        desc: "Load 4 bytes from memory (Sign-Extend)",
        insertTextType: "basic2",
        docs: "`LDRH dest, [addr]`: Moves 4 bytes from `addr` to the destination register `dest`. It also sign extends the data to match the destination register.",
    },
    {
        label: "LDRSB",
        desc: "Loads 1 byte from memory (Sign-Extend)",
        insertTextType: "basic2",
        docs: "`LDRB dest, [addr]`: Moves 1 byte from `addr` to the destination register `dest`. It also sign extends the data to match the destination register.",
    },
    {
        label: "SVC",
        desc: "Makes a system call.",
        insertTextType: "basic1",
        docs: "`SVC num`: Invokes a system call, switching the program from user mode to kernel mode. Once the system call has completed, the program returns to user mode.",
        params: [
            ["num", "Argument for system call, if it is not needed, set to 0."],
        ]
    }
];