// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as readfile from './readfile';
import {DepNodeProvider, RegisterView } from './register_view';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "templatemd" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let generateMD = vscode.commands.registerCommand('templatemd.generateMD', () => {
		const str=readfile.loadFile();
		readfile.OpenDocument(str);
	});

	let hello = vscode.commands.registerCommand('templatemd.HelloWorld', () => {
	  vscode.window.showInformationMessage("Hello world");
	});
	const mo=new DepNodeProvider();
	let reresh=vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => mo.refresh());
	
    RegisterView();
	context.subscriptions.push(generateMD);
	context.subscriptions.push(hello);
	context.subscriptions.push(reresh);
}

// this method is called when your extension is deactivated
export function deactivate() {}
