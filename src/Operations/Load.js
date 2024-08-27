const { Types } = require('../constants');

const addrString = `${Types.ADDS}( ${Types.REG} | [ ${Types.REG}, ${Types.SIM9} ] )`;


module.exports = [
    {
        label: "LDR",
        desc: "Load 4/8 bytes from memory.",
        insertTextType: "basic2",
        docs: "Moves 4/8 bytes from `addr` to the destination register `Rdest`. \n\nAmount moved depends on the register type of destination. 4 bytes if it is a W register, and 8 bytes with an X register.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }
        ]
    },
    {
        label: "LDRB",
        desc: "Loads 1 byte from memory.",
        insertTextType: "basic2",
        docs: "Moves 1 byte from `addr` to the destination register `Rdest`.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }
        ]
    },
    {
        label: "LDRH",
        desc: "Load 2 bytes from memory.",
        insertTextType: "basic2",
        docs: "Moves 2 bytes from `addr` to the destination register `Rdest`.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }        
        ]
    },
    {
        label: "LDRSH",
        desc: "Load 2 bytes from memory (Sign-Extend).",
        insertTextType: "basic2",
        docs: "Moves 2 bytes from `addr` to the destination register `Rdest`. It also sign extends the data to match the destination register.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }
        ]
    },
    {
        label: "LDRSB",
        desc: "Loads 1 byte from memory (Sign-Extend).",
        insertTextType: "basic2",
        docs: "Moves 1 byte from `addr` to the destination register `Rdest`. It also sign extends the data to match the destination register.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }        
        ]
    },
    {
        label: "SVC",
        desc: "Makes a system call.",
        insertTextType: "basic1",
        docs: "Invokes a system call, switching the program from user mode to kernel mode. Once the system call has completed, the program returns to user mode.",
        params: [
            {
                name: "num",
                type: Types.SIM9,
                desc: "Argument for system call, if it is not needed, set to 0."
            }
        ]
    },
    {
        label: "LDUR",
        desc: "Load 4/8 bytes from memory (Unscaled).",
        insertTextType: "basic2",
        docs: "Moves 4/8 bytes from `addr` to the destination register `Rdest`. \n\nAmount moved depends on the register type of destination. 4 bytes if it is a W register, and 8 bytes with an X register. If the offset is used, the value does not have to a multiple of 4, and can be any valid immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }
        ]
    },
    {
        label: "LDURB",
        desc: "Loads 1 byte from memory (Unscaled).",
        insertTextType: "basic2",
        docs: "Moves 1 byte from `addr` to the destination register `Rdest`. If the offset is used, the value does not have to a multiple of 4, and can be any valid immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register. "
            }
        ]
    },
    {
        label: "LDURH",
        desc: "Load 2 bytes from memory (Unscaled).",
        insertTextType: "basic2",
        docs: "Moves 2 bytes from `addr` to the destination register `Rdest`. If the offset is used, the value does not have to a multiple of 4, and can be any valid immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }        
        ]
    },
    {
        label: "LDURSH",
        desc: "Load 2 bytes from memory (Sign-Extend)(Unscaled).",
        insertTextType: "basic2",
        docs: "Moves 2 bytes from `addr` to the destination register `Rdest`. It also sign extends the data to match the destination register. If the offset is used, the value does not have to a multiple of 4, and can be any valid immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }
        ]
    },
    {
        label: "LDURSB",
        desc: "Loads 1 byte from memory (Sign-Extend)(Unscaled).",
        insertTextType: "basic2",
        docs: "Moves 1 byte from `addr` to the destination register `Rdest`. It also sign extends the data to match the destination register. If the offset is used, the value does not have to a multiple of 4, and can be any valid immediate number.",
        params: [
            {
                name: "Rdest",
                type: Types.REG,
                desc: "Destination register.",
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by an immediate number or another register."
            }        
        ]
    },
];