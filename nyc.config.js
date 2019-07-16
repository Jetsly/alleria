module.exports = {
  include: ['src/**/*'],
  exclude: ['**/*.test.ts'],
  extension: ['.ts'],
  reporter: ['lcov', 'text'],
  sourceMap: true,
  instrument: true,
};
