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
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:unicorn/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'import', 'react-native', '@typescript-eslint', 'unicorn'],
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', ['parent', 'sibling', 'index']],
      },
    ],
    'react-native/sort-styles': 0,
    'react-native/no-raw-text': ['error', { skip: ['Paragraph', 'Heading'] }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-empty-function': ['warn'],
    'unicorn/filename-case': [0],
    'unicorn/prefer-module': [0],
    'unicorn/no-array-reduce': [0],
    'unicorn/consistent-function-scoping': [0],
    'unicorn/no-array-callback-reference': [0],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          prop: true,
          props: true,
        },
        replacements: {
          prop: false,
          props: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['scripts/*.js', '*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': [0],
      },
    },
  ],
  settings: {
    'import/ignore': ['node_modules/react-native/index\\.js$'],
    react: {
      version: 'detect',
    },
  },
};
