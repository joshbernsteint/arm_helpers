const vscode = require('vscode');
const HoverString = require('./HoverString');
const constants = require('../constants');
const {matchEvery} = require('./stringUtils');
const settings = require('./SettingsManger');

/**
 * Formats the docs to include the parameters
 * @param {*} items List of completion items.
 * @returns List with the docs and snippets formatted properly.
 */
function formatDocs(items=[{label: "", insertText: "", desc: "", docs: "", params: undefined}], prefix="", type="Instruction"){
    const result = [];
    const textMap = constants.getTextMap(settings.spaceString);
    for (const item of items) {
        const newInsertText = (item.insertTextType === "custom") ? item.insertText : textMap[item.insertTextType];
        item.insertText = new vscode.SnippetString(item.label + (item.label.length < settings.spaceString.length ? "\t" : "") + newInsertText);
        item.docs = formatFunctionDocs(prefix+item.label, item, type);
        result.push(item);
    }
    return result;
}


const docStringRegexes = Object.freeze({
    param: /@param\s*(.*)/g,
    return:/@return(?:s|)\s*(.*)/g,
    modifies: /@modifies\s*(.*)/g,
    restores: /@restores\s*(.*)/g,
    asC: /@asC\s*(.*)/g,
    example: /@example([\s\S]+?)(?=(?:\*\/|@param|@return(?:s|)|@example|@modifies|@restores))/gm,
    desc: /^([\s\S]*?)(?:@(?:param|return(?:s|)|example|restores|modifies|asC))/g,
});


/**
 * @param {string} str asdasd
 * @example parseDocString("Hello")
 * @returns parsed docstring
 */
function parseDocString(str){
    const construct = [];

    // Get generic description
    const foundDesc = matchEvery(str, docStringRegexes.desc);
    if(foundDesc.length > 0 && foundDesc[0][1].length > 0){
        construct.push(`${foundDesc[0][1].trim()}   `);
    }

    const foundParams = matchEvery(str, docStringRegexes.param);
    if(foundParams.length > 0){
        foundParams.forEach(([_, desc],i ) => {
            construct.push(`<p><em>@param</em> \`R${i}\` &mdash; ${desc}</p>`)
        });
    }    

    const foundReturn = matchEvery(str, docStringRegexes.return);
    if(foundReturn.length > 0){
        foundReturn.forEach(([_, desc],i ) => {
            construct.push(`<p><em>@returns</em> \`R${i}\` &mdash; ${desc}</p>`)
        });
    }

    const foundModifies = matchEvery(str, docStringRegexes.modifies);
    if(foundModifies.length > 0){
        // else construct.push('<hr>');
        construct.push('<p><em>@modifies</em></p>\n')
        construct.push({content: foundModifies[0][1], language: constants.id})
    }

    const foundRestores = matchEvery(str, docStringRegexes.restores);
    if(foundRestores.length > 0){
        // else construct.push('<hr>');
        construct.push('<p><em>@restores</em></p>\n')
        construct.push({content: foundRestores[0][1], language: constants.id})
    }

    const foundExamples = matchEvery(str + "*/", docStringRegexes.example);
    if(foundExamples.length > 0){
        // else construct.push('<hr>');
        foundExamples.forEach(([_, desc], i) => {
            construct.push({
                before: '<p><em>@example</em></p>\n', 
                content: desc.trim(),
            });
        });
    }

    const foundCDefinition = matchEvery(str, docStringRegexes.asC)
    if(foundCDefinition.length > 0){
        construct.unshift({
            content: foundCDefinition[0][1],
            language: 'c',
            newHeader: true
        })
    }
    
    return (construct.length === 0) ? str : construct;
}



/**
 * asdasd
 * @param {*} funcName 
 * @param {*} detailObj 
 * @param {*} wordType
 * @returns 
 */
function formatFunctionDocs(funcName, detailObj={docs:"", params:[], extra: undefined}, wordType="Instruction"){
    // <span style=\"color:var(--vscode-keyword-control);\">TESTING</span>
    let titleString = `${wordType} ${funcName}`;
    const {docs, params, extra} = detailObj;
    const bodyList = [docs+"<br>"];
    if(params && params.length > 0){
        params.forEach(({name, type, desc},i) => {
            let tempString = ` ${name}: ${type}`;
            if(i > 0) tempString = ',' + tempString;
            titleString += tempString;
            bodyList.push(`<p><em>@param</em> \`${name}\` &mdash; ${desc}</p>`)
        });
    }
    if(extra){

    }

    const result = new HoverString(titleString, bodyList.join(''));
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
    formatComplete,
    parseDocString,
};