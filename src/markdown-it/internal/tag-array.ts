import MarkdownIt from 'markdown-it';

function tagArray(
  md: MarkdownIt,
  opts: { tag: string; skipTag: Array<string> }
) {
  opts = Object.assign({}, tagArray.default, opts);
  md.core.ruler.push('findTagName', state => {
    const tagToken = [];
    let cursor = -1;
    state.tokens.forEach(token => {
      if (opts.skipTag.indexOf(token.tag) > -1) {
        return;
      }
      if (token.tag === opts.tag) {
        if (token.type == 'heading_open') {
          cursor = tagToken.length;
          tagToken[cursor] = [];
        }
      }
      if (cursor !== -1) {
        tagToken[cursor].push(token);
      }
    });
    (md as any).tagArray = tagToken.map(token => ({
      [`${opts.tag}`]: token[1].content.trim(),
      html: md.renderer.render(token, {}, {}).trim(),
    }));
  });
}

tagArray.default = {
  tag: 'h2',
  skipTag: ['code'],
};

export default tagArray;
