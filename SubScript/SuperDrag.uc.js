// ==UserScript==
// @name            SuperDrag.uc.js
// @description     超级拖拽手势
// @author          紫云飞&w13998686967&黒仪大螃蟹
// @include         chrome://browser/content/browser.xul
// @homepageURL     http://www.cnblogs.com/ziyunfei/archive/2011/12/20/2293928.html
// @version         2016.8.21
// @note         2016.8.21 搬运描绘轨迹 by skofkyo 
// @note         2014.11.02 配置外放,自用DIY by w13998686967
// @charset         UTF-8
// ==/UserScript==
(function() {
    var ucjsSuperDrag = {
        Locus: false, // true / false 是否使用拖曳描绘轨迹
        trailColor: '#3030FF', // 轨迹颜色
        trailSize: 3, // 轨迹粗细 单位px
        GESTURES: {},
        createMenuitem: function() {
            var menuitem = document.createElement('menuitem');
            menuitem.setAttribute('id', 'ucjsSuperDrag');
            menuitem.setAttribute('class', 'menuitem-iconic');
            menuitem.setAttribute('label', '设置拖拽手势');
            menuitem.setAttribute("tooltiptext", '左键：重载配置\n右键：编辑配置');
            menuitem.setAttribute('oncommand', 'ucjsSuperDrag.reload(true);');
            menuitem.setAttribute('onclick', 'if (event.button == 2) { event.preventDefault(); closeMenus(event.currentTarget); ucjsSuperDrag.edit(ucjsSuperDrag.file); }');
            menuitem.setAttribute('image', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAC+lBMVEX+/vjq6ufm5r/9/cTs7L7Q0Jj+/vXp6cDr6rP8/L7//8H+/rr//87h4arPz6P////v797GxqnExJ7q6sLs7Lv6+rT//83p6bnz87P//8P//8P//9bLy89ra0v+/uni4rbY2JTn57Lp6b/t7bD//8b4+ML497j//8j+/sjn5s7r68NpaU7y8s7m5qn//7r//8ro57T5+bb//8T//8H//9H//+XW19Fsaljg4LHx8a7//8j29rz6+rX//8b398Pj48vKzMV3dV7j46f+/r7//73//8D//9Pl5dOoqanR1azX2pyDg2ODg2V0clz4+LX//8D//8/b28m+v7GGh4VVVVuhpXHV2Y///7r//9N9fV3//835+dvBwr/c4Kjd4JGkpm2am3d3d3RiYU7n56T//+owMB2fnoVfYEXDw69kZHVfYFq3u3jk55f//7Xn57mbm49XVznd3bScnJ+/v43//9lublc2NyumpoCbm2qvr4xgX2NtbVTs7qnT1LlZWFG2toX//+3X16f6+r3Y2KJhYUju7rH//8P//9l0dGxgYEHU1LR0dXZMTDH7+9GGh2XCwpT09Lj397XR0aH//8L//9PDw7NFRTbS0p3U1MkSEhqIiGXd3rJQUT8xMiaWlnHU1KL7+7b//8X//+X+/rz//99ISFFkZD///9Fqa2gYGBCqqoTU1aSysohtbVOpqYH9/b3//77//+GMjIH//9mQkZcDAwKzs4fW1qdtbU9OTzylpXzs7LTs7K7FxZnZ2bLn56n//9rBwaQ9PSPU1LsoKDIrKxnNzZza2aXAwJOEhGS5uYz//8D//7/x8cK0tI/Pz63e3sJ2dlaqqn2vr4NRUTpbW0bFxpP6+rru7rLPz6LT06Xt7bH7+9jFxZ6VlWWurox4eG0+Pizr67IAAAC1tsMJCRk1NR+Tkp1VVWmBgYGipYwICgwcHhadoWX2+4NISE8QEw7IzHVbXzX//593d343OiIjIzfV2I0pKTn//4tGSicAAA8NEAC0tqutNA9VAAAA43RSTlMAAgEAAAAAExUhNUFLBmcAAAIBAwQGGzA7UXCd4bwAAQAEDA0bN01sp9mWyQEBAw4XIDNXfr/90QMEDRkkOWiM1NMFCxUmQnelpM70/NEIECU8fa2mnqXF6M0PJztDZomXoKi46f77zCs+OT5ObIylp8P+767rzR0uN0JSZZOsouTHY2BpDyIzR1N1qJzB5oA2GBATITdFUpSwl5/h/ZA8FgoMEStAO2aeoYFRaIZDFgkKCxQ5PjtFZnxJKR0dHAsJCAImPzgrHicyHg0IBwkMDwUBEygoEQsJCAgEBQMABhMGAEYVx3IAAABpSURBVBhXY2T7xQgCHBBK7gkjPyMyuKXOgiywm42Nj4UPwT/+i+kfDwsPjLuc8QMjKxMXCxdMIIVxMeO//0gqGBl//eJgRBHgz2WcimLoaz7GKn4ka1MZQZIIFenvV4PZkxlRAYsA5QIA810V3jkYKvgAAAAASUVORK5CYII=');
            var insPos = document.getElementById('devToolsSeparator');
            insPos.parentNode.insertBefore(menuitem, insPos);
        },
        init: function() {
            this.reload();
            var self = this;
            ["dragstart", "dragover", "drop"].forEach(function(type) {
                gBrowser.mPanelContainer.addEventListener(type, self, false);
            });
            window.addEventListener("unload", function() {
                ["dragstart", "dragover", "drop"].forEach(function(type) {
                    gBrowser.mPanelContainer.removeEventListener(type, self, false);
                });
            }, false);
            seemAsURL = function(url) { // 来自 Easy DragToGo+ 扩展，略作修正
                var DomainName = /(\w+(\-+\w+)*\.)+\w{2,7}/i;
                var HasSpace = /\S\s+\S/;
                var KnowNameOrSlash = /^(www|bbs|forum|blog)|\//i;
                var KnowTopDomain1 = /\.(com|net|org|gov|edu|info|mobi|mil|asia)$/i;
                var KnowTopDomain2 = /\.(de|uk|eu|nl|it|cn|be|us|br|jp|ch|fr|at|se|es|cz|pt|ca|ru|hk|tw|pl|me|tv|cc)$/i;
                var IsIpAddress = /^([1-2]?\d?\d\.){3}[1-2]?\d?\d/;
                var about = /^about/i;
                var seemAsURL = !HasSpace.test(url) && DomainName.test(url) && (KnowNameOrSlash.test(url) || KnowTopDomain1.test(url) || KnowTopDomain2.test(url) || IsIpAddress.test(url)) || about.test(url);
                return seemAsURL;
            };
            return;
        },
        reload: function(isAlert) {
            var file = this.getSuperDragFile();
            if (!file.exists()) return this.alert('Load Error: 配置文档不存在');
            try {
                this.importSuperDrag(file);
            } catch (e) {
                this.alert('Error: ' + e + '\n请重新检查配置文档');
                return;
            }
            if (isAlert) this.alert('配置已经重新加载');
        },
        alert: function(aString, aTitle) {
            Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "SuperDrag", aString, false, "", null);
        },
        getSuperDragFile: function() {
            var aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
            aFile.appendRelativePath("lib");
            aFile.appendRelativePath("_SuperDrag.js");
            if (!aFile.exists() || !aFile.isFile()) return null;
            delete this.file;
            return this.file = aFile;
        },
        importSuperDrag: function(file) {
            var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
            var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
            fstream.init(file, -1, 0, 0);
            sstream.init(fstream);
            var data = sstream.read(sstream.available());
            try {
                data = decodeURIComponent(escape(data));
            } catch (e) {}
            sstream.close();
            fstream.close();
            this.GESTURES = new Function('', 'return ' + data)();
            return;
        },
        edit: function(aFile) {
            if (!aFile || !aFile.exists() || !aFile.isFile()) return;
            var editor;
            try {
                editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
            } catch (e) {
                this.alert("请设置编辑器的路径。\nview_source.editor.path");
                toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
                return;
            }
            var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
            UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            try {
                var path = UI.ConvertFromUnicode(aFile.path);
                var args = [path];
                process.init(editor);
                process.run(false, args, args.length);
            } catch (e) {
                this.alert("编辑器不正确！")
            }
        },
        handleEvent: function(event) {
            if (event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            } //按住ctrl,shift,alt键不起效
            switch (event.type) {
                case "dragstart":
                    {
                        this.lastX = event.screenX;
                        this.lastY = event.screenY;
                        self.lastPoint = [event.screenX, event.screenY];
                        self.sourceNode = event.target;
                        self.directionChain = "";
                        event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
                        if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
                            self.type = "image";
                        } else if (event.dataTransfer.types.contains("text/x-moz-url")) {
                            self.type = "link";
                        } else {
                            self.type = "text";
                        }
                        break;
                    }
                case "dragover":
                    {
                        if (!self.lastPoint) return;
                        Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true;
                        var [subX, subY] = [event.screenX - self.lastPoint[0], event.screenY - self.lastPoint[1]];
                        var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
                        var direction;
                        if (distX < 10 && distY < 10) return;
                        if (distX > distY)
                            direction = subX < 0 ? "L" : "R";
                        else
                            direction = subY < 0 ? "U" : "D";
                        if (this.Locus) {
                            var browser = gBrowser.selectedBrowser;
                            if (!this.xdTrailArea) {
                                this.xdTrailArea = document.createElement("hbox");
                                var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                                canvas.setAttribute("width", window.screen.width);
                                canvas.setAttribute("height", window.screen.height);
                                this.xdTrailAreaContext = canvas.getContext("2d");
                                this.xdTrailArea.style.cssText = "display: -moz-box !important;" +
                                    "box-sizing: border-box !important;" +
                                    "pointer-events: none !important;" +
                                    "width:100% !important;" +
                                    "height:100% !important;" +
                                    "overflow:hidden !important;" +
                                    "opacity:.9 !important;";
                                this.xdTrailArea.appendChild(canvas);
                                browser.parentNode.insertBefore(this.xdTrailArea, browser.nextSibling);
                            }
                            if (this.xdTrailAreaContext) {
                                this.xdTrailAreaContext.strokeStyle = this.trailColor;
                                this.xdTrailAreaContext.lineJoin = "round";
                                this.xdTrailAreaContext.lineWidth = this.trailSize;
                                this.xdTrailAreaContext.beginPath();
                                this.xdTrailAreaContext.moveTo(this.lastX - browser.boxObject.screenX, this.lastY - browser.boxObject.screenY);
                                this.xdTrailAreaContext.lineTo(event.screenX - browser.boxObject.screenX, event.screenY - browser.boxObject.screenY);
                                this.xdTrailAreaContext.closePath();
                                this.xdTrailAreaContext.stroke();
                                this.lastX = event.screenX;
                                this.lastY = event.screenY;
                            }
                        }
                        if (direction != self.directionChain.charAt(self.directionChain.length - 1)) {
                            self.directionChain += direction;
                            XULBrowserWindow.statusTextField.label = self.GESTURES[self.type][self.directionChain] ? "手势: " + self.directionChain + " " + self.GESTURES[self.type][self.directionChain].name : "未知手势:" + self.directionChain;
                            self.cmd = self.GESTURES[self.type][self.directionChain] ? self.GESTURES[self.type][self.directionChain].cmd : "";
                        }
                        self.lastPoint = [event.screenX, event.screenY];
                        break;
                    }
                case "drop":
                    {
                        if (self.lastPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
                            if (this.Locus) {
                                if (this.xdTrailArea) {
                                    this.xdTrailArea.parentNode.removeChild(this.xdTrailArea);
                                    this.xdTrailArea = null;
                                    this.xdTrailAreaContext = null;
                                }
                            }
                            event.preventDefault();
                            event.stopPropagation();
                            self.lastPoint = XULBrowserWindow.statusTextField.label = "";
                            self.cmd && self.cmd(event, self);
                        }
                    }
            }
        },
    };
    ucjsSuperDrag.createMenuitem();
    ucjsSuperDrag.init();
    window.ucjsSuperDrag = ucjsSuperDrag;
})();