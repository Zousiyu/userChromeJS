/**********************************************************************************
 *此处为按钮设置
 *************************************************************************************/
var anobtnset = {
	//※必须设置	按钮位置，0为可移动，1为地址栏图标，2为以前的自定义定位方式
	Icon_Pos: 2,

	//自定义定位方式：	按钮与哪个id相邻，alltabs-button，back-button等
	intags: "tabbrowser-tabs",

	//自定义定位方式：	按钮与目标id关系，之前（before）或者之后(after)
	orientation: "before",

	//按钮图标
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABmElEQVRIic3Vz2ddURAH8I+IqqonKqqioiKLyiKqIqKqqqoi3iKL6qKriKguKp56qioekUVVFhEVVfef7eLMbY/z7i8N1S/jcmfm+z0zd+Zc/gMsYQs7hW1hdB3iFTzDBhYb/Dewiae4O5R0NZ47eNgTuxgxLzCLZyfWcRqBS/FuIcT2NFcxwj6+osIEtyJvDvsRNMVB2BRXmWATFrCNi8g/llo3h8MIKO207UQFlnEeOWcaKj5pEajwOSrq6/NmlrOeOzY6yGu7xKMege2sipe5o609tX3R/R1qvMpyDmVt6mpPhaMB5KXAhTRRnQI/cB/3BpAv43WR+7uCc80CPyNxCHb9GdUK33LntEWgCvEnWMNYmqgj3C4ExkXeJHfudQg0VXUgta7GzRDN48a5wEoP6VWU/wEPipOPoj2XRc5qEedjh8BMsTiBO+EryU8aYq1F+V2VfJLa+Rxv8b0lrnUh3/QIDLH3beSkuT2+BvlMtlxdIn1XR5NNzI9uJx5LV3Uf8Zn0U/pr1Av2Tpq0ibQHu+ZH9t/jF5XwjtYY3gV/AAAAAElFTkSuQmCC",

	//菜单弹出方向，不设置就默认,参考 https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/Positioning
	position: "",
};

/**********************************************************************************
 *child:[  ]内为当前菜单的下级菜单配置,支持多级
 *text 为运行参数，如果无需参数，直接删除text属性
 *exec 为打开路径，可以是任意文件和文件夹，支持相对路径，相对于配置文件夹；
 *oncommand 可以用function(){}；
 *小书签可以用oncommand:function(){
gBrowser.loadURI("javascript:内容")
}；
 *-------------------------------
 *除了以上属性外，可以自定义添加其他属性，如果快捷键accesskey等
 *-------------------------------
 *{}, 为分隔条
 *-------------------------------
 *如果设置了id属性，会尝试获取此id并移动，如果在浏览器中没有找到此id，则创建此id
 *************************************************************************************/
/**********************************************************************************
 *child:[  ]内为当前菜单的下一级菜单配置,支持多级
 *text 为运行参数，如果无需参数，直接删除text属性
 *这里是菜单配置:
 *配置与addmenu一样，但仅支持本脚本菜单位置，具体请参照；https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus
 *-------------------------------
 *{}, 为分隔条
 *-------------------------------
 *目录枚举添加请注意：
 *1、斜杠"/"或"\"开头为相对配置文件夹，注意：Linux路径区分大小写！！！！
 *2、根据文件名全名字符(包括扩展名)排除或筛选;
 *3、关系为：先排除再枚举。
 *4、注意：配对模式为 test循环模式正则！！！注意正则全局"g"的使用！！test()继承正则表达式的lastIndex属性，表达式在匹配全局标志g的时候须注意。
 *5、留空表示不进行该行为。
 *6、在文件夹上左键点击为打开文件夹
{
    label: "菜单显示名称",
    image: "图标",
    //枚举文件夹内的所有文件。注意：Linux路径区分大小写！！！！
    MapFolder: '/chrome/tools',
    //排除的文件，需要注意:此处不使用"g"全局模式，可以匹配所有文件,
    Exclude: /\.(dat|reg|sample|config|db|log|dll|json|zip|rar|ini)$|7za\.exe|wget\.exe/i,
    //枚举的文件
    Filter: /\.(exe|lnk|bat|xls|xlsx|txt|doc|docx|jpg|wps)$/i,
    //是否枚举子目录内的文件，值代表子目录深度，多少级的子目录，0为根目录（即不枚举子目录）
    Directories: 2,
    //排除目录,仅当Dirs>1时生效。
    ExcludeDirs: /tmp|temp|ConFile|msdll/i，
    //枚举目录,仅当Dirs>1时生效。留空表示不筛选
    FilterDirs: "",
},
 *************************************************************************************/
//下面添加菜单
var anomenu = [{
		label: "Chrome文件夹",
		MapFolder: "\\chrome",
		FilterDirs: "",
		Directories: 2,
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jc2TQQqAMBAD+6+eJkf/1a/qAzwpQj31INaaioKBvYRlIBs2hDcEJGCu+DOQbgGSNkm54mdJiwPIDcDJ/zEAiMUDog0AxrJsznJoBxiAqQdSq92K1iX7Bp8DHkdotWMd8aodYLWezNEOWiKGUPgnKlQAAAAASUVORK5CYII=",
	}, {
		label: "lib文件夹",
		MapFolder: "\\chrome\\lib",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5UlEQVQ4jWNgGGyAXUHBgQMbZmBgYMepS03NLFBNzfy6uprZf/zY9JmGqkkwhgHqaiaXkBS+U1M1u6ChanYVYqjpDRhWUzW9o6Zqeh6LAXDNb5WUjPm1lYzlNDQsFHBhaWkzYawGqKqaz5eSMpUl7BWz/6rK5k2YLlA391dTM0olygBVs9soBqipmv5gYLDk1FA1XUecASa7MFygpma6khjNuL1AAlZTM/FCpANV078kGvBbSMicD26AhqrpQdJsN9uAEo3KylZiGmpmfWpqZuvV1Mw24MHrNdRMenV1bQRxJmu6AwDOhsbQmJaESQAAAABJRU5ErkJggg==",
	}, {
		label: "gm_scripts",
		exec: "\\gm_scripts",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5UlEQVQ4jWNgGGyAXUHBgQMbZmBgYMepS03NLFBNzfy6uprZf/zY9JmGqkkwhgHqaiaXkBS+U1M1u6ChanYVYqjpDRhWUzW9o6Zqeh6LAXDNb5WUjPm1lYzlNDQsFHBhaWkzYawGqKqaz5eSMpUl7BWz/6rK5k2YLlA391dTM0olygBVs9soBqipmv5gYLDk1FA1XUecASa7MFygpma6khjNuL1AAlZTM/FCpANV078kGvBbSMicD26AhqrpQdJsN9uAEo3KylZiGmpmfWpqZuvV1Mw24MHrNdRMenV1bQRxJmu6AwDOhsbQmJaESQAAAABJRU5ErkJggg==",
	}, {
		label: "plugins",
		exec: "\\plugins",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5UlEQVQ4jWNgGGyAXUHBgQMbZmBgYMepS03NLFBNzfy6uprZf/zY9JmGqkkwhgHqaiaXkBS+U1M1u6ChanYVYqjpDRhWUzW9o6Zqeh6LAXDNb5WUjPm1lYzlNDQsFHBhaWkzYawGqKqaz5eSMpUl7BWz/6rK5k2YLlA391dTM0olygBVs9soBqipmv5gYLDk1FA1XUecASa7MFygpma6khjNuL1AAlZTM/FCpANV078kGvBbSMicD26AhqrpQdJsN9uAEo3KylZiGmpmfWpqZuvV1Mw24MHrNdRMenV1bQRxJmu6AwDOhsbQmJaESQAAAABJRU5ErkJggg==",
	}, {
		label: "Super Start文件夹",
		exec: "\\superstart",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5UlEQVQ4jWNgGGyAXUHBgQMbZmBgYMepS03NLFBNzfy6uprZf/zY9JmGqkkwhgHqaiaXkBS+U1M1u6ChanYVYqjpDRhWUzW9o6Zqeh6LAXDNb5WUjPm1lYzlNDQsFHBhaWkzYawGqKqaz5eSMpUl7BWz/6rK5k2YLlA391dTM0olygBVs9soBqipmv5gYLDk1FA1XUecASa7MFygpma6khjNuL1AAlZTM/FCpANV078kGvBbSMicD26AhqrpQdJsN9uAEo3KylZiGmpmfWpqZuvV1Mw24MHrNdRMenV1bQRxJmu6AwDOhsbQmJaESQAAAABJRU5ErkJggg==",
	}, {}, // 分隔条
	{
		label: " 启动 Internet Explorer",
		exec: "C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABI0lEQVQ4jb2SsUpDQRBFt7INBAQhbSrTCAvCgkvuuVUqK6uAHyD4DVap0gYE/yCtIFgJgpBKEAQrwSqtkMpKiM1LeG5eRBsHppq5Z2fuTgj/Eb1eb0fSOfAAfNieSdrbKuj3+wm4Ah5tP9ue217angB94BgYN74EXFbNTbmQNAghBCBuAIDpD+JVfkoa5Jx3S/GwaHyXdCLpoAE8Tym1S8BT0eR63fasqJ+tiymldjlmZeI6SwAwXQNyzvu/2H1ZAO7rE3SK4mtpcIyxBcRVSup+a7D9UodIOio8uqivlHM+LAGTYoo3IMYYW7ZH5T00/cLNHzw4bTqiW2BaOb71EoHhhrgCjIG7EEKQNKgmWqxMBa5SSp1Gcc3la9sjSd2NU90SX0UZ7YVfSvvQAAAAAElFTkSuQmCC",
	}, {
		label: " 用 IE 打开此页",
		text: "%u",
		exec: "C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABI0lEQVQ4jb2SsUpDQRBFt7INBAQhbSrTCAvCgkvuuVUqK6uAHyD4DVap0gYE/yCtIFgJgpBKEAQrwSqtkMpKiM1LeG5eRBsHppq5Z2fuTgj/Eb1eb0fSOfAAfNieSdrbKuj3+wm4Ah5tP9ue217angB94BgYN74EXFbNTbmQNAghBCBuAIDpD+JVfkoa5Jx3S/GwaHyXdCLpoAE8Tym1S8BT0eR63fasqJ+tiymldjlmZeI6SwAwXQNyzvu/2H1ZAO7rE3SK4mtpcIyxBcRVSup+a7D9UodIOio8uqivlHM+LAGTYoo3IMYYW7ZH5T00/cLNHzw4bTqiW2BaOb71EoHhhrgCjIG7EEKQNKgmWqxMBa5SSp1Gcc3la9sjSd2NU90SX0UZ7YVfSvvQAAAAAElFTkSuQmCC",
	}, {
		label: "编辑prefs.js",
		exec: "\\prefs.js",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkklEQVQ4jc2SSwrDMAxEcxL3BL3BYEZzpWx6tnTRQyWbrtyNArFRPiabCgyGQU8jRsPwVwUgSZrMbJZU9p7rE4BUAczsfdQYgD4tYJZUSMLdFEnf1ilJhNpK9v+r28EWQHI8aF583ccuIKozvV2hmtoNuKxH2Xc5iLLvcrBOzjk/LwLq7G9fH4DkkOWkOc7+bv0A0XLRL3bcl9MAAAAASUVORK5CYII=",
	}, {
		label: "编辑user.js",
		exec: "\\user.js",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkklEQVQ4jc2SSwrDMAxEcxL3BL3BYEZzpWx6tnTRQyWbrtyNArFRPiabCgyGQU8jRsPwVwUgSZrMbJZU9p7rE4BUAczsfdQYgD4tYJZUSMLdFEnf1ilJhNpK9v+r28EWQHI8aF583ccuIKozvV2hmtoNuKxH2Xc5iLLvcrBOzjk/LwLq7G9fH4DkkOWkOc7+bv0A0XLRL3bcl9MAAAAASUVORK5CYII=",
	}, {
		label: "健康报告",
		oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:healthreport')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4jeWSu0pDYRCEV1BRlGBhiEogB/LPrBAQ9ZxdBFutfANt7Cx9E1ufwD69TUpfQAjYRCvBS7SICZhwLDQSc+8dGNhi+djLCJCcEf6h9HQKvwB2Lr1S+qvSU8I6hDeVnirsXuk1pdcIbyv988cp4e8i8dwvgLCW0lMgOSTsgbA6aQciIoziTaU9k/YExEeEdZSeRtH2ygAgiqIFmSDC3v4XoDQfQsj0Aa4Jv8lmS8sTAYTfKqzxp3nEWC2lp7nc1tLwcW0thJDhRrwqIlIoxOshxMUBAOkXIezuichMP0BpVcKb+Xx+kfA7wtsh7GRFRERp1d64dlfpBRD+2D1eTx2JiEgI8S7pZYVVFFbpxnRqwDBpMdlXWOM74nZKWF3paQh20q0BPx4NQHJJenmcFXYlIrNjPzSNvgAn9qzlmPQi0wAAAABJRU5ErkJggg==",
	}, {
		label: "错误控制台",
		oncommand: "toJavaScriptConsole();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA40lEQVQ4jb2TsU4DMRBE5yo+4a60nd1xc1cQsxafRJMKJD4B0VHlo67MFyClSJEmXcqj4C6CECLrhBhptLLkeZKtHeBTlfdt7Zw1Jfa+rQFUmMKk9ZF5+M3UfDyfpPUAKnjf1tfCkbZTzatpkrZXzQ+RefC+reGcNSN1G5nfSzzeHZyz5gRwzhoU6lvm60HV1qS9zAaIpAVpj1HtbRYAAEJInao9qebX/weIpEWU/KxqawCVyPL+p+9uiz5RRG6odjh3pG2uPqFEfwuYVjmE1JWWKYTUnVYZBWW6WLCpTKNm1/kD6+i09FNRUm0AAAAASUVORK5CYII=",
	}
]