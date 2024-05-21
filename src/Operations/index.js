const vscode = require('vscode');
const constants = require('../constants');


const allItems = constants.format([
    ...require('./Load'), 
    ...require('./Store'),
    ...require('./Move'),
    ...require('./Math'),
    ...require('./Jump'),
]);

const completionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        const completionMap = allItems.map(item => {
            const t = new vscode.CompletionItem({label: item.label, description: item.desc}, vscode.CompletionItemKind.Function);
            t.insertText = item.insertText;
            t.documentation = item.docs;
            return t;
        });
        return completionMap;
    }
});

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, token) {
        const word = document.getText(document.getWordRangeAtPosition(position));
        const lowerWord = word.toUpperCase();
        for (const op of allItems) {
            if(word === op.label || lowerWord === op.label){
                return new vscode.Hover(op.docs); 
            }
        }
    }
});


module.exports = [
    completionProvider,
    hoverProvider
];