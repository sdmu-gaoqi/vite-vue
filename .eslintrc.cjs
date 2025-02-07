module.exports = {
  root: true,
  env: {
    browser: true, // 允许使用浏览器环境中的全局变量，如 window 和 document
    node: true,
    jasmine: true,
    jest: true,
    es6: true
  },
  parser: ['@typescript-eslint/parser', 'vue-eslint-parser'],
  parserOptions: {
    // Use babel-eslint for JavaScript
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'import', 'vue'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['@vue/typescript/recommended', '@vue/prettier'],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-unused-vars': [
          'error',
          { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
        ],
        '@typescript-eslint/ban-ts-comment': 0
      }
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser' // 使用 @typescript-eslint/parser 解析 TypeScript 代码
      },
      rules: {
        'no-console': 'off',
        'vue/no-use-v-if-with-v-for': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
        ]
      }
    }
  ],
  rules: {
    'import/no-named-as-default': 'off',
    'import/namespace': 0,
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 0,
    'comma-dangle': 0,
    'no-var': 'error',
    'no-console': 'off',
    'object-shorthand': 2,
    'no-unused-vars': [
      2,
      { ignoreRestSiblings: true, argsIgnorePattern: '^_' }
    ],
    'no-undef': 2,
    camelcase: 'off',
    'no-extra-boolean-cast': 'off',
    semi: 0,
    'vue/no-v-html': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-reserved-keys': 'off',
    'vue/comment-directive': 'off',
    'vue/prop-name-casing': 'off',
    'vue/one-component-per-file': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/multi-word-component-names': 'off'
  },
  globals: {
    h: true
  }
}
