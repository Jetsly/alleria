export default {
  files: ['src/**/*.test.ts'],
  tap: true,
  environmentVariables: {},
  extensions: ['ts'],
  require: ['ts-node/register/transpile-only'],
};
