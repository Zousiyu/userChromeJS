//   @NORMAL：不改变referer
//   @FORGE：发送根站点referer
//   @ORIGINAL：发送打开站点referer
//   @BLOCK : 发送空referer
sites = {
	'isnowfy.com': '@FORGE',
	'image.itmedia.co.jp': '@FORGE',
	'2ch.net': '@FORGE',
	'imepita.jp': '@ORIGINAL',
	'tumblr.com': '@FORGE',
	'photo.store.qq.com': '@FORGE',
	'fc2.com': '@BLOCK',
	'blogs.yahoo.co.jp': '@BLOCK',
	'hentaiverse.net': '@BLOCK',
	'qlogo.cn': '@BLOCK',
	'qpic.cn': '@BLOCK',
	'fmn.rrfmn.com': '@BLOCK',
	'space.wenxuecity.com': 'http://bbs.wenxuecity.com/',
	'www.autoimg.cn': 'http://club.autohome.com.cn/',
	'kkkmh.com': 'http://www.kkkmh.com/',
	'nonie.1ting.com': 'http://www.1ting.com/',
	'img.knb.im': 'http://www.kenengba.com/',
	'xici.net': 'http://www.xici.net/',
	'media.chinagate.com': 'http://www.wenxuecity.com/',
	'jdstatic.tankr.net': 'http://jandan.net/',
	'sankakustatic.com': 'http://chan.sankakucomplex.com/',
	'taruo.net' : 'example.co.jp',
	'postimage.org': '@FORGE',
	'pixiv.net': '@BLOCK',
	'screencloud.net': '@BLOCK',
	
	'tankr.net': '@BLOCK',//煎蛋网
	'img.cnbeta.com': '@FORGE',//cnbeta
	'zol.com.cn': '@BLOCK',//zol盗链图
	'douban.com': 'http://www.douban.com',//豆瓣
	'yyets.com': 'http://www.yyets.com/',//人人影视
	'tianya.cn': '@FORGE',//天涯论坛
	'tmoke.com': '@BLOCK',//尘埃软件网反盗链
	'ipc.iplaysoft.com': '@BLOCK',//异次元
	'pconline.com.cn': '@BLOCK',//太平洋电脑网
	'51.com': '@BLOCK',
	'laibafile.cn': 'http://bbs.tianya.cn/',
	//网易
	'126.net': '@FORGE',
	//新浪
	'sinaimg.cn': 'http://blog.sina.com.cn/',
	'sina.com.cn': 'http://blog.sina.com.cn/',
	// baidu 相关网站
    'hiphotos.baidu.com': '@FORGE',
    'hiphotos.bdimg.com' : 'http://a.hiphotos.bdimg.com/',
    'imgsrc.baidu.com': '@FORGE',
    'baidu-img.cn': 'http://www.baidu.com/',
    'bdstatic.com': 'http://tieba.baidu.com/',
    'sm.cn': 'http://sm.cn',
	//配合微信图片防盗链
	'qpic.cn': '@BLOCK',
	'qlogo.cn': '@BLOCK',
};