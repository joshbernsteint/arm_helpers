
const vscode = require('vscode');
const constants = require('../constants');
const HoverString = require('../utils/HoverString');
const LabelManager = require('../utils/LabelManager');
const docString = require('./docStrings');


const manager = new LabelManager(vscode.window.activeTextEditor);

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
        
        return Object.entries(manager.getActiveLabels(true))
        .map(([lbl, desc]) => {
            if(!desc){
                desc = {content: ""};
            }
            desc = Array.isArray(desc.content) ? desc.content[0] : desc.content;
            return new vscode.CompletionItem({label: lbl, description: `${desc} (Memory Label)`}, constants.CompletionTypes.Constant)
        });
    }
});

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, _token){
        const word = document.getText(document.getWordRangeAtPosition(position, constants.wordRegex));
        const label = manager.getLabel(word);        
        
        if(label){
            if(label[0].newHeader){
                return new vscode.Hover(new HoverString(label[0].content, label.slice(1), 'c'));
            }
            else
                return new vscode.Hover(new HoverString(`${constants.Types.LBL} ${word}`, label));
        }
    }
})

module.exports = [
    definitionProvider,
    completionProvider,
    hoverProvider,
    ...docString
];