/*! UEditorPlus v2.0.0*/
!function(){var v,S=[],g=!1,f={};function h(e,t){for(var i,a,o=$G(e).children,r=0;a=o[r++];)if("focus"==a.className){i=a.getAttribute(t);break}return i}function b(e){return e?utils.trim(e).replace(/v\.youku\.com\/v_show\/id_([\w\-=]+)\.html/i,"player.youku.com/embed/$1").replace(/v\.qq\.com\/x\/cover\/[\w]+\/([\w]+)\.html/i,"v.qq.com/iframe/player.html?vid=$1&tiny=0&auto=0").replace(/v\.qq\.com\/x\/page\/([\w]+)\.html/i,"v.qq.com/iframe/player.html?vid=$1&tiny=0&auto=0").replace(/www\.bilibili\.com\/video\/([a-zA-Z0-9]+)\/?.*$/i,"player.bilibili.com/player.html?bvid=$1"):""}function m(e){e&&(e=b(e),e=utils.unhtml(e),$G("preview").innerHTML='<div class="previewMsg"><span>'+lang.urlError+'</span></div><iframe class="previewVideo"  src="'+e+'" width="420" height="280" frameborder=0 allowfullscreen></iframe>')}function w(e){this.$wrap=e.constructor==String?$("#"+e):$(e),this.init()}window.onload=function(){f=editor.getOpt("videoConfig"),$focus($G("videoUrl"));for(var o=$G("tabHeads").children,e=0;e<o.length;e++)domUtils.on(o[e],"click",function(e){for(var t,i=e.target||e.srcElement,a=0;a<o.length;a++)t=o[a].getAttribute("data-content-id"),o[a]==i?(domUtils.addClass(o[a],"focus"),domUtils.addClass($G(t),"focus")):(domUtils.removeClasses(o[a],"focus"),domUtils.removeClasses($G(t),"focus"))});f.disableUpload||($G("tabHeads").querySelector('[data-content-id="upload"]').style.display="inline-block"),f.selectCallback&&($G("videoSelect").style.display="inline-block",domUtils.on($G("videoSelect"),"click",function(e){f.selectCallback(editor,function(e){e&&($G("videoUrl").value=e.path,m(e.path))})}));for(var t,i=["videoFloat","upload_alignment"],a=0;t=i[a++];){var r,n=$G(t),s={none:lang.default,left:lang.floatLeft,right:lang.floatRight,center:lang.block};for(r in s){var l=document.createElement("div");l.setAttribute("name",r),"none"==r&&(l.className="focus"),l.style.cssText="background:url(images/"+r+"_focus.jpg);",l.setAttribute("title",s[r]),n.appendChild(l)}!function(e){for(var t,i=$G(e).children,a=0;t=i[a++];)domUtils.on(t,"click",function(){for(var e,t=0;e=i[t++];)e.className="",e.removeAttribute&&e.removeAttribute("class");this.className="focus"})}(t)}var d=$G("videoUrl");browser.ie?d.onpropertychange=function(){m(this.value)}:d.addEventListener("input",function(){m(this.value)},!1),dialog.onok=function(){var e,t;switch($G("preview").innerHTML="",h("tabHeads","tabSrc")){case"video":return m=$G("videoWidth"),e=$G("videoHeight"),a=$G("videoUrl").value,t=h("videoFloat","name"),!!a&&!!function(e){for(var t,i=0;t=e[i++];){var a=t.value;if(!/(0|^[1-9]\d*$)/.test(a)&&a)return alert(lang.numError),t.value="",void t.focus()}return 1}([m,e])&&void editor.execCommand("insertvideo",{url:b(a),width:m.value,height:e.value,align:t},g?"upload":null);case"videoSearch":for(var i,a="searchList",o=domUtils.getElementsByTagName($G(a),"img"),r=[],n=0;i=o[n++];)i.getAttribute("selected")&&r.push({url:i.getAttribute("ue_video_url"),width:420,height:280,align:"none"});return void editor.execCommand("insertvideo",r);case"upload":var s,l=[],d=editor.getOpt("videoUrlPrefix"),u=$G("upload_width").value||420,c=$G("upload_height").value||280,p=h("upload_alignment","name")||"none";for(s in S){var f=S[s];l.push({url:d+f.url,width:u,height:c,align:p})}var m=v.getQueueCount();if(m)return $(".info","#queueList").html('<span style="color:red;">'+"还有2个未上传文件".replace(/[\d]/,m)+"</span>"),!1;editor.execCommand("insertvideo",l,"upload")}},dialog.oncancel=function(){$G("preview").innerHTML=""};var u,c,p,d=editor.selection.getRange().getClosedNode();d&&d.className&&(p="edui-faked-video"==d.className,c=-1!=d.className.indexOf("edui-upload-video"),(p||c)&&($G("videoUrl").value=u=d.getAttribute("_url"),$G("videoWidth").value=d.width,$G("videoHeight").value=d.height,p=domUtils.getComputedStyle(d,"float"),function(e){for(var t,i=$G("videoFloat").children,a=0;t=i[a++];)t.getAttribute("name")==e?"focus"!=t.className&&(t.className="focus"):"focus"==t.className&&(t.className="")}("center"===domUtils.getComputedStyle(d.parentNode,"text-align")?"center":p)),c)&&(g=!0),m(u),v=new w("queueList")},w.prototype={init:function(){this.fileList=[],this.initContainer(),this.initUploader()},initContainer:function(){this.$queue=this.$wrap.find(".filelist")},initUploader:function(){var d,i=this,u=jQuery,e=i.$wrap,a=e.find(".filelist"),o=e.find(".statusBar"),r=o.find(".info"),n=e.find(".uploadBtn"),t=(e.find(".filePickerBtn"),e.find(".filePickerBlock")),s=e.find(".placeholder"),l=o.find(".progress").hide(),c=0,p=0,e=window.devicePixelRatio||1,f=113*e,m=113*e,v="",g={},h=e="transition"in(e=document.createElement("p").style)||"WebkitTransition"in e||"MozTransition"in e||"msTransition"in e||"OTransition"in e,b=editor.getActionUrl(editor.getOpt("videoActionName")),e=editor.getOpt("videoMaxSize"),w=(editor.getOpt("videoAllowFiles")||[]).join("").replace(/\./g,",").replace(/^[,]/,"");function y(i){function a(e){switch(e){case"exceed_size":text=lang.errorExceedSize;break;case"interrupt":text=lang.errorInterrupt;break;case"http":text=lang.errorHttp;break;case"not_allow_type":text=lang.errorFileType;break;default:text=lang.errorUploadRetry}l.text(text).show()}var o=u('<li id="'+i.id+'"><p class="title">'+i.name+'</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),r=u('<div class="file-panel"><span class="cancel">'+lang.uploadDelete+'</span><span class="rotateRight">'+lang.uploadTurnRight+'</span><span class="rotateLeft">'+lang.uploadTurnLeft+"</span></div>").appendTo(o),n=o.find("p.progress span"),s=o.find("p.imgWrap"),l=u('<p class="error"></p>').hide().appendTo(o);"invalid"===i.getStatus()?a(i.statusText):(s.text(lang.uploadPreview),-1=="|png|jpg|jpeg|bmp|gif|".indexOf("|"+i.ext.toLowerCase()+"|")?s.empty().addClass("notimage").append('<i class="file-preview file-type-'+i.ext.toLowerCase()+'"></i><span class="file-title">'+i.name+"</span>"):browser.ie&&browser.version<=7?s.text(lang.uploadNoPreview):d.makeThumb(i,function(e,t){e||!t||/^data:/.test(t)&&browser.ie&&browser.version<=7?s.text(lang.uploadNoPreview):(e=u('<img src="'+t+'">'),s.empty().append(e),e.on("error",function(){s.text(lang.uploadNoPreview)}))},f,m),g[i.id]=[i.size,0],i.rotation=0,i.ext&&-1!=w.indexOf(i.ext.toLowerCase())||(a("not_allow_type"),d.removeFile(i))),i.on("statuschange",function(e,t){"progress"===t?n.hide().width(0):"queued"===t&&(o.off("mouseenter mouseleave"),r.remove()),"error"===e||"invalid"===e?(a(i.statusText),g[i.id][1]=1):"interrupt"===e?a("interrupt"):"queued"===e?g[i.id][1]=0:"progress"===e&&(l.hide(),n.css("display","block")),o.removeClass("state-"+t).addClass("state-"+e)}),o.on("mouseenter",function(){r.stop().animate({height:30})}),o.on("mouseleave",function(){r.stop().animate({height:0})}),r.on("click","span",function(){var e;switch(u(this).index()){case 0:return void d.removeFile(i);case 1:i.rotation+=90;break;case 2:i.rotation-=90}h?(e="rotate("+i.rotation+"deg)",s.css({"-webkit-transform":e,"-mos-transform":e,"-o-transform":e,transform:e})):s.css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation="+~~(i.rotation/90%4+4)%4+")")}),o.insertBefore(t)}function C(){var e,i=0,a=0,t=l.children();u.each(g,function(e,t){a+=t[0],i+=t[0]*t[1]}),e=a?i/a:0,t.eq(0).text(Math.round(100*e)+"%"),t.eq(1).css("width",Math.round(100*e)+"%"),k()}function x(e){if(e!=v){var t=d.getStats();switch(n.removeClass("state-"+v),n.addClass("state-"+e),e){case"pedding":a.addClass("element-invisible"),o.addClass("element-invisible"),s.removeClass("element-invisible"),l.hide(),r.hide(),d.refresh();break;case"ready":s.addClass("element-invisible"),a.removeClass("element-invisible"),o.removeClass("element-invisible"),l.hide(),r.show(),n.text(lang.uploadStart),d.refresh();break;case"uploading":l.show(),r.hide(),n.text(lang.uploadPause);break;case"paused":l.show(),r.hide(),n.text(lang.uploadContinue);break;case"confirm":if(l.show(),r.hide(),n.text(lang.uploadStart),(t=d.getStats()).successNum&&!t.uploadFailNum)return void x("finish");break;case"finish":l.hide(),r.show(),t.uploadFailNum?n.text(lang.uploadRetry):n.text(lang.uploadStart)}v=e,k()}i.getQueueCount()?n.removeClass("disabled"):n.addClass("disabled")}function k(){var e,t="";"ready"===v?t=lang.updateStatusReady.replace("_",c).replace("_KB",WebUploader.formatSize(p)):"confirm"===v?(e=d.getStats()).uploadFailNum&&(t=lang.updateStatusConfirm.replace("_",e.successNum).replace("_",e.successNum)):(e=d.getStats(),t=lang.updateStatusFinish.replace("_",c).replace("_KB",WebUploader.formatSize(p)).replace("_",e.successNum),e.uploadFailNum&&(t+=lang.updateStatusError.replace("_",e.uploadFailNum))),r.html(t)}WebUploader.Uploader.support()?editor.getOpt("videoActionName")?((d=i.uploader=WebUploader.create({pick:{id:"#filePickerReady",label:lang.uploadSelectFile},swf:"../../third-party/webuploader/Uploader.swf",server:b,fileVal:editor.getOpt("videoFieldName"),headers:editor.getOpt("serverHeaders")||{},duplicate:!0,fileSingleSizeLimit:e,compress:!1})).addButton({id:"#filePickerBlock"}),d.addButton({id:"#filePickerBtn",label:lang.uploadAddFile}),x("pedding"),d.on("fileQueued",function(e){c++,p+=e.size,1===c&&(s.addClass("element-invisible"),o.show()),y(e)}),d.on("fileDequeued",function(e){var t;c--,p-=e.size,t=u("#"+(e=e).id),delete g[e.id],C(),t.off().find(".file-panel").off().end().remove(),C()}),d.on("filesQueued",function(e){d.isInProgress()||"pedding"!=v&&"finish"!=v&&"confirm"!=v&&"ready"!=v||x("ready"),C()}),d.on("all",function(e,t){switch(e){case"uploadFinished":x("confirm");break;case"startUpload":var i=utils.serializeParam(editor.queryCommandValue("serverparam"))||"",i=utils.formatUrl(b+(-1==b.indexOf("?")?"?":"&")+"encode=utf-8&"+i);d.option("server",i),x("uploading");break;case"stopUpload":x("paused")}}),d.on("uploadBeforeSend",function(e,t,i){-1!=b.toLowerCase().indexOf("jsp")&&(i.X_Requested_With="XMLHttpRequest")}),d.on("uploadProgress",function(e,t){u("#"+e.id).find(".progress span").css("width",100*t+"%"),g[e.id][1]=t,C()}),d.on("uploadSuccess",function(t,e){t=u("#"+t.id);try{var i=e._raw||e,a=utils.str2json(i);"SUCCESS"==a.state?(S.push({url:a.url,type:a.type,original:a.original}),t.append('<span class="success"></span>'),editor.fireEvent("uploadsuccess",{res:a,type:"video"})):t.find(".error").text(a.state).show()}catch(e){t.find(".error").text(lang.errorServerUpload).show()}}),d.on("uploadError",function(e,t){}),d.on("error",function(e,t){"Q_TYPE_DENIED"!=e&&"F_EXCEED_SIZE"!=e||y(t)}),d.on("uploadComplete",function(e,t){}),n.on("click",function(){if(u(this).hasClass("disabled"))return!1;"ready"===v||"paused"===v?d.upload():"uploading"===v&&d.stop()}),n.addClass("state-"+v),C()):u("#filePickerReady").after(u("<div>").html(lang.errorLoadConfig)).hide():u("#filePickerReady").after(u("<div>").html(lang.errorNotSupport)).hide()},getQueueCount:function(){for(var e,t=0,i=this.uploader.getFiles(),a=0;e=i[a++];)"queued"!=(e=e.getStatus())&&"uploading"!=e&&"progress"!=e||t++;return t},refresh:function(){this.uploader.refresh()}}}();