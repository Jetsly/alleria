import { transformComptLess } from '../';
import test from 'ava';
import Vinyl from 'vinyl';
import through2 from 'through2';

test('transformComptLess', t => {
  t.plan(2);
  const stream = transformComptLess({});
  stream.pipe(
    through2.obj(function wrapFile(file: Vinyl.BufferFile, enc, next) {
      if (file.extname === '.css') {
        t.assert(file.extname, '.css');
        t.pass();
      } else {
        t.is(file.extname, '.less');
        t.pass();
      }
      next(null, file);
    })
  );
  stream.end(
    new Vinyl({
      cwd: '/',
      base: '/test/',
      path: '/style/index.less',
      contents: new Buffer('.a { color:red; }'),
    })
  );
});
