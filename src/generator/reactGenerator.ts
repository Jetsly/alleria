import { join, relative } from 'path';
import chalk from 'chalk';

import Generator = require('yeoman-generator');
import clipboardy = require('clipboardy');
import boxen = require('boxen');

export default class extends Generator {
  public answers: any;

  public async prompting() {
    this.answers = await this.prompt([
      {
        name: 'appName',
        message: `What's your app name`,
        type: 'input',
        default: this.options.appName,
      },
      {
        name: 'version',
        message: `What's your app version`,
        type: 'input',
        default: '0.0.1',
      },
      {
        name: 'ok',
        message: ({ appName, version }) =>
          `Is to generator ${chalk.magenta(`${appName}@${version}`)}?`,
        type: 'confirm',
      },
    ]);
    if (!this.answers.ok) {
      process.exit();
    }
  }

  public writing() {
    const pkgJson = {
      name: this.answers.appName,
      version: this.answers.version,
      license: 'MIT',
      scripts: {
        start: 'alleria react-serve',
        build: 'alleria react-build',
      },
    };

    this.sourceRoot(join(__dirname, '../../template/react-template'));
    this.destinationRoot(this.answers.appName);

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answers.appName }
    );
    this.fs.copyTpl(
      this.templatePath('index.tsx'),
      this.destinationPath('src/index.tsx'),
      { appName: this.answers.appName }
    );
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  public install() {
    this.yarnInstall(['react', 'react-dom']);
    this.yarnInstall(
      [
        '@types/react',
        '@types/react-dom',
        'react-hot-loader',
        '@hot-loader/react-dom',
      ],
      {
        dev: true,
      }
    );
  }

  public end() {
    const editorP = `code ${this.answers.appName}`;
    if (process.platform !== `linux`) {
      clipboardy.writeSync(editorP);
    }
    process.stdout.write(
      boxen(
        [
          `📜  ${chalk.bold(editorP)} to coding \n`,
          '📋  Copied to clipboard, just use Ctrl+V \n',
          '✨  File Generate Done',
        ].join('\n'),
        {
          padding: 1,
          borderColor: 'gray',
          borderStyle: 'classic',
        }
      )
    );
  }
}
