const vscode = require('vscode');
const constants = require('../constants');
const {formatDocs, formatComplete} = require('../utils/format');
const settings = require('../utils/SettingsManger');

const definitions = [
    ...require('./Jump'),
    ...require('./Load'), 
    ...require('./Store'),
    ...require('./Move'),
    ...require('./Math'),
    ...require('./Binary'),
];

const generateMaps = () => {
    const all = formatDocs(definitions);
    const compMap = formatComplete(all);
    const memMap = [];
    const hovMap = [];
    all.forEach(e => {
        if(e.members){
            memMap.push([e.label + ".", formatComplete(formatDocs(e.members, e.label+"."))]);
            hovMap.push(e, ...e.members.map(l => ({...l, label: `${e.label}.${l.label}`})));
        }
        else hovMap.push(e);
    });
    return [all, compMap, memMap, hovMap];
}

let [allItems, completionMap, completionMemberMap, hoverMap] = generateMaps();
settings.registerSettingChangeHandler(settings.spaceCommandName, () => {
    [allItems, completionMap, completionMemberMap, hoverMap] = generateMaps();
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