发布时间：Sep 7, 2010，pages 28/28，No.10

原文链接：[3D and CSS](https://web.dev/3d-css/)

Translated by GPT-4 with ❤️（翻译过程中若有错误或遗漏，欢迎评论区指出 👏）

## 引言 [#](#introduction)

长久以来，3D 一直是桌面应用的领域。然而，最近，随着访问本地 GPU 加速的先进智能手机的介绍，我们开始几乎在所有地方看到 3D 的使用。

通常，3D 被主要用作游戏设备或一些高级用户界面。直到 WPF 和 Silverlight 引入了的角度转换，应用 3D 效果到用户界面元素的合适模型才对应用开发者来说成为了可行的解决方案(毕竟，3D 并不简单)。

[CSS 3D 变换模型](http://www.w3.org/TR/css3-3d-transforms/)在 2009 年 3 月作为草案规范引入，以便允许网络开发者创建有趣和引人入胜的用户界面，通过允许应用作者对任何视觉 DOM 元素应用 3D 投影变换。

CSS 3D 转换工作草案是对[CSS 2D 转换模型](http://www.w3.org/TR/css3-2d-transforms)的逻辑扩展，引入了一些额外的属性，包括：透视、旋转和在 3D 空间中的转换。

我们从未能像现在这样轻松地构建 3D 界面。这些技术降低了进入的障碍。你再也不必成为数学奇才才能构建 3d 元素。

必须注意的是，CSS 3D 模块的设计目的是帮助开发人员构建丰富和视觉上有趣的应用程序，而不是让你能够构建身临其境的 3D 世界。

## 浏览器支持和硬件加速 [#](#browser-support-and-hardware-acceleration)

### \-webkit-perspective [#](#webkit-perspective)

浏览器支持

- Chrome 36, 可支持 36
- Firefox 16, 可支持 16
- Edge 12, 可支持 12
- Safari 9, 可支持 9

[来源](https://developer.mozilla.org/docs/Web/CSS/perspective#browser_compatibility)

### \-webkit-transform-3d [#](#webkit-transform-3d)

浏览器支持

- Chrome 2, 支持 2
- Firefox 49, 支持 49
- Edge 12, 支持 12
- Safari 4, 支持 4

[来源](https://developer.mozilla.org/docs/Web/CSS/@media/-webkit-transform-3d#browser_compatibility)

需要记住的重要信息是，尽管浏览器可能“支持”3D，但是由于硬件和驱动限制，它可能无法渲染 3D。基于 DOM 的 3D 场景可能非常消耗计算资源，因此浏览器供应商决定不采用纯软件渲染解决方案来减慢浏览器的速度，而是利用可能并非在所有平台上都可用的 GPU。

## 特性检测 [#](#feature-detection)

那么特性检测呢？我希望你不会问这个问题！开发者一直在使用像 Modernizr 这样的工具来检测对特定浏览器特性和能力的支持。虽然可以检测到对 3D 变换的支持，但无法检测硬件加速的存在，而硬件加速是关键成分。

## 基本样例 [#](#basic-sample)

没有什么比直接跳入实践更好的方法了。在这个样例中，我们将对一个任意 DOM 元素应用一组基本的旋转

我们首先在根元素上定义一个透视。

```html
<div
  style="-webkit-perspective: 800; perspective: 800; margin: 100px 0 0 50px"
></div>
```

视角非常重要，因为它决定了 3D 场景的深度如何渲染，1-1000 之间的值将产生非常明显的效果，而超过 1000 的值则较小。然后，我们添加一个 iframe 并围绕 Z 轴和 Y 轴应用 30 度的旋转

```html
<iframe
  src="http://www.html5rocks.com/"
  style="-webkit-transform: rotate3d(0, 1, 1, 30deg)"
></iframe>
```

砰！就是这样，该元素完全可以互动，在所有方面它都是一个完全成熟的 DOM 元素（除了现在看起来更酷）。如果你的浏览器不支持 3D 变换，什么都不会发生。你只会看到一个没有应用旋转的简单 iframe。如果你的浏览器支持 3D 变换，但是没有硬件加速，那么它可能看起来有点奇怪。

## 动画 [#](#animating)

我喜欢 CSS3 3D 变换的一点是，它与 CSS 过渡模块的结合非常完美。在 CSS 中定义动画和过渡非常简单，并且将这些应用于 3D 也是一样。

要对已应用 3D 观点的元素进行动画处理非常简单。只需将“过渡”样式设置为“转换”，附加持续时间和动画功能。从那时起，对“变换”样式的任何更改都将被动画化。

我们已经将之前的示例重构为使用文档样式，而不是内联样式。这不仅清理了示例，还允许示例利用`:hover`伪选择器。通过使用`:hover`选择器，只需将鼠标移动到元素上，就可以发起过渡。太棒了！

## 总结 [#](#summary)

这只是快速浏览了一些可以使用 CSS 3D 变换应用到任何可见 DOM 元素的炫酷效果。还有许多事情可以做，而这个教程中并未涵盖。

### 最后更新

2010 年 9 月 7 日 - [改进文章](https://github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/blog/3d-css/index.md)