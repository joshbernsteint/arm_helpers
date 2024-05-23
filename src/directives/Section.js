module.exports = [
    {
        label: "text",
        desc: "Text(Code) segment.",
        insertTextType: "section",
        docs: "Describes the area of the file that should contain the assembly instructions.",
    },
    {
        label: "data",
        desc: "Initialized data segment.",
        insertTextType: "section",
        docs: "Describes the global variables that are initialized to certain values at the start of the program.\n\n Variables should be declared with a label, type directive, and a value. 'Macro' directives suck as `.skip`, `.balign`, and others can be used in this section as well.\n\n### Example\n`example:\t.quad\t472` creates a variable that can be referenced with the label 'example', that is 8 bytes in memory and with an inital value of 472.",
    },
    {
        label: "bss",
        desc: "Uninitialized data segment.",
        insertTextType: "section",
        docs: "",
    }
]