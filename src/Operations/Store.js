const {Types} = require('../constants');
const addrString = `${Types.ADDS}( ${Types.REG} | [ ${Types.REG}, ${Types.SIM9} ] )`;

module.exports = [
    {
        label: "STR",
        desc: "Stores 4/8 bytes to memory.",
        insertTextType: "basic2",
        docs: "Stores 4/8 bytes to `addr` from the source register `Rsrc`. \n\nAmount moved depends on the register type of the source register. 4 bytes if it is a W register, and 8 bytes with an X register.",
        params: [
            {
                name: "Rsrc",
                type: Types.REG,
                desc: "Source register."
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by another register and an immediate number."
            }
        ]
    },
    {
        label: "STRB",
        desc: "Stores 1 byte to memory.",
        insertTextType: "basic2",
        docs: "Stores 1 byte to `addr` from the source register `Rsrc`.",
        params: [
            {
                name: "Rsrc",
                type: Types.REG,
                desc: "Source register."
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by another register and an immediate number."
            }
        ]
    },
    {
        label: "STRH",
        desc: "Stores 2 bytes to memory.",
        insertTextType: "basic2",
        docs: "Stores 2 bytes to `addr` from the source register `Rsrc`. \n\nAmount moved depends on the register type of the source register. 4 bytes if it is a W register, and 8 bytes with an X register.",
        params: [
            {
                name: "Rsrc",
                type: Types.REG,
                desc: "Source register."
            },
            {
                name: "addr",
                type: addrString,
                desc: "Address in memory. This can either be from just a register, or a register with an offset denoted by another register and an immediate number."
            }
        ]
    },
];