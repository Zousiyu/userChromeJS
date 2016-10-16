GESTURES = {
	image: {
		U: {
			name: "复制图片",
			cmd: function(event, self) {
				(document.popupNode = content.document.createElement('img')).src = event.dataTransfer.getData("application/x-moz-file-promise-url");
				goDoCommand('cmd_copyImageContents');
			}
		},
		D: {
			name: "复制图片地址",
			cmd: function(event, self) {
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			}
		},
		L: {
			name: "新标签打开图片(前台)",
			cmd: function(event, self) {
				gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			}
		},
		R: {
			name: "新标签打开图片链接(前台)",
			cmd: function(event, self) {
				gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
			}
		},
		UD: {
			name: "搜索相似图片(baidu)",
			cmd: function(event, self) {
				gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
			}
		},
		RL: {
			name: "搜索相似图片(Google)",
			cmd: function(event, self) {
				gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
			}
		},
	},
	link: {
		U: {
			name: "复制链接",
			cmd: function(event, self) {
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
			}
		},
		D: {
			name: "复制链接文字",
			cmd: function(event, self) {
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]);
			}
		},
		L: {
			name: "新标签打开链接(后台)",
			cmd: function(event, self) {
				gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
			}
		},
		R: {
			name: "新标签打开链接(前台)",
			cmd: function(event, self) {
				gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
			}
		},
		UD: {
			name: "当前标签打开链接",
			cmd: function(event, self) {
				loadURI(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
			}
		},
	},
	text: {
		U: {
			name: "复制文本",
			cmd: function(event, self) {
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/unicode"));
			}
		},
		D: {
			name: "360好搜(前台)",
			cmd: function(event, self) {
				gBrowser.selectedTab = gBrowser.addTab('http://www.haosou.com/s?ie=utf-8&q=' + event.dataTransfer.getData("text/unicode"));
			}
		},
		L: {
			name: "baidu搜索选中文字(前台)",
			cmd: function(event, self) {
				gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/unicode"));
			}
		},
		R: {
			name: "Google搜索选中文字(前台)",
			cmd: function(event, self) {
				gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/unicode")));
			}
		},
		UD: {
			name: "弹出搜索菜单",
			cmd: function(event, self) {
				var menu = document.getElementById('addMenu-search');
				var popup = menu.lastChild;
				document.getElementById('mainPopupSet').appendChild(popup);
				popup.addEventListener('popuphiding', function() {
					menu.appendChild(popup);
					popup.removeEventListener('popuphiding', arguments.callee);
				});
				popup.openPopup(null, null, event.screenX - window.screenX, event.screenY - window.screenY);
			}
		},
		RL: {
			name: "按URL打开文本",
			cmd: function(event, self) {
				gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode"));
			}
		},
	},
}