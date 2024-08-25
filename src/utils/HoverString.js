const vscode = require('vscode');
const {docsId} = require('../constants');

class HoverString extends vscode.MarkdownString{
    constructor(title, body=""){
        super('');
        this.supportHtml = true;
        this.isTrusted = true;
        this.appendCodeblock(title, docsId);
        this.appendMarkdown(body);
    }
}

module.exports = HoverString;