# web.dev

"web.dev" 是由 Google 提供的一个在线资源，旨在帮助开发人员提高他们的网站性能、质量和安全性。该网站提供了各种工具、指南和最佳实践，以帮助开发人员优化其网站并提供更好的用户体验。

# description

本项目用于爬取 web.dev 官网的相关文章，并通过chat-gpt-4进行翻译，最终保存为 md 文件

# start
为了防止被刷，这里通过参数注入openai的API key以及Organization ID

```
npm run start -- OPENAI_API_KEY=xxx ORG=xxx
```
