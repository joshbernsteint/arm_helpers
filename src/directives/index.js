const vscode = require('vscode');
const constants = require('../constants');


const allItems = constants.format([
    ...require('./Section'), 
]);

const completionMap = constants.formatComplete(allItems,constants.types.Property);


const completionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        const {text, firstNonWhitespaceCharacterIndex} = document.lineAt(position);
        if(text[firstNonWhitespaceCharacterIndex] === ".")
            return completionMap;
    }
},'.');

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, token) {
        const {text} = document.lineAt(position);
        const lowerWord = text.toLowerCase();
        for (const op of allItems) {
            if(lowerWord === "." + op.label){
                return new vscode.Hover(op.docs); 
            }
        }
    }
});

module.exports = [
    completionProvider,
    hoverProvider,
];