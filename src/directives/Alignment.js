const {Types} = require('../constants');

const entryList = [
    {
        label: "balign",
        desc: "Aligns memory.",
        insertTextType: "basic1",
        docs: "Align the current location in the file to a specified boundary.",
        params: [
            {
                name: "num_bytes",
                type: Types.INT,
                desc: "This specifies the number of bytes that must be aligned to. This must be a power of 2.",
            },
            {
                name: "fill_value",
                type: Types.INT,
                desc: "The value to fill any inserted padding bytes with. This value is optional. Must be 1 byte value."
            }
        ]
    },
    {
        label: "balignw",
        desc: "Aligns memory.",
        insertTextType: "basic1",
        docs: "Align the current location in the file to a specified boundary.",
        params: [
            {
                name: "num_bytes",
                type: Types.INT,
                desc: "This specifies the number of bytes that must be aligned to. This must be a power of 2.",
            },
            {
                name: "fill_value",
                type: Types.INT,
                desc: "The value to fill any inserted padding bytes with. This value is optional. Must be 2 byte value."
            }
        ]
    },
    {
        label: "balignl",
        desc: "Aligns memory.",
        insertTextType: "basic1",
        docs: "Align the current location in the file to a specified boundary.",
        params: [
            {
                name: "num_bytes",
                type: Types.INT,
                desc: "This specifies the number of bytes that must be aligned to. This must be a power of 2.",
            },
            {
                name: "fill_value",
                type: Types.INT,
                desc: "The value to fill any inserted padding bytes with. This value is optional. Must be 4 byte value."
            }
        ]
    },

    {
        label: "p2align",
        desc: "Aligns memory (Power of 2).",
        insertTextType: "basic1",
        docs: "Align the current location in the file to a specified boundary. This boundary is created by taking an exponent and calculating 2 to the power of that exponent.",
        params: [
            {
                name: "exponent",
                type: Types.INT,
                desc: "This specifies the alignment boundary as an exponent. The actual alignment boundary is *2<sup>exponent</sup>*.",
            },
            {
                name: "fill_value",
                type: Types.INT,
                desc: "The value to fill any inserted padding bytes with. This value is optional. Must be 1 byte value."
            }
        ],
        aliases: ["align"],
    },
    {
        label: "p2alignw",
        desc: "Aligns memory (Power of 2).",
        insertTextType: "basic1",
        docs: "Align the current location in the file to a specified boundary. This boundary is created by taking an exponent and calculating 2 to the power of that exponent.",
        params: [
            {
                name: "exponent",
                type: Types.INT,
                desc: "This specifies the alignment boundary as an exponent. The actual alignment boundary is *2<sup>exponent</sup>*.",
            },
            {
                name: "fill_value",
                type: Types.INT,
                desc: "The value to fill any inserted padding bytes with. This value is optional. Must be 2 byte value."
            }
        ]
    },
    {
        label: "p2alignl",
        desc: "Aligns memory (Power of 2).",
        insertTextType: "basic1",
        docs: "Align the current location in the file to a specified boundary. This boundary is created by taking an exponent and calculating 2 to the power of that exponent.",
        params: [
            {
                name: "exponent",
                type: Types.INT,
                desc: "This specifies the alignment boundary as an exponent. The actual alignment boundary is *2<sup>exponent</sup>*.",
            },
            {
                name: "fill_value",
                type: Types.INT,
                desc: "The value to fill any inserted padding bytes with. This value is optional. Must be 4 byte value."
            }
        ]
    },

    // Space-filling directives
    {
        label: "space",
        desc: "Spaces out memory.",
        insertTextType: "basic1",
        docs: "Emits bytes of data with an assignable value.",
        params: [
            {
                name: "count",
                type: Types.INT,
                desc: "Number of bytes to space out.",
            },
            {
                name: "value",
                type: Types.INT,
                desc: "The value to give to each emitted byte. This argument is optional and when omitted defaults to zero."
            }
        ],
        aliases: ["skip", "zero"]
    },
    {
        label: "fill",
        desc: "Fills a memory space.",
        insertTextType: "basic1",
        docs: "Emits assignable chunks of bytes.",
        params: [
            {
                name: "count",
                type: Types.INT,
                desc: "Number of data chunks to emit.",
            },
            {
                name: "size",
                type: Types.INT,
                desc: "The size (in bytes) of each data chunk. This argument is truncated to be 8 if it's greater than 8. If omitted, this value defaults to 1."
            },
            {
                name: "value",
                type: Types.INT,
                desc: "The value to give to each emitted chunk. This argument is optional and when omitted defaults to zero."
            }
        ],
    },
]

module.exports = entryList.flatMap(e => {
    if(e.aliases){
        return [e, ...e.aliases.map(l => ({
            label: l, 
            docs: e.docs + `\n\nThis is an alias of \`.${e.label}\`.`, 
            desc: "(Alias) " + e.desc,
            insertTextType: "none"
        }))];
    }
    else return e;
});