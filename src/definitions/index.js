const vscode = require('vscode');
const constants = require('../constants');


const labelRegex = /^\s*([^:\s\n,=\.]+):/gm;

const definitionProvider = vscode.languages.registerDefinitionProvider(constants.id, {
    provideDefinition(document, position, token){
        const word = document.getText(document.getWordRangeAtPosition(position));
        //Find definition by looping through lines
        const numLines = document.lineCount;
        for (let i = 0; i < numLines; i++) {
            const defIndex = document.lineAt(i).text.indexOf(word + ":");
            if(defIndex !== -1){
                //Definition is found
                return new vscode.Location(document.uri, new vscode.Range(new vscode.Position(i, defIndex), new vscode.Position(i, defIndex + word.length+1)))
            }
        }

        return undefined;
    }
});

const completionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token){
        return Array.from((document.getText()).matchAll(labelRegex))
        .map(e => new vscode.CompletionItem({label: e[1], description: "Memory Label."}, constants.types.Variable));
    }
})

module.exports = [
    definitionProvider,
    completionProvider
];