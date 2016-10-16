rules = [
	//Google
	{
		//防死循环教程: http://blog.sina.com.cn/s/blog_6df370b70100oqw5.html
		name: "Google搜索 >> 关闭安全搜索",
		from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)\f((?!hl=en-US|safe=off)\w)+\f/i,
		to: "https://www.google.com/search?$2&hl=en-US&safe=off",
		regex: true
	},
	//Baidu
	{
		//百度云盘分享页，手机版 重定向至 电脑版
		//详细说明：http://bbs.kafan.cn/thread-1814510-1-1.html
		name: "百度盘wap/link >> share/link",
		from: /^https?:\/\/(pan|yun)\.baidu\.com\/(wap\/link)(.*)/i,
		to: 'http://pan.baidu.com/share/link$3',
		regex: true
	}, {
		//百度云盘分享页，手机版 重定向至 电脑版
		//详细说明：http://bbs.kafan.cn/thread-1814510-1-1.html
		name: "百度盘wap/album/file >> pcloud/album/file",
		from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/album\/file(.*)/i,
		to: 'http://pan.baidu.com/pcloud/album/file$2',
		regex: true
	}, {
		//百度云盘分享页，手机版 重定向至 电脑版
		//详细说明：http://bbs.kafan.cn/thread-1814510-1-1.html
		name: "百度盘wap/share/home >> share/home",
		from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/share\/(home\?|)(.*)/i,
		to: 'http://pan.baidu.com/share/home?$3',
		regex: true
	}, {
		name: "AMO >> zh-CN",
		state: true,
		from: /^https:\/\/addons\.mozilla\.org\/.*\/firefox\/(.*)/,
		to: "https://addons.mozilla.org/zh-CN/firefox/$1",
		exclude: /^https:\/\/addons\.mozilla\.org\/zh-CN\/firefox\/.*/,
		regex: true
	}, {
		name: "userscripts >> webextender",
		from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
		to: "http:\/\/webextender.net/$1",
		regex: true
	}, {
		//example: http://ding.youku.com/a/id_XMTY2NDYw.html
		//方法来源: http://bbs.csdn.net/topics/391051571
		//Note: 需配置ReferChage使用,将qpic.cn和qlogo.cn设置为"@Block"
		name: "微信图片 反盗链",
		from: /^https?:\/\/mmbiz\.(qpic|qlogo)\.cn\/mmbiz\/(.*)\/(.*)\?wx_fmt=(.*)/i,
		to: "http://mmbiz.qpic.cn/mmbiz/$2/640",
		regex: true
	},
];