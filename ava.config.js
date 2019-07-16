export default {
  files: ['src/**/*.test.ts'],
  sources: ['src/**/*'],
  tap: true,
  babel: false,
  compileEnhancements: false,
  environmentVariables: {},
  extensions: ['ts'],
  require: ['ts-node/register/transpile-only'],
};
