# vscode-code-generate README

> Generate Code By Template


![](https://github.com/yehq/vscode-code-generate/blob/master/public/images/preview-component.gif)

## 默认模板

添加了一个快速生成空 react 组件的模板

## 自定义模板

在项目根目录下添加 generator.config.js 文件
模板占位符使用 {{name}} 的形式
name 变量 通过 transformInput 方法 返回的对象中的 keys 匹配出来

```js
// generator.config.js

module.exports = {
  /**
   * 全局的前置占位符 未配置 templateOption 的前置占位符 时使用这个
   * 默认 {{
   */
  // openDelimiter?: string;
  /**
   * 全局的后置占位符 未配置 templateOption 的后置占位符 时使用这个
   * 默认 }}
   */
  // closeDelimiter?: string;

  /**
   * 是否需要展示默认的 templateOptions
   * 默认 true
   */
  showDefaultTemplateOptions: true;

  /**
   * 需要额外添加的模板配置
   */
  templateOptions: [
    {
      /**
       * 前置占位符
       * 默认 {{
       */
      // openDelimiter: '{{',
      /**
       * 后置占位符
       * 默认 }}
       */
      // closeDelimiter: '}}',
      // 展示的名称
      name: "module",
      // 模板文件地址
      templatePath: path.join(__dirname, "./templates/{{moduleName}}"),
      /**
       * 获取输入的字符串 转化为一个对象 供模板使用
       */
      transformInput: input => {
        if (!input) return {};
        const [moduleName, name] = input.trim().split(" ");
        const Name = firstCharUpper(name);
        return {
          moduleName,
          name,
          Name
        };
      },
       /**
       * vscode 弹框的 input 的 placeholder
       */
      inputPlaceholder: "请输入 模块名 和 页面名称，以空格分割"
    },
  ]
};
```