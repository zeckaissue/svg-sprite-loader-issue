/* eslint-env node */
module.exports = {
  extends: "eslint:recommended",
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  rules: {},
  parser: "babel-eslint",
};
