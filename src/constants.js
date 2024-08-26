const vscode = require('vscode');

const insertTextMap = Object.freeze({
    none: "",
    section: "\n\t",
    space: " ",
    basic1: " \t${1}",
    basic2: " \t${1}, ${2}",
    basic3: " \t${1}, ${2}, ${3}",
});

const Types = Object.freeze({
    ADDS: "Address", //Address 
    SIM9: "Simm9", //Signed 9-bit Immediate Number
    REG: "Register", //Register
    LBL: "Label", //Memory label,
    FREG: "FRegister" //Floating point Register
});


module.exports = {
    docsId: "armv8_docs",
    id: "armv8",
    CompletionTypes: vscode.CompletionItemKind,
    wordRegex: /[^\n\s\-,\/\\:]+/g,
    memberRegex: /[^\n\s\-,\/\\:]+/g,
    Types,
    insertTextMap,
};