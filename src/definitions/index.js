const vscode = require('vscode');
const constants = require('../constants');


const labelRegex = /^\s*([^:\s\n,=\.]+):/gm;

const labelWithCommentRegex = /^\s*([^:\s\n,=\.]+):([^\/]*)((\/\/(.*))|(\/\*([\s\S]*?)\*\/))/gm;

const docstringRegex = /(\/\*([\s\S]*?)\*\/)(\r\n|\r|\n) *([^:\s\n,=\.]+):/gm;

const t = /(\/\*([\s\S]*?)\*\/)/g;

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
    provideCompletionItems(document, position, _token){
        return Array.from((document.getText()).matchAll(labelRegex))
        .map(e => new vscode.CompletionItem({label: e[1], description: "Memory Label."}, constants.types.Variable));
    }
});

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, _token){
        const word = document.getText(document.getWordRangeAtPosition(position, constants.wordRegex));
        const text = document.getText();

        //Check for above-line docstring
        const matchDocstring = Array.from(text.matchAll(docstringRegex)).filter(e => e[4] === word);
        if(matchDocstring.length !== 0){
            return new vscode.Hover(new vscode.MarkdownString(matchDocstring[0][2]));
        }

        //Check for inline docs
        const match = Array.from(text.matchAll(labelWithCommentRegex)).filter(e => e[1] === word);
        if(match.length === 0) return undefined;

        const string = match[0][4] ? new vscode.MarkdownString(match[0][5]) : new vscode.MarkdownString(match[0][7]);
        return new vscode.Hover(string);
    }
})

module.exports = [
    definitionProvider,
    completionProvider,
    hoverProvider,
];