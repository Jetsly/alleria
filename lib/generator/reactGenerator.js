"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const chalk_1 = require("chalk");
const Generator = require("yeoman-generator");
const clipboardy = require("clipboardy");
const boxen = require("boxen");
class default_1 extends Generator {
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            this.answers = yield this.prompt([
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
                    message: ({ appName, version }) => `Is to generator ${chalk_1.default.magenta(`${appName}@${version}`)}?`,
                    type: 'confirm',
                },
            ]);
            if (!this.answers.ok) {
                process.exit();
            }
        });
    }
    writing() {
        const pkgJson = {
            name: this.answers.appName,
            version: this.answers.version,
            license: 'MIT',
            scripts: {
                start: 'alleria react-serve',
                build: 'alleria react-build',
            },
        };
        this.sourceRoot(path_1.join(__dirname, '../../template/react-template'));
        this.destinationRoot(this.answers.appName);
        this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('public/index.html'), { title: this.answers.appName });
        this.fs.copyTpl(this.templatePath('index.tsx'), this.destinationPath('src/index.tsx'), { appName: this.answers.appName });
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    install() {
        this.yarnInstall(['react', 'react-dom']);
        this.yarnInstall([
            '@types/react',
            '@types/react-dom',
            'react-hot-loader',
            '@hot-loader/react-dom',
        ], {
            dev: true,
        });
    }
    end() {
        const editorP = `code ${this.answers.appName}`;
        if (process.platform !== `linux`) {
            clipboardy.writeSync(editorP);
        }
        process.stdout.write(boxen([
            `📜  ${chalk_1.default.bold(editorP)} to coding \n`,
            '📋  Copied to clipboard, just use Ctrl+V \n',
            '✨  File Generate Done',
        ].join('\n'), {
            padding: 1,
            borderColor: 'gray',
            borderStyle: 'classic',
        }));
    }
}
exports.default = default_1;
