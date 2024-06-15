/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'vue-eslint-parser', // For parsing .vue files
  parserOptions: {
    // For parsing .js files
    parser: '@babel/eslint-parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-trailing-spaces': 'error',
    'no-console': 'warn',
  },
}
