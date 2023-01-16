/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  singleQuote: true,
  semi: true,
  printWidth: 120,
  trailingComma: 'all',
};
