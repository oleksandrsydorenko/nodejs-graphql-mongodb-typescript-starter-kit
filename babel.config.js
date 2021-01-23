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
