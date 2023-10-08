# 快速加载

提升网站性能的技术。
原文：https://web.dev/fast/

## Overview

在构建现代网络体验时，如果您希望获得快速的体验并加以维持，那么对网站进行衡量、优化和监控就显得至关重要。性能对于任何线上项目的成功都起着重要作用，因为高性能网站比性能欠佳的网站更能吸引和留住用户。网站应该专注于优化以用户为中心的幸福指标。Lighthouse（已内置在 web.dev 中！）等工具可以突出这些指标，并帮助您采取正确的步骤来提高性能。若想“维持快速的体验”，请设置并执行性能预算来帮助您的团队在所需的限制条件内工作，从而在您的网站推出后继续提供快速的加载体验并让用户满意。

---

### 介绍

- [为什么速度很重要？](https://web.dev/why-speed-matters/)
- [What is speed?](https://web.dev/what-is-speed/)
- [How to measure speed?](https://web.dev/how-to-measure-speed/)
- [How to stay fast?](https://web.dev/how-to-stay-fast/)

### Core Web Vitals

- [Web 指标](https://web.dev/vitals/)
- [以用户为中心的性能指标](https://web.dev/user-centric-performance-metrics/)
- [定义核心 Web 指标阈值](https://web.dev/defining-core-web-vitals-thresholds/)
- [Largest Contentful Paint 最大内容绘制 (LCP)](https://web.dev/lcp/)
- [Cumulative Layout Shift 累积布局偏移 (CLS)](https://web.dev/cls/)
- [First Input Delay 首次输入延迟 (FID)](https://web.dev/fid/)
- [Interaction to Next Paint (INP)](https://web.dev/inp/)
- [优化 Largest Contentful Paint 最大内容绘制](https://web.dev/optimize-lcp/)
- [优化 Cumulative Layout Shift 累积布局偏移](https://web.dev/optimize-cls/)
- [优化 First Input Delay 首次输入延迟](https://web.dev/optimize-fid/)
- [Optimize Interaction to Next Paint](https://web.dev/optimize-inp/)
- [核心 Web 指标的测量工具](https://web.dev/vitals-tools/)

### 设置性能预算

- [Performance budgets 101](https://web.dev/performance-budgets-101/)
- [Your first performance budget](https://web.dev/your-first-performance-budget/)
- [Incorporate performance budgets into your build process](https://web.dev/incorporate-performance-budgets-into-your-build-tools/)
- [使用 Lighthouse 进行性能预算](https://web.dev/use-lighthouse-for-performance-budgets/)
- [Using bundlesize with Travis CI](https://web.dev/using-bundlesize-with-travis-ci/)
- [Using Lighthouse Bot to set a performance budget](https://web.dev/using-lighthouse-bot-to-set-a-performance-budget/)
- [Performance monitoring with Lighthouse CI](https://web.dev/lighthouse-ci/)

### 优化图片

- [Choose the right image format](https://web.dev/choose-the-right-image-format/)
- [Choose the correct level of compression](https://web.dev/compress-images/)
- [使用 Imagemin 压缩图像](https://web.dev/use-imagemin-to-compress-images/)
- [Replace animated GIFs with video for faster pageloads](https://web.dev/replace-gifs-with-videos/)
- [提供响应式图像](https://web.dev/serve-responsive-images/)
- [Serve images with correct dimensions](https://web.dev/serve-images-with-correct-dimensions/)
- [使用 WebP 图像](https://web.dev/serve-images-webp/)
- [使用图像 CDN 优化图像](https://web.dev/image-cdns/)

### 延迟加载图片和视频

- [使用延迟加载提高加载速度](https://web.dev/lazy-loading/)
- [延迟加载图像](https://web.dev/lazy-loading-images/)
- [延迟加载视频](https://web.dev/lazy-loading-video/)
- [Browser-level image lazy loading for the web](https://web.dev/browser-level-image-lazy-loading/)

### 优化 JavaScript

- [Optimize long tasks](https://web.dev/optimize-long-tasks/)
- [使用 PRPL 模式实现即时加载](https://web.dev/apply-instant-loading-with-prpl/)
- [通过代码拆分减少 JavaScript 负载](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [删除未使用的代码](https://web.dev/remove-unused-code/)
- [缩小和压缩网络有效负载](https://web.dev/reduce-network-payloads-using-text-compression/)
- [Serve modern code to modern browsers for faster
  page loads](https://web.dev/serve-modern-code-to-modern-browsers/)
- [发布、传输和安装现代 JavaScript 以实现更快的应用程序](https://web.dev/publish-modern-javascript/)
- [CommonJS 如何让您的捆绑包变得更大](https://web.dev/commonjs-larger-bundles/)

### 优化资源交付

- [Content delivery networks (CDNs)](https://web.dev/content-delivery-networks/)
- [Prioritize resources](https://web.dev/prioritize-resources/)
- [预加载关键资产以提高加载速度](https://web.dev/preload-critical-assets/)
- [Establish network connections early to improve perceived page speed](https://web.dev/preconnect-and-dns-prefetch/)
- [Prefetch resources to speed up future navigations](https://web.dev/link-prefetch/)
- [快速播放音频和视频预加载](https://web.dev/fast-playback-with-preload/)
- [Optimize Time to First Byte](https://web.dev/optimize-ttfb/)

### 优化 CSS

- [延迟加载非关键 CSS](https://web.dev/defer-non-critical-css/)
- [Minify CSS](https://web.dev/minify-css/)
- [提取关键 CSS (Critical CSS)](https://web.dev/extract-critical-css/)
- [使用媒体查询优化 CSS 背景图像](https://web.dev/optimize-css-background-images-with-media-queries/)

### 优化第三方资源

- [Third-party JavaScript performance](https://web.dev/third-party-javascript/)
- [Identify slow third-party JavaScript](https://web.dev/identify-slow-third-party-javascript/)
- [高效加载第三方 JavaScript](https://web.dev/efficiently-load-third-party-javascript/)
- [Best practices for tags and tag managers](https://web.dev/tag-best-practices/)

### 优化网络字体

- [Best practices for fonts](https://web.dev/font-best-practices/)
- [在字体加载期间避免不可见的文本](https://web.dev/avoid-invisible-text/)
- [优化 WebFont 加载和呈现](https://web.dev/optimize-webfont-loading/)
- [减小 WebFont 大小](https://web.dev/reduce-webfont-size/)

### 针对网络质量优化

- [Adaptive serving based on network quality](https://web.dev/adaptive-serving-based-on-network-quality/)

### 对性能进行实测

- [Using the Chrome UX Report to look at performance in the field](https://web.dev/chrome-ux-report/)
- [Why lab and field data can be different (and what to do about it)](https://web.dev/lab-and-field-data-differences/)
- [Why is CrUX data different from my RUM data?](https://web.dev/crux-and-rum-differences/)

### 建立性能文化

- [The value of speed](https://web.dev/value-of-speed/)
- [How can performance improve conversion?](https://web.dev/how-can-performance-improve-conversion/)
- [What should you measure to improve performance?](https://web.dev/what-should-you-measure-to-improve-performance/)
- [How to report metrics and build a performance culture](https://web.dev/how-to-report-metrics/)
- [Fixing website speed cross-functionally](https://web.dev/fixing-website-speed-cross-functionally/)
- [Relating site speed and business metrics](https://web.dev/site-speed-and-business-metrics/)
