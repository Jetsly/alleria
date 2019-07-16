import test from 'ava';
import markdownIt from 'markdown-it';
import { tagArray, sourceArray } from '..';

test('tag array', t => {
  var md = markdownIt('default', {
    html: true,
  }).use(tagArray, { tag: 'h2' });
  md.render(
    '## ccc \nsssssss \n  ## ssss \nsss  \n ##  \n <script>aaa</script> \n ```html \n <div></div> \n ```'
  );
  t.snapshot((md as any).tagArray);
});

test('source array', t => {
  var md = markdownIt('default', {
    html: true,
  }).use(sourceArray);
  md.render(
    "```html \n <div></div> \n ``` \n ```css \n a{color:'red'} \n ````"
  );
  t.snapshot((md as any).sourceArray);
});
