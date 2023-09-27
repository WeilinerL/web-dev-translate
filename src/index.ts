import { get } from './http';
import { getAllArticles } from './cheerio';
import { saveHtml2MD } from './markdown';

const DOMAIN = 'https://web.dev';
const page = 28; // 当前翻译的页码
const index = 16; // 当前页面对应的第几篇文章

get(`${DOMAIN}/blog/${page}/`).then(
  (res) => {
    const articles = getAllArticles(res);
    const article = articles[index];
    const articlePath = `${DOMAIN}${article.href}`;
    get(articlePath).then((res) => {
      const prefix = `发布时间：${article.time}，pages ${page}/28，No.${
        index + 1
      }\n
原文链接：[${article.title}](${articlePath})\n
Translated by GPT-4 with ❤️（翻译过程中若有错误或遗漏，欢迎评论区指出👏）
`;
      saveHtml2MD(res, prefix).catch((e) => {
        console.error(`[${articlePath}]\n`, e);
      });
    });
  },
  (e) => {
    console.log(e);
  }
);
