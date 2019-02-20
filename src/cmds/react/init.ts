import ReactGenerator from '../../generator/reactGenerator';

exports.command = 'react-init <appName>';
exports.desc = 'init react project';
exports.builder = {};

exports.handler = async function buildReact(argv) {
  const { appName } = argv;
  const generator = new ReactGenerator(process.argv.slice(2), {
    appName,
    env: {
      cwd: process.cwd(),
    },
    resolved: __dirname,
  });
  generator.run();
};
