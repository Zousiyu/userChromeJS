// ==UserScript==
// @name                ExtrasConfigMenuPlus.uc.js
// @modified    skofkyo
// @include             main
// @charset             UTF-8
// @version             2.0.1 mod
// @note             2.0.1  Fx47以降でアイコン右クリックによる再起动ができなくなっていたのを修正
// @note             2.0.0  スクラッチパッドをエディタにする机能を廃止、Fx44以降で再起动できなくなっていたのを修正
// @note             1.9.9  真伪値の设置を切り替えるするtoggle関数を追加
// @note             1.9.8  要素を追加する际に$(id)と书ける様に
// @note                2016.8.25 使用alice0775的重启代码
// @note                2016.8.14 微调代码
// @note                2016.8.13 v3 阶层式菜单可用insertBefore: "ID",insertAfter: "ID" 改变添加的位置 ※请先确认ID 100%存在
// @note                2016.8.13 v2 修正一个bug
// @note                2016.8.13 增加newMenuitem的建立方式
// @note                2016.8.12 修正开启新窗口没有添加菜单的问题
// @note                2016.8.5 调整代码 修正函数
// @note                2016.8.2 调整代码 修正函数
// @note                2016.8.1 调整代码 增加可用函数 主要取至addMenuPlus
// @note                2016.7.30 调整代码 $C可以运行自定义函数
// @note                原版http://u6.getuploader.com/script/download/1494/ExtrasConfigMenuPlus.uc.js
// @note                extras_config_menu.uc.js から机能削减+α
// @note                スクリプトの有効无効を切り替えるコードはalice0775氏のrebuild_userChrome.uc.xulから拝借
// ==/UserScript==
(function() {
    'use strict';
    Cu.import('resource://gre/modules/Preferences.jsm');
    var delay = 1000;//延迟加载菜单 如遇到UC菜单ID移动失败 尝试增加延迟时间
    var ECM = {
        menues: [
            /*直接移动的UC菜单ID*/
			"addMenu-rebuild",
			"anoBtn_set",
			"downloadPlus_set",
			"RefererChanger",
			"ucjsSuperDrag",
			"uc-movebutton",
			"ucjs_copysysinfo-menu",
			"wordhighlight-toolbar-menuitem"
            //"NewTabOverride_set",
            //"downloadPlus_set",
        ],
        mode: 1, //位置 0可移动按钮 1网址列按钮 2工具菜单
        editor: 1,
        //editor: 'D:\\Software\\TeraPad\\TeraPad.exe',
        // 1 = view_source.editor.pathに设置したエディタ
        // エディタへのフルパスを记述すればそのエディタを使う ※パスを''で囲い\は\\に置き换える
        UIcharset: "GB2312", //字符集 BIG5 / gbk / GB2312 / Shift_JIS
        removeExt: true, //脚本名称不显示 uc.js/uc.xul
        ecmp: true,//强制启用脚本true/false 避免意外关闭
        
        addmenuitem: function() {
            /*移动或复制元素ID 如果不存在此ID的话 会导致自定义菜单无效
            if ($('ID') != null) 建议除了Firefox的元素以外 移动或复制时添加判断 避免BUG ecmp菜单例子(不是分离式配置).js可供参考*/
            var Folderimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIklEQVQ4jcXTS08TYRSA4e8X8FOUBAEBp9yauDLuXCnqQqUUNMpFEzExpG60EBwGqAEWuGAhMXHBAiSiG4MRaKe1Q+lMLSQEgpIYaG3pXMrrYhSMkUTdeJJn+ybny/mE+O8THW58oSoSEbmaiFyNqkhEh+tifxxQFQmcFOytuCyDpb5ywo+rDqKHalAViVioIXEQiMg1sKdhRi9RUC9T3J6CfBIKuss0wEq57BSwhjroITZUX3YYyL/H1HyYWium5sfUfFiaDzvRghVvZne+icx8E5l3FyisT6EqEm97Jd/3wCnIvsHWb2IbHThGpyvVhaW3Ex/1shCsZCFYwWKwnMXeE4T7T7pvFWrYFhFZgq8z2EY7mUU/2aVWsuFWsuE24qOn+fTynLtKPgH5ZchrsKeBY6AqHoSqeGBnkuUxLwvBikOPKvk8dx47eQNruQVTa8aMX8OMX8VJ95Bfe8ZsoHJGqIN15BIPWRn3QvEjWDpYBlhpnFQHltGFpXdi6R2u5C3YGmfzdTcjbceaRHSoga05P5uv2iAzSzHdiZO+jZO+g7N6F2f13k+6Ka7dh53nfBg7gxCiRMRCjSQnzpLT++DLU/Y3etjfCLg2H/wiANtD5FaCzAaqpoUQQsSeeFGVWrAnITsCuzLsDhytMMH69BVGr5dedE855M3EQo2oSh0R2UNY9hCWa48UGahlSanfEUKU/DjGUiFE2V86/g/f7vfzDeaZGzZA26PeAAAAAElFTkSuQmCC"
            var Editimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII="
            var mp = $('ecm-popup');
            /* ==================== 从这里开始进行菜单设置 ==================== */

            /*
            // メモリ开放
            mp.appendChild(this.createME('menuitem', '释放内存', () => {
                var os = Services.obs;
                var gMgr = Cc['@mozilla.org/memory-reporter-manager;1'].getService(Ci.nsIMemoryReporterManager);
                var parentWindow = Services.wm.getMostRecentWindow('navigator:browser');
                os.notifyObservers(null, 'child-gc-request', null);
                Cu.forceGC();
                os.notifyObservers(null, 'child-cc-request', null);
                parentWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils).cycleCollect();
                os.notifyObservers(null, 'child-mmu-request', null);
                gMgr.minimizeMemoryUsage(() => '');
            }, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEAUlEQVRYhe2W30tbZxzGn1ZPTJwWf0wHUnSYVmM01l9R+22TqalHW0nUaLRWMUbtrNGY6HRSdaMOCRVXnHPgil4IKgx2UVroRSne7B97dnGiydkmuziu7MIXnvO85/3wfr8PL++BA1yNq3E1/hdj3ryGhUx+Us2b15IBYpkcfR/i9OnsJ9Ho+xARy+R5/+tzFk59DLP/t8Fz1U828OUfm3+bXwaf+hjm9TlLMkDajIWTH6boPwmw+9DPcDjMjY0NncLhMLsP/Ya5/yTAyQ9TTJtJCZD+zELfcQ9H34ZYNeigiNDlcukkInRONxriVYMOjr4Nsfukl+nPUk9gQgna1m0cezfBxaOlCwt8fTBliC8eLXHs3QRtP1QwbdIc0n0IppCZI2+CbIu3X1igLd5umI+8CdIUMlPXXBlWgmUrZRz6fYTlXhtFhG63WycRYfXoHUO83GvTeqyWURlRkidgHspg+14H+44GGN2PUUTY2tqqk4gwtDtuiEf3Y/QfBaj+2kHzUEbyFCyBDPqPA/Rsqby/oqX1eDw6iQjvr7gNc8+WSv9xgJZASoBMv4m+w162xD0sVa0UEaqqqpOIsKLfboiXqla2xD30HfYy029KBsjymdh14KNrvYXTu2GKCDs7O3USET55OWyIT++G6VpvYdeBj1m+lADZD03s2HtEWXOxIeKkiLCrq0snEWFDxGmYy5qLHXuPmP0wJcANVWH7TifvLt9jsbuEIkKv16uTiPBW121DvNhdwrvL99i+08kbqpIMkNOmsHXrARsXmjm5+fTC77j/+4AhPrn5lI0LzWzdesCctpQAuW6FrngL6+acdISqabfbWVpaqpPdbqcjVG2Y18056Yq3MNedEiBP0ikvXKyZrmVV0EGr9xZzbXlUxzpY4vmSubY89sz1siroMMxrpmspL1zMk/RkgPymdDatCmsjDXSMV9M+UknbUIVO9pFKOsarL+SOiWo6l5vpXG5mXczJqjHHP/KmVWHTqjC/KSVAQb1Ca3cRo9uNHFws5Ey8jgPfaN6/oHlfTHN/tIAz8Tr2RDTvntV88HkRrd1FTK2Vuje63XjOz3T+PwJAKaxRuLbfwOFv8/n8l1o+WdL88WLCFzQfmNe8P6p5X0Tz4ZVCFtYoBJBzVit173f7DWfcDEBJ9L2GxEJ+oUPh61OVsZ0avj5VGf3pjubbmi/8rK1HXmnvkR81n91K8kKHQgBtZ7X+ujfBrQAKAFgApAHADQClX1QqvAwBWPwX/hWA2wByAJgAIAvATQB1ADoADAIYBRC6RAUBPAbQCaAeQDGAbADpSDw+A5CfCGIFUAag/BJVlqh7E8DniX5n9wDXEpO0xKIJQMZ/IFOiflrqBfwTnBS0PMCw0bsAAAAASUVORK5CYII='));
            */

            ///*添加菜单*/
            ///*mp.appendChild(this.createME('类型', '名称', '命令', '图标', 'ID', 'tooltiptext'));*/
            //mp.appendChild(this.createME('menuitem', 'empty.vbs', 'ECM.open(2, ["system32", "empty.vbs"])'));
            //mp.appendChild(document.createElement('menuseparator'));//分割线
            //mp.appendChild(this.createME('menuitem', 'Javascript 开/关', 'ECM.toggle("javascript.enabled")','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABZklEQVRIie3Vv0uVcRTH8VeD0iIOIUQFgUKLTnW5NEU0WKuKg7gKDgZB4BTYP9AcBFFU6NLUUEOTvyIcJEJQmwoaGhKCkG5Ddhu+98LTuc/z+HB19ANnOp9z3l++5/uDEyX14yLOoadKwXPsZmIkxzOEh/iKZib+4APuo7cIsByKaiE/hUbwxPiGU90A6q1VljVv4llR88MAr0JuFddwHpcwhicY7xawF3IXyhp1A/gZcqPHDYi5X1jAmeMC3JQ/1N9YlA7BkQBwGwcFoCZeoO8oALiKdyWQNSW3ugqgrZp0o/dzILNFRevBeLkE0NZZvA91r4vMn4NxsAIAboS6zTxTPZga/t/LQcUDnAm1b0hX+w6mcQ/f80wZPZL2+yXuYgKTeKDzAZyDJZ3Dycb1APh0iL8dH3EaNgoMfzEfmg9UbL4iDR3piO3gRyu28RhX5GtY+kze4ov0Nu1hC09xS8k/cKIO/QOGV8uOXSg5XgAAAABJRU5ErkJggg=='));
            //mp.appendChild(document.createElement('menuseparator'));//分割线
            //mp.appendChild(this.createME('menuitem', '编辑userChrome.css', 'ECM.edit(0, ["userChrome.css"])', Editimg));
            //mp.appendChild(this.createME('menuitem', '编辑userContent.css', 'ECM.edit(0, ["userContent.css"])', Editimg));
            //mp.appendChild(document.createElement('menuseparator'));//分割线
            mp.appendChild(this.createME('menuitem', '重新启动浏览器', 'ECM.restartApp();', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB20lEQVQ4jY2Tv2sUURDHZ/bX7eW0ChJBRFKIRRCRIEHuzVvfrYmkSiFXSSoLERERy5B/wcIuqG9mN5VecUWwCqkOEQsLKysLsQgSxEJEgsVYeJfsHXuY4tvN9zMzzHxBVXFS8Gy1kRaZi8U+iCV7HIq73Xqez9XWThoDsRvg6QDY6Ji8+RMK9dLSztcCoMhnkc27YxPth0I7oVAPhT5WYD9ScfkYALYWYxQa/OvU/h5ztg5bi3G1U2vbXUFPb4fT/EzELRwBYraPRvSE7eW6XVUV4en1JjLtARtFoYGqInRfd0Nk8wXYaCzZ/WnmkZrengc2v4GNNr1bglPiFoaj/5orV1r/A6gqhkI9YKMB0yY0OF9GsV/jIts9iVlVMeJscwhgOKmpqoDpGNDg5YuB0HYg9lUotINCuxFn/bN+9czUFZj6wEYDsRsQle7W+NPQ/uhEdUpLOw/cPgQ2OlPcvAoJZ90qICnc2tQzlist9GYAbDRk2lNVhFDs3YmXPUjkxp3JR2qWbgk9fRj9S+Olu6SqCJHYJ+DN5xnOryHT+wrsG7J9g0x9ZPup2iAS1z6aKi076+mLzoVRmKJpYeL2YSC2aBadc1PTOB7n3AXe3guYHiberZ0u8tm62r99Gyd0lo7sIAAAAABJRU5ErkJggg=='));
            mp.appendChild(this.createME('menuitem', '编辑prefs.js', 'ECM.edit(1, ["prefs.js"])', Editimg));
            mp.appendChild(this.createME('menuitem', '编辑user.js', 'ECM.edit(1, ["user.js"])', Editimg));
            //mp.appendChild(this.createME('menuitem', '编辑_keychanger.js', 'ECM.edit(0, ["_keychanger.js"])', Editimg));
            //mp.appendChild(this.createME('menuitem', '编辑_uAutoPagerize.js', 'ECM.edit(0, ["_uAutoPagerize.js"])', Editimg));
            mp.appendChild(document.createElement('menuseparator')); //分割线
            mp.appendChild(this.createME('menuitem', '打开Chrome文件夹', 'ECM.open(0)', Folderimg, 0, '打开Chrome文件夹'));
            mp.appendChild(this.createME('menuitem', '打开Profile文件夹', 'ECM.open(1)', Folderimg));
            mp.appendChild(this.createME('menuitem', '打开SubScript文件夹', 'ECM.open(0, ["SubScript"])', Folderimg));
            //mp.appendChild(this.createME('menuitem', '打开CSS文件夹', 'ECM.open(0, ["CSS"])', Folderimg));
            //mp.appendChild(this.createME('menuitem', '打开UserScriptLoader文件夹', 'ECM.open(0, ["UserScriptLoader"])', Folderimg));
            //mp.appendChild(this.createME('menuitem', '打开安装文件夹', 'ECM.open(3, ["Mozilla Firefox"])', Folderimg));
            //mp.appendChild(document.createElement('menuseparator'));//分割线
            //mp.appendChild($('aboutName').cloneNode(false));

            /* ==================== END ==================== */

        },
        
        get focusedWindow() {
            return gContextMenu && gContextMenu.target ? gContextMenu.target.ownerDocument.defaultView : (content ? content : gBrowser.selectedBrowser.contentWindowAsCPOW);
        },

        startup: function() {
            setTimeout(function() {
                ECM.addmenuitem();
                ECM.moveMenu();
            }, delay);
        },

        init: function() {
            if (this.mode == 0) {this.addmovebtn();} else if (this.mode == 1) {this.addurlbarbtn();} else {this.addtoolsmenu();}
            this.addstyle();
            this.addPrefListener(ECM.readLaterPrefListener);
            window.addEventListener('unload', function() {ECM.removePrefListener(ECM.readLaterPrefListener);}, false);
            if (this.ecmp) window.addEventListener('DOMWindowClose', ECM.ecmptrue, false);
        },

        addmovebtn: function() {
            var mp = $C("menupopup", {
                id: "ecm-popup",
                position: "after_start",
                onclick: 'event.preventDefault(); event.stopPropagation();',
            });
            mp.addEventListener('popupshowing', (event) => ECM.onpopup(event));
            mp.addEventListener('popuphiding', (event) => ECM.hidepopup(event));
            $('mainPopupSet').appendChild(mp);
            try {
                CustomizableUI.createWidget({
                    id: 'ExtrasConfigMenu',
                    type: 'custom',
                    defaultArea: CustomizableUI.AREA_NAVBAR,
                    onBuild: function(aDocument) {
                        var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                        var attributes = {
                            id: 'ExtrasConfigMenu',
                            class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                            removable: 'true',
                            overflows: "false",
                            onclick: 'ECM.onClick(event)',
                            label: 'ExtrasConfigMenu+',
                            tooltiptext: '左键：ExtrasConfigMenu+菜单\n中键：打开Chrome文件夹\n右键：重新启动(清除缓存)',
                            type: 'menu',
                            context: "_child",
                            popup: "ecm-popup"
                        };
                        for (var a in attributes)
                            toolbarbutton.setAttribute(a, attributes[a]);

                        return toolbarbutton;
                    }
                });
            } catch (e) {};
        },

        addurlbarbtn: function() {
            var toolbarbutton = $("urlbar-icons").appendChild($C("toolbarbutton", {
                id: "ExtrasConfigMenu",
                class: "toolbarbutton-1 chromeclass-toolbar-additional",
                label: "ExtrasConfigMenu+",
                tooltiptext: '左键：ExtrasConfigMenu+菜单\n中键：打开Chrome文件夹\n右键：重新启动(清除缓存)',
                onclick: 'ECM.onClick(event)',
                type: 'menu',
                context: "_child",
            }));
            var mp = $C("menupopup", {
                id: "ecm-popup",
                position: "after_start",
                onclick: 'event.preventDefault(); event.stopPropagation();',
            });
            mp.addEventListener('popupshowing', (event) => ECM.onpopup(event));
            mp.addEventListener('popuphiding', (event) => ECM.hidepopup(event));
            toolbarbutton.appendChild(mp);
        },

        addtoolsmenu: function() {
            var menu = $("devToolsSeparator").parentNode.insertBefore($C("menu", {
                id: "ExtrasConfigMenu",
                class: "menu-iconic",
                label: "ExtrasConfigMenu+",
                tooltiptext: '中键：打开Chrome文件夹\n右键：重新启动(清除缓存)',
                onclick: 'ECM.onClick(event)',
            }), $("devToolsSeparator"));

            var mp = $C("menupopup", {
                id: "ecm-popup",
                onclick: 'event.preventDefault(); event.stopPropagation();',
            });
            mp.addEventListener('popupshowing', (event) => ECM.onpopup(event));
            mp.addEventListener('popuphiding', (event) => ECM.hidepopup(event));
            menu.appendChild(mp);
        },

        moveMenu: function(event) {
            var i, Item, mp;
            for (i = 0; i < this.menues.length; i++) {
                var menue = this.menues[i];
                mp = $('ecm-popup');
                Item = $(menue);
                if (Item != null) mp.appendChild(Item);
            }
        },
        
        newMenuitem: function(menupopup, menus, mp) {
            //类似addMenuPlus的使用方式
            for (let i = 0; i < menus.length; i++) {
                let ms = menus[i];
                let item = $(ms.mid); //选取元素
                if (item != null && ms.clone) { //元素存在并复制元素来添加
                    menupopup.appendChild(item.cloneNode(true));
                } else if (item != null) { //元素存在仅移动元素
                    menupopup.appendChild(item);
                } else if (ms.label == "sep") { //建立分割线
                    menupopup.appendChild($C('menuseparator'));
                } else if (ms.childs) { //建立一个阶层式菜单
                    var ins, menu;
                    menu = $C("menu", {
                        "class": "menu-iconic",
                        id: ms.id || "",
                        label: ms.label || "noname",
                        tooltiptext: ms.tooltiptext || "",
                        image: ms.image || "",
                        src: ms.src || "",
                        style: ms.style || "",
                        oncommand: ms.oncommand || "",
                        onclick: ms.onclick || "",
                        accesskey: ms.accesskey || "",
                        condition: ms.condition || ""
                    });
                    if (ms.insertBefore && (mp = $(ms.insertBefore))) {//添加到ID的上方
                        ins = mp.parentNode.insertBefore(menu, mp);
                    } else if (ms.insertAfter && (mp = $(ms.insertAfter))) {//添加到ID的下方
                        ins = mp.parentNode.insertBefore(menu, mp.nextSibling);
                    } else {
                        ins = mp.appendChild(menu);
                    }
                    menupopup = ins.appendChild($C("menupopup", {
                        id: ms.id + "-popup" || "",
                        onpopupshowing: ms.onpopupshowing || ""
                    }));
                    ECM.newMenuitem(menupopup, ms.childs);
                } else if (!ms.mid) { //不是移动元素才建立新menuitem
                    let item = $C('menuitem', {
                        id: ms.id || "",
                        label: ms.label || "noname",
                        tooltiptext: ms.tooltiptext || "",
                        class: "menuitem-iconic",
                        url: ms.url || "", //开启的链结 可用 %u返回当前页面网址 %s返回当前选取的文本 %es%返回当前选取的文本并进行UTF-8 URI编码 %p返回剪贴板文本 %ep%返回剪贴板文本并进行UTF-8 URI编码
                        where: ms.where || "", //分页开启的位置 "tab"前景新分页 "tabshifted"背景新分页 "window"新窗口
                        text: ms.text || "", //参数 %u返回当前页面网址 %s返回当前选取的文本 %es%返回当前选取的文本并进行UTF-8 URI编码 %p返回剪贴板文本 %ep%返回剪贴板文本并进行UTF-8 URI编码
                        exec: ms.exec || "", //执行档路径 ※※※测试过用来开启.bat批次档会造成火狐崩溃 改用ECM.open();正常※※※
                        image: ms.image || this.setIcon(ms.exec), //根据执行档添加图标
                        src: ms.src || "",
                        disabled: this.setdisabled(ms.exec), //根据执行档的存在与否错误与否 启用禁用菜单
                        oncommand: ms.oncommand || "ECM.onCommand(event);",
                        onclick: ms.onclick || "",
                        style: ms.style || "",
                        condition: ms.condition || "", //显示条件
                        closemenu: ms.closemenu || "", //"none"点击菜单不离开菜单
                        type: ms.type || "",
                        checked: ms.checked || "",
                        accesskey: ms.accesskey || "",
                    });
                    menupopup.appendChild(item);
                }
            }
        },

        addstyle: function() {
            var style = ' \
                @namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul); \
                #urlbar-icons #ExtrasConfigMenu > dropmarker { display: none; } \
                #urlbar-icons #ExtrasConfigMenu .toolbarbutton-icon {\
                    padding: 0!important;\
                    background: none !important;\
                    border: none !important;\
                    box-shadow: none !important;\
                }\
                #urlbar-icons #ExtrasConfigMenu {\
                    padding: 0px 2px !important;\
                    margin: -6px 0 !important;\
                }\
                #ecm-popup menu menupopup menuitem[checked="false"]:not(#redirector-toggle):not(.gm-enabled-item) {\
                    -moz-box-ordinal-group:99!important;\
                }\
                menu#ExtrasConfigMenu {\
                    list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaUlEQVQ4jbWSQQrAMAgEfZ0sJn/Kz9OehLRVu5A2MCdlWNZIa+1w5Paq2WOp9x4KzGxPsJ2AFmx38IlAVcdKNXMuggy/RAQlqBAAI2NdjOaqOtJu6BJ/F7x+ZTYBgBmWyCZIr8AmiAAwTy3X8ln7ZUyPAAAAAElFTkSuQmCC)\
                }\
                '.replace(/\s+/g, " ");
            var sspi = document.createProcessingInstruction(
                'xml-stylesheet',
                'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
            );
            document.insertBefore(sspi, document.documentElement);
            //移动按钮的样式
            var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
            + '#ExtrasConfigMenu .toolbarbutton-icon' 
            + '{list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaUlEQVQ4jbWSQQrAMAgEfZ0sJn/Kz9OehLRVu5A2MCdlWNZIa+1w5Paq2WOp9x4KzGxPsJ2AFmx38IlAVcdKNXMuggy/RAQlqBAAI2NdjOaqOtJu6BJ/F7x+ZTYBgBmWyCZIr8AmiAAwTy3X8ln7ZUyPAAAAAElFTkSuQmCC)}' 
            + '}';
            var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
            var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
            sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
        },

        menuClick: function(event) {
            switch (event.button) {
                case 2:
                    var menu, label, rlabel, fdir;
                    menu = event.target;
                    label = menu.getAttribute("label");
                    if (label == "chrome/") {
                        rlabel = label.replace("chrome/", "chrome");
                    } else {
                        rlabel = label.replace("\/", "\\");
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    fdir = "\\" + rlabel;
                    ECM.exec(fdir);
                    break;
            }
        },
        
        onClick: function(event) {
            if (event.button === 1) {
                //gBrowser.selectedTab = gBrowser.addTab("about:config")
                //switchToTabHavingURI("about:config", true);
                ECM.open(0);
            } else if (event.button === 2) {
                event.preventDefault();
                event.stopPropagation();
                ECM.restartApp();
            }
        },

        restartApp: function() {
            if ("BrowserUtils" in window && typeof BrowserUtils.restartApplication == "function") {
                Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).invalidateCachesOnRestart();
                BrowserUtils.restartApplication();
                return;
            }
            const appStartup = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);
            var os = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
            var cancelQuit = Components.classes["@mozilla.org/supports-PRBool;1"].createInstance(Components.interfaces.nsISupportsPRBool);
            os.notifyObservers(cancelQuit, "quit-application-requested", null);
            if (cancelQuit.data)
                return;
            os.notifyObservers(null, "quit-application-granted", null);
            var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
            var windows = wm.getEnumerator(null);
            var win;
            while (windows.hasMoreElements()) {
                win = windows.getNext();
                if (("tryToClose" in win) && !win.tryToClose())
                    return;
            }
            let XRE = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime);
            if (typeof XRE.invalidateCachesOnRestart == "function")
                XRE.invalidateCachesOnRestart();
            appStartup.quit(appStartup.eRestart | appStartup.eAttemptQuit);
        },

        edit: function(key, pathArray) {
            var vieweditor = Services.prefs.getCharPref("view_source.editor.path");
            var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
            UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? this.UIcharset : "UTF-8";
            var path = UI.ConvertFromUnicode(this.getPath(key, pathArray));
            if (this.editor === 1) {
                if (!vieweditor) {
                    //alert("请先设置文本编辑器的路径!!!\nabout:config view_source.editor.path\n字串值填入路径 例如：C:\\Windows\\notepad.exe");
                    //switchToTabHavingURI("about:config?filter=view_source.editor.path", true);
                    //return;
                    alert("请先设置文本编辑器的路径!!!");
                    var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
                    fp.init(window, "设置全局脚本编辑器", fp.modeOpen);
                    fp.appendFilter("执行文件", "*.exe");
                    if (fp.show() == fp.returnCancel || !fp.file)
                        return;
                    else {
                        vieweditor = fp.file;
                        Services.prefs.setCharPref("view_source.editor.path", vieweditor.path);
                    }
                    return;
                }
                this.launch(Services.prefs.getCharPref('view_source.editor.path'), path);
            } else {
                this.launch(this.editor, path);
            }
        },

        open: function(key, pathArray, arg) {
            var path = this.getPath(key, pathArray);
            this.launch(path, arg);
        },

        launch: function(path, arg) {
            arg = [arg] || [];
            var file = this.getLocalFile(path);
            if (!file.exists()) {
                return;
            }

            if (file.isExecutable()) {
                var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
                process.init(file);
                process.run(false, arg, arg.length);
            } else {
                file.reveal();
            }
        },
        
        onCommand: function(event) {
            var menuitem = event.target;
            var text = menuitem.getAttribute("text") || "";
            var exec = menuitem.getAttribute("exec") || "";
            var url = menuitem.getAttribute("url") || "";
            var where = menuitem.getAttribute("where") || "";
            if (url)
                this.openCommand(event, this.convertText(url), where);
            else if (exec)
                this.exec(exec, this.convertText(text));
            else if (text)
                this.copy(this.convertText(text));
        },
        
        openCommand: function(event, url, where, postData) {
            var uri;
            try {
                uri = Services.io.newURI(url, null, null);
            } catch (e) {
                return this.log(U("URL 不正确: ") + url);
            }
            if (uri.scheme === "javascript")
                loadURI(url);
            else if (where)
                openUILinkIn(uri.spec, where, false, postData || null);
            else if (event.button == 1)
                openNewTabWith(uri.spec);
            else openUILink(uri.spec, event);
        },
        
        convertText: function(text) {
            var tab = document.popupNode && document.popupNode.localName == "tab" ? document.popupNode : null;
            var win = tab ? tab.linkedBrowser.contentWindow : this.focusedWindow;
            text = text.toLocaleLowerCase()
            .replace("%u", win.location.href)//当前网址
            .replace("%s", this.getSelection(win))//当前选取的文本
            .replace("%es%", encodeURIComponent(this.getSelection(win)))//对选取文本进行URI编码
            .replace("%p", readFromClipboard())//剪贴板文本
            .replace("%ep%", encodeURIComponent(readFromClipboard()));//对剪贴板文本进行URI编码
            if (text.indexOf('\\') === 0)
                text = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + text;//开头为"\\"则为配置文件夹的相对路径加上text的路径
            return text;
        },
        
        copy: function(aText) {
            Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(aText);
            //XULBrowserWindow.statusTextField.label = "Copy: " + aText;
        },
        
        exec: function(path, arg) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            if (path.indexOf('\\') === 0)
                path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + path;//开头为"\\"则为配置文件夹的相对路径加上exec的路径
            try {
                var a;
                if (typeof arg == 'string' || arg instanceof String) {
                    a = arg.split(/\s+/)
                } else if (Array.isArray(arg)) {
                    a = arg;
                } else {
                    a = [arg];
                }

                file.initWithPath(path);
                if (!file.exists()) {
                    Cu.reportError('File Not Found: ' + path);
                    alert("进程路径出错或进程不存在，请检查配置");
                    return;
                }

                if (file.isExecutable()) {
                    process.init(file);
                    process.runw(false, a, a.length);
                } else {
                    file.launch();
                }
            } catch (e) {
                this.log(e);
            }
        },
        
        setIcon: function(path) {
            if (path == "" || path == null) return "";
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            if (path.indexOf('\\') === 0)
                path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + path;
            file.initWithPath(path);
            if (!file.exists()) return "chrome://browser/skin/aboutSessionRestore-window-icon.png";
            let fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(file);
            return "moz-icon://" + fileURL + "?size=16";
        },

        setdisabled: function(path) {
            if (path == "" || path == null || /(^microsoft)/.test(path)) {
                return "";
            } else {
                var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                if (path.indexOf('\\') === 0)
                    path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + path;
                file.initWithPath(path);
                if (!file.exists()) {
                    return "true";
                } else {
                    return "false";
                }
            }
        },

        getSelection: function(win) {
            win || (win = this.focusedWindow);
            var selection = this.getRangeAll(win).join(" ");
            if (!selection) {
                let element = document.commandDispatcher.focusedElement;
                let isOnTextInput = function(elem) {
                    return elem instanceof HTMLTextAreaElement ||
                        (elem instanceof HTMLInputElement && elem.mozIsTextField(true));
                };

                if (isOnTextInput(element)) {
                    selection = element.QueryInterface(Ci.nsIDOMNSEditableElement).editor.selection.toString();
                }
            }

            if (selection) {
                selection = selection.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
            }
            return selection;
        },

        getRangeAll: function(win) {
            win || (win = this.focusedWindow);
            var sel = win.getSelection();
            var res = [];
            for (var i = 0; i < sel.rangeCount; i++) {
                res.push(sel.getRangeAt(i));
            };
            return res;
        },
        
        getLocalFile: function(path) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            return file;
        },

        getDir: function(key, pathArray) {
            var dir;
            if (key.indexOf('\\') !== -1) {
                dir = this.getLocalFile(key);
            } else {
                dir = Services.dirsvc.get(key, Ci.nsILocalFile);
            }
            if (pathArray != null) {
                for (var i = 0, len = pathArray.length; i < len; ++i) {
                    dir.append(pathArray[i]);
                }
            }
            return dir.path;
        },

        getPath: function(key, pathArray) {
            pathArray = pathArray || [];
            var path = '';
            switch (key) {
                case 0:
                    path = this.getDir('UChrm', pathArray);
                    break;
                case 1:
                    path = this.getDir('ProfD', pathArray);
                    break;
                case 2:
                    path = this.getDir('WinD', pathArray);
                    break;
                case 3:
                    path = this.getDir('ProgF', pathArray);
                    break;
                case 4:
                    path = pathArray;
                    break;
                case 'C':
                    path = this.getDir('C:\\', pathArray);
                    break;
                case 'D':
                    path = this.getDir('D:\\', pathArray);
                    break;
            }
            return path;
        },

        toggle: function(prefName) {
            var pref = this.getPref(prefName);
            var prefType = Services.prefs.getPrefType(prefName);
            if (prefType === Ci.nsIPrefBranch.PREF_BOOL) {
                this.setPref(prefName, !pref);
            }
        },

        createME: function(sTyp, sLabel, sCommand, sImage, sId, stooltiptext) {
            const XUL_NS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
            var ele = document.createElementNS(XUL_NS, sTyp);
            switch (sTyp) {
                case 'menuitem':
                    ele.setAttribute('label', sLabel);
                    if (typeof sCommand === 'function') {
                        ele.setAttribute('oncommand', '(' + sCommand.toSource() + ').call(this, event);');
                    } else {
                        ele.setAttribute('oncommand', sCommand);
                    }
                    if (sImage) ele.setAttribute('image', sImage);
                    if (stooltiptext) ele.setAttribute('tooltiptext', stooltiptext);
                    ele.setAttribute('class', 'menuitem-iconic')
                    break;
                case 'menu':
                    ele.setAttribute('label', sLabel);
                    ele.setAttribute('id', sId);
                    ele.setAttribute('class', 'menu-iconic')
                    break;
                case 'menupopup':
                    ele.setAttribute('id', sId);
                    break;
            }
            return ele;
        },

        onpopup: function(event) {
            var popup = event.target;
            if (popup.id != "ecm-popup") {
                return;
            }

            if (popup.triggerNode) {
                popup.triggerNode.setAttribute('open', 'true');
            }

            var mp = event.target;
            if (mp !== event.currentTarget) {
                return;
            }

            var nodes = popup.querySelectorAll('.ecm.menu-iconic');
            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].parentNode.removeChild(nodes[i]);
            }
            
            var sep = document.createElement('menuseparator');
            sep.setAttribute('class', 'ecm menu-iconic');
            mp.appendChild(sep);

            var scripts = userChrome_js.scripts.concat(userChrome_js.overlays);
            for (let j = 0, lenj = userChrome_js.arrSubdir.length; j < lenj; j++) {
                var dirName = (userChrome_js.arrSubdir[j] == '') ? 'root' : userChrome_js.arrSubdir[j];
                var flg = false;
                for (var i = 0, len = scripts.length; i < len; i++) {
                    var script = scripts[i];
                    if (script.dir !== dirName) continue;
                    flg = true;
                    break;
                }

                if (!flg) continue;

                var menu = mp.appendChild(document.createElement('menu'));
                menu.setAttribute('label', 'chrome/' + (dirName == 'root' ? '' : dirName));
                menu.setAttribute('tooltiptext', '右键：打开文件夹');
                menu.setAttribute('class', 'ecm menu-iconic');
                menu.setAttribute('onclick', 'ECM.menuClick(event);');
                menu.dirName = dirName;

                var mp = menu.appendChild(document.createElement('menupopup'));
                mp.setAttribute('onpopupshowing', 'event.stopPropagation();');

                var flg = false;
                for (let i = 0, len = scripts.length; i < len; i++) {
                    var script = scripts[i];
                    var type = script.filename.lastIndexOf('uc.js') !== -1;
                    if (script.dir != dirName) continue;
                    if (flg && type !== flg) {
                        var sep = document.createElement('menuseparator');
                        mp.appendChild(sep);
                    }
                    flg = type;
                    var mi = mp.appendChild(document.createElement('menuitem'));
                    mi.setAttribute('label', this.removeExt ? script.filename.replace(/\.uc\.js$|\.uc\.xul$/g, '') : script.filename);
                    mi.setAttribute('oncommand', 'ECM.chgScriptStat(script.filename);');
                    mi.setAttribute('onclick', 'if (event.button !== 0) { event.preventDefault(); event.stopPropagation(); ECM.clickScriptMenu(event); }');
                    //mi.setAttribute('closemenu', 'none');
                    mi.setAttribute('type', 'checkbox');
                    mi.setAttribute('checked', !userChrome_js.scriptDisable[script.filename]);
                    if (script.description) {
                        mi.setAttribute('tooltiptext', '左键：启用 / 禁用\n中键：复选启用 / 禁用\n右键：编辑\n\n' + '说明：' + script.description);
                    } else {
                        mi.setAttribute('tooltiptext', '左键：启用 / 禁用\n中键：复选启用 / 禁用\n右键：编辑');
                    }

                    mi.script = script;
                }
                mp = event.target;
            }
        },

        hidepopup: function(event) {
            var popup = event.target;
            if (popup.id != "ecm-popup") {
                return;
            }
            if (popup.triggerNode) {
                popup.triggerNode.removeAttribute('open');
            }
        },

        clickScriptMenu: function(event) {
            var target = event.target;
            var script = target.script;
            var fileURL = Services.io.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(script.url);
            if (event.button === 1) {
                this.chgScriptStat(script.filename);
                target.setAttribute('checked', !userChrome_js.scriptDisable[script.filename]);
            } else if (event.button === 2) {
                this.edit(4, fileURL.path);
            }
        },

        chgScriptStat: function(afilename) {
            var s = this.getPref('userChrome.disable.script');
            if (!userChrome_js.scriptDisable[afilename]) {
                s = (s + ',').replace(afilename + ',', '') + afilename + ',';
            } else {
                s = (s + ',').replace(afilename + ',', '');
            }
            s = s.replace(/,,/g, ',').replace(/^,/, '');
            this.setPref('userChrome.disable.script', s);
            userChrome_js.scriptDisable = this.restoreState(s.split(','));
        },

        restoreState: function(arr) {
            var disable = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                disable[arr[i]] = true;
            }
            return disable;
        },

        getPref: function(prefName) {
            return Preferences.get(prefName);
        },

        setPref: function(prefName, value) {
            Preferences.set(prefName, value);
        },

        addPrefListener: function(aObserver) {
            Services.prefs.addObserver(aObserver.domain, aObserver, false);
        },

        removePrefListener: function(aObserver) {
            Services.prefs.removeObserver(aObserver.domain, aObserver);
        },

        readLaterPrefListener: {
            domain: 'userChrome.disable',
            observe: function(aSubject, aTopic, aPrefstring) {
                if (aTopic === 'nsPref:changed') {
                    setTimeout(() => {
                        var s = ECM.getPref('userChrome.disable.script');
                        userChrome_js.scriptDisable = ECM.restoreState(s.split(','));
                    }, 0);
                }
            }
        },

        ecmptrue: function(event) {
            var duc = Services.prefs.getCharPref("userChrome.disable.script").replace(/ExtrasConfigMenuPlus\.uc\.js\,/g, "")
            Services.prefs.setCharPref("userChrome.disable.script", duc);
        },

    };
    
    window.ECM = ECM;
    ECM.startup();
    ECM.init();

    function $(id) { return document.getElementById(id); }
    function log() { Application.console.log("[ExtrasConfigMenuPlus] " + Array.slice(arguments)); }
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) {
                    if (typeof attr[n] === 'function') {
                        el.setAttribute(n, '(' + attr[n].toSource() + ').call(this, event);');
                    } else {
                        if (attr[n] != "" && attr[n] != "undefined-popup") el.setAttribute(n, attr[n]);
                    }
            });
        return el;
    }

}());