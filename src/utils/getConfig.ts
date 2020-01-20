import * as fs from "fs";
import { sep, join } from "path";
import { configFilename } from "../constants";
import { Config } from "../interfaces";

/**
 * 从当前文件夹开始往上寻找 配置文件
 * 返回配置文件内容
 */
export default (currentPath: string): Config => {
  const pathItems = currentPath.split(sep);
  let config: Config = {};
  pathItems.reverse().some((pathItem, index, array) => {
    const targetPath = array
      .slice(index)
      .reverse()
      .join(sep);
    const filenames = targetPath ? fs.readdirSync(targetPath) : "";
    const hasConfigFile = filenames.includes(configFilename);
    if (hasConfigFile) {
      const configPage = join(targetPath, configFilename);
      delete require.cache[configPage];
      config = require(join(targetPath, configFilename));
    }
    return hasConfigFile;
  });
  return config;
};
