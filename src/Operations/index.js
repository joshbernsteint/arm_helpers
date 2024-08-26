const vscode = require('vscode');
const constants = require('../constants');
const {formatDocs, formatComplete} = require('../utils/format');


const allItems = formatDocs([
    ...require('./Jump'),
    ...require('./Load'), 
    ...require('./Store'),
    ...require('./Move'),
    ...require('./Math'),
    ...require('./Binary'),
]);

const completionMap = formatComplete(allItems);

const completionMemberMap = [];
allItems.forEach(e => {
    if(e.members){
        completionMemberMap.push([e.label + ".", formatComplete(formatDocs(e.members, e.label+"."))]);
    }
});

const hoverMap = allItems.flatMap(e => {
    if(e.members){
        return [e,...e.members.map(l => ({...l, label: `${e.label}.${l.label}`}))];
    }
    else return e;
});


const completionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        return completionMap;
    }
});

const completionMemberProvider = vscode.languages.registerCompletionItemProvider(constants.id,{
    provideCompletionItems(document, position, token, context) {
        const linePrefix = document.lineAt(position).text.slice(0, position.character);
        for (let i = 0; i < completionMemberMap.length; i++) {
            const [label, items] = completionMemberMap[i];
            if(linePrefix.endsWith(label)){
                return items;
            }
        }
        return undefined;
    }
}, '.');

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, token) {
        const word = document.getText(document.getWordRangeAtPosition(position, constants.wordRegex));
        const upperWord = word.toUpperCase();
        for (const op of hoverMap) {
            if(upperWord === op.label){
                return new vscode.Hover(op.docs); 
            }
        }
    }
});


module.exports = [
    completionProvider,
    completionMemberProvider,
    hoverProvider
];