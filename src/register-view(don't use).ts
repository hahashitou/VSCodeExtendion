
import * as fs from 'fs';
import * as path from 'path';
import { TextDecoder } from 'util';
import * as vscode from 'vscode';

const Template_Path = "./resources/package.json";

//获取打包文件
 function getNode(context: vscode.ExtensionContext) {
    const packageJsonPath = path.resolve(`${__dirname}`, '../resource/Template.md');
    if (pathExists(packageJsonPath)) {
      return Promise.resolve(getDepsInPackageJson(packageJsonPath));
    } else {
      vscode.window.showInformationMessage('No extended command exists');
      return Promise.resolve([]);
    }
}
function pathExists(p: string): boolean {
    try {
        fs.accessSync(p);
    } catch (err) {
        return false;
    }

    return true;
}
function getDepsInPackageJson(packageJsonPath: string): Commands[] {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      let com=[];
      const uu= new Commands(
            'moduleName',
            '',
            vscode.TreeItemCollapsibleState.Collapsed
          );

     com.push(uu);
     return com;
    
  }




  function GetCommand()
  {
    let com=[];
    const uu= new Commands('moduleName','01',vscode.TreeItemCollapsibleState.Collapsed);
   com.push(uu);
   return com;
  }

export class DependenciesProvider implements vscode.TreeDataProvider<Commands>{
   
    getTreeItem(element: Commands): vscode.TreeItem {
        return element;
    }
    getChildren(element?: Commands):  Thenable<Commands[]>{
        return Promise.resolve(GetCommand());
       
    }
}
  class Commands extends vscode.TreeItem {
    constructor(
      public readonly label: string,
      private version: string,
      public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) 
    {
      super(label, collapsibleState);
      this.tooltip = `${this.label}-${this.version}`;
      this.description = this.version;
    }
  
    iconPath = {
      light: path.join(__filename, '..', '..', 'resource', 'light', 'dependency.svg'),
      dark: path.join(__filename, '..', '..', 'resource', 'dark', 'dependency.svg')
    };
  }  



  export async function RegisterView() {
    vscode.window.registerTreeDataProvider('nodeDependencies', new DependenciesProvider());
}