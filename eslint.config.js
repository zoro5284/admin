import js from '@eslint/js'
import pluginVue, { rules as vueRules } from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  // 用于文件的检查配置
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // 使用 JavaScript 推荐的 ESLint 配置
  js.configs.recommended,

  // Vue 的基本推荐规则
  ...pluginVue.configs['flat/essential'],

  // 使用 prettier 的配置来跳过格式化检查
  skipFormatting,

  // 自定义规则（可以根据项目需求做修改）
  {
    name: 'app/custom-rules',
    rules: {
      // 禁用多词组件名称规则
      'vue/multi-word-component-names': 'off',

      // 强制组件名以大写字母开头
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],

      // 强制使用驼峰命名
      'vue/attribute-hyphenation': ['error', 'always'],

      // 禁止无意义的 console.log 和 debugger 语句
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // 禁止未使用的变量
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // 禁止修改函数参数
      'no-param-reassign': ['error', { props: true }],
    },
  },

  // 插件配置
  {
    name: 'plugin-vue/vue3-recommended',
    plugins: [pluginVue],
    extends: ['plugin:vue/vue3-recommended'],
  },
]
