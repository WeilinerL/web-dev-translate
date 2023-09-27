import fs from 'fs';
import Turndown from 'turndown';
import prettier from 'prettier';
import { load } from 'cheerio';
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

export const saveHtml2MD = async (html: string, prefix: string) => {
  const $ = load(html);
  const article = $('article').first();
  const title = article.find('header h1').text();
  article.find('header, details').remove();
  article.find('.docked-actions, a.button').remove();
  const md = turndownService.turndown(article.html() as string);
  const lines = md.split(/\n/g);
  let offset = 0;
  let output = '';
  while (offset < lines.length) {
    const chunk = await chatWithGPT(
      `请把以下内容翻译成中文：\n${lines.slice(offset, offset + 50).join('\n')}`
    );
    output += `${chunk}\n`;
    offset += 50;
  }
  output = `${prefix}\n\n${output}`;
  const formated = await prettier.format(output, {
    parser: 'markdown',
  });
  if (!fs.existsSync(MD_DIR)) {
    fs.mkdirSync(MD_DIR, { recursive: true });
  }
  fs.writeFile(
    `${MD_DIR}/${title.split(/\s+/g).join('-')}.md`,
    formated,
    (err) => {
      console.log(err);
    }
  );
};
