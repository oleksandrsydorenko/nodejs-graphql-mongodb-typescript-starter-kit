const getPresets = isTypeScript =>
  [
    isTypeScript && 'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
  parserOptions: {
    ecmaFeatures: {
      // enables global strict mode
      impliedStrict: true,
    },
    // enables ECMAScript modules
    sourceType: 'module',
  },
  overrides: [
    {
      extends: getPresets(true),
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // path to TypeScript config
        project: 'tsconfig.json',
        // path to TypeScript config directory
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
