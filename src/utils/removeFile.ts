import * as fs from "fs";
import { join } from "path";

/**
 * 删除文件 或 文件夹
 * @param path 文件路径
 */
function removeFile(path: string) {
  if (fs.existsSync(path)) {
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      const files = fs.readdirSync(path);
      files.forEach(file => {
        const curPath = join(path, file);
        removeFile(curPath);
      });
    } else {
      fs.unlinkSync(path);
    }
  }
}

export default removeFile;
