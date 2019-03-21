import { join, relative } from 'path';
import * as fs from 'fs-extra';
import * as ts from 'typescript';
import paths from '../utils/paths';

import chokidar = require('chokidar');
import glob = require('glob');

const fileName = 'router.config.ts';

const outputfile = (files, sourceFile) => {
  return ts.updateSourceFileNode(sourceFile, [
    ts.createStatement(ts.createIdentifier(`import { lazy } from 'react'`)),
    ts.createExportAssignment(
      undefined,
      undefined,
      undefined,
      ts.createObjectLiteral(
        [
          ts.createPropertyAssignment(
            ts.createIdentifier('public'),
            ts.createArrayLiteral(
              [
                ts.createArrayLiteral([
                  ts.createStringLiteral('/auth/login'),
                  ts.createCall(ts.createIdentifier('lazy'), undefined, [
                    ts.createArrowFunction(
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                      ts.createIdentifier(
                        `import(/* webpackChunkName: "p_index" */ '../pages/dashboard')`
                      )
                    ),
                  ]),
                ]),
              ],
              true
            )
          ),
          ts.createPropertyAssignment(
            ts.createIdentifier('private'),
            ts.createArrayLiteral([], true)
          ),
        ],
        true
      )
    ),
  ]);
};

function generator(path, a) {
  glob(
    `**/**.tsx`,
    {
      cwd: paths.appPages,
    },
    (err, files) => {
      const sourceFile = ts.createSourceFile(
        fileName,
        '',
        ts.ScriptTarget.ESNext
      );
      const relativeFiles = files.map(file =>
        relative(paths.appTempPath, join(paths.appPages, file))
      );
      fs.outputFileSync(
        join(paths.appTempPath, fileName),
        ts.createPrinter().printFile(outputfile(relativeFiles, sourceFile))
      );
    }
  );
}

export default function routerTmpGenerator() {
  fs.ensureDirSync(paths.appTempPath);
  chokidar
    .watch(`**/**.tsx`, {
      ignored: /_/,
      cwd: paths.appPages,
    })
    .on('ready', generator)
    .on('change', generator);
}
