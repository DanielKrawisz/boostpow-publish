!function e(t,n,r){function i(a,s){if(!n[a]){if(!t[a]){var d="function"==typeof require&&require;if(!s&&d)return d(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var h=n[a]={exports:{}};t[a][0].call(h.exports,(function(e){return i(t[a][1][e]||e)}),h,h.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t,n){(function(e){var n="application/x-postmate-v1+json",r=0,i=function(){var e;return c.debug?(e=console).log.apply(e,arguments):null},o={handshake:1,"handshake-reply":1,call:1,emit:1,reply:1,request:1},a=function(e,t){return("string"!=typeof t||e.origin===t)&&(!!e.data&&(("object"!=typeof e.data||"postmate"in e.data)&&(e.data.type===n&&!!o[e.data.postmate])))},s=function(){function t(t){var n=this;this.parent=t.parent,this.frame=t.frame,this.child=t.child,this.childOrigin=t.childOrigin,this.events={},"production"!==e.env.NODE_ENV&&(i("Parent: Registering API"),i("Parent: Awaiting messages...")),this.listener=function(t){if(!a(t,n.childOrigin))return!1;var r=((t||{}).data||{}).value||{},o=r.data,s=r.name;"emit"===t.data.postmate&&("production"!==e.env.NODE_ENV&&i("Parent: Received event emission: "+s),s in n.events&&n.events[s].call(n,o))},this.parent.addEventListener("message",this.listener,!1),"production"!==e.env.NODE_ENV&&i("Parent: Awaiting event emissions from Child")}var o=t.prototype;return o.get=function(e){var t=this;return new c.Promise((function(i){var o=++r;t.parent.addEventListener("message",(function e(n){n.data.uid===o&&"reply"===n.data.postmate&&(t.parent.removeEventListener("message",e,!1),i(n.data.value))}),!1),t.child.postMessage({postmate:"request",type:n,property:e,uid:o},t.childOrigin)}))},o.call=function(e,t){this.child.postMessage({postmate:"call",type:n,property:e,data:t},this.childOrigin)},o.on=function(e,t){this.events[e]=t},o.destroy=function(){"production"!==e.env.NODE_ENV&&i("Parent: Destroying Postmate instance"),window.removeEventListener("message",this.listener,!1),this.frame.parentNode.removeChild(this.frame)},t}(),d=function(){function t(t){var r=this;this.model=t.model,this.parent=t.parent,this.parentOrigin=t.parentOrigin,this.child=t.child,"production"!==e.env.NODE_ENV&&(i("Child: Registering API"),i("Child: Awaiting messages...")),this.child.addEventListener("message",(function(t){if(a(t,r.parentOrigin)){"production"!==e.env.NODE_ENV&&i("Child: Received request",t.data);var o=t.data,s=o.property,d=o.uid,h=o.data;"call"!==t.data.postmate?function(e,t){var n="function"==typeof e[t]?e[t]():e[t];return c.Promise.resolve(n)}(r.model,s).then((function(e){return t.source.postMessage({property:s,postmate:"reply",type:n,uid:d,value:e},t.origin)})):s in r.model&&"function"==typeof r.model[s]&&r.model[s](h)}}))}return t.prototype.emit=function(t,r){"production"!==e.env.NODE_ENV&&i('Child: Emitting Event "'+t+'"',r),this.parent.postMessage({postmate:"emit",type:n,value:{name:t,data:r}},this.parentOrigin)},t}(),c=function(){function t(e){var t=e.container,n=void 0===t?void 0!==n?n:document.body:t,r=e.model,i=e.url,o=e.name,a=e.classListArray,s=void 0===a?[]:a;return this.parent=window,this.frame=document.createElement("iframe"),this.frame.name=o||"",this.frame.classList.add.apply(this.frame.classList,s),n.appendChild(this.frame),this.child=this.frame.contentWindow||this.frame.contentDocument.parentWindow,this.model=r||{},this.sendHandshake(i)}return t.prototype.sendHandshake=function(r){var o,d=this,c=function(e){var t=document.createElement("a");t.href=e;var n=t.protocol.length>4?t.protocol:window.location.protocol,r=t.host.length?"80"===t.port||"443"===t.port?t.hostname:t.host:window.location.host;return t.origin||n+"//"+r}(r),h=0;return new t.Promise((function(t,l){d.parent.addEventListener("message",(function n(r){return!!a(r,c)&&("handshake-reply"===r.data.postmate?(clearInterval(o),"production"!==e.env.NODE_ENV&&i("Parent: Received handshake reply from Child"),d.parent.removeEventListener("message",n,!1),d.childOrigin=r.origin,"production"!==e.env.NODE_ENV&&i("Parent: Saving Child origin",d.childOrigin),t(new s(d))):("production"!==e.env.NODE_ENV&&i("Parent: Invalid handshake reply"),l("Failed handshake")))}),!1);var u=function(){h++,"production"!==e.env.NODE_ENV&&i("Parent: Sending handshake attempt "+h,{childOrigin:c}),d.child.postMessage({postmate:"handshake",type:n,model:d.model},c),5===h&&clearInterval(o)},p=function(){u(),o=setInterval(u,500)};d.frame.attachEvent?d.frame.attachEvent("onload",p):d.frame.onload=p,"production"!==e.env.NODE_ENV&&i("Parent: Loading frame",{url:r}),d.frame.src=r}))},t}();c.debug=!1,c.Promise=function(){try{return window?window.Promise:Promise}catch(e){return null}}(),c.Model=function(){function t(e){return this.child=window,this.model=e,this.parent=this.child.parent,this.sendHandshakeReply()}return t.prototype.sendHandshakeReply=function(){var t=this;return new c.Promise((function(r,o){t.child.addEventListener("message",(function a(s){if(s.data.postmate){if("handshake"===s.data.postmate){"production"!==e.env.NODE_ENV&&i("Child: Received handshake from Parent"),t.child.removeEventListener("message",a,!1),"production"!==e.env.NODE_ENV&&i("Child: Sending handshake reply to Parent"),s.source.postMessage({postmate:"handshake-reply",type:n},s.origin),t.parentOrigin=s.origin;var c=s.data.model;return c&&(Object.keys(c).forEach((function(e){t.model[e]=c[e]})),"production"!==e.env.NODE_ENV&&i("Child: Inherited and extended model from Parent")),"production"!==e.env.NODE_ENV&&i("Child: Saving Parent origin",t.parentOrigin),r(new d(t))}return o("Handshake Reply Failed")}}),!1)}))},t}(),t.exports=c}).call(this,e("_process"))},{_process:2}],2:[function(e,t,n){var r,i,o=t.exports={};function a(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function d(e){if(r===setTimeout)return setTimeout(e,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(e){r=a}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(e){i=s}}();var c,h=[],l=!1,u=-1;function p(){l&&c&&(l=!1,c.length?h=c.concat(h):u=-1,h.length&&m())}function m(){if(!l){var e=d(p);l=!0;for(var t=h.length;t;){for(c=h,h=[];++u<t;)c&&c[u].run();u=-1,t=h.length}c=null,l=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function v(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new f(e,t)),1!==h.length||l||d(m)},f.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},{}],3:[function(e,t,n){const r=e("./twetch-pay");window.addEventListener("load",(function(){r.init()})),window.twetchPay=r},{"./twetch-pay":4}],4:[function(e,t,n){const r=e("postmate");const i=new class{async init(){var e=document.createElement("style");e.type="text/css",e.innerHTML=".twetchPayFrame {\n\t\t\tborder: none;\n\t\t\toverflow: hidden;\n\t\t\twidth: 0px;\n\t\t\theight: 0px;\n\t\t\tposition: fixed;\n\t\t\tbottom: 0;\n\t\t\tleft: 0;\n\t\t}",document.getElementsByTagName("head")[0].appendChild(e),this.child=await new r({container:document.body,url:"https://pay.twetch.com",classListArray:["twetchPayFrame"]}),this.iframe=this.child.frame,this.didInit=!0}displayIframe(){this.iframe.style.height="100%",this.iframe.style.width="100vw"}hideIframe(){this.iframe.style.width="0px",this.iframe.style.height="0px"}async pay(e){if(!this.didInit)return await(t=200,new Promise(e=>setTimeout(e,t))),void this.pay(e);var t;let n,r,i;e.moneybuttonProps&&e.moneybuttonProps.onCryptoOperations&&(n=e.moneybuttonProps.onCryptoOperations,delete e.moneybuttonProps.onCryptoOperations),e.onPayment&&(i=e.onPayment,delete e.onPayment),e.onError&&(r=e.onError,delete e.onError),this.child.call("pay",{props:e}),this.displayIframe();const o=this;return new Promise((e,t)=>{o.child.on("close",()=>(o.hideIframe(),e())),o.child.on("payment",({payment:t})=>(o.hideIframe(),i&&i(t),e(t))),o.child.on("error",({error:e})=>(o.hideIframe(),r&&r(e),t(e))),o.child.on("cryptoOperations",({cryptoOperations:e})=>(o.hideIframe(),n&&n(e)))})}};t.exports=i},{postmate:1}]},{},[3]);