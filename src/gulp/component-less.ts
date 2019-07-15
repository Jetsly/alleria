import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import through2 from 'through2';
import postcss from 'postcss';
import less from 'less';
import NpmImportPlugin from 'less-plugin-npm-import';

export default function componentLess({
  regex = /\/style\/index\.less$/,
  plugins = [],
  paths = [],
}: {
  regex: RegExp;
  plugins: postcss.AcceptedPlugin[];
  paths: string[];
}) {
  return through2.obj(function(file, encoding, next) {
    this.push(file.clone());
    if (file.path.match(regex)) {
      const resolvedLessFile = resolve(process.cwd(), file.path);
      let data = readFileSync(resolvedLessFile, 'utf-8');
      data = data.replace(/^\uFEFF/, '');
      const lessOpts = {
        paths: [dirname(resolvedLessFile)].concat(paths),
        filename: resolvedLessFile,
        plugins: [new NpmImportPlugin({ prefix: '~' })],
        javascriptEnabled: true,
      };
      less
        .render(data, lessOpts)
        .then(result => {
          const source = result.css;
          return postcss(plugins).process(source, {
            from: lessOpts.paths[0],
          });
        })
        .then(r => {
          file.contents = Buffer.from(r.css);
          file.path = file.path.replace(/\.less$/, '.css');
          this.push(file);
          next();
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      next();
    }
  });
}
