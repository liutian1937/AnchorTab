AnchorTab.js

经常看到一些单页面网站用到滚动条滚动的时候，导航条的部分跟随着更换。
于是写了一个用于实现滚动条控制锚点自动切换的插件。
此插件适用于单页网站中。

更新情况：http://www.niumowang.org/js/anchortab/

使用方法：

new AnchorTab({
	section : '#section_wrap ul',
	nav: '#nav a',
	follow : '#nav',
	speed:30
});


section 为需要循环的容器。格式为 "#id tagName" 的形式（不设置默认为#section_wrap ul）
nav 是导航条部分。格式为"#id tagName" 的形式（不设置默认为#nav a）
follow 是针对ie6不支持fixed的处理。可以根据你的代码结构自行设置需要跟随窗口滚动的标签。不设置默认为不滚动。设置后只是针对ie6的情况进行处理。
speed 为锚点跳转的时候滚动的速度，值越大越慢。（不设置默认为30）

Email : ok8008@yeah.net