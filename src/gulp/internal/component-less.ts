import { resolve, dirname } from 'path';
import through2 from 'through2';
import postcss, { AcceptedPlugin } from 'postcss';
import less from 'less';
import Vinyl from 'vinyl';
import NpmImportPlugin from 'less-plugin-npm-import';

export default function componentLess({
  regex = /\/style\/index\.less$/,
  plugins = [],
  paths = [],
}: Partial<{
  regex: RegExp;
  plugins: AcceptedPlugin[];
  paths: string[];
}>) {
  return through2.obj(function (file: Vinyl.BufferFile, encoding, next) {
    this.push(file.clone());
    if (file.path.match(regex)) {
      const resolvedLessFile = resolve(process.cwd(), file.path);
      let data = file.contents.toString();
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
          if (Array.isArray(plugins) && plugins.length) {
            return postcss(plugins).process(source, {
              from: lessOpts.paths[0],
            });
          }
          return Promise.resolve({
            css: source,
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
