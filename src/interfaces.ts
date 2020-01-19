export interface TemplateOption {
  /**
   * 前置占位符
   * 默认 {{
   */
  openDelimiter?: string;
  /**
   * 后置占位符
   * 默认 }}
   */
  closeDelimiter?: string;
  // 展示的名称
  name: string;
  // 模板文件地址
  templatePath: string;
  /**
   * 获取输入的字符串 转化为一个对象 供模板使用
   */
  transformInput?: (input?: string) => { [key: string]: any };
  /**
   * vscode 弹框的 input 的 placeholder
   */
  inputPlaceholder?: string;
}

export interface Config {
  /**
   * 前置占位符
   * 默认 {{
   */
  openDelimiter?: string;
  /**
   * 后置占位符
   * 默认 }}
   */
  closeDelimiter?: string;
  /**
   * 是否需要展示默认的 templateOptions
   */
  showDefaultTemplateOptions?: boolean;
  templateOptions?: TemplateOption[];
}
