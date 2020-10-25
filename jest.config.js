module.exports = {
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/coverage/**'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
