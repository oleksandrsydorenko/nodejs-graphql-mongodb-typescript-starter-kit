module.exports = {
  presets: [
    // allows to use the latest ECMAScript features
    '@babel/preset-env',
    // allows to use TypeScript features
    '@babel/preset-typescript',
  ],
  plugins: [
    // enables reusing of Babel's helpers to save on code size
    '@babel/plugin-transform-runtime',
    // enables importing GraphQL schemas from files with extension .graphql/.gql
    'import-graphql',
    [
      // enables modules aliases
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@constants': './src/constants',
          '@graphql': './src/graphql',
          '@loaders': './src/loaders',
          '@models': './src/models',
          '@routes': './src/routes',
          '@ts': './src/ts',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  env: {
    development: {
      // disables omitting newlines and whitespace when compiles code
      compact: false,
    },
  },
  // ignores files for compiling
  ignore: ['src/ts'],
};
