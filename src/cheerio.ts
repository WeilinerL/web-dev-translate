import { load } from 'cheerio';

/**
 * 获取博客列表
 * @param html html文档字符串
 * @returns
 */
export const getAllArticles = (html: string) => {
  const $ = load(html);
  const articles: { title?: string; href?: string; time?: string }[] = [];
  // 获取每个文章卡片信息
  $('article.card').each((i, ele) => {
    let title = '';
    let href = '';
    let time = '';
    $('.card__heading', ele).each(function () {
      title = $('a', this).text();
      href = $('a', this).attr('href') ?? '';
    });
    $('.card__avatars', ele).each(function () {
      time = $('time', this).text();
    });
    articles.push({
      title,
      href,
      time,
    });
  });
  return articles;
};

/**
 * 获取单个博客信息
 * @param html html文档字符串
 * @returns
 */
export const getArticle = (html: string) => {
  const $ = load(html);
  const href = $('head').find('link[rel="canonical"]').attr('href');
  const article = $('article').first();
  const title = article.find('header h1').text();
  const time = article.find('header time').text();
  article.find('header, details').remove();
  article.find('.docked-actions, a.button').remove();

  const content = article.html() ?? '';

  return {
    href,
    title,
    time,
    content,
  };
};
