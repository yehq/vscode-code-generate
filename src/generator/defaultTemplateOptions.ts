import { join } from "path";
import { TemplateOption } from "../interfaces";
import firstCharUpper from "../utils/firstCharUpper";

const defaultTemplateOptions: TemplateOption[] = [
  {
    name: "component",
    templatePath: join(__dirname, "../../templates/{{ComponentName}}"),
    transformInput: input => {
      if (!input) {
        return {};
      }
      const componentName = input.trim();
      const ComponentName = firstCharUpper(componentName);
      return {
        componentName,
        ComponentName
      };
    },
    inputPlaceholder: "请输入组件名称"
  }
];

export default defaultTemplateOptions;
