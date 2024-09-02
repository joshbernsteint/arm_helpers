const vscode = require('vscode');
const {docsId, id} = require('../constants');

class HoverString extends vscode.MarkdownString{
    constructor(title, body=""){
        super('');
        this.supportHtml = true;
        this.isTrusted = true;
        this.appendCodeblock(title, docsId);
        if(!Array.isArray(body)){
            this.appendMarkdown(body);
        }
        else{
            //Parse docstring            
            body.forEach(e => {
                if(typeof e === "string"){
                    // Not having the span there causes things to not work. I have no idea why though.
                    this.appendMarkdown("<span></span>"+e);
                }
                else{
                    if(e.before) this.appendMarkdown(e.before);
                    this.appendCodeblock(e.content, e.language || id);
                }
            })            
        }
    }
}

module.exports = HoverString;