import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class DepNodeProvider implements vscode.TreeDataProvider<Dependency> {

	private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | void> = new vscode.EventEmitter<Dependency | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | void> = this._onDidChangeTreeData.event;
	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
	getTreeItem(element: Dependency): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Dependency): Thenable<Dependency[]> {
		
		const packageJsonPath =path.resolve(`${__dirname}`, '../commandList.json');
		if (this.pathExists(packageJsonPath)) {
			return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
		} else {
			vscode.window.showInformationMessage('Can not found the file path of commandList.json');
			return Promise.resolve([]);
		}
	}

	/**
	 * Given the path to test.json, read all its generatemd (you can write your own json string ).
	 */
	private getDepsInPackageJson(packageJsonPath: string): Dependency[] {
		if (this.pathExists(packageJsonPath)) {
            let list=[];
			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
			const toDep = (title: string, desciption: string,command ?:vscode.Command): Dependency => {
                return new Dependency(title, desciption, vscode.TreeItemCollapsibleState.None, command);
			};
            //把要启动的命令绑定到菜单中
            //快速生成markdown模板
            if(packageJson.generatemd.title&&packageJson.generatemd.description)
            {
                const title=packageJson.generatemd.title;
                const description=packageJson.generatemd.title;
                const model= toDep(title,description,  
                    {
                        command: 'templatemd.generateMD',//点击树形菜单执行命令
                        title: ''
                    }
                    );
              list.push(model);
              
            }
            //弹出消息框
            if(packageJson.sayhello.title&&packageJson.sayhello.description)
            {
                const title=packageJson.sayhello.title;
                const description=packageJson.sayhello.title;
                const model= toDep(title,description,  
                    {
                        command: 'templatemd.HelloWorld',//点击树形菜单执行命令
                        title: ''
                    }
                    );
              list.push(model);
              
            }
            return list;
		} else {
			return [];
		}
	}



	private pathExists(p: string): boolean {
		try {
			fs.accessSync(p);
		} catch (err) {
			return false;
		}

		return true;
	}
}

export class Dependency extends vscode.TreeItem {

	constructor(
		public readonly title: string,
		private readonly desciption: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(title, collapsibleState);

		this.tooltip = `${this.title}-${this.desciption}`;
		this.description = this.desciption;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resource', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resource', 'dark', 'dependency.svg')
	};

	contextValue = 'dependency';
}

export async function RegisterView() {
    vscode.window.registerTreeDataProvider('nodeDependencies', new DepNodeProvider());
}