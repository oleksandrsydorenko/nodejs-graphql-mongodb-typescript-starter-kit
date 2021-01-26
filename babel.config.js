module.exports = {
  presets: [
    [
      // allows to use the latest ECMAScript features
      '@babel/preset-env',
      {
        // allows to use some ECMAScript feature proposals
        shippedProposals: true,
      },
    ],
    // allows to use TypeScript features
    '@babel/preset-typescript',
  ],
  plugins: [
    // enables the re-using of Babel's helpers
    '@babel/plugin-transform-runtime',
    [
      // enables modules aliases
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@graphql': './src/graphql',
          '@loaders': './src/loaders',
          '@models': './src/models',
          '@routes': './src/routes',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  env: {
    development: {
      // disables omitting newlines and whitespace
      compact: false,
    },
    production: {
      presets: [
        // minifies transpiled code
        [
          'minify',
          {
            // removes debugger statements
            removeDebugger: true,
          },
        ],
      ],
    },
  },
};
