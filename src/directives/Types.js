// int|single|float|double
// ascii|asciz|string
const entryList = [
    {
        label: "byte",
        insertTextType: "none",
        desc: "Allocates 1 byte.",
        docs: "Allocates 1 byte of memory in the Read/Write section of memory.",
        aliases: ["1byte", "dc.b"],
    }, 
    {
        label: "hword",
        insertTextType: "none",
        desc: "Allocates 2 bytes.",
        docs: "Allocates 2 bytes of memory in the Read/Write section of memory.",
        aliases: ["2byte", "dc", "dc.w", "short", "value"],
    }, 
    {
        label: "word",
        insertTextType: "none",
        desc: "Allocates 4 bytes.",
        docs: "Allocates 4 bytes of memory in the Read/Write section of memory.",
        aliases: ["4byte", "long", "int", "dc.l"],
    }, 
    {
        label: "quad",
        insertTextType: "none",
        desc: "Allocates 8 bytes.",
        docs: "Allocates 8 bytes of memory in the Read/Write section of memory.",
        aliases: ["8byte", "xword", "dc.a"],
    },
    {
        label: "dword",
        insertTextType: "none",
        desc: "Allocates 8 bytes.",
        docs: "Allocates 8 bytes of memory in the Read/Write section of memory.",
    }, 
    {
        label: "octa",
        insertTextType: "none",
        desc: "Allocates 16 bytes.",
        docs: "Allocates 16 bytes of memory in the Read/Write section of memory.",
    }, 

    // Floating point directives
    {
        label: "float",
        insertTextType: "none",
        desc: "4 byte float.",
        docs: "Allocates a 32-bit floating point number.",
        aliases: ["single", "dc.s"],
    },
    {
        label: "double",
        insertTextType: "none",
        desc: "8 byte float.",
        docs: "Allocates a 64-bit floating point number.",
        aliases: ["dc.d"],
    },

    // String directives
    {
        label: "ascii",
        insertTextType: "none",
        desc: "Allocates one or more bytes of memory.",
        docs: "Allocates one or more bytes of memory in the current section, and defines the initial contents of the memory from a string literal.\n\n**Does  not append a null byte to the end of the string.**",
    }, 
    {
        label: "asciz",
        insertTextType: "none",
        desc: "Allocates one or more bytes of memory.",
        docs: "Allocates one or more bytes of memory in the current section, and defines the initial contents of the memory from a string literal.\n\n**Appends a null byte to the end of the string.**",
    }, 
    {
        label: "string",
        insertTextType: "none",
        desc: "Allocates one or more bytes of memory.",
        docs: "Allocates one or more bytes of memory in the current section, and defines the initial contents of the memory from a string literal.\n\n**Appends a null byte to the end of the string.** This directive also accepts escape codes.",
    }, 
];

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