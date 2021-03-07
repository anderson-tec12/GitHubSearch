module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-expoirt': 'off',
    'react/state-in-constructor': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'jsx-a11y/heading-has-content': 0,
    'no-lone-blocks': 0,
    'react/static-property-placement': 0,
    'consistent-return': 0,
    'import/prefer-default-export': 0,
    'import/named': 0,
  },
};
