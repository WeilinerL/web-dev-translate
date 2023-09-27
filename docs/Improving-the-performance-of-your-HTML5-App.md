发布时间：Feb 14, 2011，pages 28/28，No.1

原文链接：[Improving the performance of your HTML5 App](https://web.dev/speed-html5/)

Translated by GPT-4 with ❤️（翻译过程中若有错误或遗漏，欢迎评论区指出 👏）

## 引言

HTML5 为我们提供了优秀的工具来增强网络应用的视觉外观。这在动画领域显示得尤为明显。然而，随着这一新能力的出现，也带来了新的挑战。事实上，这些挑战并不是真的新出现的，有时候，向你的友好的桌旁邻居，Flash 程序员问问她在过去是如何克服类似的问题，也许是有意义的。

无论如何，当你在动画工作中，让用户感觉到这些动画流畅至关重要。我们需要明白的是，超过认知阈值的每秒帧数增加并不能真正创建动画的顺畅感。遗憾的是，我们的大脑比这更聪明。你将学到，真正的每秒 30 帧的动画比有几帧在中间掉落的 60 帧动画要好得多。人们讨厌不流畅的感觉。

这篇文章将尝试给你提供工具和技术，帮助你改进自己应用的体验。

## 策略

我们绝对不想阻止你使用 HTML5 构建出色的、视觉震撼的应用。

然后，当你注意到性能可以稍微好一点时，回到这里，了解下你可以如何改进应用中的元素。首先做一些事情是有帮助的，但绝不要因此影响你的生产力。

## HTML5 的视觉保真度加强

### 硬件加速

在浏览器中，硬件加速是整体渲染性能重要的里程碑。一般的模式是需要由主 CPU 计算的任务，交给你的计算机图形适配器中的图形处理单元（GPU）完成。这可以大幅提升性能，也可以减小移动设备上的资源消耗。

#### 你的文档中的以下这些方面可以被 GPU 加速

- 一般的布局组合
- CSS3 过渡
- CSS3 3D 变换
- Canvas 绘图
- WebGL 3D 绘图

虽然 Canvas 和 WebGL 的加速是特殊目的的特性，可能不适用于你的特定应用，但是前三个方面可以帮助到几乎每一个应用变得更快。

#### 什么可以被加速?

通过将明确定义和特定的任务卸载到特殊用途的硬件，GPU 加速可以工作。一般的模式是将你的文档分解为多个“层”，这些层对你的页面被加速的方面保持不变。这些层使用传统的渲染管道进行渲染。然后 GPU 用来将这些层组合成一个单一的页面，应用可以随时被加速的“效果”。一个可能的结果是，在屏幕上的一个对象动画不需要在动画发生时对页面进行单一的“重新布局”。

你需要理解的是，你需要让渲染引擎容易识别何时可以应用它的 GPU 加速魔法。考虑下面的例子：

> 你想在浏览器中将一个元素从左到右进行动画。传统的方案是设置一个 JavaScript 计时器，然后每隔 N 毫秒设置样式对象的"left" 属性。

虽然这种方法可行，但浏览器并不清楚你正在执行的操作应该被人类感知为连贯的动画。现在，当你通过 CSS3 过渡实现相同的视觉效果时，会发生什么：

> 现在，你只需要定义对象的最终位置，然后告诉浏览器在一段时间内执行到最终目标的动画。

浏览器如何实现这个动画对于开发者来说完全是隐藏的。这也就意味着，浏览器能够应用像 GPU 加速这样的技巧来达到定义的目标。

Chrome 有两个有用的命令行参数可以帮助调试 GPU 加速：

1.  `--show-composited-layer-borders` 在被 GPU 操作的元素周围显示红色边框。确认你的操作发生在 GPU 层很有用。
2.  `--show-paint-rects` 所有非 GPU 的改变都会被绘制，这会在所有被重绘的区域投出一个轻微的边框。你可以看到浏览器在动作中优化绘画区域。

Safari 有类似的运行时标记，[这里描述了](http://mir.aculo.us/2011/02/08/visualizing-webkits-hardware-acceleration/)。

### CSS3 过渡

CSS 过渡使得动画样式对每个人都变得容易，但它们也是一个聪明的性能特性。因为 CSS 过渡由浏览器管理，所以它的动画准确性可以大大提高，而且在许多情况下可以硬件加速。目前，WebKit（Chrome，Safari，iOS）已经实现了硬件加速的 CSS 变换，但这一特性很快也会在其他浏览器和平台上实现。

你可以使用 [`transitionEnd`](https://developer.mozilla.org/CSS/CSS_transitions) 事件将这一功能脚本化，使其变成强大的组合，尽管现在，要捕获所有支持的过渡结束事件，意味着要监听 `webkitTransitionEnd transitionend oTransitionEnd`。

现在许多库已经引入了利用过渡（如果存在）的动画 API，并在其他情况下退回到标准 DOM 样式动画。例如 [scripty2](http://scripty2.com/)、[YUI transition](http://developer.yahoo.com/yui/3/transition/)、[jQuery animate enhanced](http://playground.benbarnett.net/jquery-animate-enhanced/)。

### CSS3 Translate

我确认你之前一定在页面上调整过元素的 x/y 位置。你可能调整了内联样式的左边和顶部属性。有了 2D 转换，我们可以使用 `translate()` 功能来复制这种行为。

我们可以将这个与 DOM 动画结合起来，以便使用最好的功能

```html
<div style="position:relative; height:120px;" class="hwaccel">
  <div
    style="padding:5px; width:100px; height:100px; background:papayaWhip;              position:absolute;"
    id="box"
  ></div>
</div>
<script>
  document.querySelector('#box').addEventListener('click', moveIt, false);
  function moveIt(evt) {
    var elem = evt.target;

    if (Modernizr.csstransforms && Modernizr.csstransitions) {
    // vendor prefixes omitted here for brevity
    elem.style.transition = 'all 3s ease-out';
    elem.style.transform = 'translateX(600px)';

    } else {
    // if an older browser, fall back to jQuery animate
    jQuery(elem).animate({ 'left': '600px'}, 3000);
    }
  }
</script>
```

我们用 Modernizr 来测试 CSS 2D Transform 和 CSS 过渡的功能，如果有，我们将使用 translate 来改变位置。如果这是用过渡进行动画，那么浏览器很可能可以对其进行硬件加速。为了给浏览器进一步的推动，我们将使用上面的 "magic CSS bullet"。

如果我们的浏览器能力较弱，我们将使用 jQuery 来移动我们的元素。你可以选用由 Louis-Remi Babe 提供的 [jQuery Transform polyfill plugin](http://louisremi.github.io/jquery.transform.js/index.html) 来自动进行这整个过程。

### `window.requestAnimationFrame`

`requestAnimationFrame` 是由 Mozilla 介绍的，并由 WebKit 进行了迭代，目标是为你提供一个运行动画的原生 API，无论它们是基于 DOM/CSS 的，还是基于 `<canvas>` 或 WebGL 的。浏览器可以将并发动画优化成一个单一的回流和重绘周期，从而导致更高的动画真实感。例如，与 CSS 过渡或 SVG SMIL 同步的 JS 基础动画。此外，**如果你在不可见的标签页中运行动画循环，浏览器不会继续运行**，这意味着 CPU、GPU 和内存的使用都更少，从而大大延长了电池寿命。

关于如何以及为什么使用 `requestAnimationFrame` 的更多详细信息，请查看 Paul Irish 的文章[使用 requestAnimationFrame 进行智能动画](http://paulirish.com/2011/requestanimationframe-for-smart-animating/)。

## 分析性能

当你发现你的应用程序的速度可以得到提高时，就该深入研究性能分析了，以发现在哪些地方进行优化可以带来最大的收益。优化通常会对你的源代码的可维护性产生负面影响，因此只有在必要的时候才应该应用。性能分析会告诉你当性能得到提高时，你的代码中哪些部分会带来最大的收益。

### JavaScript 性能分析

JavaScript 分析器可以通过测量执行每个单独函数从开始到结束所需的时间，给你一个在 JavaScript 函数层级上应用性能的概览。

一个函数的总执行时间是从顶部到底部执行它所需的总时间。净执行时间是总执行时间减去执行从函数调用的函数所需的时间。

有些函数被调用的次数比其他的多。分析器通常会给你提供所有调用运行所需的时间，以及平均、最小和最大执行时间。

更多的详细信息，请查阅 [Chrome 开发者工具文档中的性能分析](http://code.google.com/chrome/devtools/docs/profiles.html)。

#### DOM

JavaScript 的性能对于你的应用程序的流畅性和响应性有很大影响。理解这一点很重要：虽然 JavaScript 分析器测量的是你的 JavaScript 的执行时间，但它们也间接地测量了进行 DOM 操作的时间。这些 DOM 操作往往是你性能问题的核心。

```js
function drawArray(array) {
    for(var i = 0; i < array.length; i++) {
        document.getElementById('test').innerHTML += array[i]; // 不好 :(
    }
}
```

例如，在上面的代码中，几乎没有时间用于执行实际的 JavaScript。但很可能 drawArray 函数会在你的分析器中显示出来，因为它以一种非常浪费的方式与 DOM 进行交互。

#### 技巧和提示

##### 匿名函数

匿名函数不容易进行分析，因为它们本质上没有名字，所以在分析器中不容易显示出来。有两种方法可以解决这个问题：

```js
$('.stuff').each(function() { ... });
```

重写为：

```js
$('.stuff').each(function workOnStuff() { ... });
```

很少有人知道 JavaScript 支持命名函数表达式。这样做可以让它们在分析器中完美显示。但是这个方法有一个问题：命名的表达式实际上会将函数名放入当前的词法作用域。这可能会覆盖其他符号，所以要小心。

##### 分析长函数

假设你有一个长函数，你怀疑其中的一小部分可能是你性能问题的原因。有两种方法可以找出问题的部分：

1.  正确的方法：重构你的代码，不包含任何长函数。
2.  诡计多端的方法：在代码中添加以命名的自调用函数形式的语句。如果你稍微小心一点，这并不会改变语义，并且它能让你的函数的部分内容在分析器中作为单独的函数显示出来：

```js
function myLongFunction() {
    ...
    (function doAPartOfTheWork() {
        ...
    })();
    ...
}
```

不要忘记在性能分析完成后删除这些额外的函数；甚至可以用它们作为重构你的代码的起点。

### DOM Profiling

最新的 Chrome Web Inspector 开发工具包含了新的"Timeline View"，它展示了浏览器执行的低级操作的时间线。你可以使用这些信息来优化你的 DOM 操作。你应该设法减少浏览器在执行你的代码时必须执行的"actions"的数量。

时间线视图可以创建大量的信息。因此，你应该尽量创建可以单独执行的最小测试用例。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c16dc6ae3bc748649e71ceec29a94349~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=475\&h=173\&s=13392\&e=png\&b=f1f1f1" alt="DOM Profiling"  /></p>

上图显示了一个非常简单脚本的时间线视图输出。左侧窗格按照时间顺序显示了浏览器执行的操作，而右侧的时间线显示了单个操作实际消耗的时间。

[时间线视图的更多信息。](http://code.google.com/chrome/devtools/docs/timeline.html) 在互联网资源管理器中分析的另一种工具是[DynaTrace Ajax Edition](http://www.google.com/url?q=http%3A%2F%2Fajax.dynatrace.com%2Fajax%2Fen%2F&sa=D&sntz=1&usg=AFQjCNFXR0N-8Ja89DdI_cyTEA3vdPPP5w)。

### 分析策略

#### 单独处理方面

当你想对你的应用进行分析时，试图尽可能准确地找出可能引发慢速的功能。然后尝试只运行与这些应用功能部分相关的代码进行分析。这将使分析数据更容易解释，因为它与不相关的代码路径没有混淆。你的应用中单独元素的好例子可能是：

1.  启动时间（激活分析器，重新加载应用，等待初始化完成，停止分析器）。
2.  点击一个按钮和随后的动画（启动分析器，点击按钮，等待动画完成，停止分析器）。

##### GUI 分析

在 GUI 程序中执行应用的正确部分可能比优化你的 3D 引擎的光线追踪器要困难。例如，当你想分析点击按钮时发生的事情时，你可能会触发与此无关的鼠标悬停事件，这可能使你的结果不那么明确。尝试避免这种情况:)

##### 程序化接口

也有一个程序化接口可以激活调试器。这允许精确控制分析开始和结束的时间。

开始一个分析：

`console.profile()`

停止分析：

`console.profileEnd()`

#### 重复性

当你做分析时，确保你实际上可以重现你的结果。只有这样，你才能确定你的优化是否实际上带来了改进。同时，分析是在你的整个电脑的上下文中完成的。这不是一门精确的科学。单个分析运行可能会受到你计算机上许多其他事情的影响：

1.  你自己的应用中无关的定时器在你测量其他事情时触发。
2.  垃圾收集器正在工作。
3.  你的浏览器中的另一个标签在同一操作线程中做大量工作。
4.  你的计算机上的另一个程序使用了 CPU，从而使你的应用变慢。
5.  地球重力场的突然变化。

同样，有意义的是在一次分析会话中多次执行相同的代码路径。这样，你可以减少上述因素的影响，慢速部分可能更明显。

#### 测量，改进，测量

当你发现程序中的慢速点时，试图想出改善执行行为的方法。你改变了代码后，再次进行分析。如果你对结果满意，就继续进行，如果你没有看到改进，你可能应该撤销你的更改，而不是因为"不能伤害"就留下它。

## 优化策略

### 最小化 DOM 交互

提高 Web 客户端应用速度的一个常见主题是最小化 DOM 交互。虽然 JavaScript 引擎的速度提高了一个数量级，但访问 DOM 的速度并没有以同样的速度变快。这也是一个非常实际的原因，例如布局和在屏幕上绘制东西就需要时间，这是永远无法改变的事实。

#### 缓存 DOM 节点

每当你从 DOM 中检索一个节点或一组节点时，试着想一想你是否可能在后续的计算（或者仅仅是下一个循环迭代）中重复使用它们。只要你实际上并没有在相关区域内添加或删除节点，这通常就是这样的情况。

之前：

```js
function getElements() {
  return $(".my-class");
}
```

之后：

```js
var cachedElements;
function getElements() {
  if (cachedElements) {
    return cachedElements;
  }
  cachedElements = $(".my-class");
  return cachedElements;
}
```

#### 缓存属性值

你可以用同样的方式缓存 DOM 节点的属性值。假设你正在动态改变一个节点风格的属性。如果你知道你（或者在这代码的部分）是对这个属性唯一的操作者，那么你可以在每个循环迭代中缓存该属性的最新值，以便你不必反复读取。

之前:

```js
setInterval(function () {
  var ele = $("#element");
  var left = parseInt(ele.css("left"), 10);
  ele.css("left", left + 5 + "px");
}, 1000 / 30);
```

之后:

```js
var ele = $("#element");
var left = parseInt(ele.css("left"), 10);
setInterval(function () {
  left += 5;
  ele.css("left", left + "px");
}, 1000 / 30);
```

#### 将 DOM 操作移出循环

循环通常是优化的热点。尝试寻找方法将实际的数值计算与操作 DOM 分开。通常可以先执行计算，然后在完成之后一次性应用所有结果。

之前：

```js
document.getElementById("target").innerHTML = "";
for (var i = 0; i < array.length; i++) {
  var val = doSomething(array[i]);
  document.getElementById("target").innerHTML += val;
}
```

之后：

```js
var stringBuilder = [];
for (var i = 0; i < array.length; i++) {
  var val = doSomething(array[i]);
  stringBuilder.push(val);
}
document.getElementById("target").innerHTML = stringBuilder.join("");
```

#### 重绘和重排

如之前所讨论的，访问 DOM 相对较慢。当你的代码正在读取一个因为你的代码最近修改了 DOM 中的相关内容而需要重新计算的值时，它会变得非常慢。因此，应该避免交错读取和写入 DOM 的访问。理想情况下，你的代码应该总是分为两个阶段：

- 第一阶段：读取你的代码需要的 DOM 值
- 第二阶段：修改 DOM

尝试不要编程如下模式：

- 第一阶段：读取 DOM 的值
- 第二阶段：修改 DOM
- 第三阶段：阅读更多内容
- 第四阶段：在其他地方修改 DOM。

之前：

```js
function paintSlow() {
  var left1 = $("#thing1").css("left");
  $("#otherThing1").css("left", left);
  var left2 = $("#thing2").css("left");
  $("#otherThing2").css("left", left);
}
```

之后：

```js
function paintFast() {
  var left1 = $("#thing1").css("left");
  var left2 = $("#thing2").css("left");
  $("#otherThing1").css("left", left);
  $("#otherThing2").css("left", left);
}
```

以上建议应对在一个 JavaScript 执行环境中发生的动作加以考虑。（例如：在事件处理器，间隔处理器或处理 Ajax 响应中。）

执行上述的函数`paintSlow()`会生成此图像：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75494e80e08444f7a5a1bce4713223a2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=536\&h=212\&s=16545\&e=png\&b=f6f6f6" alt="paintSlow()"  /></p>

切换到更快的实现会生成此图像：

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36da825f10de432e8795ea584de50f78~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=360\&h=234\&s=17689\&e=png\&b=f3f1f1" alt="Faster implementation"  /></p>

这些图像展示了通过重新排列代码访问 DOM 的方式，可以大大增强渲染性能。在这种情况下，为了产生相同的结果，原始代码必须重新计算样式并布置页面两次。类似的优化可以应用于所有的"真实世界"代码，并产生一些非常显著的结果。

阅读更多：[**渲染：重新绘制, 重流/重布局, 重设样式** 由 Stoyan Stefanov](http://calendar.perfplanet.com/2009/rendering-repaint-reflow-relayout-restyle/)

#### 重绘和事件循环

浏览器中的 JavaScript 执行按照"事件循环"模型进行。默认情况下，浏览器处于"空闲"状态。这种状态可以被用户交互事件或 JavaScript 计时器或 Ajax 回调等事项打断。每当在这样的中断点上运行一段 JavaScript 代码时，浏览器通常会等待它完成再刷新屏幕之前（长时间运行的 JavaScript 或警告框等高优先级事件可能是例外）。

后果

1.  如果你的 JavaScript 动画周期需要长于 1/30 秒才能执行，那么你将无法创作动画，因为浏览器在 JS 执行期间不会进行重绘。当你期望处理用户事件时，你需要快得多。
2.  有时后投入些延时到一些 JavaScript 动作上或许会很方便。例如`setTimeout(function() { ... }, 0)` 这个实际上是告诉浏览器在事件循环再次空闲时执行回调（存在的一些浏览器至少会等待 10 毫秒）。但这样会加入两个临近的 JavaScript 执行周期。它们可能都会触发一次屏幕重绘，使得总绘画时间翻倍。浏览器是否真的触发两次重绘取决于其内部算法。

常规版：

```js
function paintFast() {
  var height1 = $("#thing1").css("height");
  var height2 = $("#thing2").css("height");
  $("#otherThing1").css("height", "20px");
  $("#otherThing2").css("height", "20px");
}
```

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c16dc6ae3bc748649e71ceec29a94349~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=475\&h=173\&s=13392\&e=png\&b=f1f1f1" alt="Redraws and the Event Loop"  /></p>

我们加入一些延迟：

```js
function paintALittleLater() {
var height1 = $("#thing1").css("height");
  var height2 = $("#thing2").css("height");
$("#otherThing1").css("height", "20px");
  setTimeout(function () {
    $("#otherThing2").css("height", "20px");
}, 10);
}
```

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cdfcb1148e145a1a862bffe8eb539be~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=385&h=250&s=50483&e=png&b=cad3dd" alt="image.png"  /></p>

延迟版本显示，尽管对页面的两次更改只相隔 1/100 秒，但浏览器仍会绘制两次。

### 延迟初始化

用户希望 web 应用程序加载速度快，响应感强。然而，用户对他们感知到的慢的阈值会因他们正在进行的行为而有所不同。例如，应用程序永远不应该在鼠标滑过事件上进行大量计算，因为这可能在用户继续移动鼠标时创建不良的用户体验。然而，用户习惯了在他们点击一个按钮后接受一点延迟。

因此，可能有意义的是将你的初始化代码尽可能晚地执行(例如，当用户点击激活应用程序的特定组件的按钮时)。

之前：

```js
var things = $(".ele > .other * div.className");
$("#button").click(function () {
  things.show();
});
```

之后：

```js
$("#button").click(function () {
  $(".ele > .other * div.className").show();
});
```

### 事件委托

在页面上散布事件处理程序可能需要相对较长的时间，而且一旦动态替换元素，需要重新附加事件处理程序到新元素，可能也会很繁琐。

在这种情况下的解决方案是使用一种称为事件委托的技术。不是将单个事件处理程序附加到元素，而是利用许多浏览器事件的冒泡性质，实际上将事件处理程序附加到父节点，并检查事件的目标节点以查看事件是否感兴趣。

在 jQuery 中，这可以很容易地表示为：

```js
$('#parentNode').delegate('.button', 'click', function() { ... });
```

#### 何时不应使用事件委托

有时候也可能出现相反的情况：你正在使用事件委托，但遇到了性能问题。基本上，事件委托允许我们在初始化时保持恒定的复杂度。然而，每次调用事件时都需要支付检查事件是否感兴趣的代价。这可能会产生很大的开销，尤其是对于像 "mouseover" 或 "mousemove" 这样频繁发生的事件。

## 典型问题和解决方案

### 我在 `$(document).ready` 中做的事情耗费了很长时间

Malte 的个人建议：永远不要在 `$(document).ready` 中做任何事情。尽量以最终形式提供你的文档。好吧，你可以注册事件监听器，但只能使用 id 选择器和/或使用事件委托。对于像 "mousemove" 这样的消耗大的事件，延迟注册直到它们需要被触发 (mouseover 事件在相关元素上触发)。

如果你确实需要做一些事情，比如发起 Ajax 请求获取实际数据，那么可以展示一个优雅的动画。如果是动画 GIF 或类似的东西，你可能要把动画作为数据 URI 包含进来。

### 自从我在页面上添加了 Flash 电影，一切都变得非常慢

在页面上添加 Flash 会使渲染速度稍微降低，因为窗口的最终布局需要浏览器和 Flash 插件之间进行 "协商"。当你不能完全避免在页面上放 Flash 时，请确保把 Flash 参数 "wmode" 设置为 "window" (这是默认值)。这将禁用 HTML 和 Flash 元素的复合能力 (你将无法看到位于 Flash 电影上方的 HTML 元素，你的 Flash 电影不能透明)。这可能会带来不便，但会大幅度提高你的性能。例如，看看 [youtube.com](http://youtube.com) 是如何小心避免在主播放器上方放置图层的。

### 我把东西保存到 localStorage 里，现在我的应用程序开始卡顿

写入 localStorage 是一个涉及启动硬盘的同步操作。你永远不会想在执行动画时进行 "长时间运行" 的同步操作。把访问 localStorage 的操作放在你的代码中，你确定用户处于空闲状态，没有动画在执行的地方。

### 分析结果指向了一个 jQuery 选择器非常慢

首先你要确保你的选择器可以通过 [document.querySelectorAll](https://developer.mozilla.org/DOM/Document.querySelectorAll) 运行。你可以在 JavaScript 控制台测试这个。如果出现异常，重写你的选择器，不要使用你的 JavaScript 框架的任何特殊扩展。这将把你的选择器在现代浏览器中提速一个数量级。

如果这都不管用，或者你还想在现代浏览器中速度快一些，那么请遵循以下准则：

- 把你的选择器的右边尽可能地具体。
- 在选择器的最右边用一个你不常用的标签名。
- 如果什么都不管用，考虑重写一些东西，这样你就可以使用 id 选择器

### 所有这些 DOM 操作花费了许多时间

大量的 DOM 节点插入、移除和更新可能会非常慢。这通常可以通过生成一个大的 html 字符串，然后使用 `domNode.innerHTML = newHTML` 来替换旧的内容来优化。注意，这可能对代码的可维护性很不好，可能在 IE 中创建内存链接，所以要小心。

另一个常见的问题是，你的初始化代码可能会创建很多的 HTML。比如，一个 jQuery 插件，它把一个选择框转换成一堆 div，因为设计师就是这么要求的，完全不考虑用户体验最佳实践。如果你真的希望你的页面快速加载，那就不要那样做。相反，从服务器端提供所有的标记，以其最终形式。这同样有许多问题，所以要仔细考虑是否值得为了速度做出这种妥协。

## 工具

1.  [JSPerf - 用于 JavaScript 小片段的性能测试](http://jsperf.com)
2.  [Firebug - 用于在 Firefox 中进行分析](http://getfirebug.com/)
3.  [Google Chrome 开发者工具](http://code.google.com/chrome/devtools/) (在 Safari 中可作为 WebInspector 使用)
4.  [DOM Monster - 用于优化 DOM 性能](http://mir.aculo.us/dom-monster/)
5.  [DynaTrace Ajax Edition - 用于在 Internet Explorer 中分析和优化绘制](http://ajax.dynatrace.com/ajax)

## 进一步阅读

1.  [Google Speed](http://code.google.com/speed/)
2.  [Paul Irish 关于 jQuery 性能的文章](http://paulirish.com/2009/perf/)
3.  [极致 JavaScript 性能 (幻灯片)](http://www.slideshare.net/madrobby/extreme-javascript-performance)### 最后更新

2011 年 2 月 14 日 — [改进文章](https://github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/blog/speed-html5/index.md)

[返回所有文章](/blog)

分享

[订阅](/newsletter/)

[](/)

我们希望帮助你构建美观、易用、快速、安全的网站，支持跨浏览器使用，适应所有的用户。这个网站是我们为您提供帮助的主页，内容由 Chrome 团队的成员和外部专家撰写。

### 贡献

- [报告错误](https://github.com/GoogleChrome/web.dev/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
- [查看源代码](https://github.com/googlechrome/web.dev)

### 相关内容

- [developer.chrome.com](https://developer.chrome.com/)
- [Chrome 更新](https://blog.chromium.org/)
- [案例研究](/tags/case-study/)
- [播客](/podcasts/)
- [节目](/shows/)

### 联系

- [Twitter](https://www.twitter.com/ChromiumDev)

- [YouTube](https://www.youtube.com/user/ChromeDevelopers)

- [![Google Developers转存失败，建议直接上传图片文件](/images/lockup-color.png)](https://developers.google.com/)

- [Chrome](https://developer.chrome.com/)

- [Firebase](https://firebase.google.com/)

- [Google Cloud Platform](https://cloud.google.com/)

- [所有产品](https://developers.google.com/products)

深色主题

- [使用条款 & 隐私保护](https://policies.google.com/)
- [社区指南](/community-guidelines/)

除非另有说明，否则本页面内容遵循[创作共享许可协议 4.0](https://creativecommons.org/licenses/by/4.0/)，并且代码样本遵循[Apache 2.0 许可证](https://www.apache.org/licenses/LICENSE-2.0)。详情，请参阅[Google 开发者站点政策](https://developers.google.com/terms/site-policies)。
