import * as fs from "fs";
import { join, basename } from "path";
import removeFile from "../utils/removeFile";
import templateCompile from "../template/compile";
import {
  Data,
  Options as TemplateCompileOptions
} from "../template/interfaces";

export default (
  inputPath: string,
  outputPath: string,
  data: Data,
  templateCompileOptions: TemplateCompileOptions
) => {
  const filename = getFilename(inputPath);
  loopCopy(inputPath, join(outputPath, filename));

  function loopCopy(inputPath: string, outputPath: string) {
    const stat = fs.statSync(inputPath);
    const finalOutputPath = getOutputPath(outputPath);
    removeFile(finalOutputPath);
    if (stat.isFile()) {
      copyFile(inputPath, finalOutputPath);
    } else if (stat.isDirectory()) {
      fs.mkdirSync(finalOutputPath);
      fs.readdirSync(inputPath).forEach(subPath => {
        const subInputPath = join(inputPath, subPath);
        const subOutputPath = join(finalOutputPath, subPath);
        loopCopy(subInputPath, subOutputPath);
      });
    }
  }

  /**
   * 渲染文件内容和拷贝文件
   * @param inputPath 需要拷贝的目标文件
   * @param outputPath 拷贝后的文件
   */
  function copyFile(inputPath: string, outputPath: string) {
    let fileContent = fs.readFileSync(inputPath, { encoding: "utf8" });

    if (fileContent === null || typeof fileContent === "undefined") {
      return false;
    }
    fs.writeFileSync(
      outputPath,
      templateCompile(fileContent, templateCompileOptions)(data)
    );
    return true;
  }

  /**
   * 渲染文件名
   * @param outputPath
   */
  function getOutputPath(outputPath: string) {
    return templateCompile(outputPath, templateCompileOptions)(data);
  }
};

function getFilename(path: string) {
  return basename(path);
}
