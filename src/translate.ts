import { get } from './http';
import { getAllArticles, getArticle } from './cheerio';
import { saveHtml2MD } from './markdown';

const DOMAIN = 'https://web.dev';

const getPrefix = (title = '-', time = '-', path = 'https://web.dev/blog') => {
  return `发布时间：${time}\n
  原文链接：[${title}](${path})\n
  Translated by GPT-4 with ❤️（翻译过程中若有错误或遗漏，欢迎评论区指出👏）
  `;
};

/**
 * 翻译列表的所有文章
 */
export const translateArticleList = (folder?: string, translate = true) => {
  const page = 28; // 当前翻译的页码
  const index = 12; // 当前页面对应的第几篇文章
  get(`${DOMAIN}/blog/${page}/`, {
    headers: {
      'Accept-Language': 'zh-CN,zh;q=0.9',
    },
  }).then(
    (res) => {
      const articles = getAllArticles(res);
      const article = articles[index];
      const articlePath = `${DOMAIN}${article.href}`;
      get(articlePath).then((res) => {
        const prefix = getPrefix(article.title, article.time, articlePath);
        const { title, content } = getArticle(res);
        saveHtml2MD(title, content, prefix, { folder, translate }).catch(
          (e) => {
            console.error(`[${articlePath}]\n`, e);
          }
        );
      });
    },
    (e) => {
      console.log(e);
    }
  );
};

/**
 * 翻译单篇文章
 * @param src
 */
export const translateArticle = (
  src: string,
  folder?: string,
  translate = true
) => {
  get(src, {
    headers: {
      'Accept-Language': 'zh-CN,zh;q=0.9',
    },
  }).then(
    (res) => {
      const { href, title, content, time } = getArticle(res);
      const prefix = getPrefix(title, time, href);
      saveHtml2MD(title, content, prefix, { folder, translate }).catch((e) => {
        console.error(`[${href}]\n`, e);
      });
    },
    (e) => {
      console.log(e);
    }
  );
};
