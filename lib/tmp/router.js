"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs = require("fs-extra");
const ts = require("typescript");
const paths_1 = require("../utils/paths");
const chokidar = require("chokidar");
const glob = require("glob");
const fileName = 'router.config.ts';
const outputfile = (files, sourceFile) => {
    return ts.updateSourceFileNode(sourceFile, [
        ts.createStatement(ts.createIdentifier(`import { lazy } from 'react'`)),
        ts.createExportAssignment(undefined, undefined, undefined, ts.createObjectLiteral([
            ts.createPropertyAssignment(ts.createIdentifier('public'), ts.createArrayLiteral([
                ts.createArrayLiteral([
                    ts.createStringLiteral('/auth/login'),
                    ts.createCall(ts.createIdentifier('lazy'), undefined, [
                        ts.createArrowFunction(undefined, undefined, undefined, undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), ts.createIdentifier(`import(/* webpackChunkName: "p_index" */ '../pages/dashboard')`)),
                    ]),
                ]),
            ], true)),
            ts.createPropertyAssignment(ts.createIdentifier('private'), ts.createArrayLiteral([], true)),
        ], true)),
    ]);
};
function generator(path, a) {
    glob(`**/**.tsx`, {
        cwd: paths_1.default.appPages,
    }, (err, files) => {
        const sourceFile = ts.createSourceFile(fileName, '', ts.ScriptTarget.ESNext);
        const relativeFiles = files.map(file => path_1.relative(paths_1.default.appTempPath, path_1.join(paths_1.default.appPages, file)));
        fs.outputFileSync(path_1.join(paths_1.default.appTempPath, fileName), ts.createPrinter().printFile(outputfile(relativeFiles, sourceFile)));
    });
}
function routerTmpGenerator() {
    fs.ensureDirSync(paths_1.default.appTempPath);
    chokidar
        .watch(`**/**.tsx`, {
        ignored: /_/,
        cwd: paths_1.default.appPages,
    })
        .on('ready', generator)
        .on('change', generator);
}
exports.default = routerTmpGenerator;
