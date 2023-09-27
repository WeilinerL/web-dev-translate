发布时间：Feb 24, 2010，pages 28/28，No.17

原文链接：[Using the Notifications API](https://web.dev/notifications-quick/)

Translated by GPT-4 with ❤️（翻译过程中若有错误或遗漏，欢迎评论区指出 👏）

**警告**

> 本文已过时，引用了一个已被废弃的 API。要获得对[通知 API](http://www.w3.org/TR/notifications/)（Chrome，Firefox 和 Safari 都支持）的现代覆盖，请阅读[MDN 关于 Notification 的文档](https://developer.mozilla.org/docs/Web/API/notification)。[Notify.js](https://github.com/alexgibson/notify.js)也为 API 提供了一个很好的抽象。

## 简介

[通知 API](http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification)允许你向用户显示特定事件的通知，无论被动（新的电子邮件，推文或日历事件）还是在用户交互时无视哪个标签页被聚焦。这里有一个[技术草案](http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification)，但它目前尚未成为任何标准。

你可以按照这几个简单的步骤，在短短几分钟内实现通知：

## 步骤 1：检查是否支持通知 API

我们检查是否支持`webkitNotifications`。请注意，之所以命名为`webkitNotifications`是因为它是草案规范的一部分。最终规格将会有一个 notifications() 函数代替。

```js
// 检查是否支持通知//你可以省略'window'关键字if (window.webkitNotifications) {console.log("支持通知!");}else {console.log("此浏览器/OS版本暂不支持通知。");}
```

## 步骤 2：让用户赋予网站显示通知的权限

我们提到的任何构造函数都会在用户尚未手动向网站授予显示通知的权限的情况下抛出一个安全错误。要处理异常，你可以使用 try-catch 语句，也可以用 `checkPermission` 方法来达到同样的目的。

```js
document.querySelector('#show_button').addEventListener('click', function() {if (window.webkitNotifications.checkPermission() == 0) { // 0是 PERMISSION_ALLOWED// 在步骤2中定义的函数window.webkitNotifications.createNotification(    'icon.png', '通知标题', '通知内容...');} else {window.webkitNotifications.requestPermission();}}, false);
```

如果 web 应用没有权限显示通知，那么`requestPermission`方法会显示一个信息栏：

<p align=center><img src="undefined" alt="undefined"  /></p>

在 Google Chrome 中的通知权限信息栏。

然而，**非常重要**的一点是，`requestPermission`方法只在由用户操作触发的事件处理器中工作，比如鼠标或键盘事件，这样可以避免弹出不必要的信息栏。在这个例子中，用户操作就是点击带有 id "show_button"的按钮。如果用户没有在某个点明确地点击一个按钮或链接去触发`requestPermission`，上面的代码片段将不起作用。

## 步骤 3：附加监听器和其他操作

```js
document.querySelector('#show_button').addEventListener('click', function() {  if (window.webkitNotifications.checkPermission() == 0) { // 0是 PERMISSION_ALLOWED    // 在步骤2中定义的函数    notification_test = window.webkitNotifications.createNotification(      'icon.png', 'Notification Title', 'Notification content...');    notification_test.ondisplay = function() { ... do something ... };    notification_test.onclose = function() { ... do something else ... };    notification_test.show();  } else {    window.webkitNotifications.requestPermission();  }}, false);
```

至此，你可能想创建你自己的 Notification 类，将所有这些事件和操作封装起来，使代码更简洁，尽管这超出了这个教程的范围。

### 最后更新于

2010 年 2 月 24 日 - [改进本文](https://github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/blog/notifications-quick/index.md)
