const vscode = require('vscode');
const constants = require('../constants');


const allItems = constants.format([
    ...require('./Section'), 
]);

const completionMap = constants.formatComplete(allItems,constants.types.Property);


const completionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        return completionMap;
    }
},'.');

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, token) {
        const word = document.getText(document.getWordRangeAtPosition(position));
        const lowerWord = word.toLowerCase();
        for (const op of allItems) {
            if(word === op.label || lowerWord === op.label){
                return new vscode.Hover(op.docs); 
            }
        }
    }
});

module.exports = [
    completionProvider,
    hoverProvider,
];