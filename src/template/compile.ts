import { Data, TemplateParamOption, Options } from "./interfaces";
import { defaultOpenDelimiter, defaultCloseDelimiter } from "../constants";

export default (templateStr: string, options: Options = {}) => {
  const openDelimiter = options.openDelimiter || defaultOpenDelimiter;
  const closeDelimiter = options.closeDelimiter || defaultCloseDelimiter;

  return (data: Data = {}) => {
    const dataParamPatterns = Object.keys(data).reduce<TemplateParamOption[]>(
      (target, key) => {
        target.push({
          pattern: new RegExp(`${openDelimiter}${key}${closeDelimiter}`, "g"),
          value: data[key]
        });
        return target;
      },
      []
    );

    return dataParamPatterns.reduce((target, templateParaOption) => {
      return target.replace(
        templateParaOption.pattern,
        templateParaOption.value
      );
    }, templateStr);
  };
};
