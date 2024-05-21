const vscode = require('vscode');

const insertTextMap = {
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

module.exports = {
    id: "arm_assemblycs382",
    format: formatDocs,
};