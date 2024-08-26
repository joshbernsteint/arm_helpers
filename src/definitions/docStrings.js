
const constants = require('../constants');
const HoverString = require('../utils/HoverString');
const vscode = require('vscode');

const docStringCompletion = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token){
        const linePrefix = document.lineAt(position).text.slice(0, position.character);
        if(linePrefix === "/*"){
            const item = new vscode.CompletionItem("Docstring comment", constants.CompletionTypes.Text);
            item.insertText = new vscode.SnippetString("\n\t${0}\n");
            return [item];
        }
    }
}, '*');

const escapeCodesMap = Object.freeze({
    '0': 0,
    'a': 7,
    'b': 8,
    't': 9,
    'n': 10,
    'v': 11,
    'f': 12,
    'r': 13,
    "e": 27,
});

const escapeCharacterHover = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, _token){
        const range = document.getWordRangeAtPosition(position, /\\(U[a-fA-F0-9]{8}|u[a-fA-F0-9]{4}|x[a-fA-F0-9]{2,8}|[0-7]{3}|[\S])/);
        if(!range.isSingleLine) return undefined;

        let asciiValue = -1;
        const word = document.getText(range).substring(1);

        //Check for simple escape sequences
        if(typeof escapeCodesMap[word] !== "undefined"){
           asciiValue = escapeCodesMap[word];
        }
        else if(word.length === 1){//If it's only one-character
            asciiValue = word.charCodeAt(0);
        }
        else{
            switch (word.charAt(0)) {
                case 'x':
                case 'u':
                case 'U':
                    asciiValue = Number('0x' + word.substring(1));
                    break;
                default:
                    asciiValue = Number('0o' + word);                    
                    break;
            }
        }
        
        return asciiValue === -1 ? undefined : new vscode.Hover(new HoverString(`"\\${word}" == ${asciiValue}`));
    }
});

module.exports = [
    docStringCompletion,
    escapeCharacterHover
];