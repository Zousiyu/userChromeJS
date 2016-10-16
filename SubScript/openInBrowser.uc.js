// ==UserScript==
// @name           openInBrowser
// @description    在firefox中打开文件
// @include        chrome://browser/content/browser.xul
// @include        chrome://browser/content/places/places.xul
// @include        chrome://mozapps/content/downloads/unknownContentType.xul
// @include        chrome://mozapps/content/downloads/downloads.xul
// @charset        UTF-8
// ==/UserScript==

(function () {
	if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
	var openInFirefox = {
		Components: Components,
		observe: function (aSubject, aTopic, aData) {
			var channel = aSubject.QueryInterface(this.Components.interfaces.nsIHttpChannel);
			if (channel.originalURI.spec != openInFirefox.url) return
			channel.contentType = openInFirefox.mime;
			channel.loadFlags &= ~this.Components.interfaces.nsIChannel.LOAD_CALL_CONTENT_SNIFFERS;
			channel.setResponseHeader("Content-Disposition", "", false);
			var observerService = this.Components.classes["@mozilla.org/observer-service;1"].getService(this.Components.interfaces.nsIObserverService);
			observerService.removeObserver(openInFirefox, "http-on-examine-response", false);
			observerService.removeObserver(openInFirefox, "http-on-examine-merged-response", false);
		}
	}
	document.querySelector("#save").parentNode.insertBefore(document.createElement("hbox"), document.querySelector("#save")).appendChild(document.createElement("radio")).id = "openInBrowser";
	document.querySelector("#openInBrowser").setAttribute("width", "104");
	document.querySelector("#openInBrowser").setAttribute("label", "打开，作为");
	document.querySelector("#openInBrowser").parentNode.appendChild(document.createElement("vbox")).appendChild(document.createElement("menulist")).id = "MIMETypes";
	var MT = document.querySelector("#MIMETypes");
	MT.setAttribute("width", "60");
	var menupopup = MT.appendChild(document.createElement("menupopup"));
	menupopup.setAttribute("flex", "1");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "TXT");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "PNG");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "JPG");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "MP3");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "WMV");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "HTML");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "PDF");
	document.querySelector("#MIMETypes").selectedIndex = 0;
	addEventListener("DOMNodeInserted", window.sizeToContent, true)
	addEventListener("dialogaccept", function () {
		if (document.querySelector("#mode").selectedItem.id == "openInBrowser") {
			document.documentElement.removeAttribute("ondialogaccept");
			openInFirefox.url = dialog.mLauncher.source.asciiSpec;
			openInFirefox.mime = ["text/plain", "image/png", "image/jpeg", "audio/mp3", "video/x-ms-wmv", "text/html", "application/pdf"][document.querySelector("#MIMETypes").selectedIndex]
			var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
			observerService.addObserver(openInFirefox, "http-on-examine-response", false);
			observerService.addObserver(openInFirefox, "http-on-examine-merged-response", false);
			var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
			(mainwin.content.location == "about:blank") ? (mainwin.gBrowser.mCurrentBrowser.loadURIWithFlags(openInFirefox.url, 256)) : (mainwin.gBrowser.loadOneTab("", {
				inBackground: false
			}) && mainwin.gBrowser.mCurrentBrowser.loadURIWithFlags(openInFirefox.url, 256));
		}
	}, false);
})()