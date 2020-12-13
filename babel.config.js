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
    [
      // minifies transpiled code
      'minify',
      {
        // removes debugger statements
        removeDebugger: true,
      },
    ],
  ],
  env: {
    development: {
      // disables omitting newlines and whitespace
      compact: false,
    },
  },
};
