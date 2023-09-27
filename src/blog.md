# 背景

在一次网上冲浪的过程中，无意发现了一个宝藏网站[web.dev](https://web.dev/)，这个网站由 Google 推出，其内容由 Chrome 团队的成员和外部专家共同编写，希望帮助用户构建美观、易用、快速且安全的网站。
其中的内容囊括：

- [技术博客](https://web.dev/blog/)：Google 内外部专家提供的技术分享
- [学习](https://web.dev/learn/)：提供 PWA、CSS、HTML 等内容的学习
- [探索](https://web.dev/explore/)：提供性能、构建优秀的网站、框架、探索等方面的内容
- [模式](https://web.dev/patterns/)：一组用于处理动画、剪切板、布局等内容的常见模式
- [Case studies](https://web.dev/tags/case-study/)：了解其他开发者为何以及如何利用网络为他们的用户创建了出色的网络体验。

这么丰富且优秀的网站，我“啪的一下！很快啊！”就放进了收藏夹，期待日后品读。然而我读着读着就有一种想分享的冲动，但其原文为英文，读起来不是那么顺畅，于是我就想将其翻译后再分享给大家。

# 工具与技术

1. [Node.js](https://nodejs.org/dist/latest-v18.x/docs/api/)：爬虫等以下各种技术的运行环境
2. [Cheerio](https://www.npmjs.com/package/cheerio)：一个用于解析和操作 HTML 字符串的 js 库，提供类似 dom 操作的方式对文档进行处理
3. [Turndown.js](https://www.npmjs.com/package/turndown)：转换 HTML 到 Markdown 格式
4. [OpenAI GPT-4](https://platform.openai.com/docs/api-reference)：提供给第三方进行调用的 API 接口
5. [Prettier](https://www.npmjs.com/package/prettier)：对代码/文档进行格式化的工具

# 步骤

## 爬取网站内容

### 定义爬取目标与策略

我们进入[博客列表](https://web.dev/blog/)，打开控制台对网页进行检查会发现，此网站是 SSR 直出的，且语义化做得相当不错

数据采集策略如下

1. 分析 DOM 结构
2. 获取特定类名对应的数据信息

### 数据提取与处理

我们发现博客列表的 DOM 结构是一系列的卡片，因此针对这些卡片的特定类名可以获取到所有的文章信息

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e28c964d624423a8023a47b9e5fba39~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1338&h=604&s=600998&e=png&b=ffffff" alt="image.png"  /></p>

以下代码可以获取到对应 DOM 中的所有文章的链接、标题、发布日期等信息

```ts
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
```

我们拿到所有标题和链接后，就可以针对某一篇文章进行处理

```ts
get(articlePath).then((res) => {
  const prefix = `发布时间：${article.time}\n
原文链接：[${article.title}](${articlePath})\n
Translated by GPT-4 with ❤️（翻译过程中若有错误或遗漏，欢迎评论区指出👏）
`;
  saveHtml2MD(res, prefix).catch((e) => {
    console.error(`[${articlePath}]\n`, e);
  });
});
```

## OpenAI 接入

1. 首先你需要可以访问外网，一些公司提供外网访问，没有的则需要自己挂梯子
2. 你需要注册 OpenAI 的账号，风控力度很大，国内邮箱目前似乎注册不了，注册流程参考[OpenAI 推出超神 ChatGPT 注册攻略来了](https://juejin.cn/post/7173447848292253704?searchId=2023092717170224C9816290927A13C5F2)
3. 新用户有 5 美元的试用资格，过期后需要使用国外银行卡进行充值，充值方式见下文 **"开通国外银行卡"** 一节
4. 申请新的[API key](https://platform.openai.com/account/api-keys)，点击`Create new secret key`按钮创建一个 API key

## 转换与翻译

### Turndown.js 转 MD

我们拿到 html 原文内容后，需要对其进行转换处理，通过分析发现每一篇博客都是通过`article`标签进行包裹的，因此我们只需要拿到这部分内容进行转换

```ts
export const saveHtml2MD = async (html: string, prefix: string) => {
  const $ = load(html);
  const article = $('article').first();
  const title = article.find('header h1').text();
  article.find('header, details').remove(); // 移除不需要的内容
  article.find('.docked-actions, a.button').remove(); // 移除不需要的内容
  const md = turndownService.turndown(article.html() as string);
  ...
};
```

### OpenAI GPT-4 翻译

基于 GPT-4 强大的模型，我们翻译出来的内容是相当准确且有逻辑的，并且不会对专业术语进行翻译，也不会对代码块进行翻译

```ts
export const saveHtml2MD = async (html: string, prefix: string) => {
  ...
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
```

**需要注意的是，openai 计算价格时，通常会考虑输入文本和生成文本中的 Token 数量之和。例如，如果输入有 10 个 Token，而输出有 20 个 Token，则总共会计算 30 个 Token 的价格。1000 个 Token 约等于 750 个英文单词或者 400 ～ 500 个汉字。**

**经过实验，我翻译一篇博客的费用在`0.6美元`左右（好心人为本文点点赞吧 😭）**

## 格式化与输出

为了让文章更美观，我们利用 Prettier 进行格式化，然后将格式化后的内容保存到特定文件夹中

```ts
export const saveHtml2MD = async (html: string, prefix: string) => {
  ...
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
```

至此，我们就完成了对一篇文章的翻译

# 其他

## GPT-4 升级（按需）

### 礼品卡

以下方法仅针对 IOS 用户 **（确保手机有梯子，且有 ChatGPT 账号）**

1. 在网上购买国外 Apple ID，随便搜索会出来一大堆，购买完成后会给你提供账号和密码，一般只能短期使用
2. 登陆后在应用商店下载 ChatGPT
3. 支付宝切换到美国，搜索`出境`，进入`惠出境小程序`选择`折扣礼卡`，拉到最下面一栏选择`更多大牌折扣礼卡`，点进去在搜索栏搜索 `app store` ，注册邮箱账号密码然后就可以选择美元金额充值（20 美元，GPT-4 需要 20 美元一个月），充值成功就可以点进去查看礼品卡号码

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bc93dceb81a41babd36107b66f79bb7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1018&h=322&s=273230&e=png&b=ffffff" alt="image.png"  /></p>

5. 在 App Store 点击兑换充值卡或代码，使用礼品卡号码进行 Apple ID 充值，充值完成后会在账户上面显示剩余金额
6. 打开 ChatGPT 应用，点击右上角的三个点，弹出下拉框，点击 upgrade 进行支付升级
7. 此时再次登陆 Web 版 ChatGPT 就会发现 GPT-4 已经解锁

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/528871474427463594087b673b5f5f25~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3832&h=1802&s=867517&e=png&b=ffffff" alt="image.png"  /></p>

### 开通国外银行卡

1. 点击此链接[WildCard](https://bewildcard.com/i/WEILIN3)跳转注册界面
2. 输入手机号和验证码进行注册
3. 注册完成后进行实名认证
4. 开卡，开卡需要花费 100 元左右，这个不是充值卡，是开卡费用
5. 为虚拟卡进行充值（建议 25 美元以上）
6. 充值完成后就可以获取银行卡的各种信息

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee0a65794aed46d1affd46921bd216f8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=930&h=1356&s=220730&e=png&b=ffffff" alt="image.png"  /></p>

开通完成后使用[远程环境登陆](https://help.bewildcard.com/zh-CN/articles/8049494-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8%E7%BE%8E%E5%9B%BD%E5%AE%B6%E5%BA%AD%E8%BF%9C%E7%A8%8B%E7%8E%AF%E5%A2%83%E8%BF%9B%E8%A1%8C%E7%BB%91%E5%AE%9A-%E6%94%AF%E4%BB%98)，进入 GPT 网页版，点击左下角头像选择升级，输入银行卡相关信息进行升级

# 总结

- 从发现[web.dev](https://web.dev/)这个网站开始，我们就在脑海里构思了整套流程
- 爬取该网站 SSR 内容，使用成熟的[Cheerio](https://www.npmjs.com/package/cheerio)进行数据解析
- 使用[Turndown.js](https://www.npmjs.com/package/turndown)将内容转换为 Markdwon 格式
- 使用[OpenAI GPT-4](https://platform.openai.com/docs/api-reference)对内容进行翻译
- 使用[Prettier](https://www.npmjs.com/package/prettier)对输出内容进行格式化
- 将翻译的内容分享到社区，互利共赢
- 站在巨人的肩膀上，先构思、设计方案，再找可用的轮子、实现自己的方案

# 仓库地址

[web-dev-translate](https://github.com/WeilinerL/web-dev-translate)

**（分享不易、渴望点赞和 star😭）**

目前已经翻译了三篇文章，一篇已经发表在掘金[【译/Blog】提升你的 HTML5 应用程序的性能](https://juejin.cn/post/7283150465524252732)

# 参考

- [你不知道的 node 爬虫原来这么简单](https://juejin.cn/post/6844904167429898247)
- [https://v2ex.com/t/946079](https://v2ex.com/t/946079)
- [OpenAI API 和 ChatGPT 区分，OpenAI API 获取方式收费标准](https://zhuanlan.zhihu.com/p/646977477)
