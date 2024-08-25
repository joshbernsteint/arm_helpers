const vscode = require('vscode');
const HoverString = require('./HoverString');
const constants = require('../constants');

/**
 * Formats the docs to include the parameters
 * @param {*} items List of completion items.
 * @returns List with the docs and snippets formatted properly.
 */
function formatDocs(items=[{label: "", insertText: "", desc: "", docs: "", params: undefined}], prefix="", type="Instruction"){
    const result = [];
    for (const item of items) {
        const newInsertText = (item.insertTextType === "custom") ? item.insertText : constants.insertTextMap[item.insertTextType];
        item.insertText = new vscode.SnippetString(item.label + newInsertText);
        item.docs = formatFunctionDocs(prefix+item.label, item.docs, item.params, type);
        result.push(item);
    }
    return result;
}


/**
 * 
 * @param {*} funcName 
 * @param {*} docs 
 * @param {*} params 
 * @returns 
 */
function formatFunctionDocs(funcName, docs, params, wordType="Instruction"){
    // <span style=\"color:var(--vscode-keyword-control);\">TESTING</span>
    let titleString = `${wordType} ${funcName}`;
    const bodyList = [docs+"<br>"];
    if(params && params.length > 0){
        params.forEach(({name, type, desc},i) => {
            let tempString = ` ${name}: ${type}`;
            if(i > 0) tempString = ',' + tempString;
            titleString += tempString;
            bodyList.push(`<em>@param</em> \`${name}\` &mdash; ${desc}`)
        });
    }
    const result = new HoverString(titleString, bodyList.join('<br>'));
    // if(params.example){
    //     result.appendMarkdown('<h3>Example</h3>').appendCodeblock(params.example, constants.docsId);
    // }

    return result;

}



function formatComplete(items, type=vscode.CompletionItemKind.Function){
    return items.map(item => {
        const t = new vscode.CompletionItem({label: item.label, description: item.desc}, type);
        t.insertText = item.insertText;
        t.documentation = item.docs;
        return t;
    });
}

module.exports = {
    formatDocs,
    formatComplete
};