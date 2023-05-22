module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', "eslint-plugin-prettier"],
  rules: {
    'react-refresh/only-export-components': 'warn',
    "prettier/prettier": [
      "error", {
        "semi": false,
        "trailingComma": "es5",
        "singleQuote": true,
        "tabWidth": 2,
        "useTabs": false
      }]
  },
}
