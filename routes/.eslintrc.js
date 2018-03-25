module.exports = {
  plugins: ['node'],
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parser: 'babel-eslint',
  env: {
    node: true,
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
  },
};
