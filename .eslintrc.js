module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'react-native', '@typescript-eslint'],
  rules: {
    'import/order': ['warn', { groups: ['builtin', 'external', ['parent', 'sibling', 'index']] }],
    'react-native/sort-styles': 0,
    'react-native/no-raw-text': ['error', { skip: ['Paragraph', 'Heading'] }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': ['warn'],
  },
  settings: {
    'import/ignore': ['node_modules/react-native/index\\.js$'],
    react: {
      version: 'detect',
    },
  },
};
