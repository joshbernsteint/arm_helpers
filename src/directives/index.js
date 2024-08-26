const vscode = require('vscode');
const constants = require('../constants');
const {formatComplete, formatDocs} = require('../utils/format');
const settings = require('../utils/SettingsManger');

const definitions = [
    ...require('./Section'), 
    ...require('./Types'),
];

const generateMaps = () => {
    const all = formatDocs(definitions, undefined, "Directive");
    return [all, formatComplete(all,constants.CompletionTypes.Keyword)];
}

let [allItems, completionMap] = generateMaps();
settings.registerSettingChangeHandler(settings.spaceCommandName, () => {
    [allItems, completionMap] = generateMaps();
});

const completionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        const {text, firstNonWhitespaceCharacterIndex} = document.lineAt(position);
        if(text[firstNonWhitespaceCharacterIndex] === ".")
            return completionMap;
    }
},'.');

const hoverProvider = vscode.languages.registerHoverProvider(constants.id, {
    provideHover(document, position, token) {
        const text = document.getText(document.getWordRangeAtPosition(position, constants.wordRegex)).substring(1);        
        const lowerWord = text.toLowerCase();
        for (const op of allItems) {
            if(lowerWord === op.label){
                return new vscode.Hover(op.docs); 
            }
        }
    }
});

 const macroCompletionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        const range = document.getWordRangeAtPosition(position, constants.wordRegex);
        const text = document.getText(range);
        
        // Search for the macro indicator "@"
        if(text.charAt(0) === "@"){
            const amount = Number(text.substring(1));

            // If it's a stack allocation macro
            if(!isNaN(amount) && amount !== 0){
                const result = new vscode.CompletionItem({
                    label: `Allocate ${amount} byte${amount !== 1 ? "s" : ""} onto the stack.`,
                    description: "Abbreviation",
                    
                });
    
                // Construct the string
                result.insertText = new vscode.SnippetString(`SUB${settings.spaceString}SP, SP, ${amount}\nSTR${settings.spaceString}LR, [SP]\n$\{1:/* Code Here */\}\nLDR${settings.spaceString}LR, [SP]$2\nADD${settings.spaceString}SP, SP, ${amount}\n$0`);
                result.additionalTextEdits = [vscode.TextEdit.delete(new vscode.Range(range.start, new vscode.Position(range.start.line, range.start.character + 1)))];
                
                return [result];
            };
        }
    }
 }, ...["@","1", "2", "3", "4", "5", "6", "7", "8", "9"]);

module.exports = [
    completionProvider,
    hoverProvider,
    macroCompletionProvider
];