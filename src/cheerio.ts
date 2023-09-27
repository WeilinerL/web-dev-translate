import { load } from 'cheerio';

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
