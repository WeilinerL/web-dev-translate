import fs from 'fs';
import Turndown from 'turndown';
import prettier from 'prettier';
import { MD_DIR } from './config';
import { chatWithGPT } from './openai';

const turndownService = new Turndown({
  codeBlockStyle: 'fenced',
});

// 格式化特定样式的aside内容
turndownService.addRule('formatAside', {
  filter: (node) => node.className === 'flow',
  replacement(content) {
    return `> ${content}`;
  },
});

// 图片居中显示
turndownService.addRule('formatImg', {
  filter: 'figure',
  replacement(content, node) {
    const m = content.match(/\!\[(?<alt>.*?)\]\((?<src>.*?)\)/);
    const children = Array.from(node.children);
    const figcaption = children.find((el) => el.tagName === 'FIGCAPTION');
    const suffix = figcaption
      ? `\n\n*<p align=center>${figcaption?.textContent}</p>*\n`
      : '';
    return `<p align=center><img src="${m?.groups?.src}" alt="${m?.groups?.alt}"  /></p>${suffix}`;
  },
});

// 去除锚点
turndownService.addRule('formatTitle', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement(content, node) {
    const [count] = node.nodeName.match(/\d+/) ?? [];
    const heading = ''.padStart(Number(count), '#');
    return `${heading} ${content.split('[#]')[0]}\n`;
  },
});

/**
 *
 * @param title 文章标题
 * @param content 文章内容
 * @param prefix 文章前缀说明
 */
export const saveHtml2MD = async (
  title: string,
  content: string,
  prefix: string,
  options?: {
    folder?: string;
    translate?: boolean;
  }
) => {
  const md = turndownService.turndown(content as string);
  const lines = md.split(/\n/g);
  let offset = 0;
  let output = md;
  const needTranslate =
    options?.translate === undefined || options.translate === true;
  if (needTranslate) {
    output = '';
    while (offset < lines.length) {
      const chunk = await chatWithGPT(
        `请把以下内容翻译成中文：\n${lines
          .slice(offset, offset + 50)
          .join('\n')}`
      );
      output += `${chunk}\n`;
      offset += 50;
    }
    output = `${prefix}\n\n${output}`;
  }
  const formated = await prettier.format(output, {
    parser: 'markdown',
  });
  const DIR = options?.folder ? `${MD_DIR}/${options.folder}` : MD_DIR;
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR, { recursive: true });
  }
  fs.writeFile(
    `${DIR}/${title.split(/\s+/g).join('-')}.md`,
    formated,
    (err) => {
      console.log(err);
    }
  );
};
