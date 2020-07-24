module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    // parser: '@typescript-eslint/parser'
  },
  env: {
    node: true,
  },
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    'html',
    'vue',
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',

    // 'plugin:vue/essential',
    // 'eslint:recommended',
    // '@vue/typescript/recommended',
    // '@vue/prettier',
    // '@vue/prettier/@typescript-eslint',
  ],
  rules: {
    /**
     * 【================================================ Possible Errors ================================================】
     * 这些规则与JavaScript代码中可能的错误或逻辑错误有关
     */
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    /**
     * 【================================================ Best Practices ================================================】
     * 这些规则是关于最佳实践的，帮助你避免一些问题
     */
    'no-param-reassign': 'off', // 禁止对 function 的参数进行重新赋值

    /**
     * 【================================================ Strict Mode ================================================】
     * 该规则与使用严格模式和严格模式指令有关
     */

    /**
     * 【================================================ Variables ================================================】
     * 这这些规则与变量声明有关
     */

    /**
     * 【================================================ Node.js and CommonJS ================================================】
     * 这些规则是关于Node.js 或 在浏览器中使用CommonJS 的
     */

    /**
     * 【================================================ Stylistic Issues ================================================】
     * 这些规则是关于风格指南的，而且是非常主观的
     */

    /**
     * 【================================================ typescript-eslint ================================================】
     * typescript规则
     */
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
