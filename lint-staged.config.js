module.exports = {
  // runs eslint against JavaScript and TypeScript files
  '*.{j,t}s': ['eslint --fix'],
  // runs prettier against JSON, Markdown and YAML files
  '*.{json,md,yaml}': ['prettier -w'],
};
