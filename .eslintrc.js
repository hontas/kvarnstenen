module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react-native/sort-styles': 0,
    'react-native/no-raw-text': [2, { skip: ['Paragraph', 'Heading'] }],
  },
};
