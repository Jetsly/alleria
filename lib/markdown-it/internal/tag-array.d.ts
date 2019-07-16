import MarkdownIt from 'markdown-it';
declare function tagArray(md: MarkdownIt, opts: {
    tag: string;
    skipTag: Array<string>;
}): void;
declare namespace tagArray {
    var default: {
        tag: string;
        skipTag: string[];
    };
}
export default tagArray;
