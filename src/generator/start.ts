import * as vscode from "vscode";
// import * as path from "path";
import * as fs from "fs";
import renderAndCopy from "./renderAndCopy";
import defaultTemplateOptions from "./defaultTemplateOptions";

import getConfig from "../utils/getConfig";

export default (uri?: vscode.Uri) => {
  try {
    if (uri) {
      const filepath = uri.path;
      const stat = fs.statSync(filepath);
      if (stat.isDirectory()) {
        const config = getConfig(filepath);
        const {
          showDefaultTemplateOptions = true,
          templateOptions: templateOpts = []
        } = config;
        const templateOptions = showDefaultTemplateOptions
          ? defaultTemplateOptions.concat(templateOpts)
          : templateOpts;
        vscode.window
          .showQuickPick(
            templateOptions.map(item => item.name),
            {
              placeHolder: "选择要生成的模板",
              canPickMany: false,
              ignoreFocusOut: false
            }
          )
          .then(opt => {
            const {
              inputPlaceholder,
              transformInput,
              templatePath,
              openDelimiter,
              closeDelimiter
            } = templateOptions.find(
              templateOption => templateOption.name === opt
            )!;
            const placeHolder = inputPlaceholder || "请输入参数";
            vscode.window
              .showInputBox({
                placeHolder,
                prompt: placeHolder
              })
              .then(input => {
                const data = transformInput ? transformInput(input) : {};
                renderAndCopy(templatePath, filepath, data, {
                  openDelimiter: openDelimiter || config.openDelimiter,
                  closeDelimiter: closeDelimiter || config.closeDelimiter
                });
              });
          });

        return;
      }
    }
    vscode.window.showInformationMessage("请选择一个文件夹");
  } catch (e) {
    vscode.window.showErrorMessage(e.message);
  }
};
