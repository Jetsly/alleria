import MarkdownIt from 'markdown-it';

function sourceArray(
  md: MarkdownIt,
  opts: { tag: string; skipTag: Array<string> }
) {
  opts = Object.assign({}, sourceArray.default, opts);
  md.core.ruler.push('findSourceName', state => {
    const tagToken = [];
    let cursor = -1;
    state.tokens.forEach(token => {
      if (token.tag === 'code') {
        cursor = tagToken.length;
        tagToken[cursor] = [];
      }
      if (cursor !== -1) {
        tagToken[cursor].push(token);
      }
    });
    (md as any).sourceArray = tagToken.map(token => ({
      lang: token[0].info.trim(),
      source: token[0].content.trim(),
    }));
    return true;
  });
}

sourceArray.default = {};

export default sourceArray;
