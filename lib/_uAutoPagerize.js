// uAutoPagerize2.uc.js 的配置文件。

var prefs = {
	pauseA: true, // 快速停止翻页开关，需要刷新页面
	Pbutton: [0, 0, 0], // 需要按住的键.....0: 不按住任何键;1: shift鍵;2: ctrl鍵; 3: alt鍵;(同时按3个键.就填 1 2 3)(一个都不按.就填 0 0 0)
	mouseA: false, // 按住鼠标左键..否则.双击;
	Atimeout: 200, // 按住左键时..延时.多少生效..(单位:毫秒);
	stop_ipage: true, // 如果在连续翻页过程中暂停.重新启用后.不在继续..连续翻页..
	ipages: [false, 2], // 立即翻页,第一项是控制是否在js加载的时候立即翻第二项(必须小于maxpage)的页数,比如[true,3].就是说JS加载后.立即翻3页.

	// 下一页图片延迟加载的移除，是 image 节点的属性。该功能会把属性地址替换到图片地址。
	lazyImgSrc: 'zoomfile|file|original|load-src|_src|imgsrc|real_src|src2|data-lazyload-src|data-ks-lazyload|data-lazyload|data-src|data-original|data-thumb|data-imageurl|data-defer-src|data-placeholder',
};

// 页面不刷新的站点，通过延迟加载和额外添加 hashchange 事件来解决。
var HashchangeSites = [{
		url: /^https?:\/\/(www|encrypted)\.google\..{2,9}\/(webhp|#|$|\?)/,
		timer: 1500
	}, {
		url: /^https?:\/\/www\.baidu\.com\/($|#wd=)/,
		timer: 1000
	}, {
		url: /^https?:\/\/www\.newsmth\.net/,
		timer: 1000
	}, // 水木清华社区延迟加载及下一页加载的修复
];

// 自定义站点，优先级最高
var MY_SITEINFO = [{
		name: '百度搜索 - baidulocal',
		url: '^https?://www\\.baidu\\.com/s.*&tn=baidulocal',
		nextLink: '//a[font[text()="下一页"]]',
		pageElement: '//table[@width="100%" and @border="0"]/tbody/tr/td/ol',
		exampleUrl: 'http://www.baidu.com/s?wd=firefox&rsv_spt=1&issp=1&rsv_bp=0&ie=utf-8&tn=baidulocal&inputT=1364',
	}, {
		name: '360好搜',
		url: '^https?://www\\.haosou\\.com/s\\?',
		nextLink: 'auto;',
		pageElement: '//div[@id="container"] | //div[@id="rs"]',
		exampleUrl: 'http://www.haosou.com/',
	}, {
		name: '游民星空',
		url: '^[url]http://www.gamersky.com/[/url]*',
		nextLink: '//div[@class="page_css"]/a[text()="下一页"]',
		pageElement: '//div[@class="Mid2L_con"]',
		exampleUrl: 'http://www.gamersky.com/news/201207/206490.shtml',
	}, {
		name: '0DayDown | 0天与您关注资讯',
		url: '^http://www\\.0daydown\\.com/',
		nextLink: '//a[text()="下一页"]',
		pageElement: '//div[@class="content-wrap"]',
		exampleUrl: 'http://www.0daydown.com/category/software/windows',
	}, {
		name: '大眼仔旭 | 爱软件 爱汉化 爱分享 - 博客型软件首页',
		url: '^http://www\\.dayanzai\\.me/',
		nextLink: '//a[contains(text(), "下一页")]',
		pageElement: '//div[@class="kc"]',
		exampleUrl: 'http://www.dayanzai.me/',
	}, {
		name: '高清Mp4吧-免费高清电影资源下载',
		url: '^http://www\\.mp4ba\\.com/',
		nextLink: '//a[contains(text(), "下一页")]',
		pageElement: '//div[@class="box clear"]',
		exampleUrl: 'http://www.mp4ba.com/',
	}, {
		name: 'bt天堂 - bt电影下载 - BT天堂下载',
		url: '^http://www\\.bttiantang\\.com/',
		nextLink: '//a[text()="下一页"]',
		pageElement: '//div[@class="ml"]',
		exampleUrl: 'http://www.bttiantang.com/',
	}, {
		name: '三星盖乐世社区 三星手机官方论坛',
		url: '^http://www\\.galaxyclub\\.cn/bbs/',
		nextLink: '//a[@class="page_btn right_head mg_l"]',
		pageElement: '//div[@class="main"]/div[@class="right"]',
		exampleUrl: 'http://www.galaxyclub.cn/bbs/usage/romclub',
	}, {
		name: '电影天堂论坛',
		url: '^http://www\\.xunleigang\\.com/',
		nextLink: '//a[text()="下一页"]',
		pageElement: '//div[@class="boardnav"]',
		exampleUrl: 'http://www.xunleigang.com/',
	}, {
		name: '什么值得买',
		url: '^http://www\\.smzdm\\.com/',
		nextLink: '//a[text()="下一页"]',
		pageElement: '//section',
		exampleUrl: 'http://www.smzdm.com/youhui/fenlei/diannaoshuma/',
	}, {
		name: '软件缘 ',
		url: '^http://www\\.appcgn\\.com/',
		nextLink: '//a[text()="下一页"]',
		pageElement: '//div[@class="content-wrap"]',
		exampleUrl: 'http://www.appcgn.com/',
	}, {
		name: 'LaTeX工作室',
		url: '^http://www\\.latexstudio\\.net/',
		nextLink: '//a[text()="下一页"]',
		pageElement: '//section/div/div/article',
		exampleUrl: 'http://www.latexstudio.net/',
	},
	// 下面的都是示例
	// {
	//    siteName: "google",
	//     url: '^https?\\:\\/\\/(www|encrypted)\\.google\\..{2,9}\\/(webhp|search|#|$|\\?)',
	//     nextLink: "//a[div[@id=('nn')]] | //a[span/@id='nn'] | id('nav')//td[last()]/a | id('nn')/parent::a",
	//     pageElement: "//div[@id='ires']",
	//     exampleUrl: 'http://www.google.com.hk/'
	// },
	// {
	//    siteName: '百度贴吧',
	//     url: '^http://tieba\\.baidu\\.(cn|com)/f',
	//     nextLink: '//div[@class="pager clearfix"]/descendant::a[@class="next"]',  // xpath
	//     nextLink: 'auto;',  // Super_preloader 的自动查找
	//     nextLink: 'css;.pager a.next',  // Super_preloader 的 css 选择器
	//     pageElement: '//ul[@id="thread_list"]',
	// }

	// 示例：ipages 参数的使用。打开百度后立即加载3页。
	// {
	//     // 通过更改 pageElement 解决清爽百度的问题
	//     name: '百度搜索',
	//     url: "^https?://www\\.baidu\\.com/(?:s|baidu)\\?",
	//     nextLink: '//p[@id="page"]/a[contains(text(),"下一页")][@href]',
	//     pageElement: 'css;div#content_left',
	//     stylish: '.autopagerize_page_info { margin-bottom: 10px; }',
	//     ipages: [true, 3]
	// },
];

// 本体に組み込まれている MICROFORMAT を利用するか？
USE_MICROFORMAT = true;