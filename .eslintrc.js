const getPresets = isTypeScript =>
  [
    ...(isTypeScript
      ? [
          // Airbnb rules for TypeScript
          'airbnb-typescript/base',
        ]
      : [
          // Airbnb rules for JavaScript
          'airbnb-base',
        ]),
    // rules for Jest
    'plugin:jest/recommended',
    // extended rules for Jest
    'plugin:jest/style',
    // extends eslint-config-prettier and allows to run Prettier rules as the Eslint ones
    'plugin:prettier/recommended',
    // rules for Promises
    'plugin:promise/recommended',
    // disables ESLint rules that can conflict with Prettier
    'prettier',
    // disables @typescript-eslint rules that can conflict with Prettier
    isTypeScript && 'prettier/@typescript-eslint',
  ].filter(Boolean);

module.exports = {
  env: {
    // allows require() and define() globals
    amd: true,
    // allows ECMAScript 2021 globals
    es2021: true,
    // allows Jest globals
    jest: true,
    // allows Node.js globals
    node: true,
    // allows Web Worker globals
    worker: true,
  },
  extends: getPresets(),
  parser: '@babel/eslint-parser',
  overrides: [
    {
      extends: getPresets(true),
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
