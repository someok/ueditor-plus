/*! UEditorPlus v2.0.0*/
var flashObj,flashContainer,wordImage={},g=$G;function addUploadButtonListener(){g("saveFile").addEventListener("change",function(){$(".image-tip").html("正在转存，请稍后..."),uploader.addFile(this.files),uploader.upload()})}function addOkListener(){dialog.onok=function(){if(imageUrls.length){var e=editor.getOpt("imageUrlPrefix"),t=domUtils.getElementsByTagName(editor.document,"img");editor.fireEvent("saveScene");for(var a,i=0;a=t[i++];){var n=a.getAttribute("data-word-image");if(n)for(var o,r=0;o=imageUrls[r++];)if(-1!=n.indexOf(o.name.replace(" ",""))){a.src=e+o.url,a.setAttribute("_src",e+o.url),a.setAttribute("title",o.title),domUtils.removeAttributes(a,["data-word-image","style","width","height"]),editor.fireEvent("selectionchange");break}}editor.fireEvent("saveScene")}},dialog.oncancel=function(){}}function showLocalPath(e){var t=editor.selection.getRange().getClosedNode(),a=editor.execCommand("wordimage");if(1==a.length||t&&"IMG"==t.tagName)g(e).value=a[0];else{var i=(o=a[0]).lastIndexOf("/")||0,n=(o.lastIndexOf("\\")||0)<i?"/":"\\",o=o.substring(0,o.lastIndexOf(n)+1);g(e).value=o;for(var r=[],l=0,d=a.length;l<d;l++){t=a[l];r.push(t.substring(t.lastIndexOf(n)+1,t.length))}$(".image-tip").html('<span style="color:#ff0000;">请选择:'+r.join("、")+"共"+a.length+"个文件</span>")}}function createCopyButton(e,t){t=g(t).value;t.startsWith("file:////")&&(t=t.substring(8)),t=decodeURI(t),g(e).setAttribute("data-clipboard-text",t),new Clipboard("[data-clipboard-text]").on("success",function(e){g("copyButton").innerHTML="复制成功"})}wordImage.init=function(e,t){showLocalPath("fileUrl"),createCopyButton("copyButton","fileUrl"),addUploadButtonListener(),addOkListener()};