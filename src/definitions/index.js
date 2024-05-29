const vscode = require('vscode');
const constants = require('../constants');

const varList = [];

const labelRegex = /^\s*([^:\s\n,=\.]+:)/gm;

function initializeVars(doc=vscode.window.activeTextEditor.document){
    const varMatches = 
    Array.from((doc.getText()).matchAll(labelRegex))
    .map(e => e[1]);
    varList.push(...varMatches);
}

initializeVars(vscode.window.activeTextEditor.document);

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
        console.log(varList);
        const res = varList.map(v => {
            if(typeof v === "string"){
                return new vscode.CompletionItem(v, constants.types.Variable);
            }
            else return v;
        });
        return res;
    }
})

const varChange = vscode.workspace.onDidChangeTextDocument((event) => {
    const {contentChanges} = event;
    if(contentChanges.length > 0){
        console.log(contentChanges);
        const newLabelMatches = Array.from(contentChanges[0].text.matchAll(labelRegex))
        .map(e => e[1]).filter(e => !varList.includes(e));
        if(newLabelMatches.length > 0){
            varList.push(...newLabelMatches);
        }        
    }
});

module.exports = [
    definitionProvider,
];