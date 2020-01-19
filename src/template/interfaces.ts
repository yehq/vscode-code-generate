export interface Data {
  [key: string]: string;
}

export interface TemplateParamOption {
  pattern: RegExp;
  value: string;
}

export interface Options {
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
}
