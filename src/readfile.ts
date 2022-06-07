
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function loadFile() {
    const dirPath = path.resolve(`${__dirname}`, '../resource/Template.md');
    const str = fs.readFileSync(dirPath, 'utf-8');
     return str;
}
export async function OpenDocument(content:string) {
    try {
		
		const doc = await vscode.workspace.openTextDocument({ language: 'markdown', content: content });
		vscode.window.showTextDocument(doc);
		//vscode.window.showInformationMessage("Load the template successfully.");
	} catch (error) {
		console.error(error);
		vscode.window.showErrorMessage('Error happen: ${error}');
	}
}
