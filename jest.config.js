/** @type {import('jest').Config} */
const config = {
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        extends: './jestBabel.config.js',
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/', '/testBundle/'],
}
module.exports = config
