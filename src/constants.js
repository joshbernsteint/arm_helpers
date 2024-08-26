const vscode = require('vscode');
const settings = require('./utils/SettingsManger');

function generateTextMap(spaces){
    return {
        none: "",
        section: `\n${spaces}`,
        space: " ",
        basic1: ` ${spaces}$\{1\}`,
        basic2: ` ${spaces}$\{1\} $\{2\}`,
        basic3: ` ${spaces}$\{1\} $\{2\} $\{3\}`,
    }
}

const insertTextMap = generateTextMap(settings.spaceString);

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
    getTextMap: (spaces) => {
        return {
            none: "",
            section: `\n${spaces}`,
            space: " ",
            basic1: ` ${spaces}$\{1\}`,
            basic2: ` ${spaces}$\{1\} $\{2\}`,
            basic3: ` ${spaces}$\{1\} $\{2\} $\{3\}`,
        }
    }
};