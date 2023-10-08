发布时间：May 1, 2019

原文链接：[What is speed?](https://web.dev/what-is-speed/)

Translated by GPT-4 with ❤️（翻译过程中若有错误或遗漏，欢迎评论区指出👏）

那么，速度确实很重要，但我们到底是如何理解它的呢？拥有一个快速的站点是什么意思？

我们常常听到人们说他们的网站在x.xx秒或者类似的时间内加载完成，但[加载并不是一个瞬间的事件](/user-centric-performance-metrics/)；它是一个没有单个度量完全能捕捉的体验。在加载体验过程中，有多个瞬间可能会影响用户是否将其视为“快”，如果你只专注于其中一个，你可能会错过在其余时间内发生的糟糕的体验。

与其只用一种度量标准来测量加载，不如在影响用户感知加载速度的每一个瞬间进行计时。当用户导航到一个网页时，他们一般会寻找以下几种类型的反馈：

![用户一般寻找的反馈的图片](https://web-dev.imgix.net/image/admin/NGX9WC2BXTRY6FP5TTGl.png?auto=format)

传统的性能度量，如加载时间或DOM内容加载时间，是不可靠的，因为它们可能与这些反馈里程碑对应，也可能不对应。因此，出现了[额外的度量](https://developer.chrome.com/docs/lighthouse/performance/#metrics)，可以用来理解页面何时向用户提供此类反馈：

![速度度量的图片](https://web-dev.imgix.net/image/admin/tz1aubGGvefskjcPfjBQ.png?auto=format)

理解这些度量所提供的不同见解是很重要的，然后确定对你的用户体验来说哪些是重要的。一些品牌甚至定义了额外的定制度量，来满足人们对其服务的期望。在Pinterest的情况下，用户希望看到图片，所以他们定义了一个定制的度量，[用户等待时间](https://www.youtube.com/watch?v=Xryhxi45Q5M)，将交互时间和首页图片加载时间结合在一起。

尽管加载不仅仅是一瞬间的事件，但是为了简化报告或者比较，有一个单个度量标准仍然是有用的：[速度指数](https://developer.chrome.com/docs/lighthouse/performance/speed-index/)和[灯塔得分](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)都可以被这样使用。

[性能](https://web.dev/tags/performance/)

### 最后更新

2019年5月1日 — [改进文章](https://github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/fast/what-is-speed/index.md)
