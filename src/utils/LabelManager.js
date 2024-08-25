const vscode = require('vscode');

const COMMENT_REGEXES = Object.freeze({
    docstringRegex: /\/\*([\S\s]+?(?=\*\/))\*\//gm,
    labelRegex: /^\s*([^:\s\n,=\.]+):/gm,
    labelWithCommentRegex: /^\s*([^:\s\n,=\.]+):([^\/\n]*)((\/\/(.*))|(\/\*([\s\S]*?)\*\/))/gm,
});


class LabelManager{
    constructor(currentEditor=undefined){
        this.labels = {};
        this.versionMap = {};
        this.activeDocument = currentEditor ? currentEditor.document : undefined;
        this.activeFile = this.activeDocument ? this.activeDocument.fileName : "";
        this.regexes = {...COMMENT_REGEXES};
        vscode.window.onDidChangeActiveTextEditor(e => this.handleDocumentChange(e));

        if(this.activeDocument)
            this.initializeLabels();
    }

    /**
     * Scans the entire file for labels and stores them internally
     */
    initializeLabels(){
        console.log('Storing labels!');
        this.labels[this.activeFile] = {};
        
        for (let i = 0; i < this.activeDocument.lineCount; i++) {
            const line = this.activeDocument.lineAt(i).text;
            const curLineRes = line.match(this.regexes.labelRegex);
            if(curLineRes){
                const newLabel = curLineRes[0].substring(0, curLineRes[0].length - 1);
                this.findLabel(newLabel, i);
            } 
        }        
    }

    findLabel(lbl, defLine=-1){
        // Find the definition location
        const startLine = defLine !== -1 ?  defLine : this.activeDocument.positionAt(this.activeDocument.getText().search(lbl + ":")).line;
        let newLabel = undefined;        
        
        let curLine = startLine - 1;
        let foundDocs = false;

        /**
         * 1. Check for docstring comments
         * 2. Check for inline-above comments
         * 3. Check for inline-current level comments
         */
        
        if(curLine > 0){
            let curText = this.activeDocument.lineAt(curLine).text;            
            
            if(/^\s*\/\//g.test(curText)){ //Just a single-line comment
                newLabel = {
                    content: /\s*\/\/(.+)/g.exec(curText)[1].trim(),
                    range: curLine,
                    labelType: "sAbove"
                };
                foundDocs = true;
            }
            else if(/\*\//g.test(curText)){ //Comment-block
                
                while(curLine >= 0 && !/\/\*/g.test(curText)){
                    curLine--;
                    curText = this.activeDocument.lineAt(curLine).text;
                }                
                
                
                if(curLine !== -1){
                    const docRange = new vscode.Range(curLine, 0, startLine - 1, this.activeDocument.lineAt(startLine - 1).text.length);
                    const docString = this.activeDocument.getText(docRange);
                    
                    const match = Array.from(docString.matchAll(this.regexes.docstringRegex))[0];
                    newLabel = {
                        content: match[1].trim(),
                        range: docRange,
                        labelType: "doc"
                    };
                    foundDocs = true;
                } 
            }
        }
        if(!foundDocs){
            const match = Array.from(this.activeDocument.lineAt(startLine).text.matchAll(this.regexes.labelWithCommentRegex))[0];
            
            if(match && match.length > 0){
                newLabel = {
                    content: (match[0][4] ? match[0][5] : match[0][7]).trim(),
                    range: startLine,
                    labelType: 'sCur',
                };
            }
        }
        
        this.labels[this.activeFile][lbl] = newLabel;
        return newLabel;
    }


    /**
     * @param {vscode.TextEditor} newEditor 
     */
    handleDocumentChange(newEditor){
        this.activeDocument = newEditor ? newEditor.document : undefined;
        this.activeFile = this.activeDocument ? this.activeDocument.fileName : "";
        if(!this.activeDocument) return;

        this.labels[this.activeFile] = this.labels[this.activeFile];
        
        if(!this.labels[this.activeFile] || this.versionMap[this.activeFile] !== this.activeDocument.version){
            this.versionMap[this.activeFile] = this.activeDocument.version;
            this.initializeLabels();
        }
    }

    getActiveLabels(){
        return this.labels[this.activeFile];
    }

    getLabel(labelName){
        let res = this.labels[this.activeFile][labelName];
        if(!res){
            const allLabels = Array.from(this.activeDocument.getText().matchAll(this.regexes.labelRegex)).map(e => e[1]);
            if(allLabels.includes(labelName)){
                res = this.findLabel(labelName);
            }
        }
        else{
            // Check and potentially update the label
            let textContent, match;
            switch (res.labelType) {
                case 'doc':
                    match = Array.from(this.activeDocument.getText(res.range).matchAll(this.regexes.docstringRegex))[0];
                    if(match && match.length > 0){                        
                        textContent = match[1].trim();
                        if(textContent !== res.content)
                            this.labels[this.activeFile][labelName].content = textContent;
                    }
                    else 
                        this.findLabel(labelName);
                    break;
                case 'sAbove':
                    
                    textContent = this.activeDocument.lineAt(res.range).text;                    
                    if(/^\s*\/\//g.test(textContent)){
                        this.labels[this.activeFile][labelName].content = /\s*\/\/(.+)/g.exec(textContent)[1].trim();
                    }
                    else this.findLabel(labelName);
                    break;
                case 'sCur':
                    textContent = this.activeDocument.lineAt(res.range).text;
                    match = Array.from(textContent.matchAll(this.regexes.labelWithCommentRegex)).filter(e => e[1] === labelName);
                    if(match && match.length > 0){
                        this.labels[this.activeFile][labelName].content = match[0][4] ? match[0][5] : match[0][7];
                    }
                    else this.findLabel(labelName);
                    break;
                default:
                    break;
            }
            res = this.labels[this.activeFile][labelName];
        }
        return res.content;
    }

}

module.exports = LabelManager;