const vscode = require('vscode');
const constants = require('../constants');
const {formatComplete, formatDocs} = require('../utils/format');
const settings = require('../utils/SettingsManger');

const definitions = [
    ...require('./Section'), 
    ...require('./Types'),
    ...require('./Alignment'),
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
        const line = document.lineAt(position.line).text;
        const word = document.getText(document.getWordRangeAtPosition(position, constants.wordRegex));
        
        if(!/[\S]\./g.test(line) && word.charAt(0) === '.'){
            return completionMap;
        }
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

// Used for user macro/abbreviations
function generateAllocateString(amount){
    return `SUB ${settings.spaceString}SP, SP, ${amount}\nSTR ${settings.spaceString}LR, [SP]\n$\{1:/* Code Here */\}\nLDR ${settings.spaceString}LR, [SP]\nADD ${settings.spaceString}SP, SP, ${amount}\n$0`;
}

const loopRegex = /(x|X|r|R|w|W|d|D|s|S)([0-9]{1,2})(r|)-([0-9]+|(x|X|r|R|w|W|d|D|s|S)[0-9]{1,2})/g;

const macroCompletionProvider = vscode.languages.registerCompletionItemProvider(constants.id, {
    provideCompletionItems(document, position, token, context) {
        const range = document.getWordRangeAtPosition(position, /[^\n\s,\/\\]+/g);
        const text = document.getText(range);
        
        // Search for the macro indicator "@"
        if(text.charAt(0) === "@"){
            const macroContent = text.substring(1);
            const amount = Number(macroContent);
            
            // If it's a stack allocation macro
            if(!isNaN(amount) && amount !== 0){
                const result = new vscode.CompletionItem({
                    label: `Allocate ${amount} byte${amount !== 1 ? "s" : ""} onto the stack.`,
                    description: "Abbreviation",
                }, constants.CompletionTypes.Snippet);
    
                // Construct the string
                result.insertText = new vscode.SnippetString(generateAllocateString(amount));
                result.additionalTextEdits = [vscode.TextEdit.delete(new vscode.Range(range.start, new vscode.Position(range.start.line, range.start.character + 1)))];
                
                return [result];
            }
            else if(/:/.test(macroContent)){
                const match = /([^:\s\n,=\.]+):([0-9]+)/g.exec(macroContent);
                if(match){
                    const amount = Number(match[2]);
                    if(!isNaN(amount) && amount !== 0){
                        const result = new vscode.CompletionItem({
                            label: `Creates a new label and allocates ${amount} byte${amount !== 1 ? "s" : ""} onto the stack.`,
                            description: "Abbreviation",
                        }, constants.CompletionTypes.Snippet);
            
                        // Construct the string
                        result.insertText = new vscode.SnippetString(`\n${generateAllocateString(amount)}`);
                        result.additionalTextEdits = [vscode.TextEdit.delete(new vscode.Range(range.start, new vscode.Position(range.start.line, range.start.character + 1)))];
                        
                        return [result];
                    }
                }
            }
            else if(macroContent.search(loopRegex) !== -1){
                const contents = Array.from(macroContent.matchAll(loopRegex))[0];
                const sourceRegister = contents[1].toUpperCase() + contents[2];
                let endValue;
                const snippetBody = [];
                if(isNaN(Number(contents[4]))){
                    // Loop from one register value to another
                    endValue = contents[4].toUpperCase();
                }
                else{
                    // Loop from 0 to a static value
                    endValue = Number(contents[4]);
                }

                if(contents[3]){
                    snippetBody.push(`MOV ${settings.spaceString}${sourceRegister}, 0`);
                }

                const startLabel = `loop_${sourceRegister}_to_${endValue}_start`;
                const endLabel = `loop_${sourceRegister}_to_${endValue}_end`;
                snippetBody.push(
                    `\${1:${startLabel}}:`,
                    `CMP ${settings.spaceString}${sourceRegister}, ${endValue}`,
                    `B.EQ${settings.spaceString}\${2}`,
                    "${3:/* Code Here */}",
                    `ADD ${settings.spaceString}${sourceRegister}, ${sourceRegister}, 1`,
                    `B   ${settings.spaceString}\${1}`,
                    `\${2:${endLabel}}:`,
                    "$0"
                );


                const result = new vscode.CompletionItem({
                    label: `Loop from ${sourceRegister} to ${endValue}.`,
                    description: `Abbreviation`
                }, constants.CompletionTypes.Snippet);
                
                result.insertText = new vscode.SnippetString(snippetBody.join('\n'));
                result.additionalTextEdits = [vscode.TextEdit.delete(range)];
                return [result];
            }
        }
    }
 }, ...["@","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"]);

module.exports = [
    completionProvider,
    hoverProvider,
    macroCompletionProvider
];