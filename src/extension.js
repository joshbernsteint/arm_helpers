// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Operations = require('./operations')
const Directives = require('./directives');
const Definitions = require('./definitions');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('|---Running---|');

	context.subscriptions.push(
		...Operations, 
		...Directives,
		...Definitions
	);

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
