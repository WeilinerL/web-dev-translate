# web-dev-translate

"web.dev" 是由 Google 提供的一个在线资源，旨在帮助开发人员提高他们的网站性能、质量和安全性。该网站提供了各种工具、指南和最佳实践，以帮助开发人员优化其网站并提供更好的用户体验。

# description

本项目用于爬取 [web.dev](https://web.dev/blog/) 官网的相关文章，并通过 chat-gpt-4 进行翻译，最终保存为 md 文件

# 调试

## node 版本

`>= 16.6`

## attention

在文件`src/translate.ts`的函数`translateArticleList`中，有两个变量控制翻译[web.dev](https://web.dev/blog/)第几篇文章：

```
const page = 28 // 当前翻译的页码
const index = 16 // 当前页面对应的第几篇文章
```

**这么做是因为 openai 接口响应比较慢，循环处理多篇文章耗时长，最重要的是费用太高，且循环处理很可能出现网络错误造成浪费**

## start

为了防止被刷，这里通过参数注入 openai 的 API key 以及 Organization ID

```
npm run start -- OPENAI_API_KEY=xxx ORG=xxx
```
