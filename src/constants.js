const vscode = require('vscode');

const insertTextMap = {
    none: "",
    section: "\n\t",
    basic1: " \t${1}",
    basic2: " \t${1}, ${2}",
    basic3: " \t${1}, ${2}, ${3}",
};


/**
 * Formats the docs to include the parameters
 * @param {*} items List of completion items.
 * @returns List with the docs and snippets formatted properly.
 */
function formatDocs(items=[{label: "", insertText: "", desc: "", docs: "", params: undefined}]){
    const result = [];
    for (const item of items) {
        if(item.params){
            item.docs = item.docs + "\n\n" + item.params.map((([name,desc]) => `@param \`${name}\` &mdash; ${desc}`)).join('\n\n');
        }
        const newInsertText = (item.insertTextType === "custom") ? item.insertText : insertTextMap[item.insertTextType];
        item.insertText = new vscode.SnippetString(item.label + newInsertText);
        item.docs = new vscode.MarkdownString(item.docs);
        result.push(item);
    }
    return result;
}

function makeCompletionItems(items, type=vscode.CompletionItemKind.Function){
    return items.map(item => {
        const t = new vscode.CompletionItem({label: item.label, description: item.desc}, type);
        t.insertText = item.insertText;
        t.documentation = item.docs;
        return t;
    });
}

module.exports = {
    id: "arm_assemblycs382",
    types: vscode.CompletionItemKind,
    format: formatDocs,
    formatComplete: makeCompletionItems
};