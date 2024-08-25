const constants = require('../constants');
const vscode = require('vscode');

const docStringCompletion = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token){
        const linePrefix = document.lineAt(position).text.slice(0, position.character);
        if(linePrefix === "/**"){
            const item = new vscode.CompletionItem("Docstring comment", constants.CompletionTypes.Text);
            item.insertText = new vscode.SnippetString("\n\t${0}\n");
            return [item];
        }
    }
}, '*');

module.exports = [
    docStringCompletion
];