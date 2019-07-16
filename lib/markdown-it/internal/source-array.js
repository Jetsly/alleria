"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sourceArray(md, opts) {
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
        md.sourceArray = tagToken.map(token => ({
            lang: token[0].info.trim(),
            source: token[0].content.trim(),
        }));
    });
}
sourceArray.default = {};
exports.default = sourceArray;
