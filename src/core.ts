// Copyright (c) 2018-19 MalvaHQ
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use strict';

import * as vscode from 'vscode';
import * as common from 'dartsass-plugin-common';
import {Doc} from './doc';
import { Config }  from './config';
import { relaunch, clearAllWatchers } from './watcher';

export let extensionConfig = new common.CompilerConfig();
const pluginName = 'dartsass';


function doReloadConfiguration(projectRoot: string, _log: common.ILog): void {
    common.Validate(extensionConfig, projectRoot, _log).then(
        value => {
            if (projectRoot !== null) {
                relaunch(projectRoot, extensionConfig, _log);
            } else {
                clearAllWatchers(_log);
            }
        },
        err => {
            clearAllWatchers(_log);
            vscode.window.showErrorMessage(err);
        }
    );
}

export function reloadConfiguration(_log: common.ILog) : void {
    const configuration = vscode.workspace.getConfiguration(pluginName);
    extensionConfig = Config.extractFrom(configuration);
    var editor = vscode.window.activeTextEditor;
    var projectRoot = "";
    if (editor && typeof editor !== 'undefined') {
        projectRoot = new Doc(editor.document).getProjectRoot();
    }
    _log.appendLine(`Configuration reloaded with ${JSON.stringify(extensionConfig)} and projectRoot ${projectRoot}`);
    doReloadConfiguration(projectRoot, _log);
}


export function startBuildOnSaveWatcher(subscriptions: vscode.Disposable[], _log: common.ILog) {
    vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
        if (e.affectsConfiguration(pluginName)) {
            reloadConfiguration(_log);
        }
    });
    vscode.workspace.onDidChangeWorkspaceFolders((e: vscode.WorkspaceFoldersChangeEvent) => {
        console.log(e);
    });
	vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        if (!extensionConfig.disableCompileOnSave) {
            common.CompileCurrentFile(new Doc(document), extensionConfig, _log).then(
                value => {

                },
                err => {
                    vscode.window.showErrorMessage(err);
                }
            );
        }
	}, null, subscriptions);
}