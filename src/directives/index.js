const vscode = require('vscode');
const constants = require('../constants');
const {formatComplete, formatDocs} = require('../utils/format');




const allItems = formatDocs([
    ...require('./Section'), 
], undefined, "Directive");

const completionMap = formatComplete(allItems,constants.CompletionTypes.Keyword);



const completionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        const {text, firstNonWhitespaceCharacterIndex} = document.lineAt(position);
        if(text[firstNonWhitespaceCharacterIndex] === ".")
            return completionMap;
    }
},'.');

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, token) {
        const text = document.getText(document.getWordRangeAtPosition(position));
        
        const lowerWord = text.toLowerCase();
        for (const op of allItems) {
            if(lowerWord === op.label){
                return new vscode.Hover(op.docs); 
            }
        }
    }
});

module.exports = [
    completionProvider,
    hoverProvider,
];