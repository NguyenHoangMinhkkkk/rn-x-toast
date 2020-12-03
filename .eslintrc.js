module.exports = {
  root: true,
  extends: 'edoctor-react-app',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: { 'import/resolver': { typescript: {} } },
};
