module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-void': ['error', { allowAsStatement: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
