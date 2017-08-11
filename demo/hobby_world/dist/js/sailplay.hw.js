/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});

(function () {

  var last_scroll = 0;
  function disableScroll() {
    last_scroll = document.body.scrollTop;
    window.document.body.style.top = -last_scroll + 'px';
    window.document.body.className += ' noscroll'
  }

  function enableScroll() {
    window.document.body.className = window.document.body.className.replace(' noscroll', '')
    window.document.body.style.top = 0;    
    window.scrollTo(0, last_scroll)
  }  

  var SAILPLAY = (function () {

    //methods that not supported in old browsers
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
          from += len;

        for (; from < len; from++) {
          if (from in this &&
            this[from] === elt)
            return from;
        }
        return -1;
      };
    }

    var cookies = {
      createCookie: function (name, value, days) {
        var expires;
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
        }
        else expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
      },
      readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },
      eraseCookie: function (name) {
        cookies.createCookie(name, "", -1);
      }
    };

    //simple jsonp service
    var JSONP = {
      currentScript: null,
      get: function (url, data, success, error) {
        var src = url + (url.indexOf("?") + 1 ? "&" : "?");
        var head = document.getElementsByTagName("head")[0];
        var newScript = document.createElement("script");
        var params = [];

        data = data || {};

        //auth_hash checking
        if (!_config.auth_hash) {
          delete data.auth_hash;
        }

        window.JSONP_CALLBACK = window.JSONP_CALLBACK || {};

        var callback_name = 'sailplay_' + new Date().getTime() + Math.random().toString().replace('.', '');

        var jsonpTimeout = setTimeout(function () {
          try {
            head.removeChild(newScript);
          }
          catch (err) {
          }
          delete window.JSONP_CALLBACK[callback_name];
        }, 10000);

        window.JSONP_CALLBACK[callback_name] = function (data) {
          clearTimeout(jsonpTimeout);
          try {
            head.removeChild(newScript);
          }
          catch (err) {
          }
          delete window.JSONP_CALLBACK[callback_name];
          success && success(data);
        };

        data["callback"] = 'JSONP_CALLBACK.' + callback_name;
        if (_config.dep_id) data.dep_id = _config.dep_id;

        for (var param_name in data) {
          params.push(param_name + "=" + encodeURIComponent(data[param_name]));
        }
        src += params.join("&");

        newScript.type = "text/javascript";
        newScript.src = src;
        newScript.onerror = function (ex) {
          try {
            head.removeChild(newScript);
          }
          catch (err) {
          }
          delete window.JSONP_CALLBACK[callback_name];
          error && error(ex);
        };

        head.insertBefore(newScript, head.firstChild);
      },
      success: null
    };

    var sp = {};

    //observer pattern
    var _handlers = {};

    sp.on = function (event, handler) {
      if (typeof (_handlers[event]) == "undefined")
        _handlers[event] = [];
      _handlers[event].push(handler);
    };

    sp.send = function (event, data, callback) {
      if (_handlers[event]) {
        for (var i = 0; i < _handlers[event].length; i++) {
          _handlers[event][i](data, callback);
        }
      }
    };

    //private config
    var _config = {};
    var _remote_login_init = false;

    function initError() {
      alert('Please init SailPlay HUB first!');
    }

    function remoteLogin(opts) {

      var frame;
      disableScroll();
      opts = opts || {};

      if (opts.node && opts.node.nodeType == 1 && opts.node.tagName == 'IFRAME') {
        frame = opts.node;
      }
      else {
        frame = document.createElement('IFRAME');
        frame.style.border = 'none';
        frame.style.position = 'fixed';
        frame.style.top = '0';
        frame.style.left = '0';
        frame.style.bottom = '0';
        frame.style.right = '0';
        frame.style.width = '410px';
        frame.style.height = '510px';
        frame.created = true;
        frame.style.background = 'transparent';
        frame.style.margin = 'auto';
        frame.style.zIndex = '100000';
        document.body.appendChild(frame);

      }

      var frame_id = frame.id || 'sailplay_login_frame_' + new Date().getTime();

      frame.name = frame_id;
      frame.id = frame_id;

      function onMessage(messageEvent) {

        var data = {};

        var _domain = _config.DOMAIN.indexOf('http:') != -1 || _config.DOMAIN.indexOf('https:') != -1 ? _config.DOMAIN : 'http:' + _config.DOMAIN;

        if (messageEvent.origin == _domain) {
          try {
            data = JSON.parse(messageEvent.data);
          }
          catch (e) {

          }
        }
        if (data.name == 'login.success') {
          sp.send('login.do', data.auth_hash);
          return;
        }
        if (data.name == 'login.cancel') {
          sp.send('login.cancel');
          cancelLogin();
          enableScroll();          
          return;
        }
        if (data.name == 'login.check') {
          if (data.auth_hash == 'None') {
            sp.send('logout');
          }
          else {
            cancelLogin();
            enableScroll();            
            sp.send('login.do', data.auth_hash, data)
          }
          return;
        }
        if (data.name == 'logout.success') {
          _config.auth_hash = '';
          sp.send('logout.success');
        }

      }

      function cancelLogin() {
        if (frame.created) {
          document.body.removeChild(frame);
          window.removeEventListener("message", onMessage, false);
          _remote_login_init = false;
        }
      }

      var params = {};
      params.partner_id = _config.partner.id;
      params.dep_id = _config.dep_id || '';
      params.background = opts.background || '';
      params.partner_info = opts.partner_info || 0;
      if(opts.reg_match_email_oid) {
        params.reg_match_email_oid = opts.reg_match_email_oid;
      }
      if(opts.css_link) {
        params.css_link = opts.css_link;
      }
      if (opts.lang) {
        params.lang = opts.lang;
      }
      params.disabled_options = opts.disabled_options || '';
      params.texts = JSON.stringify(opts.texts || '');


      var params_string = [];

      var src = _config.DOMAIN + '/users/auth-page/?';
      for (var param_name in params) {
        params_string.push(param_name + "=" + encodeURIComponent(params[param_name]));
      }
      src += params_string.join("&");

      frame.setAttribute('src', src);

      if (!_remote_login_init) {
        window.addEventListener("message", onMessage, false);
        _remote_login_init = true;
      }

    }

    //init function
    sp.on('init', function (params) {
      if (!params) {
        alert('SailPlay: provide required parameters');
      }
      if (!params.partner_id) {
        alert('SailPlay: provide partner_id');
        return;
      }
      JSONP.get((params.domain || 'http://sailplay.ru') + '/js-api/' + params.partner_id + '/config/', {
        lang: params.lang || 'ru',
        dep_id: (params.dep_id || '')
      }, function (response) {
        if (response && response.status == 'ok') {

          _config = response.config;
          _config.DOMAIN = (params.domain || 'http://sailplay.ru');
          _config.dep_id = params.dep_id || '';
          _config.env.staticUrl = params.static_url || _config.env.staticUrl;
          _config.social_networks = ['fb', 'vk', 'tw', 'gp', 'ok'];
          _config.platform = params.platform || 'desktop';

          //postmessage events init
          //1. bind action events
          function onActionMessage(messageEvent) {
            var data = {};
            if (messageEvent.origin == _config.DOMAIN) {
              try {
                data = JSON.parse(messageEvent.data);
              }
              catch (e) {

              }

              switch (data && data.name) {
                case 'actions.perform.success':
                  sp.send('actions.perform.success', data);
                  break;
                case 'actions.perform.error':
                  sp.send('actions.perform.error', data);
                  break;
                case 'actions.social.connect.complete':
                  sp.send('actions.social.connect.complete', data);
                  break;
                case 'actions.social.connect.success':
                  sp.send('actions.social.connect.success', data);
                  break;
                case 'actions.social.connect.error':
                  sp.send('actions.social.connect.error', data);
                  break;
                case 'friend_invite_cookie':
                  break;
                case 'actions.social.gp.like.mouseenter':
                  sp.send('actions.social.gp.like.mouseenter');
                  break;
                case 'actions.social.gp.like.mouseleave':
                  sp.send('actions.social.gp.like.mouseleave');
                  break;
              }

            }
          }

          window.addEventListener("message", onActionMessage, false);

          //2. recieve ref_hash info
          // _config.ref_hash = sp.url_params().ref_hash || '';
          //var cookie_frame = document.createElement('IFRAME');
          //cookie_frame.style.width = 0;
          //cookie_frame.style.height = 0;
          //cookie_frame.style.top = '-10000px';
          //cookie_frame.style.left = '-10000px';
          //cookie_frame.src = _config.DOMAIN + '/js-api/' + _config.partner.id + '/actions/social-widget/v2/';
          //document.body.appendChild(cookie_frame);
          //cookie_frame.onload = function(){
          //  document.body.removeChild(cookie_frame);
          //};

          sp.send('init.success', _config);
          //        console.dir(_config);
        } else {
          sp.send('init.error', response);
          alert('SailPlay: app load failed!');
        }
      });

    });

    sp.on('login.remote', function (options) {
      remoteLogin(options);
    });

    //////////////////
    //bind hub events
    sp.on('language.set', function (lang) {
      if (_config == {}) {
        initError();
        return;
      }
      if (typeof lang == 'string') {
        JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/config/', {lang: lang}, function (response) {
          if (response && response.status == 'ok') {
            _config.lang = response.config.lang;
            sp.send('language.set.success', _config.lang);
            //        console.dir(_config);
          } else {
            sp.send('language.set.error', response);
          }
        });
      }
    });

    //////////////////
    //bind api events

    //LOGIN & LOGOUT
    sp.on('login.do', function (auth_hash) {
      _config.auth_hash = auth_hash;
//    cookies.createCookie('sp_auth_hash', _config.auth_hash);
      var params = {
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('login.success', res.user);
        } else {
          _config.auth_hash = '';
//        cookies.eraseCookie('sp_auth_hash');
          sp.send('login.error', res);
        }
      });
    });

    sp.on('login', function (auth_hash) {

      if (_config == {}) {
        initError();
        return;
      }

      sp.send('login.do', auth_hash);

    });

    sp.on('logout', function () {
      if (_config == {}) {
        initError();
        return;
      }
      var req = document.createElement('iframe');
      req.width = 0;
      req.height = 0;
      req.style.border = 'none';
      req.src = _config.DOMAIN + '/users/logout/';
      document.body.appendChild(req);
      req.onload = function () {
        document.body.removeChild(req);
        _config.auth_hash = '';
        cookies.eraseCookie('sp_auth_hash');
        sp.send('logout.success');
      };


    });

    //USER INFO
    sp.on('load.user.info', function (p, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      var params = {
        user_status: 1,
        badges: 1,
        last_badge: 1
      };
      if (p && p.purchases) {
        params.purchases = p.purchases;
      }
      if (p && p.all) {
        params.all = p.all;
      }
      if (p && p.user) {
        for (var param in p.user) {
          params[param] = p.user[param];
        }
      }
      else {
        params.auth_hash = _config.auth_hash;
      }
      JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
        callback && callback(res);
        if (res.status == 'ok') {
          sp.send('load.user.info.success', res);
        } else {
          sp.send('load.user.info.error', res);
        }
      });
    });

    sp.on('users.update', function (params, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }

      JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/users/update/', params, function (res) {

        callback && callback(res);

        if (res.status === 'ok') {
          sp.send('users.update.success', res);
        }
        else {
          sp.send('users.update.error', res);
        }
      });

    });

    //user feedback
    sp.on('users.feedback', function (params, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }
      else {
        sp.send('auth.error');
        return;
      }

      JSONP.get(_config.DOMAIN + _config.urls.users.feedback, params, function (res) {

        callback && callback(res);

        if (res.status === 'ok') {
          sp.send('users.feedback.success', res);
        }
        else {
          sp.send('users.feedback.error', res);
        }
      });

    });

    //USER HISTORY
    sp.on('load.user.history', function (params) {
      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }

      JSONP.get(_config.DOMAIN + _config.urls.users.history, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('load.user.history.success', res.history);
        } else {
          sp.send('load.user.history.error', res);
        }
      });
    });

    //GIFTS GET INFO
    sp.on('gifts.get', function (giftId) {
      if (_config == {}) {
        initError();
        return;
      }
      var params = {
        gift_id: giftId,
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.gifts.get, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('gifts.get.success', res.gift);
        } else {
          sp.send('gifts.get.error', res);
        }
      });
    });

    //GIFTS LIST
    sp.on('load.gifts.list', function (params) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }

      params.lang = params.lang || _config.lang || 'ru';

      JSONP.get(_config.DOMAIN + _config.urls.gifts.list, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('load.gifts.list.success', res.gifts);
        } else {
          sp.send('load.gifts.list.error', res);
        }
      });
    });

    //GIFT CATEGORIES
    sp.on('load.gifts.categories', function (params) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      JSONP.get(_config.DOMAIN + _config.urls.gifts.categories_list, params, function (res) {
        if (res.status == 'ok') {
          sp.send('load.gifts.categories.success', res.categories);
        } else {
          sp.send('load.gifts.categories.error', res);
        }
      });

    });

    //GET GIFT
    function forceCompleteGiftPurchase(giftPurchase, opts) {
      var params = {
        gift_public_key: giftPurchase.gift_public_key,
        auth_hash: _config.auth_hash
      };
      if (opts && opts.no_user_sms) {
        params.no_user_sms = opts.no_user_sms;
      }
      JSONP.get(_config.DOMAIN + _config.urls.gifts.purchase.force_confirm, params, function (res) {
        if (res.status == 'ok') {
          sp.send('gift.purchase.force_complete.success', res);
        } else {
          sp.send('gift.purchase.force_complete.error', res);
        }
        //      console.dir(res);
      });
    }

    //CREATE GIFT PURCHASE V1
    sp.on('gifts.purchase', function (p) {
      if (_config == {}) {
        initError();
        return;
      }
      var gift = p.gift || {};
      if (!_config.auth_hash) {
        sp.send('gifts.purchase.auth.error', gift);
      } else {
        var params = {
          gift_id: gift.id,
          dep_id: _config.dep_id || _config.partner.depId || '',
          auth_hash: _config.auth_hash
        };
        JSONP.get(_config.DOMAIN + _config.urls.gifts.purchase.purchase, params, function (res) {
          if (res.status == 'ok') {
            sp.send('gifts.purchase.success', res);
            if (res.is_completed) {
              var requestedPurchase = res;
              if (!requestedPurchase.request_to_partner_url) {
                forceCompleteGiftPurchase(requestedPurchase, p.options);
              } else {
                var reqGiftPurchase = {
                  gift_public_key: requestedPurchase['gift_public_key'],
                  gift_sku: requestedPurchase['gift_sku'],
                  auth_hash: _config.auth_hash
                };
                if (requestedPurchase['user_phone']) {
                  reqGiftPurchase['user_phone'] = requestedPurchase['user_phone'];
                }
                if (requestedPurchase['email']) {
                  reqGiftPurchase['email'] = requestedPurchase['email'];
                }
                JSONP.get(requestedPurchase.request_to_partner_url, reqGiftPurchase, function (res) {
                  sp.send('gifts.purchase.partner_request.success', res);
                }, function (res) {
                  sp.send('gifts.purchase.partner_request.error', res);
                  forceCompleteGiftPurchase(requestedPurchase, p.options);
                });
              }
            }
          } else {
            sp.send('gift.purchase.error', res);
          }
          //        console.dir(res);
        });
      }
    });

    //BADGES LIST
    sp.on('load.badges.list', function (p) {
      if (_config == {}) {
        initError();
        return;
      }
      var params = {
        auth_hash: _config.auth_hash,
        lang: p && p.lang || _config.lang || 'ru'
      };
      if(p){
        if(p.include_rules) {
          params.include_rules = 1;
        }
      }
      JSONP.get(_config.DOMAIN + _config.urls.badges.list, params, function (res) {

        //      console.dir(res);
        if (res.status == 'ok') {

          function create_badge_actions(badge) {
            if (badge && badge.is_received) {

              badge.actions = {};

              for (var sn in _config.social_networks) {

                badge.actions[_config.social_networks[sn]] = {

                  socialType: _config.social_networks[sn],
                  action: 'badge',
                  shortLink: window.location.href,
                  pic: badge.thumbs.url_250x250,
                  badgeId: badge.id,
                  msg: badge.share_msg

                };

              }
            }
          }

          for (var ch in res.multilevel_badges) {

            var multi_line = res.multilevel_badges[ch];

            for (var b in multi_line) {

              create_badge_actions(multi_line[b]);

            }

          }

          for (var olb in res.one_level_badges) {

            create_badge_actions(res.one_level_badges[olb]);

          }

          sp.send('load.badges.list.success', res);
        } else {
          sp.send('load.badges.list.error', res);
        }
      });
    });

    //PROMO-CODES SECTION
    sp.on('promocodes.apply', function (promocode) {
      if (_config == {}) {
        initError();
        return;
      }
      promocode.auth_hash = _config.auth_hash;
      if (_config.auth_hash) {
        JSONP.get(_config.DOMAIN + _config.urls.promocodes.apply, promocode, function (res) {
          if (res.status == 'ok') {
            sp.send('promocodes.apply.success', res);
          } else {
            sp.send('promocodes.apply.error', res);
          }
        });
      } else {
        sp.send('promocodes.apply.auth.error', action);
      }
    });

    // user update
    sp.on("user.update", function (params) {
      if (_config == {}) {
        initError();
        return;
      }
      JSONP.get(_config.DOMAIN + "/js-api/" + _config.partner.id + "/users/update/", params, function (res) {
        if (res.status == 'ok') {
          sp.send('user.update.success', res);
        } else {
          sp.send('user.update.error', res);
        }
      })
    });

    //TAGS SECTIONS
    sp.on('tags.add', function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      if (_config.auth_hash || data.user) {
        var tagsObj = {
          tags: data.tags && data.tags.join(',') || []
        };
        if (data.user) {
          for (var p in data.user) {
            tagsObj[p] = data.user[p];
          }
        }
        else {
          tagsObj.auth_hash = _config.auth_hash;
        }
        JSONP.get(_config.DOMAIN + _config.urls.tags.add, tagsObj, function (res) {
          callback && callback(res);
          if (res.status == 'ok') {
            sp.send('tags.add.success', res);
          } else {
            sp.send('tags.add.error', res);
          }
        });
      } else {
        SAILPLAY.send('tags.add.auth.error', data);
      }
    });

    sp.on('tags.delete', function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      if (_config.auth_hash || data.user) {
        var tagsObj = {
          tags: data.tags && data.tags.join(',') || []
        };
        if (data.user) {
          for (var p in data.user) {
            tagsObj[p] = data.user[p];
          }
        }
        else {
          tagsObj.auth_hash = _config.auth_hash;
        }
        JSONP.get(_config.DOMAIN + _config.urls.tags.delete, tagsObj, function (res) {
          callback && callback(res);
          if (res.status == 'ok') {
            sp.send('tags.delete.success', res);
          } else {
            sp.send('tags.delete.error', res);
          }
        });
      } else {
        SAILPLAY.send('tags.delete.auth.error', data);
      }
    });

    // tag exist
    sp.on("tags.exist", function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      if (_config.auth_hash || data.user) {
        var obj = {
          tags: JSON.stringify(data.tags)
        };
        if (data.user) {
          for (var p in data.user) {
            obj[p] = data.user[p];
          }
        }
        else {
          obj.auth_hash = _config.auth_hash;
        }
        obj.lang = data.lang || _config.lang || 'ru';
        JSONP.get(_config.DOMAIN + _config.urls.tags.exist, obj, function (res) {
          if (res.status == 'ok') {
            sp.send('tags.exist.success', res);
          } else {
            sp.send('tags.exist.error', res);
          }
          callback && callback(res);
        });
      } else {
        sp.send('tags.exist.auth.error', data);
      }

    });

    /**
     * Add variables to user
     * @object data {custom_vars:{}, user: {}}
     * @function callback
     */
    sp.on('vars.add', function (data, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      if (_config.auth_hash || data.user) {

        var obj = data.custom_vars;

        if (data.user)
          for (var p in data.user) obj[p] = data.user[p];
        else
          obj.auth_hash = _config.auth_hash;

        obj.lang = data.lang || _config.lang || 'ru';

        JSONP.get(_config.DOMAIN + _config.urls.users.custom_variables.add, obj, function (res) {
          if (res.status == 'ok')
            sp.send('vars.add.success', res);
          else
            sp.send('vars.add.error', res);
          callback && callback(res);
        });

      } else {
        sp.send('vars.add.auth.error', data);
      }

    });

    /**
     * Get user variables
     * @object data {names: [], user: {}}
     * @function callback
     */
    sp.on("vars.batch", function (data, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      if (_config.auth_hash || data.user) {

        var obj = {
          names: JSON.stringify(data.names)
        };

        if (data.user)
          for (var p in data.user) obj[p] = data.user[p];
        else
          obj.auth_hash = _config.auth_hash;

        obj.lang = data.lang || _config.lang || 'ru';

        JSONP.get(_config.DOMAIN + _config.urls.users.custom_variables.batch_get, obj, function (res) {
          if (res.status == 'ok')
            sp.send('vars.batch.success', res);
          else
            sp.send('vars.batch.error', res);
          callback && callback(res);
        });

      } else {
        sp.send('vars.batch.auth.error', data);
      }

    });

    //LEADERBOARD SECTION
    sp.on('leaderboard.load', function () {
      if (_config == {}) {
        initError();
        return;
      }
      var tagsObj = {
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.leaderboard.data, tagsObj, function (res) {
        if (res.status == 'ok') {
          sp.send('leaderboard.load.success', res.data);
        } else {
          sp.send('leaderboard.load.error', res);
        }
      });
    });

    //REVIEWS SECTION
    sp.on('load.reviews.list', function (data) {
      if (_config == {}) {
        initError();
        return;
      }

      var req_data = {};

      if (data) {
        req_data.page = data.page || 1
      }

      JSONP.get(_config.DOMAIN + _config.urls.reviews.list, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('load.reviews.list.success', {page: res.page, pages: res.pages, reviews: res.reviews});
        } else {
          sp.send('load.reviews.list.error', res);
        }
      });
    });

    sp.on('reviews.add', function (data) {
      if (_config == {}) {
        initError();
        return;
      }
      var req_data = {
        auth_hash: _config.auth_hash,
        rating: data.rating || '',
        review: data.review || ''
      };
      JSONP.get(_config.DOMAIN + _config.urls.reviews.add, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('reviews.add.success', res);
        } else {
          sp.send('reviews.add.error', res);
        }
      });
    });

    sp.on('purchases.add', function (data) {
      if (_config == {}) {
        initError();
        return;
      }
      var req_data = {
        auth_hash: _config.auth_hash,
        price: data.price || '',
        order_num: data.order_num || ''
      };
      JSONP.get(_config.DOMAIN + _config.urls.purchase, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('purchases.add.success', res);
        } else {
          sp.send('purchases.add.error', res);
        }
      });
    });

    sp.on('magic.config', function (name) {
      if (_config == {}) {
        initError();
        return;
      }
      JSONP.get(_config.DOMAIN + _config.urls.loyalty_page_config_by_name, { name: name || 'default' }, function (res) {
        if (res.status == 'ok') {
          sp.send('magic.config.success', res);
        } else {
          sp.send('magic.config.error', res);
        }
      });
    });

    //utils
    sp.config = function () {
      return _config;
    };

    sp.find_by_properties = function (arr, props) {
      var filtered_arr = [];
      for (var i = 0; i < arr.length; i += 1) {
        var seeked = arr[i];
        var good = true;
        for (var p in props) {
          if (props[p] != seeked[p]) {
            good = false;
          }
        }
        if (good) filtered_arr.push(seeked);
      }
      return filtered_arr;
    };

    sp.jsonp = JSONP;

    sp.cookies = cookies;

    sp.is_dom = function (obj) {
      //Returns true if it is a DOM node

      function isNode(o) {
        return (
          typeof Node === "object" ? o instanceof Node :
          o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
        );
      }

      //Returns true if it is a DOM element
      function isElement(o) {
        return (
          typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
          o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
      }

      return isNode(obj) || isElement(obj);

    };

    sp.url_params = function () {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var uri_component = pair && pair[1] ? pair[1].replace(/%([^\d].)/, "%25$1") : '';
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(uri_component);
          // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          query_string[pair[0]] = [query_string[pair[0]], decodeURIComponent(uri_component)];
          // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(uri_component));
        }
      }
      return query_string;
    };

    return sp;

  }());

  if(typeof window !== 'undefined') window.SAILPLAY = SAILPLAY;
  if(typeof module !== 'undefined') module.exports = SAILPLAY;
  if(typeof exports !== 'undefined') exports = SAILPLAY;

}());

(function () {

  if(typeof window.SAILPLAY === 'undefined'){
    console.log('Can\'t find main SAILPLAY module');
    return;
  }

  var sp = window.SAILPLAY;

  var JSONP = sp.jsonp;

  var _actions_config = false;

  sp.actions = {};

  sp.actions.config = function(){
    return _actions_config;
  };

  //ACTIONS SECTION

  //LOAD ACTIONS LIST
  sp.on('load.actions.list', function () {
    if(sp.config() == {}){
      alert('Please init SailPlay HUB first!');
      return;
    }
    var params = {
      auth_hash: sp.config().auth_hash
    };

    JSONP.get(sp.config().DOMAIN + sp.config().urls.actions.load, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        _actions_config = res.data;
        sp.send('load.actions.list.success', res.data);
      } else {
        sp.send('load.actions.list.error', res);
      }
    });
  });

  //LOAD ACTIONS LIST
  sp.on('load.actions.custom.list', function () {
    if(sp.config() == {}){
      alert('Please init SailPlay HUB first!');
      return;
    }
    var params = {
      auth_hash: sp.config().auth_hash
    };

    JSONP.get(sp.config().DOMAIN + sp.config().urls.actions.custom.list, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('load.actions.custom.list.success', res.actions);
      } else {
        sp.send('load.actions.custom.list.error', res);
      }
    });
  });

  sp.on('set.actions.list', function (actions) {
    _actions_config = actions;
  });

  //PERFORM ACTION

  sp.actions.parse = function(dom, action){

    if(!sp.is_dom(dom)) {
      console.error('sp.actions.parse() need DOM element as first parameter');
      return;
    }

    if(!action) {
      console.error('sp.actions.parse() need Action object as second parameter');
      return;
    }

    if(!_actions_config.connectedAccounts && !action.force) {

      console.error('sp.actions.parse() must execute after event load.actions.list.success');
      return;

    }

    if(!action.socialType){

      //console.dir(action);
      dom.addEventListener('click', function(){
        sp.send('actions.perform', action);
      });

      return;

    }

    if(sp.config().platform === 'mobile' && action.socialType){

      dom.addEventListener('click', function(){
        sp.send('actions.perform', action);
      });

    }

    else {

      parse_frame();

    }

    function parse_frame(){
      var styles = dom.getAttribute('data-styles');
      var text = dom.getAttribute('data-text');

      var action_frame = document.createElement('IFRAME');
      action_frame.style.border = 'none';
      action_frame.style.width = '150px';
      action_frame.style.height = '30px';
      action_frame.style.background = 'transparent';
      action_frame.style.overflow = 'hidden';
      action_frame.setAttribute('scrolling', 'no');

      var account_connected = action.force ? true : (_actions_config.connectedAccounts[action.socialType] || false);

      action_frame.className = [ 'sailplay_action_frame', (action.socialType || ''),  (action.action || ''), (account_connected ? 'account_connected' : '')].join(' ');

      function EncodeQueryData(data)
      {
        var ret = [];
        for (var d in data)
          ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        return ret.join("&");
      }

      var frame_params = {
        auth_hash: sp.config().auth_hash,
        socialType: action.socialType,
        action: action.action,
        link: action.shortLink,
        pic: (action.pic || _actions_config.partnerCustomPic || sp.config().partner.logo),
        msg: (action.msg || _actions_config.messages[action.action] || sp.config().partner.name),
        account_connected: account_connected,
        force: action.force
      };

      if(action['_actionId']) frame_params._actionId = action._actionId;
      if(styles) frame_params.styles = styles;
      if(text) frame_params.text = text;

      if (action.action == 'purchase') {
        frame_params.purchasePublicKey = _actions_config.purchasePublicKey;
      }

      if (action.action == 'badge') {
        frame_params.badgeId= action.badgeId;
      }

      action_frame.src = sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/v2/?' + EncodeQueryData(frame_params);
      dom.innerHTML = '';
      dom.appendChild(action_frame);

      action_frame.onload = function() {
        sp.send('actions.parse.success', action);
      };

      //gp speciefied config

    }



  };

  sp.on('actions.parse', function (actions) {

    if(sp.config() == {}){
      return;
    }

    if(actions && Array.isArray(actions)) {
      Actions.social_init(actions);
    }
    else {
      sp.send('actions.parse.error', { message: 'Actions list needed' });
    }

  });

  // SOCIAL GOOGLE PLUS CHANGE HEIGHT
  sp.on('actions.social.gp.like.mouseenter', function(){
    var elms = document.querySelectorAll('iframe[iframe-action-gp-like], iframe.gp.like');
    var originWidth,
      w,
      h = 500;
    for(var i = 0, len = elms.length; i < len; i++){
      elms[i].removeAttribute("style");
      originWidth = elms[i].parentNode. offsetWidth;
      w = +originWidth + 70;
      elms[i].style.cssText = 'width: ' + w + 'px !important;height: ' + h + 'px !important;margin-left: -35px !important;z-index: 10 !important;';
      elms[i].parentNode.style.setProperty ("overflow", "visible", "important");
    }
  });

  sp.on('actions.social.gp.like.mouseleave', function(){
    var elms = document.querySelectorAll('iframe[iframe-action-gp-like], iframe.gp.like');
    var w = 150,
      h = 27;
    for(var i = 0, len = elms.length; i < len; i++){
      elms[i].removeAttribute("style");
      elms[i].style.cssText = 'width: ' + w + 'px !important;height: ' + h + 'px !important;margin-left: auto !important;';
      elms[i].parentNode.style.setProperty ("overflow", "hidden", "important");
    }
  });

  var Actions = {};

  Actions.social_init = function(actions){

    var social_buttons = document.querySelectorAll('[data-sp-action]');

    for(var i = 0; i < social_buttons.length; i+=1) {

      (function(){
        var btn = social_buttons[i];
        var action_id = Number(btn.getAttribute('data-sp-action'));
        var action = sp.find_by_properties((actions || _actions_config.actions), { _actionId: action_id })[0];
        sp.actions.parse(btn, action);
      }());

    }

  };

  //actions v1 section

  Actions.openSocialRegNeedPopup = function (action) {
    var w;
    if (action.socialType == 'vk')
      w = Actions.popupWindow(_actions_config.social.vk.authUrl, 'social_reg', 840, 400);
    else
      w = Actions.popupWindow(_actions_config.social[action.socialType].authUrl, 'social_reg');

    var checkPopupInterval = setInterval(function () {
      if (w == null || w.closed) {
        sp.send('actions.social.connect.complete');
        clearInterval(checkPopupInterval);
      }
    }, 100);

  };

  Actions.popupWindow = function (url, title, w, h) {
    var width, height, left, top;
    if (w !== undefined && h !== undefined) {
      width = w;
      height = h;
      left = (screen.width / 2) - (w / 2);
      top = (screen.height / 2) - (h / 2);
    } else {
      width = screen.width / 2;
      height = screen.height / 2;
      left = width - (width / 2);
      top = height - (height / 2);
    }

    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

  };

  Actions.share = function (action) {

    var frameUrl = sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/?auth_hash=' + sp.config().auth_hash;
    frameUrl += '&socialType=' + action.socialType + '&action=' + action.action + '&link=' + action.shortLink + '&pic=' + (_actions_config.partnerCustomPic ? _actions_config.partnerCustomPic : sp.config().partner.logo);

    frameUrl += '&msg=' + _actions_config.messages[action.action];
    frameUrl += '&_actionId=' + action['_actionId'];

    if (action.action == 'purchase') {
      frameUrl += '&purchasePublicKey=' + _actions_config.purchasePublicKey;
    }

    var socialFrame = Actions.popupWindow(frameUrl, 'social_action', 200, 210);
    var checkPopupInterval = setInterval(function () {
      if (socialFrame == null || socialFrame.closed) {
        sp.send('actions.perform.complete', action);
        clearInterval(checkPopupInterval);
      }
    }, 200);

  };

  Actions.perform = function(action){

    if(sp.config().platform === 'mobile') {

      end_share(action);
      return;

    }

    sp.send('actions.perform.start', action);

    if (action.socialType && _actions_config.connectedAccounts) {
      if (!_actions_config.connectedAccounts[action.socialType]) {
        Actions.openSocialRegNeedPopup(action);
      } else {
        Actions.share(action);
      }
    }
    else if(!action.socialType){
      var frameUrl = sp.config().DOMAIN + '/popup/' + sp.config().partner.id + '/widgets/custom/' + action.type  + '/?auth_hash=' + sp.config().auth_hash;
      frameUrl += '&lang=' + sp.config().lang;
      frameUrl += '&from_sdk=0';
      var actionFrame = Actions.popupWindow(frameUrl, 'SailPlay', 600, 400);
      var checkPopupInterval = setInterval(function () {
        if (actionFrame == null || actionFrame.closed) {
          sp.send('actions.perform.complete', action);
          clearInterval(checkPopupInterval);
        }
      }, 200);
    }

  };

  sp.on('actions.perform', function (action, callback) {
    if(sp.config() == {}){
      return;
    }
    if (sp.config().auth_hash) {
      Actions.perform(action, callback);
    } else {
      sp.send('actions.perform.auth.error', action);
    }
  });

  function repair_pic_url(url){
    console.log(url);
    if(/^((http|https|ftp):\/\/)/.test(url)){
      return url;
    }
    if(url.indexOf('//') === 0){
      return window.location.protocol + url;
    }
    else {
      return sp.config().DOMAIN + url;
    }
  }

  function end_share(action){

    var handle_params = {
      partner_id: sp.config().partner.id,
      social_type: action.socialType,
      action: action.action,
      purchase_public_key: _actions_config.purchasePublicKey || '',
      badge_id: action.badgeId || '',
      auth_hash: sp.config().auth_hash,
      platform: sp.config().platform
    };

    sp.jsonp.get(sp.config().DOMAIN + sp.config().urls.actions.handle_social_action, handle_params,

      function(res){
        sp.send('actions.perform.success', { response: res, action: action });
      },
      function(res){
        sp.send('actions.perform.error', { error: res, action: action });
      })

  }


}());

/*
 AngularJS v1.6.5
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(x){'use strict';function pe(a){if(G(a))t(a.objectMaxDepth)&&(Lc.objectMaxDepth=Tb(a.objectMaxDepth)?a.objectMaxDepth:NaN);else return Lc}function Tb(a){return W(a)&&0<a}function K(a,b){b=b||Error;return function(){var d=arguments[0],c;c="["+(a?a+":":"")+d+"] http://errors.angularjs.org/1.6.5/"+(a?a+"/":"")+d;for(d=1;d<arguments.length;d++){c=c+(1==d?"?":"&")+"p"+(d-1)+"=";var e=encodeURIComponent,f;f=arguments[d];f="function"==typeof f?f.toString().replace(/ \{[\s\S]*$/,""):"undefined"==
typeof f?"undefined":"string"!=typeof f?JSON.stringify(f):f;c+=e(f)}return new b(c)}}function oa(a){if(null==a||Za(a))return!1;if(I(a)||C(a)||z&&a instanceof z)return!0;var b="length"in Object(a)&&a.length;return W(b)&&(0<=b&&(b-1 in a||a instanceof Array)||"function"===typeof a.item)}function p(a,b,d){var c,e;if(a)if(E(a))for(c in a)"prototype"!==c&&"length"!==c&&"name"!==c&&a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else if(I(a)||oa(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in
a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==p)a.forEach(b,d,a);else if(Mc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else for(c in a)wa.call(a,c)&&b.call(d,a[c],c,a);return a}function Nc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function Ub(a){return function(b,d){a(d,b)}}function qe(){return++sb}function Vb(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=
b[e];if(G(g)||E(g))for(var k=Object.keys(g),h=0,l=k.length;h<l;h++){var m=k[h],n=g[m];d&&G(n)?ia(n)?a[m]=new Date(n.valueOf()):$a(n)?a[m]=new RegExp(n):n.nodeName?a[m]=n.cloneNode(!0):Wb(n)?a[m]=n.clone():(G(a[m])||(a[m]=I(n)?[]:{}),Vb(a[m],[n],!0)):a[m]=n}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function O(a){return Vb(a,xa.call(arguments,1),!1)}function re(a){return Vb(a,xa.call(arguments,1),!0)}function Q(a){return parseInt(a,10)}function Xb(a,b){return O(Object.create(a),b)}function B(){}
function ab(a){return a}function aa(a){return function(){return a}}function Yb(a){return E(a.toString)&&a.toString!==la}function v(a){return"undefined"===typeof a}function t(a){return"undefined"!==typeof a}function G(a){return null!==a&&"object"===typeof a}function Mc(a){return null!==a&&"object"===typeof a&&!Oc(a)}function C(a){return"string"===typeof a}function W(a){return"number"===typeof a}function ia(a){return"[object Date]"===la.call(a)}function Zb(a){switch(la.call(a)){case "[object Error]":return!0;
case "[object Exception]":return!0;case "[object DOMException]":return!0;default:return a instanceof Error}}function E(a){return"function"===typeof a}function $a(a){return"[object RegExp]"===la.call(a)}function Za(a){return a&&a.window===a}function bb(a){return a&&a.$evalAsync&&a.$watch}function La(a){return"boolean"===typeof a}function se(a){return a&&W(a.length)&&te.test(la.call(a))}function Wb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function ue(a){var b={};a=a.split(",");var d;for(d=
0;d<a.length;d++)b[a[d]]=!0;return b}function ya(a){return N(a.nodeName||a[0]&&a[0].nodeName)}function cb(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function Ia(a,b,d){function c(a,b,c){c--;if(0>c)return"...";var d=b.$$hashKey,g;if(I(a)){g=0;for(var f=a.length;g<f;g++)b.push(e(a[g],c))}else if(Mc(a))for(g in a)b[g]=e(a[g],c);else if(a&&"function"===typeof a.hasOwnProperty)for(g in a)a.hasOwnProperty(g)&&(b[g]=e(a[g],c));else for(g in a)wa.call(a,g)&&(b[g]=e(a[g],c));d?b.$$hashKey=d:delete b.$$hashKey;
return b}function e(a,b){if(!G(a))return a;var d=g.indexOf(a);if(-1!==d)return k[d];if(Za(a)||bb(a))throw za("cpws");var d=!1,e=f(a);void 0===e&&(e=I(a)?[]:Object.create(Oc(a)),d=!0);g.push(a);k.push(e);return d?c(a,e,b):e}function f(a){switch(la.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(e(a.buffer),
a.byteOffset,a.length);case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^/]*$/)[0]),b.lastIndex=a.lastIndex,b;case "[object Blob]":return new a.constructor([a],{type:a.type})}if(E(a.cloneNode))return a.cloneNode(!0)}
var g=[],k=[];d=Tb(d)?d:NaN;if(b){if(se(b)||"[object ArrayBuffer]"===la.call(b))throw za("cpta");if(a===b)throw za("cpi");I(b)?b.length=0:p(b,function(a,c){"$$hashKey"!==c&&delete b[c]});g.push(a);k.push(b);return c(a,b,d)}return e(a,d)}function $b(a,b){return a===b||a!==a&&b!==b}function sa(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d===typeof b&&"object"===d)if(I(a)){if(!I(b))return!1;if((d=a.length)===b.length){for(c=0;c<d;c++)if(!sa(a[c],
b[c]))return!1;return!0}}else{if(ia(a))return ia(b)?$b(a.getTime(),b.getTime()):!1;if($a(a))return $a(b)?a.toString()===b.toString():!1;if(bb(a)||bb(b)||Za(a)||Za(b)||I(b)||ia(b)||$a(b))return!1;d=R();for(c in a)if("$"!==c.charAt(0)&&!E(a[c])){if(!sa(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&t(b[c])&&!E(b[c]))return!1;return!0}return!1}function db(a,b,d){return a.concat(xa.call(b,d))}function Qa(a,b){var d=2<arguments.length?xa.call(arguments,2):[];return!E(b)||b instanceof
RegExp?b:d.length?function(){return arguments.length?b.apply(a,db(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function Pc(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=void 0:Za(b)?d="$WINDOW":b&&x.document===b?d="$DOCUMENT":bb(b)&&(d="$SCOPE");return d}function eb(a,b){if(!v(a))return W(b)||(b=b?2:null),JSON.stringify(a,Pc,b)}function Qc(a){return C(a)?JSON.parse(a):a}function Rc(a,b){a=a.replace(ve,"");var d=Date.parse("Jan 01, 1970 00:00:00 "+
a)/6E4;return ba(d)?b:d}function ac(a,b,d){d=d?-1:1;var c=a.getTimezoneOffset();b=Rc(b,c);d*=b-c;a=new Date(a.getTime());a.setMinutes(a.getMinutes()+d);return a}function Aa(a){a=z(a).clone().empty();var b=z("<div>").append(a).html();try{return a[0].nodeType===Ma?N(b):b.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/,function(a,b){return"<"+N(b)})}catch(d){return N(b)}}function Sc(a){try{return decodeURIComponent(a)}catch(b){}}function Tc(a){var b={};p((a||"").split("&"),function(a){var c,e,f;a&&(e=a=
a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=Sc(e),t(e)&&(f=t(f)?Sc(f):!0,wa.call(b,e)?I(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function bc(a){var b=[];p(a,function(a,c){I(a)?p(a,function(a){b.push(ma(c,!0)+(!0===a?"":"="+ma(a,!0)))}):b.push(ma(c,!0)+(!0===a?"":"="+ma(a,!0)))});return b.length?b.join("&"):""}function fb(a){return ma(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ma(a,b){return encodeURIComponent(a).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function we(a,b){var d,c,e=Na.length;for(c=0;c<e;++c)if(d=Na[c]+b,C(d=a.getAttribute(d)))return d;return null}function xe(a,b){var d,c,e={};p(Na,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});p(Na,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":","\\:")+"]"))&&(d=e,c=e.getAttribute(b))});d&&(ye?(e.strictDi=null!==we(d,"strict-di"),
b(d,c?[c]:[],e)):x.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."))}function Uc(a,b,d){G(d)||(d={});d=O({strictDi:!1},d);var c=function(){a=z(a);if(a.injector()){var c=a[0]===x.document?"document":Aa(a);throw za("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);
b.unshift("ng");c=gb(b,d.strictDi);c.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;x&&e.test(x.name)&&(d.debugInfoEnabled=!0,x.name=x.name.replace(e,""));if(x&&!f.test(x.name))return c();x.name=x.name.replace(f,"");fa.resumeBootstrap=function(a){p(a,function(a){b.push(a)});return c()};E(fa.resumeDeferredBootstrap)&&fa.resumeDeferredBootstrap()}function ze(){x.name=
"NG_ENABLE_DEBUG_INFO!"+x.name;x.location.reload()}function Ae(a){a=fa.element(a).injector();if(!a)throw za("test");return a.get("$$testability")}function Vc(a,b){b=b||"_";return a.replace(Be,function(a,c){return(c?b:"")+a.toLowerCase()})}function Ce(){var a;if(!Wc){var b=tb();(ta=v(b)?x.jQuery:b?x[b]:void 0)&&ta.fn.on?(z=ta,O(ta.fn,{scope:Ra.scope,isolateScope:Ra.isolateScope,controller:Ra.controller,injector:Ra.injector,inheritedData:Ra.inheritedData}),a=ta.cleanData,ta.cleanData=function(b){for(var c,
e=0,f;null!=(f=b[e]);e++)(c=ta._data(f,"events"))&&c.$destroy&&ta(f).triggerHandler("$destroy");a(b)}):z=S;fa.element=z;Wc=!0}}function hb(a,b,d){if(!a)throw za("areq",b||"?",d||"required");return a}function ub(a,b,d){d&&I(a)&&(a=a[a.length-1]);hb(E(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Oa(a,b){if("hasOwnProperty"===a)throw za("badname",b);}function Xc(a,b,d){if(!b)return a;b=b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=
b[g],a&&(a=(e=a)[c]);return!d&&E(a)?Qa(e,a):a}function vb(a){for(var b=a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=z(xa.call(a,0,e))),c.push(b);return c||a}function R(){return Object.create(null)}function cc(a){if(null==a)return"";switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=!Yb(a)||I(a)||ia(a)?eb(a):a.toString()}return a}function De(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=K("$injector"),c=K("ng");a=b(a,"angular",Object);a.$$minErr=
a.$$minErr||K;return b(a,"module",function(){var a={};return function(f,g,k){var h={};if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,c,d,g){g||(g=e);return function(){g[d||"push"]([b,c,arguments]);return p}}function b(a,c,d){d||(d=e);return function(b,e){e&&E(e)&&(e.$$moduleName=f);d.push([a,c,arguments]);return p}}if(!g)throw d("nomod",f);var e=[],q=[],F=[],M=a("$injector","invoke","push",q),p={_invokeQueue:e,_configBlocks:q,
_runBlocks:F,info:function(a){if(t(a)){if(!G(a))throw c("aobj","value");h=a;return this}return h},requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator",q),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),component:b("$compileProvider",
"component"),config:M,run:function(a){F.push(a);return this}};k&&M(k);return p})}})}function ra(a,b){if(I(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(G(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function Ee(a,b){var d=[];Tb(b)&&(a=fa.copy(a,null,b));return JSON.stringify(a,function(a,b){b=Pc(a,b);if(G(b)){if(0<=d.indexOf(b))return"...";d.push(b)}return b})}function Fe(a){O(a,{errorHandlingConfig:pe,bootstrap:Uc,copy:Ia,extend:O,merge:re,equals:sa,
element:z,forEach:p,injector:gb,noop:B,bind:Qa,toJson:eb,fromJson:Qc,identity:ab,isUndefined:v,isDefined:t,isString:C,isFunction:E,isObject:G,isNumber:W,isElement:Wb,isArray:I,version:Ge,isDate:ia,lowercase:N,uppercase:wb,callbacks:{$$counter:0},getTestability:Ae,reloadWithDebugInfo:ze,$$minErr:K,$$csp:Ja,$$encodeUriSegment:fb,$$encodeUriQuery:ma,$$stringify:cc});dc=De(x);dc("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:He});a.provider("$compile",Yc).directive({a:Ie,input:Zc,
textarea:Zc,form:Je,script:Ke,select:Le,option:Me,ngBind:Ne,ngBindHtml:Oe,ngBindTemplate:Pe,ngClass:Qe,ngClassEven:Re,ngClassOdd:Se,ngCloak:Te,ngController:Ue,ngForm:Ve,ngHide:We,ngIf:Xe,ngInclude:Ye,ngInit:Ze,ngNonBindable:$e,ngPluralize:af,ngRepeat:bf,ngShow:cf,ngStyle:df,ngSwitch:ef,ngSwitchWhen:ff,ngSwitchDefault:gf,ngOptions:hf,ngTransclude:jf,ngModel:kf,ngList:lf,ngChange:mf,pattern:$c,ngPattern:$c,required:ad,ngRequired:ad,minlength:bd,ngMinlength:bd,maxlength:cd,ngMaxlength:cd,ngValue:nf,
ngModelOptions:of}).directive({ngInclude:pf}).directive(xb).directive(dd);a.provider({$anchorScroll:qf,$animate:rf,$animateCss:sf,$$animateJs:tf,$$animateQueue:uf,$$AnimateRunner:vf,$$animateAsyncRun:wf,$browser:xf,$cacheFactory:yf,$controller:zf,$document:Af,$$isDocumentHidden:Bf,$exceptionHandler:Cf,$filter:ed,$$forceReflow:Df,$interpolate:Ef,$interval:Ff,$http:Gf,$httpParamSerializer:Hf,$httpParamSerializerJQLike:If,$httpBackend:Jf,$xhrFactory:Kf,$jsonpCallbacks:Lf,$location:Mf,$log:Nf,$parse:Of,
$rootScope:Pf,$q:Qf,$$q:Rf,$sce:Sf,$sceDelegate:Tf,$sniffer:Uf,$templateCache:Vf,$templateRequest:Wf,$$testability:Xf,$timeout:Yf,$window:Zf,$$rAF:$f,$$jqLite:ag,$$Map:bg,$$cookieReader:cg})}]).info({angularVersion:"1.6.5"})}function ib(a,b){return b.toUpperCase()}function yb(a){return a.replace(dg,ib)}function ec(a){a=a.nodeType;return 1===a||!a||9===a}function fd(a,b){var d,c,e=b.createDocumentFragment(),f=[];if(fc.test(a)){d=e.appendChild(b.createElement("div"));c=(eg.exec(a)||["",""])[1].toLowerCase();
c=pa[c]||pa._default;d.innerHTML=c[1]+a.replace(fg,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=db(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";p(f,function(a){e.appendChild(a)});return e}function S(a){if(a instanceof S)return a;var b;C(a)&&(a=P(a),b=!0);if(!(this instanceof S)){if(b&&"<"!==a.charAt(0))throw gc("nosel");return new S(a)}if(b){b=x.document;var d;a=(d=gg.exec(a))?[b.createElement(d[1])]:(d=fd(a,b))?d.childNodes:
[];hc(this,a)}else E(a)?gd(a):hc(this,a)}function ic(a){return a.cloneNode(!0)}function zb(a,b){!b&&ec(a)&&z.cleanData([a]);a.querySelectorAll&&z.cleanData(a.querySelectorAll("*"))}function hd(a,b,d,c){if(t(c))throw gc("offargs");var e=(c=Ab(a))&&c.events,f=c&&c.handle;if(f)if(b){var g=function(b){var c=e[b];t(d)&&cb(c||[],d);t(d)&&c&&0<c.length||(a.removeEventListener(b,f),delete e[b])};p(b.split(" "),function(a){g(a);Bb[a]&&g(Bb[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f),delete e[b]}
function jc(a,b){var d=a.ng339,c=d&&jb[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),hd(a)),delete jb[d],a.ng339=void 0))}function Ab(a,b){var d=a.ng339,d=d&&jb[d];b&&!d&&(a.ng339=d=++hg,d=jb[d]={events:{},data:{},handle:void 0});return d}function kc(a,b,d){if(ec(a)){var c,e=t(d),f=!e&&b&&!G(b),g=!b;a=(a=Ab(a,!f))&&a.data;if(e)a[yb(b)]=d;else{if(g)return a;if(f)return a&&a[yb(b)];for(c in b)a[yb(c)]=b[c]}}}function Cb(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||
"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Db(a,b){b&&a.setAttribute&&p(b.split(" "),function(b){a.setAttribute("class",P((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+P(b)+" "," ")))})}function Eb(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");p(b.split(" "),function(a){a=P(a);-1===d.indexOf(" "+a+" ")&&(d+=a+" ")});a.setAttribute("class",P(d))}}function hc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=
b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function id(a,b){return Fb(a,"$"+(b||"ngController")+"Controller")}function Fb(a,b,d){9===a.nodeType&&(a=a.documentElement);for(b=I(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(t(d=z.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function jd(a){for(zb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Gb(a,b){b||zb(a);var d=a.parentNode;d&&d.removeChild(a)}function ig(a,
b){b=b||x;if("complete"===b.document.readyState)b.setTimeout(a);else z(b).on("load",a)}function gd(a){function b(){x.document.removeEventListener("DOMContentLoaded",b);x.removeEventListener("load",b);a()}"complete"===x.document.readyState?x.setTimeout(a):(x.document.addEventListener("DOMContentLoaded",b),x.addEventListener("load",b))}function kd(a,b){var d=Hb[b.toLowerCase()];return d&&ld[ya(a)]&&d}function jg(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=
b[d||c.type],g=f?f.length:0;if(g){if(v(c.immediatePropagationStopped)){var k=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();k&&k.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var h=f.specialHandlerWrapper||kg;1<g&&(f=ra(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||h(a,c,f[l])}};d.elem=a;return d}function kg(a,b,d){d.call(a,b)}function lg(a,b,d){var c=
b.relatedTarget;c&&(c===a||mg.call(a,c))||d.call(a,b)}function ag(){this.$get=function(){return O(S,{hasClass:function(a,b){a.attr&&(a=a[0]);return Cb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Eb(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Db(a,b)}})}}function Sa(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"===d||"object"===d&&null!==a?a.$$hashKey=d+":"+(b||qe)():d+":"+a}function md(){this._keys=[];this._values=
[];this._lastKey=NaN;this._lastIndex=-1}function nd(a){a=Function.prototype.toString.call(a).replace(ng,"");return a.match(og)||a.match(pg)}function qg(a){return(a=nd(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function gb(a,b){function d(a){return function(b,c){if(G(b))p(b,Ub(a));else return a(b,c)}}function c(a,b){Oa(a,"service");if(E(b)||I(b))b=q.instantiate(b);if(!b.$get)throw Ka("pget",a);return n[a+"Provider"]=b}function e(a,b){return function(){var c=w.invoke(b,this);if(v(c))throw Ka("undef",
a);return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){hb(v(a)||I(a),"modulesToLoad","not an array");var b=[],c;p(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],g=q.get(e[0]);g[e[1]].apply(g,e[2])}}if(!m.get(a)){m.set(a,!0);try{C(a)?(c=dc(a),w.modules[a]=c,b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):E(a)?b.push(q.invoke(a)):I(a)?b.push(q.invoke(a)):ub(a,"module")}catch(e){throw I(a)&&(a=a[a.length-1]),e.message&&
e.stack&&-1===e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ka("modulerr",a,e.stack||e.message||e);}}});return b}function k(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===h)throw Ka("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=h,a[b]=c(b,e),a[b]}catch(g){throw a[b]===h&&delete a[b],g;}finally{l.shift()}}function e(a,c,g){var f=[];a=gb.$$annotate(a,b,g);for(var h=0,k=a.length;h<k;h++){var l=a[h];if("string"!==typeof l)throw Ka("itkn",l);f.push(c&&c.hasOwnProperty(l)?
c[l]:d(l,g))}return f}return{invoke:function(a,b,c,d){"string"===typeof c&&(d=c,c=null);c=e(a,c,d);I(a)&&(a=a[a.length-1]);d=a;if(Ba||"function"!==typeof d)d=!1;else{var g=d.$$ngIsClass;La(g)||(g=d.$$ngIsClass=/^(?:class\b|constructor\()/.test(Function.prototype.toString.call(d)));d=g}return d?(c.unshift(null),new (Function.prototype.bind.apply(a,c))):a.apply(b,c)},instantiate:function(a,b,c){var d=I(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,a))},get:d,
annotate:gb.$$annotate,has:function(b){return n.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var h={},l=[],m=new Ib,n={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,aa(b),!1)}),constant:d(function(a,b){Oa(a,"constant");n[a]=b;F[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=w.invoke(d,c);return w.invoke(b,null,{$delegate:a})}}}},
q=n.$injector=k(n,function(a,b){fa.isString(b)&&l.push(b);throw Ka("unpr",l.join(" <- "));}),F={},M=k(F,function(a,b){var c=q.get(a+"Provider",b);return w.invoke(c.$get,c,void 0,a)}),w=M;n.$injectorProvider={$get:aa(M)};w.modules=q.modules=R();var u=g(a),w=M.get("$injector");w.strictDi=b;p(u,function(a){a&&w.invoke(a)});return w}function qf(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,
function(a){if("a"===ya(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();var c;c=g.yOffset;E(c)?c=c():Wb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):W(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=C(a)?a:W(a)?a.toString():d.hash();var b;a?(b=k.getElementById(a))?f(b):(b=e(k.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var k=b.document;a&&c.$watch(function(){return d.hash()},
function(a,b){a===b&&""===a||ig(function(){c.$evalAsync(g)})});return g}]}function kb(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;I(a)&&(a=a.join(" "));I(b)&&(b=b.join(" "));return a+" "+b}function rg(a){C(a)&&(a=a.split(" "));var b=R();p(a,function(a){a.length&&(b[a]=!0)});return b}function Ca(a){return G(a)?a:{}}function sg(a,b,d,c){function e(a){try{a.apply(null,xa.call(arguments,1))}finally{if(M--,0===M)for(;w.length;)try{w.pop()()}catch(b){d.error(b)}}}function f(){y=null;k()}function g(){u=
D();u=v(u)?null:u;sa(u,L)&&(u=L);A=L=u}function k(){var a=A;g();if(na!==h.url()||a!==u)na=h.url(),A=u,p(H,function(a){a(h.url(),u)})}var h=this,l=a.location,m=a.history,n=a.setTimeout,q=a.clearTimeout,F={};h.isMock=!1;var M=0,w=[];h.$$completeOutstandingRequest=e;h.$$incOutstandingRequestCount=function(){M++};h.notifyWhenNoOutstandingRequests=function(a){0===M?a():w.push(a)};var u,A,na=l.href,s=b.find("base"),y=null,D=c.history?function(){try{return m.state}catch(a){}}:B;g();h.url=function(b,d,e){v(e)&&
(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=A===e;if(na===b&&(!c.history||f))return h;var k=na&&ja(na)===ja(b);na=b;A=e;!c.history||k&&f?(k||(y=b),d?l.replace(b):k?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b,l.href!==b&&(y=b)):(m[d?"replaceState":"pushState"](e,"",b),g());y&&(y=b);return h}return y||l.href.replace(/%27/g,"'")};h.state=function(){return u};var H=[],Z=!1,L=null;h.onUrlChange=function(b){if(!Z){if(c.history)z(a).on("popstate",
f);z(a).on("hashchange",f);Z=!0}H.push(b);return b};h.$$applicationDestroyed=function(){z(a).off("hashchange popstate",f)};h.$$checkUrlChange=k;h.baseHref=function(){var a=s.attr("href");return a?a.replace(/^(https?:)?\/\/[^/]*/,""):""};h.defer=function(a,b){var c;M++;c=n(function(){delete F[c];e(a)},b||0);F[c]=!0;return c};h.defer.cancel=function(a){return F[a]?(delete F[a],q(a),e(B),!0):!1}}function xf(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new sg(a,c,b,d)}]}
function yf(){this.$get=function(){function a(a,c){function e(a){a!==n&&(q?q===a&&(q=a.n):q=a,f(a.n,a.p),f(a,n),n=a,n.n=null)}function f(a,b){a!==b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw K("$cacheFactory")("iid",a);var g=0,k=O({},c,{id:a}),h=R(),l=c&&c.capacity||Number.MAX_VALUE,m=R(),n=null,q=null;return b[a]={put:function(a,b){if(!v(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in h||g++;h[a]=b;g>l&&this.remove(q.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];
if(!b)return;e(b)}return h[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b===n&&(n=b.p);b===q&&(q=b.n);f(b.n,b.p);delete m[a]}a in h&&(delete h[a],g--)},removeAll:function(){h=R();g=0;m=R();n=q=null},destroy:function(){m=k=h=null;delete b[a]},info:function(){return O({},k,{size:g})}}}var b={};a.info=function(){var a={};p(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function Vf(){this.$get=["$cacheFactory",function(a){return a("templates")}]}
function Yc(a,b){function d(a,b,c){var d=/^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/,e=R();p(a,function(a,g){if(a in n)e[g]=n[a];else{var f=a.match(d);if(!f)throw ga("iscp",b,g,a,c?"controller bindings definition":"isolate scope definition");e[g]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||g};f[4]&&(n[a]=e[g])}});return e}function c(a){var b=a.charAt(0);if(!b||b!==N(b))throw ga("baddir",a);if(a!==a.trim())throw ga("baddir",a);}function e(a){var b=a.require||a.controller&&a.name;
!I(b)&&G(b)&&p(b,function(a,c){var d=a.match(l);a.substring(d[0].length)||(b[c]=d[0]+c)});return b}var f={},g=/^\s*directive:\s*([\w-]+)\s+(.*)$/,k=/(([\w-]+)(?::([^;]+))?;?)/,h=ue("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,m=/^(on[a-z]+|formaction)$/,n=R();this.directive=function na(b,d){hb(b,"name");Oa(b,"directive");C(b)?(c(b),hb(d,"directiveFactory"),f.hasOwnProperty(b)||(f[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var d=[];p(f[b],function(g,
f){try{var h=a.invoke(g);E(h)?h={compile:aa(h)}:!h.compile&&h.link&&(h.compile=aa(h.link));h.priority=h.priority||0;h.index=f;h.name=h.name||b;h.require=e(h);var k=h,l=h.restrict;if(l&&(!C(l)||!/[EACM]/.test(l)))throw ga("badrestrict",l,b);k.restrict=l||"EA";h.$$moduleName=g.$$moduleName;d.push(h)}catch(m){c(m)}});return d}])),f[b].push(d)):p(b,Ub(na));return this};this.component=function s(a,b){function c(a){function e(b){return E(b)||I(b)?function(c,d){return a.invoke(b,this,{$element:c,$attrs:d})}:
b}var g=b.template||b.templateUrl?b.template:"",f={controller:d,controllerAs:tg(b.controller)||b.controllerAs||"$ctrl",template:e(g),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",require:b.require};p(b,function(a,b){"$"===b.charAt(0)&&(f[b]=a)});return f}if(!C(a))return p(a,Ub(Qa(this,s))),this;var d=b.controller||function(){};p(b,function(a,b){"$"===b.charAt(0)&&(c[b]=a,E(d)&&(d[b]=a))});c.$inject=["$injector"];return this.directive(a,
c)};this.aHrefSanitizationWhitelist=function(a){return t(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return t(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var q=!0;this.debugInfoEnabled=function(a){return t(a)?(q=a,this):q};var F=!1;this.preAssignBindingsEnabled=function(a){return t(a)?(F=a,this):F};var M=10;this.onChangesTtl=function(a){return arguments.length?(M=a,this):M};var w=!0;this.commentDirectivesEnabled=
function(a){return arguments.length?(w=a,this):w};var u=!0;this.cssClassDirectivesEnabled=function(a){return arguments.length?(u=a,this):u};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate","$$sanitizeUri",function(a,b,c,e,n,L,T,J,U,Y){function r(){try{if(!--Ca)throw ja=void 0,ga("infchng",M);T.$apply(function(){for(var a=[],b=0,c=ja.length;b<c;++b)try{ja[b]()}catch(d){a.push(d)}ja=void 0;if(a.length)throw a;})}finally{Ca++}}
function ca(a,b){if(b){var c=Object.keys(b),d,e,g;d=0;for(e=c.length;d<e;d++)g=c[d],this[g]=b[g]}else this.$attr={};this.$$element=a}function Ta(a,b,c){za.innerHTML="<span "+b+">";b=za.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);d.value=c;a.attributes.setNamedItem(d)}function Da(a,b){try{a.addClass(b)}catch(c){}}function da(a,b,c,d,e){a instanceof z||(a=z(a));var g=K(a,b,a,c,d,e);da.$$addScopeClass(a);var f=null;return function(b,c,d){if(!a)throw ga("multilink");hb(b,"scope");e&&e.needsNewScope&&
(b=b.$parent.$new());d=d||{};var h=d.parentBoundTranscludeFn,k=d.transcludeControllers;d=d.futureParentElement;h&&h.$$boundTransclude&&(h=h.$$boundTransclude);f||(f=(d=d&&d[0])?"foreignobject"!==ya(d)&&la.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==f?z(ka(f,z("<div>").append(a).html())):c?Ra.clone.call(a):a;if(k)for(var l in k)d.data("$"+l+"Controller",k[l].instance);da.$$addScopeInfo(d,b);c&&c(d,b);g&&g(b,d,d,h);c||(a=g=null);return d}}function K(a,b,c,d,e,g){function f(a,c,d,e){var g,k,
l,m,q,n,D;if(H)for(D=Array(c.length),m=0;m<h.length;m+=3)g=h[m],D[g]=c[g];else D=c;m=0;for(q=h.length;m<q;)k=D[h[m++]],c=h[m++],g=h[m++],c?(c.scope?(l=a.$new(),da.$$addScopeInfo(z(k),l)):l=a,n=c.transcludeOnThisElement?V(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?V(a,b):null,c(g,l,k,d,n)):g&&g(a,k.childNodes,void 0,e)}for(var h=[],k=I(a)||a instanceof z,l,m,q,n,H,D=0;D<a.length;D++){l=new ca;11===Ba&&lb(a,D,k);m=mc(a[D],[],l,0===D?d:void 0,e);(g=m.length?X(m,a[D],l,b,c,null,[],[],g):null)&&
g.scope&&da.$$addScopeClass(l.$$element);l=g&&g.terminal||!(q=a[D].childNodes)||!q.length?null:K(q,g?(g.transcludeOnThisElement||!g.templateOnThisElement)&&g.transclude:b);if(g||l)h.push(D,g,l),n=!0,H=H||g;g=null}return n?f:null}function lb(a,b,c){var d=a[b],e=d.parentNode,g;if(d.nodeType===Ma)for(;;){g=e?d.nextSibling:a[b+1];if(!g||g.nodeType!==Ma)break;d.nodeValue+=g.nodeValue;g.parentNode&&g.parentNode.removeChild(g);c&&g===a[b+1]&&a.splice(b+1,1)}}function V(a,b,c){function d(e,g,f,h,k){e||(e=
a.$new(!1,k),e.$$transcluded=!0);return b(e,g,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:h})}var e=d.$$slots=R(),g;for(g in b.$$slots)e[g]=b.$$slots[g]?V(a,b.$$slots[g],c):null;return d}function mc(a,b,c,d,e){var g=c.$attr,f;switch(a.nodeType){case 1:f=ya(a);Q(b,Ea(f),"E",d,e);for(var h,l,m,q,n=a.attributes,H=0,D=n&&n.length;H<D;H++){var F=!1,u=!1;h=n[H];l=h.name;m=h.value;h=Ea(l);(q=Na.test(h))&&(l=l.replace(od,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()}));
(h=h.match(Oa))&&ba(h[1])&&(F=l,u=l.substr(0,l.length-5)+"end",l=l.substr(0,l.length-6));h=Ea(l.toLowerCase());g[h]=l;if(q||!c.hasOwnProperty(h))c[h]=m,kd(a,h)&&(c[h]=!0);va(a,b,m,h,q);Q(b,h,"A",d,e,F,u)}"input"===f&&"hidden"===a.getAttribute("type")&&a.setAttribute("autocomplete","off");if(!Ka)break;g=a.className;G(g)&&(g=g.animVal);if(C(g)&&""!==g)for(;a=k.exec(g);)h=Ea(a[2]),Q(b,h,"C",d,e)&&(c[h]=P(a[3])),g=g.substr(a.index+a[0].length);break;case Ma:pa(b,a.nodeValue);break;case 8:if(!Ja)break;
nc(a,b,c,d,e)}b.sort(ma);return b}function nc(a,b,c,d,e){try{var f=g.exec(a.nodeValue);if(f){var h=Ea(f[1]);Q(b,h,"M",d,e)&&(c[h]=P(f[2]))}}catch(k){}}function pd(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ga("uterdir",b,c);1===a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return z(d)}function qd(a,b,c){return function(d,e,g,f,h){e=pd(e[0],b,c);return a(d,e,g,f,h)}}function S(a,b,c,d,e,g){var f;return a?
da(b,c,d,e,g):function(){f||(f=da(b,c,d,e,g),b=c=g=null);return f.apply(this,arguments)}}function X(a,b,d,e,g,f,h,k,l){function m(a,b,c,d){if(a){c&&(a=qd(a,c,d));a.require=s.require;a.directiveName=Y;if(L===s||s.$$isolateScope)a=ta(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=qd(b,c,d));b.require=s.require;b.directiveName=Y;if(L===s||s.$$isolateScope)b=ta(b,{isolateScope:!0});k.push(b)}}function q(a,e,g,f,l){function m(a,b,c,d){var e;bb(a)||(d=c,c=b,b=a,a=void 0);U&&(e=T);c||(c=U?ha.parent():ha);if(d){var g=
l.$$slots[d];if(g)return g(a,b,e,c,t);if(v(g))throw ga("noslot",d,Aa(ha));}else return l(a,b,e,c,t)}var n,s,J,y,Z,T,w,ha;b===g?(f=d,ha=d.$$element):(ha=z(g),f=new ca(ha,d));Z=e;L?y=e.$new(!0):H&&(Z=e.$parent);l&&(w=m,w.$$boundTransclude=l,w.isSlotFilled=function(a){return!!l.$$slots[a]});u&&(T=ea(ha,f,w,u,y,e,L));L&&(da.$$addScopeInfo(ha,y,!0,!(M&&(M===L||M===L.$$originalDirective))),da.$$addScopeClass(ha,!0),y.$$isolateBindings=L.$$isolateBindings,s=qa(e,f,y,y.$$isolateBindings,L),s.removeWatches&&
y.$on("$destroy",s.removeWatches));for(n in T){s=u[n];J=T[n];var Y=s.$$bindings.bindToController;if(F){J.bindingInfo=Y?qa(Z,f,J.instance,Y,s):{};var r=J();r!==J.instance&&(J.instance=r,ha.data("$"+s.name+"Controller",r),J.bindingInfo.removeWatches&&J.bindingInfo.removeWatches(),J.bindingInfo=qa(Z,f,J.instance,Y,s))}else J.instance=J(),ha.data("$"+s.name+"Controller",J.instance),J.bindingInfo=qa(Z,f,J.instance,Y,s)}p(u,function(a,b){var c=a.require;a.bindToController&&!I(c)&&G(c)&&O(T[b].instance,
W(b,c,ha,T))});p(T,function(a){var b=a.instance;if(E(b.$onChanges))try{b.$onChanges(a.bindingInfo.initialChanges)}catch(d){c(d)}if(E(b.$onInit))try{b.$onInit()}catch(e){c(e)}E(b.$doCheck)&&(Z.$watch(function(){b.$doCheck()}),b.$doCheck());E(b.$onDestroy)&&Z.$on("$destroy",function(){b.$onDestroy()})});n=0;for(s=h.length;n<s;n++)J=h[n],ua(J,J.isolateScope?y:e,ha,f,J.require&&W(J.directiveName,J.require,ha,T),w);var t=e;L&&(L.template||null===L.templateUrl)&&(t=y);a&&a(t,g.childNodes,void 0,l);for(n=
k.length-1;0<=n;n--)J=k[n],ua(J,J.isolateScope?y:e,ha,f,J.require&&W(J.directiveName,J.require,ha,T),w);p(T,function(a){a=a.instance;E(a.$postLink)&&a.$postLink()})}l=l||{};for(var n=-Number.MAX_VALUE,H=l.newScopeDirective,u=l.controllerDirectives,L=l.newIsolateScopeDirective,M=l.templateDirective,J=l.nonTlbTranscludeDirective,Z=!1,T=!1,U=l.hasElementTranscludeDirective,y=d.$$element=z(b),s,Y,w,r=e,t,Pa=!1,Ta=!1,V,x=0,Da=a.length;x<Da;x++){s=a[x];var B=s.$$start,C=s.$$end;B&&(y=pd(b,B,C));w=void 0;
if(n>s.priority)break;if(V=s.scope)s.templateUrl||(G(V)?(aa("new/isolated scope",L||H,s,y),L=s):aa("new/isolated scope",L,s,y)),H=H||s;Y=s.name;if(!Pa&&(s.replace&&(s.templateUrl||s.template)||s.transclude&&!s.$$tlb)){for(V=x+1;Pa=a[V++];)if(Pa.transclude&&!Pa.$$tlb||Pa.replace&&(Pa.templateUrl||Pa.template)){Ta=!0;break}Pa=!0}!s.templateUrl&&s.controller&&(u=u||R(),aa("'"+Y+"' controller",u[Y],s,y),u[Y]=s);if(V=s.transclude)if(Z=!0,s.$$tlb||(aa("transclusion",J,s,y),J=s),"element"===V)U=!0,n=s.priority,
w=y,y=d.$$element=z(da.$$createComment(Y,d[Y])),b=y[0],oa(g,xa.call(w,0),b),w[0].$$parentNode=w[0].parentNode,r=S(Ta,w,e,n,f&&f.name,{nonTlbTranscludeDirective:J});else{var K=R();if(G(V)){w=[];var N=R(),lb=R();p(V,function(a,b){var c="?"===a.charAt(0);a=c?a.substring(1):a;N[a]=b;K[b]=null;lb[b]=c});p(y.contents(),function(a){var b=N[Ea(ya(a))];b?(lb[b]=!0,K[b]=K[b]||[],K[b].push(a)):w.push(a)});p(lb,function(a,b){if(!a)throw ga("reqslot",b);});for(var lc in K)K[lc]&&(K[lc]=S(Ta,K[lc],e))}else w=z(ic(b)).contents();
y.empty();r=S(Ta,w,e,void 0,void 0,{needsNewScope:s.$$isolateScope||s.$$newScope});r.$$slots=K}if(s.template)if(T=!0,aa("template",M,s,y),M=s,V=E(s.template)?s.template(y,d):s.template,V=Ha(V),s.replace){f=s;w=fc.test(V)?rd(ka(s.templateNamespace,P(V))):[];b=w[0];if(1!==w.length||1!==b.nodeType)throw ga("tplrt",Y,"");oa(g,y,b);Da={$attr:{}};V=mc(b,[],Da);var nc=a.splice(x+1,a.length-(x+1));(L||H)&&$(V,L,H);a=a.concat(V).concat(nc);fa(d,Da);Da=a.length}else y.html(V);if(s.templateUrl)T=!0,aa("template",
M,s,y),M=s,s.replace&&(f=s),q=ia(a.splice(x,a.length-x),y,d,g,Z&&r,h,k,{controllerDirectives:u,newScopeDirective:H!==s&&H,newIsolateScopeDirective:L,templateDirective:M,nonTlbTranscludeDirective:J}),Da=a.length;else if(s.compile)try{t=s.compile(y,d,r);var Q=s.$$originalDirective||s;E(t)?m(null,Qa(Q,t),B,C):t&&m(Qa(Q,t.pre),Qa(Q,t.post),B,C)}catch(ba){c(ba,Aa(y))}s.terminal&&(q.terminal=!0,n=Math.max(n,s.priority))}q.scope=H&&!0===H.scope;q.transcludeOnThisElement=Z;q.templateOnThisElement=T;q.transclude=
r;l.hasElementTranscludeDirective=U;return q}function W(a,b,c,d){var e;if(C(b)){var g=b.match(l);b=b.substring(g[0].length);var f=g[1]||g[3],g="?"===g[2];"^^"===f?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e=f?c.inheritedData(h):c.data(h)}if(!e&&!g)throw ga("ctreq",b,a);}else if(I(b))for(e=[],f=0,g=b.length;f<g;f++)e[f]=W(a,b[f],c,d);else G(b)&&(e={},p(b,function(b,g){e[g]=W(a,b,c,d)}));return e||null}function ea(a,b,c,d,e,g,f){var h=R(),k;for(k in d){var l=d[k],m={$scope:l===
f||l.$$isolateScope?e:g,$element:a,$attrs:b,$transclude:c},n=l.controller;"@"===n&&(n=b[l.name]);m=L(n,m,!0,l.controllerAs);h[l.name]=m;a.data("$"+l.name+"Controller",m.instance)}return h}function $(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=Xb(a[d],{$$isolateScope:b,$$newScope:c})}function Q(b,c,e,g,h,k,l){if(c===h)return null;var m=null;if(f.hasOwnProperty(c)){h=a.get(c+"Directive");for(var n=0,q=h.length;n<q;n++)if(c=h[n],(v(g)||g>c.priority)&&-1!==c.restrict.indexOf(e)){k&&(c=Xb(c,{$$start:k,
$$end:l}));if(!c.$$bindings){var H=m=c,D=c.name,F={isolateScope:null,bindToController:null};G(H.scope)&&(!0===H.bindToController?(F.bindToController=d(H.scope,D,!0),F.isolateScope={}):F.isolateScope=d(H.scope,D,!1));G(H.bindToController)&&(F.bindToController=d(H.bindToController,D,!0));if(F.bindToController&&!H.controller)throw ga("noctrl",D);m=m.$$bindings=F;G(m.isolateScope)&&(c.$$isolateBindings=m.isolateScope)}b.push(c);m=c}}return m}function ba(b){if(f.hasOwnProperty(b))for(var c=a.get(b+"Directive"),
d=0,e=c.length;d<e;d++)if(b=c[d],b.multiElement)return!0;return!1}function fa(a,b){var c=b.$attr,d=a.$attr;p(a,function(d,e){"$"!==e.charAt(0)&&(b[e]&&b[e]!==d&&(d=d.length?d+(("style"===e?";":" ")+b[e]):b[e]),a.$set(e,d,!0,c[e]))});p(b,function(b,e){a.hasOwnProperty(e)||"$"===e.charAt(0)||(a[e]=b,"class"!==e&&"style"!==e&&(d[e]=c[e]))})}function ia(a,b,d,g,f,h,k,l){var m=[],n,q,F=b[0],s=a.shift(),L=Xb(s,{templateUrl:null,transclude:null,replace:null,$$originalDirective:s}),J=E(s.templateUrl)?s.templateUrl(b,
d):s.templateUrl,u=s.templateNamespace;b.empty();e(J).then(function(c){var e,H;c=Ha(c);if(s.replace){c=fc.test(c)?rd(ka(u,P(c))):[];e=c[0];if(1!==c.length||1!==e.nodeType)throw ga("tplrt",s.name,J);c={$attr:{}};oa(g,b,e);var D=mc(e,[],c);G(s.scope)&&$(D,!0);a=D.concat(a);fa(d,c)}else e=F,b.html(c);a.unshift(L);n=X(a,e,d,f,b,s,h,k,l);p(g,function(a,c){a===e&&(g[c]=b[0])});for(q=K(b[0].childNodes,f);m.length;){c=m.shift();H=m.shift();var y=m.shift(),M=m.shift(),D=b[0];if(!c.$$destroyed){if(H!==F){var Z=
H.className;l.hasElementTranscludeDirective&&s.replace||(D=ic(e));oa(y,z(H),D);Da(z(D),Z)}H=n.transcludeOnThisElement?V(c,n.transclude,M):M;n(q,c,D,g,H)}}m=null}).catch(function(a){Zb(a)&&c(a)});return function(a,b,c,d,e){a=e;b.$$destroyed||(m?m.push(b,c,d,a):(n.transcludeOnThisElement&&(a=V(b,n.transclude,e)),n(q,b,c,d,a)))}}function ma(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function aa(a,b,c,d){function e(a){return a?" (module: "+a+")":
""}if(b)throw ga("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,Aa(d));}function pa(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&da.$$addBindingClass(a);return function(a,c){var e=c.parent();b||da.$$addBindingClass(e);da.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function ka(a,b){a=N(a||"html");switch(a){case "svg":case "math":var c=x.document.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";
return c.childNodes[0].childNodes;default:return b}}function ra(a,b){if("srcdoc"===b)return J.HTML;var c=ya(a);if("src"===b||"ngSrc"===b){if(-1===["img","video","audio","source","track"].indexOf(c))return J.RESOURCE_URL}else if("xlinkHref"===b||"form"===c&&"action"===b||"link"===c&&"href"===b)return J.RESOURCE_URL}function va(a,c,d,e,g){var f=ra(a,e),k=h[e]||g,l=b(d,!g,f,k);if(l){if("multiple"===e&&"select"===ya(a))throw ga("selmulti",Aa(a));if(m.test(e))throw ga("nodomevents");c.push({priority:100,
compile:function(){return{pre:function(a,c,g){c=g.$$observers||(g.$$observers=R());var h=g[e];h!==d&&(l=h&&b(h,!0,f,k),d=h);l&&(g[e]=l(a),(c[e]||(c[e]=[])).$$inter=!0,(g.$$observers&&g.$$observers[e].$$scope||a).$watch(l,function(a,b){"class"===e&&a!==b?g.$updateClass(a,b):g.$set(e,a)}))}}}})}}function oa(a,b,c){var d=b[0],e=b.length,g=d.parentNode,f,h;if(a)for(f=0,h=a.length;f<h;f++)if(a[f]===d){a[f++]=c;h=f+e-1;for(var k=a.length;f<k;f++,h++)h<k?a[f]=a[h]:delete a[f];a.length-=e-1;a.context===d&&
(a.context=c);break}g&&g.replaceChild(c,d);a=x.document.createDocumentFragment();for(f=0;f<e;f++)a.appendChild(b[f]);z.hasData(d)&&(z.data(c,z.data(d)),z(d).off("$destroy"));z.cleanData(a.querySelectorAll("*"));for(f=1;f<e;f++)delete b[f];b[0]=c;b.length=1}function ta(a,b){return O(function(){return a.apply(null,arguments)},a,b)}function ua(a,b,d,e,g,f){try{a(b,d,e,g,f)}catch(h){c(h,Aa(d))}}function qa(a,c,d,e,g){function f(b,c,e){E(d.$onChanges)&&!$b(c,e)&&(ja||(a.$$postDigest(r),ja=[]),m||(m={},
ja.push(h)),m[b]&&(e=m[b].previousValue),m[b]=new Jb(e,c))}function h(){d.$onChanges(m);m=void 0}var k=[],l={},m;p(e,function(e,h){var m=e.attrName,q=e.optional,H,D,F,s;switch(e.mode){case "@":q||wa.call(c,m)||(d[h]=c[m]=void 0);q=c.$observe(m,function(a){if(C(a)||La(a))f(h,a,d[h]),d[h]=a});c.$$observers[m].$$scope=a;H=c[m];C(H)?d[h]=b(H)(a):La(H)&&(d[h]=H);l[h]=new Jb(oc,d[h]);k.push(q);break;case "=":if(!wa.call(c,m)){if(q)break;c[m]=void 0}if(q&&!c[m])break;D=n(c[m]);s=D.literal?sa:$b;F=D.assign||
function(){H=d[h]=D(a);throw ga("nonassign",c[m],m,g.name);};H=d[h]=D(a);q=function(b){s(b,d[h])||(s(b,H)?F(a,b=d[h]):d[h]=b);return H=b};q.$stateful=!0;q=e.collection?a.$watchCollection(c[m],q):a.$watch(n(c[m],q),null,D.literal);k.push(q);break;case "<":if(!wa.call(c,m)){if(q)break;c[m]=void 0}if(q&&!c[m])break;D=n(c[m]);var L=D.literal,J=d[h]=D(a);l[h]=new Jb(oc,d[h]);q=a.$watch(D,function(a,b){if(b===a){if(b===J||L&&sa(b,J))return;b=J}f(h,a,b);d[h]=a},L);k.push(q);break;case "&":D=c.hasOwnProperty(m)?
n(c[m]):B;if(D===B&&q)break;d[h]=function(b){return D(a,b)}}});return{initialChanges:l,removeWatches:k.length&&function(){for(var a=0,b=k.length;a<b;++a)k[a]()}}}var Ia=/^\w/,za=x.document.createElement("div"),Ja=w,Ka=u,Ca=M,ja;ca.prototype={$normalize:Ea,$addClass:function(a){a&&0<a.length&&U.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&U.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=sd(a,b);c&&c.length&&U.addClass(this.$$element,c);(c=sd(b,a))&&c.length&&
U.removeClass(this.$$element,c)},$set:function(a,b,d,e){var g=kd(this.$$element[0],a),f=td[a],h=a;g?(this.$$element.prop(a,b),e=g):f&&(this[f]=b,h=f);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Vc(a,"-"));g=ya(this.$$element);if("a"===g&&("href"===a||"xlinkHref"===a)||"img"===g&&"src"===a)this[a]=b=Y(b,"src"===a);else if("img"===g&&"srcset"===a&&t(b)){for(var g="",f=P(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(f)?k:/(,)/,f=f.split(k),k=Math.floor(f.length/2),l=0;l<
k;l++)var m=2*l,g=g+Y(P(f[m]),!0),g=g+(" "+P(f[m+1]));f=P(f[2*l]).split(/\s/);g+=Y(P(f[0]),!0);2===f.length&&(g+=" "+P(f[1]));this[a]=b=g}!1!==d&&(null===b||v(b)?this.$$element.removeAttr(e):Ia.test(e)?this.$$element.attr(e,b):Ta(this.$$element[0],e,b));(a=this.$$observers)&&p(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=R()),e=d[a]||(d[a]=[]);e.push(b);T.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||v(c[a])||b(c[a])});return function(){cb(e,
b)}}};var Fa=b.startSymbol(),Ga=b.endSymbol(),Ha="{{"===Fa&&"}}"===Ga?ab:function(a){return a.replace(/\{\{/g,Fa).replace(/}}/g,Ga)},Na=/^ngAttr[A-Z]/,Oa=/^(.+)Start$/;da.$$addBindingInfo=q?function(a,b){var c=a.data("$binding")||[];I(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:B;da.$$addBindingClass=q?function(a){Da(a,"ng-binding")}:B;da.$$addScopeInfo=q?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:B;da.$$addScopeClass=q?function(a,b){Da(a,b?"ng-isolate-scope":
"ng-scope")}:B;da.$$createComment=function(a,b){var c="";q&&(c=" "+(a||"")+": ",b&&(c+=b+" "));return x.document.createComment(c)};return da}]}function Jb(a,b){this.previousValue=a;this.currentValue=b}function Ea(a){return a.replace(od,"").replace(ug,ib)}function sd(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],k=0;k<e.length;k++)if(g===e[k])continue a;d+=(0<d.length?" ":"")+g}return d}function rd(a){a=z(a);var b=a.length;if(1>=b)return a;for(;b--;){var d=
a[b];(8===d.nodeType||d.nodeType===Ma&&""===d.nodeValue.trim())&&vg.call(a,b,1)}return a}function tg(a,b){if(b&&C(b))return b;if(C(a)){var d=ud.exec(a);if(d)return d[3]}}function zf(){var a={},b=!1;this.has=function(b){return a.hasOwnProperty(b)};this.register=function(b,c){Oa(b,"controller");G(b)?O(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function e(a,b,c,d){if(!a||!G(a.$scope))throw K("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,
g,k,h){var l,m,n;k=!0===k;h&&C(h)&&(n=h);if(C(f)){h=f.match(ud);if(!h)throw vd("ctrlfmt",f);m=h[1];n=n||h[3];f=a.hasOwnProperty(m)?a[m]:Xc(g.$scope,m,!0)||(b?Xc(c,m,!0):void 0);if(!f)throw vd("ctrlreg",m);ub(f,m,!0)}if(k)return k=(I(f)?f[f.length-1]:f).prototype,l=Object.create(k||null),n&&e(g,n,l,m||f.name),O(function(){var a=d.invoke(f,l,g,m);a!==l&&(G(a)||E(a))&&(l=a,n&&e(g,n,l,m||f.name));return l},{instance:l,identifier:n});l=d.instantiate(f,g,m);n&&e(g,n,l,m||f.name);return l}}]}function Af(){this.$get=
["$window",function(a){return z(a.document)}]}function Bf(){this.$get=["$document","$rootScope",function(a,b){function d(){e=c.hidden}var c=a[0],e=c&&c.hidden;a.on("visibilitychange",d);b.$on("$destroy",function(){a.off("visibilitychange",d)});return function(){return e}}]}function Cf(){this.$get=["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function pc(a){return G(a)?ia(a)?a.toISOString():eb(a):a}function Hf(){this.$get=function(){return function(a){if(!a)return"";var b=
[];Nc(a,function(a,c){null===a||v(a)||(I(a)?p(a,function(a){b.push(ma(c)+"="+ma(pc(a)))}):b.push(ma(c)+"="+ma(pc(a))))});return b.join("&")}}}function If(){this.$get=function(){return function(a){function b(a,e,f){null===a||v(a)||(I(a)?p(a,function(a,c){b(a,e+"["+(G(a)?c:"")+"]")}):G(a)&&!ia(a)?Nc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):d.push(ma(e)+"="+ma(pc(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function qc(a,b){if(C(a)){var d=a.replace(wg,"").trim();if(d){var c=
b("Content-Type");(c=c&&0===c.indexOf(wd))||(c=(c=d.match(xg))&&yg[c[0]].test(d));if(c)try{a=Qc(d)}catch(e){throw rc("baddata",a,e);}}}return a}function xd(a){var b=R(),d;C(a)?p(a.split("\n"),function(a){d=a.indexOf(":");var e=N(P(a.substr(0,d)));a=P(a.substr(d+1));e&&(b[e]=b[e]?b[e]+", "+a:a)}):G(a)&&p(a,function(a,d){var f=N(d),g=P(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function yd(a){var b;return function(d){b||(b=xd(a));return d?(d=b[N(d)],void 0===d&&(d=null),d):b}}function zd(a,b,d,c){if(E(c))return c(a,
b,d);p(c,function(c){a=c(a,b,d)});return a}function Gf(){var a=this.defaults={transformResponse:[qc],transformRequest:[function(a){return G(a)&&"[object File]"!==la.call(a)&&"[object Blob]"!==la.call(a)&&"[object FormData]"!==la.call(a)?eb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ra(sc),put:ra(sc),patch:ra(sc)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer",jsonpCallbackParam:"callback"},b=!1;this.useApplyAsync=function(a){return t(a)?
(b=!!a,this):b};var d=this.interceptors=[];this.$get=["$browser","$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector","$sce",function(c,e,f,g,k,h,l,m){function n(b){function d(a,b){for(var c=0,e=b.length;c<e;){var g=b[c++],f=b[c++];a=a.then(g,f)}b.length=0;return a}function e(a,b){var c,d={};p(a,function(a,e){E(a)?(c=a(b),null!=c&&(d[e]=c)):d[e]=a});return d}function g(a){var b=O({},a);b.data=zd(a.data,a.headers,a.status,f.transformResponse);a=a.status;return 200<=a&&300>
a?b:h.reject(b)}if(!G(b))throw K("$http")("badreq",b);if(!C(m.valueOf(b.url)))throw K("$http")("badreq",b.url);var f=O({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer,jsonpCallbackParam:a.jsonpCallbackParam},b);f.headers=function(b){var c=a.headers,d=O({},b.headers),g,f,h,c=O({},c.common,c[N(b.method)]);a:for(g in c){f=N(g);for(h in d)if(N(h)===f)continue a;d[g]=c[g]}return e(d,ra(b))}(b);f.method=wb(f.method);f.paramSerializer=
C(f.paramSerializer)?l.get(f.paramSerializer):f.paramSerializer;c.$$incOutstandingRequestCount();var k=[],n=[];b=h.resolve(f);p(u,function(a){(a.request||a.requestError)&&k.unshift(a.request,a.requestError);(a.response||a.responseError)&&n.push(a.response,a.responseError)});b=d(b,k);b=b.then(function(b){var c=b.headers,d=zd(b.data,yd(c),void 0,b.transformRequest);v(d)&&p(c,function(a,b){"content-type"===N(b)&&delete c[b]});v(b.withCredentials)&&!v(a.withCredentials)&&(b.withCredentials=a.withCredentials);
return q(b,d).then(g,g)});b=d(b,n);return b=b.finally(function(){c.$$completeOutstandingRequest(B)})}function q(c,d){function g(a){if(a){var c={};p(a,function(a,d){c[d]=function(c){function d(){a(c)}b?k.$applyAsync(d):k.$$phase?d():k.$apply(d)}});return c}}function l(a,c,d,e){function g(){q(c,a,d,e)}J&&(200<=a&&300>a?J.put(ca,[a,c,xd(d),e]):J.remove(ca));b?k.$applyAsync(g):(g(),k.$$phase||k.$apply())}function q(a,b,d,e){b=-1<=b?b:0;(200<=b&&300>b?L.resolve:L.reject)({data:a,status:b,headers:yd(d),
config:c,statusText:e})}function H(a){q(a.data,a.status,ra(a.headers()),a.statusText)}function u(){var a=n.pendingRequests.indexOf(c);-1!==a&&n.pendingRequests.splice(a,1)}var L=h.defer(),T=L.promise,J,U,Y=c.headers,r="jsonp"===N(c.method),ca=c.url;r?ca=m.getTrustedResourceUrl(ca):C(ca)||(ca=m.valueOf(ca));ca=F(ca,c.paramSerializer(c.params));r&&(ca=M(ca,c.jsonpCallbackParam));n.pendingRequests.push(c);T.then(u,u);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(J=G(c.cache)?
c.cache:G(a.cache)?a.cache:w);J&&(U=J.get(ca),t(U)?U&&E(U.then)?U.then(H,H):I(U)?q(U[1],U[0],ra(U[2]),U[3]):q(U,200,{},"OK"):J.put(ca,T));v(U)&&((U=Ad(c.url)?f()[c.xsrfCookieName||a.xsrfCookieName]:void 0)&&(Y[c.xsrfHeaderName||a.xsrfHeaderName]=U),e(c.method,ca,d,l,Y,c.timeout,c.withCredentials,c.responseType,g(c.eventHandlers),g(c.uploadEventHandlers)));return T}function F(a,b){0<b.length&&(a+=(-1===a.indexOf("?")?"?":"&")+b);return a}function M(a,b){if(/[&?][^=]+=JSON_CALLBACK/.test(a))throw rc("badjsonp",
a);if((new RegExp("[&?]"+b+"=")).test(a))throw rc("badjsonp",b,a);return a+=(-1===a.indexOf("?")?"?":"&")+b+"=JSON_CALLBACK"}var w=g("$http");a.paramSerializer=C(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer;var u=[];p(d,function(a){u.unshift(C(a)?l.get(a):l.invoke(a))});n.pendingRequests=[];(function(a){p(arguments,function(a){n[a]=function(b,c){return n(O({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){p(arguments,function(a){n[a]=function(b,c,d){return n(O({},
d||{},{method:a,url:b,data:c}))}})})("post","put","patch");n.defaults=a;return n}]}function Kf(){this.$get=function(){return function(){return new x.XMLHttpRequest}}}function Jf(){this.$get=["$browser","$jsonpCallbacks","$document","$xhrFactory",function(a,b,d,c){return zg(a,c,a.defer,b,d[0])}]}function zg(a,b,d,c,e){function f(a,b,d){a=a.replace("JSON_CALLBACK",b);var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m);f.removeEventListener("error",
m);e.body.removeChild(f);f=null;var g=-1,F="unknown";a&&("load"!==a.type||c.wasCalled(b)||(a={type:"error"}),F=a.type,g="error"===a.type?404:200);d&&d(g,F)};f.addEventListener("load",m);f.addEventListener("error",m);e.body.appendChild(f);return m}return function(e,k,h,l,m,n,q,F,M,w){function u(){na&&na();s&&s.abort()}k=k||a.url();if("jsonp"===N(e))var A=c.createCallback(k),na=f(k,A,function(a,b){var e=200===a&&c.getResponse(A);t(D)&&d.cancel(D);na=s=null;l(a,e,"",b);c.removeCallback(A)});else{var s=
b(e,k);s.open(e,k,!0);p(m,function(a,b){t(a)&&s.setRequestHeader(b,a)});s.onload=function(){var a=s.statusText||"",b="response"in s?s.response:s.responseText,c=1223===s.status?204:s.status;0===c&&(c=b?200:"file"===ua(k).protocol?404:0);var e=s.getAllResponseHeaders();t(D)&&d.cancel(D);na=s=null;l(c,b,e,a)};e=function(){t(D)&&d.cancel(D);na=s=null;l(-1,null,null,"")};s.onerror=e;s.onabort=e;s.ontimeout=e;p(M,function(a,b){s.addEventListener(b,a)});p(w,function(a,b){s.upload.addEventListener(b,a)});
q&&(s.withCredentials=!0);if(F)try{s.responseType=F}catch(y){if("json"!==F)throw y;}s.send(v(h)?null:h)}if(0<n)var D=d(u,n);else n&&E(n.then)&&n.then(u)}}function Ef(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler","$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(n,a).replace(q,b)}function k(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}
function h(f,h,q,n){function A(a){try{var b=a;a=q?e.getTrusted(q,b):e.valueOf(b);return n&&!t(a)?a:cc(a)}catch(d){c(Fa.interr(f,d))}}if(!f.length||-1===f.indexOf(a)){var p;h||(h=g(f),p=aa(h),p.exp=f,p.expressions=[],p.$$watchDelegate=k);return p}n=!!n;var s,y,D=0,H=[],Z=[];p=f.length;for(var L=[],T=[];D<p;)if(-1!==(s=f.indexOf(a,D))&&-1!==(y=f.indexOf(b,s+l)))D!==s&&L.push(g(f.substring(D,s))),D=f.substring(s+l,y),H.push(D),Z.push(d(D,A)),D=y+m,T.push(L.length),L.push("");else{D!==p&&L.push(g(f.substring(D)));
break}q&&1<L.length&&Fa.throwNoconcat(f);if(!h||H.length){var J=function(a){for(var b=0,c=H.length;b<c;b++){if(n&&v(a[b]))return;L[T[b]]=a[b]}return L.join("")};return O(function(a){var b=0,d=H.length,e=Array(d);try{for(;b<d;b++)e[b]=Z[b](a);return J(e)}catch(g){c(Fa.interr(f,g))}},{exp:f,expressions:H,$$watchDelegate:function(a,b){var c;return a.$watchGroup(Z,function(d,e){var g=J(d);E(b)&&b.call(this,g,d!==e?c:g,a);c=g})}})}}var l=a.length,m=b.length,n=new RegExp(a.replace(/./g,f),"g"),q=new RegExp(b.replace(/./g,
f),"g");h.startSymbol=function(){return a};h.endSymbol=function(){return b};return h}]}function Ff(){this.$get=["$rootScope","$window","$q","$$q","$browser",function(a,b,d,c,e){function f(f,h,l,m){function n(){q?f.apply(null,F):f(u)}var q=4<arguments.length,F=q?xa.call(arguments,4):[],p=b.setInterval,w=b.clearInterval,u=0,A=t(m)&&!m,r=(A?c:d).defer(),s=r.promise;l=t(l)?l:0;s.$$intervalId=p(function(){A?e.defer(n):a.$evalAsync(n);r.notify(u++);0<l&&u>=l&&(r.resolve(u),w(s.$$intervalId),delete g[s.$$intervalId]);
A||a.$apply()},h);g[s.$$intervalId]=r;return s}var g={};f.cancel=function(a){return a&&a.$$intervalId in g?(g[a.$$intervalId].promise.$$state.pur=!0,g[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),delete g[a.$$intervalId],!0):!1};return f}]}function tc(a){a=a.split("/");for(var b=a.length;b--;)a[b]=fb(a[b]);return a.join("/")}function Bd(a,b){var d=ua(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=Q(d.port)||Ag[d.protocol]||null}function Cd(a,b){if(Bg.test(a))throw mb("badpath",
a);var d="/"!==a.charAt(0);d&&(a="/"+a);var c=ua(a);b.$$path=decodeURIComponent(d&&"/"===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname);b.$$search=Tc(c.search);b.$$hash=decodeURIComponent(c.hash);b.$$path&&"/"!==b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function uc(a,b){return a.slice(0,b.length)===b}function va(a,b){if(uc(b,a))return b.substr(a.length)}function ja(a){var b=a.indexOf("#");return-1===b?a:a.substr(0,b)}function nb(a){return a.replace(/(#.+)|#$/,"$1")}function vc(a,b,d){this.$$html5=
!0;d=d||"";Bd(a,this);this.$$parse=function(a){var d=va(b,a);if(!C(d))throw mb("ipthprfx",a,b);Cd(d,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=bc(this.$$search),d=this.$$hash?"#"+fb(this.$$hash):"";this.$$url=tc(this.$$path)+(a?"?"+a:"")+d;this.$$absUrl=b+this.$$url.substr(1);this.$$urlUpdatedByLocation=!0};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;t(f=va(a,c))?(g=f,g=d&&t(f=va(d,f))?b+(va("/",f)||f):a+g):
t(f=va(b,c))?g=b+f:b===c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function wc(a,b,d){Bd(a,this);this.$$parse=function(c){var e=va(a,c)||va(b,c),f;v(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",v(e)&&(a=c,this.replace())):(f=va(d,e),v(f)&&(f=e));Cd(f,this);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;uc(f,e)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=bc(this.$$search),e=this.$$hash?"#"+fb(this.$$hash):"";this.$$url=tc(this.$$path)+
(b?"?"+b:"")+e;this.$$absUrl=a+(this.$$url?d+this.$$url:"");this.$$urlUpdatedByLocation=!0};this.$$parseLinkUrl=function(b,d){return ja(a)===ja(b)?(this.$$parse(b),!0):!1}}function Dd(a,b,d){this.$$html5=!0;wc.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a===ja(c)?f=c:(g=va(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$compose=function(){var b=bc(this.$$search),e=this.$$hash?"#"+fb(this.$$hash):"";this.$$url=
tc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+d+this.$$url;this.$$urlUpdatedByLocation=!0}}function Kb(a){return function(){return this[a]}}function Ed(a,b){return function(d){if(v(d))return this[a];this[a]=b(d);this.$$compose();return this}}function Mf(){var a="!",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return t(b)?(a=b,this):a};this.html5Mode=function(a){if(La(a))return b.enabled=a,this;if(G(a)){La(a.enabled)&&(b.enabled=a.enabled);La(a.requireBase)&&(b.requireBase=
a.requireBase);if(La(a.rewriteLinks)||C(a.rewriteLinks))b.rewriteLinks=a.rewriteLinks;return this}return b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,e,f,g){function k(a,b,d){var e=l.url(),g=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(f){throw l.url(e),l.$$state=g,f;}}function h(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),a,l.$$state,b)}var l,m;m=c.baseHref();var n=c.url(),q;if(b.enabled){if(!m&&b.requireBase)throw mb("nobase");q=n.substring(0,
n.indexOf("/",n.indexOf("//")+2))+(m||"/");m=e.history?vc:Dd}else q=ja(n),m=wc;var F=q.substr(0,ja(q).lastIndexOf("/")+1);l=new m(q,F,"#"+a);l.$$parseLinkUrl(n,n);l.$$state=c.state();var p=/^\s*(javascript|mailto):/i;f.on("click",function(a){var e=b.rewriteLinks;if(e&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!==a.which&&2!==a.button){for(var h=z(a.target);"a"!==ya(h[0]);)if(h[0]===f[0]||!(h=h.parent())[0])return;if(!C(e)||!v(h.attr(e))){var e=h.prop("href"),k=h.attr("href")||h.attr("xlink:href");G(e)&&
"[object SVGAnimatedString]"===e.toString()&&(e=ua(e.animVal).href);p.test(e)||!e||h.attr("target")||a.isDefaultPrevented()||!l.$$parseLinkUrl(e,k)||(a.preventDefault(),l.absUrl()!==c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=!0))}}});nb(l.absUrl())!==nb(n)&&c.url(l.absUrl(),!0);var w=!0;c.onUrlChange(function(a,b){uc(a,F)?(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,g;a=nb(a);l.$$parse(a);l.$$state=b;g=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;l.absUrl()===
a&&(g?(l.$$parse(c),l.$$state=e,k(c,!1,e)):(w=!1,h(c,e)))}),d.$$phase||d.$digest()):g.location.href=a});d.$watch(function(){if(w||l.$$urlUpdatedByLocation){l.$$urlUpdatedByLocation=!1;var a=nb(c.url()),b=nb(l.absUrl()),g=c.state(),f=l.$$replace,m=a!==b||l.$$html5&&e.history&&g!==l.$$state;if(w||m)w=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,g).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=g):(m&&k(b,f,g===l.$$state?null:l.$$state),
h(a,g)))})}l.$$replace=!1});return l}]}function Nf(){var a=!0,b=this;this.debugEnabled=function(b){return t(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){Zb(a)&&(a.stack&&f?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||B;return function(){var a=[];p(arguments,function(b){a.push(c(b))});return Function.prototype.apply.call(e,b,a)}}
var f=Ba||/\bEdge\//.test(d.navigator&&d.navigator.userAgent);return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Cg(a){return a+""}function Dg(a,b){return"undefined"!==typeof a?a:b}function Fd(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function Eg(a,b){switch(a.type){case r.MemberExpression:if(a.computed)return!1;break;case r.UnaryExpression:return 1;case r.BinaryExpression:return"+"!==
a.operator?1:!1;case r.CallExpression:return!1}return void 0===b?Gd:b}function X(a,b,d){var c,e,f=a.isPure=Eg(a,d);switch(a.type){case r.Program:c=!0;p(a.body,function(a){X(a.expression,b,f);c=c&&a.expression.constant});a.constant=c;break;case r.Literal:a.constant=!0;a.toWatch=[];break;case r.UnaryExpression:X(a.argument,b,f);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case r.BinaryExpression:X(a.left,b,f);X(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=
a.left.toWatch.concat(a.right.toWatch);break;case r.LogicalExpression:X(a.left,b,f);X(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case r.ConditionalExpression:X(a.test,b,f);X(a.alternate,b,f);X(a.consequent,b,f);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case r.Identifier:a.constant=!1;a.toWatch=[a];break;case r.MemberExpression:X(a.object,b,f);a.computed&&X(a.property,b,f);a.constant=a.object.constant&&
(!a.computed||a.property.constant);a.toWatch=[a];break;case r.CallExpression:c=d=a.filter?!b(a.callee.name).$stateful:!1;e=[];p(a.arguments,function(a){X(a,b,f);c=c&&a.constant;a.constant||e.push.apply(e,a.toWatch)});a.constant=c;a.toWatch=d?e:[a];break;case r.AssignmentExpression:X(a.left,b,f);X(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case r.ArrayExpression:c=!0;e=[];p(a.elements,function(a){X(a,b,f);c=c&&a.constant;a.constant||e.push.apply(e,a.toWatch)});a.constant=
c;a.toWatch=e;break;case r.ObjectExpression:c=!0;e=[];p(a.properties,function(a){X(a.value,b,f);c=c&&a.value.constant&&!a.computed;a.value.constant||e.push.apply(e,a.value.toWatch);a.computed&&(X(a.key,b,f),a.key.constant||e.push.apply(e,a.key.toWatch))});a.constant=c;a.toWatch=e;break;case r.ThisExpression:a.constant=!1;a.toWatch=[];break;case r.LocalsExpression:a.constant=!1,a.toWatch=[]}}function Hd(a){if(1===a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:void 0}}
function Id(a){return a.type===r.Identifier||a.type===r.MemberExpression}function Jd(a){if(1===a.body.length&&Id(a.body[0].expression))return{type:r.AssignmentExpression,left:a.body[0].expression,right:{type:r.NGValueParameter},operator:"="}}function Kd(a){this.$filter=a}function Ld(a){this.$filter=a}function xc(a,b,d){this.ast=new r(a,d);this.astCompiler=d.csp?new Ld(b):new Kd(b)}function yc(a){return E(a.valueOf)?a.valueOf():Fg.call(a)}function Of(){var a=R(),b={"true":!0,"false":!1,"null":null,
undefined:void 0},d,c;this.addLiteral=function(a,c){b[a]=c};this.setIdentifierFns=function(a,b){d=a;c=b;return this};this.$get=["$filter",function(e){function f(a,b,c){return null==a||null==b?a===b:"object"!==typeof a||(a=yc(a),"object"!==typeof a||c)?a===b||a!==a&&b!==b:!1}function g(a,b,c,d,e){var g=d.inputs,h;if(1===g.length){var k=f,g=g[0];return a.$watch(function(a){var b=g(a);f(b,k,g.isPure)||(h=d(a,void 0,void 0,[b]),k=b&&yc(b));return h},b,c,e)}for(var l=[],m=[],n=0,p=g.length;n<p;n++)l[n]=
f,m[n]=null;return a.$watch(function(a){for(var b=!1,c=0,e=g.length;c<e;c++){var k=g[c](a);if(b||(b=!f(k,l[c],g[c].isPure)))m[c]=k,l[c]=k&&yc(k)}b&&(h=d(a,void 0,void 0,m));return h},b,c,e)}function k(a,b,c,d,e){function f(a){return d(a)}function h(a,c,d){l=a;E(b)&&b(a,c,d);t(a)&&d.$$postDigest(function(){t(l)&&k()})}var k,l;return k=d.inputs?g(a,h,c,d,e):a.$watch(f,h,c)}function h(a,b,c,d){function e(a){var b=!0;p(a,function(a){t(a)||(b=!1)});return b}var g,f;return g=a.$watch(function(a){return d(a)},
function(a,c,d){f=a;E(b)&&b(a,c,d);e(a)&&d.$$postDigest(function(){e(f)&&g()})},c)}function l(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}function m(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,e=c!==h&&c!==k?function(c,e,g,f){g=d&&f?f[0]:a(c,e,g,f);return b(g,c,e)}:function(c,d,e,g){e=a(c,d,e,g);c=b(e,c,d);return t(e)?c:e},d=!a.inputs;c&&c!==g?(e.$$watchDelegate=c,e.inputs=a.inputs):b.$stateful||(e.$$watchDelegate=g,e.inputs=a.inputs?a.inputs:[a]);e.inputs&&(e.inputs=e.inputs.map(function(a){return a.isPure===
Gd?function(b){return a(b)}:a}));return e}var n={csp:Ja().noUnsafeEval,literals:Ia(b),isIdentifierStart:E(d)&&d,isIdentifierContinue:E(c)&&c};return function(b,c){var d,f,p;switch(typeof b){case "string":return p=b=b.trim(),d=a[p],d||(":"===b.charAt(0)&&":"===b.charAt(1)&&(f=!0,b=b.substring(2)),d=new zc(n),d=(new xc(d,e,n)).parse(b),d.constant?d.$$watchDelegate=l:f?d.$$watchDelegate=d.literal?h:k:d.inputs&&(d.$$watchDelegate=g),a[p]=d),m(d,c);case "function":return m(b,c);default:return m(B,c)}}}]}
function Qf(){var a=!0;this.$get=["$rootScope","$exceptionHandler",function(b,d){return Md(function(a){b.$evalAsync(a)},d,a)}];this.errorOnUnhandledRejections=function(b){return t(b)?(a=b,this):a}}function Rf(){var a=!0;this.$get=["$browser","$exceptionHandler",function(b,d){return Md(function(a){b.defer(a)},d,a)}];this.errorOnUnhandledRejections=function(b){return t(b)?(a=b,this):a}}function Md(a,b,d){function c(){return new e}function e(){var a=this.promise=new f;this.resolve=function(b){h(a,b)};
this.reject=function(b){m(a,b)};this.notify=function(b){q(a,b)}}function f(){this.$$state={status:0}}function g(){for(;!t&&s.length;){var a=s.shift();if(!a.pur){a.pur=!0;var c=a.value,c="Possibly unhandled rejection: "+("function"===typeof c?c.toString().replace(/ \{[\s\S]*$/,""):v(c)?"undefined":"string"!==typeof c?Ee(c,void 0):c);Zb(a.value)?b(a.value,c):b(c)}}}function k(b){!d||b.pending||2!==b.status||b.pur||(0===t&&0===s.length&&a(g),s.push(b));!b.processScheduled&&b.pending&&(b.processScheduled=
!0,++t,a(function(){var c,e,f;f=b.pending;b.processScheduled=!1;b.pending=void 0;try{for(var k=0,l=f.length;k<l;++k){b.pur=!0;e=f[k][0];c=f[k][b.status];try{E(c)?h(e,c(b.value)):1===b.status?h(e,b.value):m(e,b.value)}catch(n){m(e,n)}}}finally{--t,d&&0===t&&a(g)}}))}function h(a,b){a.$$state.status||(b===a?n(a,A("qcycle",b)):l(a,b))}function l(a,b){function c(b){f||(f=!0,l(a,b))}function d(b){f||(f=!0,n(a,b))}function e(b){q(a,b)}var g,f=!1;try{if(G(b)||E(b))g=b.then;E(g)?(a.$$state.status=-1,g.call(b,
c,d,e)):(a.$$state.value=b,a.$$state.status=1,k(a.$$state))}catch(h){d(h)}}function m(a,b){a.$$state.status||n(a,b)}function n(a,b){a.$$state.value=b;a.$$state.status=2;k(a.$$state)}function q(c,d){var e=c.$$state.pending;0>=c.$$state.status&&e&&e.length&&a(function(){for(var a,c,g=0,f=e.length;g<f;g++){c=e[g][0];a=e[g][3];try{q(c,E(a)?a(d):d)}catch(h){b(h)}}})}function F(a){var b=new f;m(b,a);return b}function r(a,b,c){var d=null;try{E(c)&&(d=c())}catch(e){return F(e)}return d&&E(d.then)?d.then(function(){return b(a)},
F):b(a)}function w(a,b,c,d){var e=new f;h(e,a);return e.then(b,c,d)}function u(a){if(!E(a))throw A("norslvr",a);var b=new f;a(function(a){h(b,a)},function(a){m(b,a)});return b}var A=K("$q",TypeError),t=0,s=[];O(f.prototype,{then:function(a,b,c){if(v(a)&&v(b)&&v(c))return this;var d=new f;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&k(this.$$state);return d},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return r(b,
y,a)},function(b){return r(b,F,a)},b)}});var y=w;u.prototype=f.prototype;u.defer=c;u.reject=F;u.when=w;u.resolve=y;u.all=function(a){var b=new f,c=0,d=I(a)?[]:{};p(a,function(a,e){c++;w(a).then(function(a){d[e]=a;--c||h(b,d)},function(a){m(b,a)})});0===c&&h(b,d);return b};u.race=function(a){var b=c();p(a,function(a){w(a).then(b.resolve,b.reject)});return b.promise};return u}function $f(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||
a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function Pf(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++sb;this.$$ChildScope=null}b.prototype=a;return b}var b=10,d=K("$rootScope"),c=null,e=null;this.digestTtl=
function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",function(f,g,k){function h(a){a.currentScope.$$destroyed=!0}function l(a){9===Ba&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++sb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=
this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function n(a){if(A.$$phase)throw d("inprog",A.$$phase);A.$$phase=a}function q(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function F(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function r(){}function w(){for(;y.length;)try{y.shift()()}catch(a){f(a)}e=null}function u(){null===e&&(e=k.defer(function(){A.$apply(w)}))}
m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!==this)&&d.$on("$destroy",h);return d},$watch:function(a,b,d,e){var f=g(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,a);var h=this,k=h.$$watchers,l={fn:b,last:r,get:f,exp:e||a,eq:!!d};
c=null;E(b)||(l.fn=B);k||(k=h.$$watchers=[],k.$$digestWatchIndex=-1);k.unshift(l);k.$$digestWatchIndex++;q(this,1);return function(){var a=cb(k,l);0<=a&&(q(h,-1),a<k.$$digestWatchIndex&&k.$$digestWatchIndex--);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,f)):b(e,d,f)}var d=Array(a.length),e=Array(a.length),g=[],f=this,h=!1,k=!0;if(!a.length){var l=!0;f.$evalAsync(function(){l&&b(e,e,f)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,g){e[0]=a;d[0]=
c;b(e,a===c?e:d,g)});p(a,function(a,b){var k=f.$watch(a,function(a,g){e[b]=a;d[b]=g;h||(h=!0,f.$evalAsync(c))});g.push(k)});return function(){for(;g.length;)g.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!v(e)){if(G(e))if(oa(e))for(f!==n&&(f=n,s=f.length=0,l++),a=e.length,s!==a&&(l++,f.length=s=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==q&&(f=q={},s=0,l++);a=0;for(b in e)wa.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===
g||(l++,f[b]=g)):(s++,f[b]=g,l++));if(s>a)for(b in l++,f)wa.call(e,b)||(s--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),n=[],q={},p=!0,s=0;return this.$watch(m,function(){p?(p=!1,b(e,e,d)):b(e,h,d);if(k)if(G(e))if(oa(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)wa.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,g,h,l,m,q,p,F=b,y,u=[],v,x;n("$digest");k.$$checkUrlChange();this===A&&null!==e&&(k.defer.cancel(e),
w());c=null;do{p=!1;y=this;for(q=0;q<t.length;q++){try{x=t[q],l=x.fn,l(x.scope,x.locals)}catch(z){f(z)}c=null}t.length=0;a:do{if(q=y.$$watchers)for(q.$$digestWatchIndex=q.length;q.$$digestWatchIndex--;)try{if(a=q[q.$$digestWatchIndex])if(m=a.get,(g=m(y))!==(h=a.last)&&!(a.eq?sa(g,h):ba(g)&&ba(h)))p=!0,c=a,a.last=a.eq?Ia(g,null):g,l=a.fn,l(g,h===r?g:h,y),5>F&&(v=4-F,u[v]||(u[v]=[]),u[v].push({msg:E(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:g,oldVal:h}));else if(a===c){p=!1;break a}}catch(B){f(B)}if(!(q=
y.$$watchersCount&&y.$$childHead||y!==this&&y.$$nextSibling))for(;y!==this&&!(q=y.$$nextSibling);)y=y.$parent}while(y=q);if((p||t.length)&&!F--)throw A.$$phase=null,d("infdig",b,u);}while(p||t.length);for(A.$$phase=null;D<s.length;)try{s[D++]()}catch(G){f(G)}s.length=D=0;k.$$checkUrlChange()},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===A&&k.$$applicationDestroyed();q(this,-this.$$watchersCount);for(var b in this.$$listenerCount)F(this,
this.$$listenerCount[b],b);a&&a.$$childHead===this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail===this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=B;this.$on=this.$watch=this.$watchGroup=function(){return B};this.$$listeners={};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,
b)},$evalAsync:function(a,b){A.$$phase||t.length||k.defer(function(){t.length&&A.$digest()});t.push({scope:this,fn:g(a),locals:b})},$$postDigest:function(a){s.push(a)},$apply:function(a){try{n("$apply");try{return this.$eval(a)}finally{A.$$phase=null}}catch(b){f(b)}finally{try{A.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&y.push(b);a=g(a);u()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||
(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,F(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=db([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){f(n)}else d.splice(l,1),l--,m--;if(g)return h.currentScope=
null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=db([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=
c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var A=new m,t=A.$$asyncQueue=[],s=A.$$postDigestQueue=[],y=A.$$applyAsyncQueue=[],D=0;return A}]}function He(){var a=/^\s*(https?|ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return t(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return t(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f;f=ua(d).href;return""===f||f.match(e)?d:"unsafe:"+
f}}}function Gg(a){if("self"===a)return a;if(C(a)){if(-1<a.indexOf("***"))throw qa("iwcard",a);a=Nd(a).replace(/\\\*\\\*/g,".*").replace(/\\\*/g,"[^:/.?&;]*");return new RegExp("^"+a+"$")}if($a(a))return new RegExp("^"+a.source+"$");throw qa("imatcher");}function Od(a){var b=[];t(a)&&p(a,function(a){b.push(Gg(a))});return b}function Tf(){this.SCE_CONTEXTS=ka;var a=["self"],b=[];this.resourceUrlWhitelist=function(b){arguments.length&&(a=Od(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&
(b=Od(a));return b};this.$get=["$injector",function(d){function c(a,b){return"self"===a?Ad(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw qa("unsafe");};d.has("$sanitize")&&(f=d.get("$sanitize"));var g=e(),k={};k[ka.HTML]=e(g);k[ka.CSS]=e(g);k[ka.URL]=
e(g);k[ka.JS]=e(g);k[ka.RESOURCE_URL]=e(k[ka.URL]);return{trustAs:function(a,b){var c=k.hasOwnProperty(a)?k[a]:null;if(!c)throw qa("icontext",a,b);if(null===b||v(b)||""===b)return b;if("string"!==typeof b)throw qa("itype",a);return new c(b)},getTrusted:function(d,e){if(null===e||v(e)||""===e)return e;var g=k.hasOwnProperty(d)?k[d]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(d===ka.RESOURCE_URL){var g=ua(e.toString()),n,q,p=!1;n=0;for(q=a.length;n<q;n++)if(c(a[n],g)){p=!0;break}if(p)for(n=
0,q=b.length;n<q;n++)if(c(b[n],g)){p=!1;break}if(p)return e;throw qa("insecurl",e.toString());}if(d===ka.HTML)return f(e);throw qa("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Sf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Ba)throw qa("iequirks");var c=ra(ka);c.isEnabled=function(){return a};c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=
c.getTrusted=function(a,b){return b},c.valueOf=ab);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;p(ka,function(a,b){var d=N(b);c[("parse_as_"+d).replace(Ac,ib)]=function(b){return e(a,b)};c[("get_trusted_"+d).replace(Ac,ib)]=function(b){return f(a,b)};c[("trust_as_"+d).replace(Ac,ib)]=function(b){return g(a,b)}});return c}]}function Uf(){this.$get=["$window","$document",function(a,b){var d={},
c=!((!a.nw||!a.nw.process)&&a.chrome&&(a.chrome.app&&a.chrome.app.runtime||!a.chrome.app&&a.chrome.runtime&&a.chrome.runtime.id))&&a.history&&a.history.pushState,e=Q((/android (\d+)/.exec(N((a.navigator||{}).userAgent))||[])[1]),f=/Boxee/i.test((a.navigator||{}).userAgent),g=b[0]||{},k=g.body&&g.body.style,h=!1,l=!1;k&&(h=!!("transition"in k||"webkitTransition"in k),l=!!("animation"in k||"webkitAnimation"in k));return{history:!(!c||4>e||f),hasEvent:function(a){if("input"===a&&Ba)return!1;if(v(d[a])){var b=
g.createElement("div");d[a]="on"+a in b}return d[a]},csp:Ja(),transitions:h,animations:l,android:e}}]}function Wf(){var a;this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$exceptionHandler","$templateCache","$http","$q","$sce",function(b,d,c,e,f){function g(k,h){g.totalPendingRequests++;if(!C(k)||v(d.get(k)))k=f.getTrustedResourceUrl(k);var l=c.defaults&&c.defaults.transformResponse;I(l)?l=l.filter(function(a){return a!==qc}):l===qc&&(l=null);return c.get(k,O({cache:d,transformResponse:l},
a)).finally(function(){g.totalPendingRequests--}).then(function(a){d.put(k,a.data);return a.data},function(a){h||(a=Hg("tpload",k,a.status,a.statusText),b(a));return e.reject(a)})}g.totalPendingRequests=0;return g}]}function Xf(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");var g=[];p(a,function(a){var c=fa.element(a).data("$binding");c&&p(c,function(c){d?(new RegExp("(^|\\s)"+Nd(b)+"(\\s|\\||$)")).test(c)&&
g.push(a):-1!==c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-","data-ng-","ng\\:"],k=0;k<g.length;++k){var h=a.querySelectorAll("["+g[k]+"model"+(d?"=":"*=")+'"'+b+'"]');if(h.length)return h}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function Yf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,
h,l){E(f)||(l=h,h=f,f=B);var m=xa.call(arguments,3),n=t(l)&&!l,q=(n?c:d).defer(),p=q.promise,r;r=b.defer(function(){try{q.resolve(f.apply(null,m))}catch(b){q.reject(b),e(b)}finally{delete g[p.$$timeoutId]}n||a.$apply()},h);p.$$timeoutId=r;g[r]=q;return p}var g={};f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].promise.$$state.pur=!0,g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1};return f}]}function ua(a){Ba&&(ea.setAttribute("href",
a),a=ea.href);ea.setAttribute("href",a);return{href:ea.href,protocol:ea.protocol?ea.protocol.replace(/:$/,""):"",host:ea.host,search:ea.search?ea.search.replace(/^\?/,""):"",hash:ea.hash?ea.hash.replace(/^#/,""):"",hostname:ea.hostname,port:ea.port,pathname:"/"===ea.pathname.charAt(0)?ea.pathname:"/"+ea.pathname}}function Ad(a){a=C(a)?ua(a):a;return a.protocol===Pd.protocol&&a.host===Pd.host}function Zf(){this.$get=aa(x)}function Qd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}
var d=a[0]||{},c={},e="";return function(){var a,g,k,h,l;try{a=d.cookie||""}catch(m){a=""}if(a!==e)for(e=a,a=e.split("; "),c={},k=0;k<a.length;k++)g=a[k],h=g.indexOf("="),0<h&&(l=b(g.substring(0,h)),v(c[l])&&(c[l]=b(g.substring(h+1))));return c}}function cg(){this.$get=Qd}function ed(a){function b(d,c){if(G(d)){var e={};p(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",
Rd);b("date",Sd);b("filter",Ig);b("json",Jg);b("limitTo",Kg);b("lowercase",Lg);b("number",Td);b("orderBy",Ud);b("uppercase",Mg)}function Ig(){return function(a,b,d,c){if(!oa(a)){if(null==a)return a;throw K("filter")("notarray",a);}c=c||"$";var e;switch(Bc(b)){case "function":break;case "boolean":case "null":case "number":case "string":e=!0;case "object":b=Ng(b,d,c,e);break;default:return a}return Array.prototype.filter.call(a,b)}}function Ng(a,b,d,c){var e=G(a)&&d in a;!0===b?b=sa:E(b)||(b=function(a,
b){if(v(a))return!1;if(null===a||null===b)return a===b;if(G(b)||G(a)&&!Yb(a))return!1;a=N(""+a);b=N(""+b);return-1!==a.indexOf(b)});return function(f){return e&&!G(f)?Ga(f,a[d],b,d,!1):Ga(f,a,b,d,c)}}function Ga(a,b,d,c,e,f){var g=Bc(a),k=Bc(b);if("string"===k&&"!"===b.charAt(0))return!Ga(a,b.substring(1),d,c,e);if(I(a))return a.some(function(a){return Ga(a,b,d,c,e)});switch(g){case "object":var h;if(e){for(h in a)if(h.charAt&&"$"!==h.charAt(0)&&Ga(a[h],b,d,c,!0))return!0;return f?!1:Ga(a,b,d,c,!1)}if("object"===
k){for(h in b)if(f=b[h],!E(f)&&!v(f)&&(g=h===c,!Ga(g?a:a[h],f,d,c,g,g)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function Bc(a){return null===a?"null":typeof a}function Rd(a){var b=a.NUMBER_FORMATS;return function(a,c,e){v(c)&&(c=b.CURRENCY_SYM);v(e)&&(e=b.PATTERNS[1].maxFrac);return null==a?a:Vd(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(/\u00A4/g,c)}}function Td(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Vd(a,b.PATTERNS[0],b.GROUP_SEP,
b.DECIMAL_SEP,c)}}function Og(a){var b=0,d,c,e,f,g;-1<(c=a.indexOf(Wd))&&(a=a.replace(Wd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=a.length);for(e=0;a.charAt(e)===Cc;e++);if(e===(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)===Cc;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Xd&&(d=d.splice(0,Xd-1),b=c-1,c=1);return{d:d,e:b,i:c}}function Pg(a,b,d,c){var e=a.d,f=e.length-a.i;b=v(b)?Math.min(Math.max(d,f),c):+b;d=b+a.i;c=e[d];if(0<d){e.splice(Math.max(a.i,
d));for(var g=d;g<e.length;g++)e[g]=0}else for(f=Math.max(0,f),a.i=1,e.length=Math.max(1,d=b+1),e[0]=0,g=1;g<d;g++)e[g]=0;if(5<=c)if(0>d-1){for(c=0;c>d;c--)e.unshift(0),a.i++;e.unshift(1);a.i++}else e[d-1]++;for(;f<Math.max(0,b);f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),a.i++}function Vd(a,b,d,c,e){if(!C(a)&&!W(a)||isNaN(a))return"";var f=!isFinite(a),g=!1,k=Math.abs(a)+"",h="";if(f)h="\u221e";else{g=Og(k);Pg(g,e,b.minFrac,b.maxFrac);
h=g.d;k=g.i;e=g.e;f=[];for(g=h.reduce(function(a,b){return a&&!b},!0);0>k;)h.unshift(0),k++;0<k?f=h.splice(k,h.length):(f=h,h=[0]);k=[];for(h.length>=b.lgSize&&k.unshift(h.splice(-b.lgSize,h.length).join(""));h.length>b.gSize;)k.unshift(h.splice(-b.gSize,h.length).join(""));h.length&&k.unshift(h.join(""));h=k.join(d);f.length&&(h+=c+f.join(""));e&&(h+="e+"+e)}return 0>a&&!g?b.negPre+h+b.negSuf:b.posPre+h+b.posSuf}function Lb(a,b,d,c){var e="";if(0>a||c&&0>=a)c?a=-a+1:(a=-a,e="-");for(a=""+a;a.length<
b;)a=Cc+a;d&&(a=a.substr(a.length-b));return e+a}function $(a,b,d,c,e){d=d||0;return function(f){f=f["get"+a]();if(0<d||f>-d)f+=d;0===f&&-12===d&&(f=12);return Lb(f,b,c,e)}}function ob(a,b,d){return function(c,e){var f=c["get"+a](),g=wb((d?"STANDALONE":"")+(b?"SHORT":"")+a);return e[g][f]}}function Yd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Zd(a){return function(b){var d=Yd(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-
+d;b=1+Math.round(b/6048E5);return Lb(b,a)}}function Dc(a,b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Sd(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,k=b[8]?a.setUTCFullYear:a.setFullYear,h=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Q(b[9]+b[10]),g=Q(b[9]+b[11]));k.call(a,Q(b[1]),Q(b[2])-1,Q(b[3]));f=Q(b[4]||0)-f;g=Q(b[5]||0)-g;k=Q(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));h.call(a,f,g,k,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,d,f){var g="",k=[],h,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;C(c)&&(c=Qg.test(c)?Q(c):b(c));W(c)&&(c=new Date(c));if(!ia(c)||!isFinite(c.getTime()))return c;for(;d;)(l=Rg.exec(d))?(k=db(k,l,1),d=k.pop()):(k.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=Rc(f,m),c=ac(c,f,!0));p(k,function(b){h=Sg[b];g+=h?h(c,a.DATETIME_FORMATS,m):"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Jg(){return function(a,b){v(b)&&(b=2);return eb(a,b)}}function Kg(){return function(a,
b,d){b=Infinity===Math.abs(Number(b))?Number(b):Q(b);if(ba(b))return a;W(a)&&(a=a.toString());if(!oa(a))return a;d=!d||isNaN(d)?0:Q(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?Ec(a,d,d+b):0===d?Ec(a,b,a.length):Ec(a,Math.max(0,d+b),d)}}function Ec(a,b,d){return C(a)?a.slice(b,d):xa.call(a,b,d)}function Ud(a){function b(b){return b.map(function(b){var c=1,d=ab;if(E(b))d=b;else if(C(b)){if("+"===b.charAt(0)||"-"===b.charAt(0))c="-"===b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(d=a(b),d.constant))var e=
d(),d=function(a){return a[e]}}return{get:d,descending:c}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function c(a,b){var c=0,d=a.type,h=b.type;if(d===h){var h=a.value,l=b.value;"string"===d?(h=h.toLowerCase(),l=l.toLowerCase()):"object"===d&&(G(h)&&(h=a.index),G(l)&&(l=b.index));h!==l&&(c=h<l?-1:1)}else c=d<h?-1:1;return c}return function(a,f,g,k){if(null==a)return a;if(!oa(a))throw K("orderBy")("notarray",a);I(f)||(f=[f]);0===f.length&&
(f=["+"]);var h=b(f),l=g?-1:1,m=E(k)?k:c;a=Array.prototype.map.call(a,function(a,b){return{value:a,tieBreaker:{value:b,type:"number",index:b},predicateValues:h.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="string",e="null";else if("object"===c)a:{if(E(e.valueOf)&&(e=e.valueOf(),d(e)))break a;Yb(e)&&(e=e.toString(),d(e))}return{value:e,type:c,index:b}})}});a.sort(function(a,b){for(var d=0,e=h.length;d<e;d++){var g=m(a.predicateValues[d],b.predicateValues[d]);if(g)return g*h[d].descending*
l}return(m(a.tieBreaker,b.tieBreaker)||c(a.tieBreaker,b.tieBreaker))*l});return a=a.map(function(a){return a.value})}}function Ua(a){E(a)&&(a={link:a});a.restrict=a.restrict||"AC";return aa(a)}function Mb(a,b,d,c,e){this.$$controls=[];this.$error={};this.$$success={};this.$pending=void 0;this.$name=e(b.name||b.ngForm||"")(d);this.$dirty=!1;this.$valid=this.$pristine=!0;this.$submitted=this.$invalid=!1;this.$$parentForm=Nb;this.$$element=a;this.$$animate=c;$d(this)}function $d(a){a.$$classCache={};
a.$$classCache[ae]=!(a.$$classCache[pb]=a.$$element.hasClass(pb))}function be(a){function b(a,b,c){c&&!a.$$classCache[b]?(a.$$animate.addClass(a.$$element,b),a.$$classCache[b]=!0):!c&&a.$$classCache[b]&&(a.$$animate.removeClass(a.$$element,b),a.$$classCache[b]=!1)}function d(a,c,d){c=c?"-"+Vc(c,"-"):"";b(a,pb+c,!0===d);b(a,ae+c,!1===d)}var c=a.set,e=a.unset;a.clazz.prototype.$setValidity=function(a,g,k){v(g)?(this.$pending||(this.$pending={}),c(this.$pending,a,k)):(this.$pending&&e(this.$pending,
a,k),ce(this.$pending)&&(this.$pending=void 0));La(g)?g?(e(this.$error,a,k),c(this.$$success,a,k)):(c(this.$error,a,k),e(this.$$success,a,k)):(e(this.$error,a,k),e(this.$$success,a,k));this.$pending?(b(this,"ng-pending",!0),this.$valid=this.$invalid=void 0,d(this,"",null)):(b(this,"ng-pending",!1),this.$valid=ce(this.$error),this.$invalid=!this.$valid,d(this,"",this.$valid));g=this.$pending&&this.$pending[a]?void 0:this.$error[a]?!1:this.$$success[a]?!0:null;d(this,a,g);this.$$parentForm.$setValidity(a,
g,this)}}function ce(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function Fc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function Va(a,b,d,c,e,f){var g=N(b[0].type);if(!e.android){var k=!1;b.on("compositionstart",function(){k=!0});b.on("compositionend",function(){k=!1;l()})}var h,l=function(a){h&&(f.defer.cancel(h),h=null);if(!k){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&"false"===d.ngTrim||(e=P(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&
c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",l);else{var m=function(a,b,c){h||(h=f.defer(function(){h=null;b&&b.value===c||l(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut",m)}b.on("change",l);if(de[g]&&c.$$hasNativeValidators&&g===d.type)b.on("keydown wheel mousedown",function(a){if(!h){var b=this.validity,c=b.badInput,d=b.typeMismatch;h=f.defer(function(){h=null;b.badInput===c&&b.typeMismatch===
d||l(a)})}});c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Ob(a,b){return function(d,c){var e,f;if(ia(d))return d;if(C(d)){'"'===d.charAt(0)&&'"'===d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(Tg.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,
ss:0,sss:0},p(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function qb(a,b,d,c){return function(e,f,g,k,h,l,m){function n(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function q(a){return t(a)&&!ia(a)?d(a)||void 0:a}Gc(e,f,g,k);Va(e,f,g,k,h,l);var p=k&&k.$options.getOption("timezone"),r;k.$$parserName=a;k.$parsers.push(function(a){if(k.$isEmpty(a))return null;if(b.test(a))return a=d(a,r),p&&(a=ac(a,p)),a});k.$formatters.push(function(a){if(a&&
!ia(a))throw rb("datefmt",a);if(n(a))return(r=a)&&p&&(r=ac(r,p,!0)),m("date")(a,c,p);r=null;return""});if(t(g.min)||g.ngMin){var w;k.$validators.min=function(a){return!n(a)||v(w)||d(a)>=w};g.$observe("min",function(a){w=q(a);k.$validate()})}if(t(g.max)||g.ngMax){var u;k.$validators.max=function(a){return!n(a)||v(u)||d(a)<=u};g.$observe("max",function(a){u=q(a);k.$validate()})}}}function Gc(a,b,d,c){(c.$$hasNativeValidators=G(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};
return c.badInput||c.typeMismatch?void 0:a})}function ee(a){a.$$parserName="number";a.$parsers.push(function(b){if(a.$isEmpty(b))return null;if(Ug.test(b))return parseFloat(b)});a.$formatters.push(function(b){if(!a.$isEmpty(b)){if(!W(b))throw rb("numfmt",b);b=b.toString()}return b})}function Wa(a){t(a)&&!W(a)&&(a=parseFloat(a));return ba(a)?void 0:a}function Hc(a){var b=a.toString(),d=b.indexOf(".");return-1===d?-1<a&&1>a&&(a=/e-(\d+)$/.exec(b))?Number(a[1]):0:b.length-d-1}function fe(a,b,d){a=Number(a);
var c=(a|0)!==a,e=(b|0)!==b,f=(d|0)!==d;if(c||e||f){var g=c?Hc(a):0,k=e?Hc(b):0,h=f?Hc(d):0,g=Math.max(g,k,h),g=Math.pow(10,g);a*=g;b*=g;d*=g;c&&(a=Math.round(a));e&&(b=Math.round(b));f&&(d=Math.round(d))}return 0===(a-b)%d}function ge(a,b,d,c,e){if(t(c)){a=a(c);if(!a.constant)throw rb("constexpr",d,c);return a(b)}return e}function Ic(a,b){function d(a,b){if(!a||!a.length)return[];if(!b||!b.length)return a;var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],f=0;f<b.length;f++)if(e===b[f])continue a;
c.push(e)}return c}function c(a){var b=a;I(a)?b=a.map(c).join(" "):G(a)&&(b=Object.keys(a).filter(function(b){return a[b]}).join(" "));return b}function e(a){var b=a;if(I(a))b=a.map(e);else if(G(a)){var c=!1,b=Object.keys(a).filter(function(b){b=a[b];!c&&v(b)&&(c=!0);return b});c&&b.push(void 0)}return b}a="ngClass"+a;var f;return["$parse",function(g){return{restrict:"AC",link:function(k,h,l){function m(a,b){var c=[];p(a,function(a){if(0<b||A[a])A[a]=(A[a]||0)+b,A[a]===+(0<b)&&c.push(a)});return c.join(" ")}
function n(a){if(a===b){var c=s,c=m(c&&c.split(" "),1);l.$addClass(c)}else c=s,c=m(c&&c.split(" "),-1),l.$removeClass(c);v=a}function q(a){a=c(a);a!==s&&r(a)}function r(a){if(v===b){var c=s&&s.split(" "),e=a&&a.split(" "),g=d(c,e),c=d(e,c),g=m(g,-1),c=m(c,1);l.$addClass(c);l.$removeClass(g)}s=a}var t=l[a].trim(),w=":"===t.charAt(0)&&":"===t.charAt(1),t=g(t,w?e:c),u=w?q:r,A=h.data("$classCounts"),v=!0,s;A||(A=R(),h.data("$classCounts",A));"ngClass"!==a&&(f||(f=g("$index",function(a){return a&1})),
k.$watch(f,n));k.$watch(t,u,w)}}}]}function Pb(a,b,d,c,e,f,g,k,h){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=void 0;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=void 0;this.$name=h(d.name||"",!1)(a);this.$$parentForm=Nb;this.$options=Qb;this.$$parsedNgModel=e(d.ngModel);
this.$$parsedNgModelAssign=this.$$parsedNgModel.assign;this.$$ngModelGet=this.$$parsedNgModel;this.$$ngModelSet=this.$$parsedNgModelAssign;this.$$pendingDebounce=null;this.$$parserValid=void 0;this.$$currentValidationRunId=0;Object.defineProperty(this,"$$scope",{value:a});this.$$attr=d;this.$$element=c;this.$$animate=f;this.$$timeout=g;this.$$parse=e;this.$$q=k;this.$$exceptionHandler=b;$d(this);Vg(this)}function Vg(a){a.$$scope.$watch(function(b){b=a.$$ngModelGet(b);if(b!==a.$modelValue&&(a.$modelValue===
a.$modelValue||b===b)){a.$modelValue=a.$$rawModelValue=b;a.$$parserValid=void 0;for(var d=a.$formatters,c=d.length,e=b;c--;)e=d[c](e);a.$viewValue!==e&&(a.$$updateEmptyClasses(e),a.$viewValue=a.$$lastCommittedViewValue=e,a.$render(),a.$$runValidators(a.$modelValue,a.$viewValue,B))}return b})}function Jc(a){this.$$options=a}function he(a,b){p(b,function(b,c){t(a[c])||(a[c]=b)})}function Ha(a,b){a.prop("selected",b);a.attr("selected",b)}var Lc={objectMaxDepth:5},Wg=/^\/(.+)\/([a-z]*)$/,wa=Object.prototype.hasOwnProperty,
N=function(a){return C(a)?a.toLowerCase():a},wb=function(a){return C(a)?a.toUpperCase():a},Ba,z,ta,xa=[].slice,vg=[].splice,Xg=[].push,la=Object.prototype.toString,Oc=Object.getPrototypeOf,za=K("ng"),fa=x.angular||(x.angular={}),dc,sb=0;Ba=x.document.documentMode;var ba=Number.isNaN||function(a){return a!==a};B.$inject=[];ab.$inject=[];var I=Array.isArray,te=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,P=function(a){return C(a)?a.trim():a},Nd=function(a){return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g,
"\\$1").replace(/\x08/g,"\\x08")},Ja=function(){if(!t(Ja.rules)){var a=x.document.querySelector("[ng-csp]")||x.document.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Ja.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Ja;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Ja.rules},tb=function(){if(t(tb.name_))return tb.name_;var a,b,d=Na.length,
c,e;for(b=0;b<d;++b)if(c=Na[b],a=x.document.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return tb.name_=e},ve=/:/g,Na=["ng-","data-ng-","ng:","x-ng-"],ye=function(a){var b=a.currentScript;if(!b)return!0;if(!(b instanceof x.HTMLScriptElement||b instanceof x.SVGScriptElement))return!1;b=b.attributes;return[b.getNamedItem("src"),b.getNamedItem("href"),b.getNamedItem("xlink:href")].every(function(b){if(!b)return!0;if(!b.value)return!1;var c=a.createElement("a");c.href=
b.value;if(a.location.origin===c.origin)return!0;switch(c.protocol){case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":return!0;default:return!1}})}(x.document),Be=/[A-Z]/g,Wc=!1,Ma=3,Ge={full:"1.6.5",major:1,minor:6,dot:5,codeName:"toffee-salinization"};S.expando="ng339";var jb=S.cache={},hg=1;S._data=function(a){return this.cache[a[this.expando]]||{}};var dg=/-([a-z])/g,Yg=/^-ms-/,Bb={mouseleave:"mouseout",mouseenter:"mouseover"},gc=K("jqLite"),gg=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
fc=/<|&#?\w+;/,eg=/<([\w:-]+)/,fg=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,pa={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};pa.optgroup=pa.option;pa.tbody=pa.tfoot=pa.colgroup=pa.caption=pa.thead;pa.th=pa.td;var mg=x.Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&
16)},Ra=S.prototype={ready:gd,toString:function(){var a=[];p(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?z(this[a]):z(this[this.length+a])},length:0,push:Xg,sort:[].sort,splice:[].splice},Hb={};p("multiple selected checked disabled readOnly required open".split(" "),function(a){Hb[N(a)]=a});var ld={};p("input select option textarea button form details".split(" "),function(a){ld[a]=!0});var td={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",
ngPattern:"pattern",ngStep:"step"};p({data:kc,removeData:jc,hasData:function(a){for(var b in jb[a.ng339])return!0;return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)jc(a[b])}},function(a,b){S[b]=a});p({data:kc,inheritedData:Fb,scope:function(a){return z.data(a,"$scope")||Fb(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){return z.data(a,"$isolateScope")||z.data(a,"$isolateScopeNoTemplate")},controller:id,injector:function(a){return Fb(a,"$injector")},removeAttr:function(a,
b){a.removeAttribute(b)},hasClass:Cb,css:function(a,b,d){b=yb(b.replace(Yg,"ms-"));if(t(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Ma&&2!==c&&8!==c&&a.getAttribute){var c=N(b),e=Hb[c];if(t(d))null===d||!1===d&&e?a.removeAttribute(b):a.setAttribute(b,e?c:d);else return a=a.getAttribute(b),e&&null!==a&&(a=c),null===a?void 0:a}},prop:function(a,b,d){if(t(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(v(d)){var c=a.nodeType;return 1===c||c===Ma?
a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(v(b)){if(a.multiple&&"select"===ya(a)){var d=[];p(a.options,function(a){a.selected&&d.push(a.value||a.text)});return d}return a.value}a.value=b},html:function(a,b){if(v(b))return a.innerHTML;zb(a,!0);a.innerHTML=b},empty:jd},function(a,b){S.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==jd&&v(2===a.length&&a!==Cb&&a!==id?b:c)){if(G(b)){for(e=0;e<g;e++)if(a===kc)a(this[e],b);else for(f in b)a(this[e],f,b[f]);return this}e=
a.$dv;g=v(e)?Math.min(g,1):g;for(f=0;f<g;f++){var k=a(this[f],b,c);e=e?e+k:k}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});p({removeData:jc,on:function(a,b,d,c){if(t(c))throw gc("onargs");if(ec(a)){c=Ab(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=jg(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,k=function(b,c,g){var k=e[b];k||(k=e[b]=[],k.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f));k.push(d)};g--;)b=c[g],Bb[b]?(k(Bb[b],lg),k(b,void 0,!0)):k(b)}},
off:hd,one:function(a,b,d){a=z(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;zb(a);p(new S(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];p(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new S(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},
prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;p(new S(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){var d=z(b).eq(0).clone()[0],c=a.parentNode;c&&c.replaceChild(d,a);d.appendChild(a)},remove:Gb,detach:function(a){Gb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;if(c){b=new S(b);for(var e=0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}}},addClass:Eb,removeClass:Db,toggleClass:function(a,b,d){b&&p(b.split(" "),function(b){var e=d;v(e)&&(e=!Cb(a,b));
(e?Eb:Db)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:ic,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=Ab(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===
this.immediatePropagationStopped},stopPropagation:B,type:f,target:a},b.type&&(c=O(c,b)),b=ra(g),e=d?[c].concat(d):[c],p(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){S.prototype[b]=function(b,c,e){for(var f,g=0,k=this.length;g<k;g++)v(f)?(f=a(this[g],b,c,e),t(f)&&(f=z(f))):hc(f,a(this[g],b,c,e));return t(f)?f:this}});S.prototype.bind=S.prototype.on;S.prototype.unbind=S.prototype.off;var Zg=Object.create(null);md.prototype={_idx:function(a){if(a===this._lastKey)return this._lastIndex;
this._lastKey=a;return this._lastIndex=this._keys.indexOf(a)},_transformKey:function(a){return ba(a)?Zg:a},get:function(a){a=this._transformKey(a);a=this._idx(a);if(-1!==a)return this._values[a]},set:function(a,b){a=this._transformKey(a);var d=this._idx(a);-1===d&&(d=this._lastIndex=this._keys.length);this._keys[d]=a;this._values[d]=b},delete:function(a){a=this._transformKey(a);a=this._idx(a);if(-1===a)return!1;this._keys.splice(a,1);this._values.splice(a,1);this._lastKey=NaN;this._lastIndex=-1;return!0}};
var Ib=md,bg=[function(){this.$get=[function(){return Ib}]}],og=/^([^(]+?)=>/,pg=/^[^(]*\(\s*([^)]*)\)/m,$g=/,/,ah=/^\s*(_?)(\S+?)\1\s*$/,ng=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ka=K("$injector");gb.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw C(d)&&d||(d=a.name||qg(a)),Ka("strictdi",d);b=nd(a);p(b[1].split($g),function(a){a.replace(ah,function(a,b,d){c.push(d)})})}a.$inject=c}}else I(a)?(b=a.length-1,ub(a[b],"fn"),c=a.slice(0,b)):ub(a,"fn",
!0);return c};var ie=K("$animate"),tf=function(){this.$get=B},uf=function(){var a=new Ib,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=C(b)?b.split(" "):I(b)?b:[],p(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){p(b,function(b){var c=a.get(b);if(c){var d=rg(b.attr("class")),e="",f="";p(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});p(b,function(a){e&&Eb(a,e);f&&Db(a,f)});a.delete(b)}});b.length=0}return{enabled:B,
on:B,off:B,pin:B,push:function(g,k,h,l){l&&l();h=h||{};h.from&&g.css(h.from);h.to&&g.css(h.to);if(h.addClass||h.removeClass)if(k=h.addClass,l=h.removeClass,h=a.get(g)||{},k=e(h,k,!0),l=e(h,l,!1),k||l)a.set(g,h),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();return g}}}]},rf=["$provide",function(a){var b=this,d=null,c=null;this.$$registeredAnimations=Object.create(null);this.register=function(c,d){if(c&&"."!==c.charAt(0))throw ie("notcsel",c);var g=c+"-animation";b.$$registeredAnimations[c.substr(1)]=
g;a.factory(g,d)};this.customFilter=function(a){1===arguments.length&&(c=E(a)?a:null);return c};this.classNameFilter=function(a){if(1===arguments.length&&(d=a instanceof RegExp?a:null)&&/[(\s|\/)]ng-animate[(\s|\/)]/.test(d.toString()))throw d=null,ie("nongcls","ng-animate");return d};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var e;a:{for(e=0;e<d.length;e++){var f=d[e];if(1===f.nodeType){e=f;break a}}e=void 0}!e||e.parentNode||e.previousElementSibling||(d=null)}d?d.after(a):
c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(c,d,h,l){d=d&&z(d);h=h&&z(h);d=d||h.parent();b(c,d,h);return a.push(c,"enter",Ca(l))},move:function(c,d,h,l){d=d&&z(d);h=h&&z(h);d=d||h.parent();b(c,d,h);return a.push(c,"move",Ca(l))},leave:function(b,c){return a.push(b,"leave",Ca(c),function(){b.remove()})},addClass:function(b,c,d){d=Ca(d);d.addClass=kb(d.addclass,c);return a.push(b,"addClass",d)},removeClass:function(b,c,d){d=Ca(d);
d.removeClass=kb(d.removeClass,c);return a.push(b,"removeClass",d)},setClass:function(b,c,d,f){f=Ca(f);f.addClass=kb(f.addClass,c);f.removeClass=kb(f.removeClass,d);return a.push(b,"setClass",f)},animate:function(b,c,d,f,m){m=Ca(m);m.from=m.from?O(m.from,c):c;m.to=m.to?O(m.to,d):d;m.tempClasses=kb(m.tempClasses,f||"ng-inline-animate");return a.push(b,"animate",m)}}}]}],wf=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();d=
[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},vf=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$$isDocumentHidden","$timeout",function(a,b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=[];this._tick=function(a){c()?e(a,0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=function(a,b){function c(f){e=e&&f;++d===a.length&&
b(e)}var d=0,e=!0;p(a,function(a){a.done(c)})};f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:B,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&
this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(p(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},sf=function(){this.$get=["$$rAF","$q","$$AnimateRunner",
function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);k||h.complete();k=!0});return h}var g=e||{};g.$$prepared||(g=Ia(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var k,h=new d;return{start:f,end:f}}}]},ga=K("$compile"),oc=new function(){};Yc.$inject=["$provide","$$sanitizeUriProvider"];Jb.prototype.isFirstChange=
function(){return this.previousValue===oc};var od=/^((?:x|data)[:\-_])/i,ug=/[:\-_]+(.)/g,vd=K("$controller"),ud=/^(\S+)(\s+as\s+([\w$]+))?$/,Df=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof z&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},wd="application/json",sc={"Content-Type":wd+";charset=utf-8"},xg=/^\[|^\{(?!\{)/,yg={"[":/]$/,"{":/}$/},wg=/^\)]\}',?\n/,rc=K("$http"),Fa=fa.$interpolateMinErr=K("$interpolate");Fa.throwNoconcat=function(a){throw Fa("noconcat",
a);};Fa.interr=function(a,b){return Fa("interr",a,b.toString())};var Lf=function(){this.$get=function(){function a(a){var b=function(a){b.data=a;b.called=!0};b.id=a;return b}var b=fa.callbacks,d={};return{createCallback:function(c){c="_"+(b.$$counter++).toString(36);var e="angular.callbacks."+c,f=a(c);d[e]=b[c]=f;return e},wasCalled:function(a){return d[a].called},getResponse:function(a){return d[a].data},removeCallback:function(a){delete b[d[a].id];delete d[a]}}}},bh=/^([^?#]*)(\?([^#]*))?(#(.*))?$/,
Ag={http:80,https:443,ftp:21},mb=K("$location"),Bg=/^\s*[\\/]{2,}/,ch={$$absUrl:"",$$html5:!1,$$replace:!1,absUrl:Kb("$$absUrl"),url:function(a){if(v(a))return this.$$url;var b=bh.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Kb("$$protocol"),host:Kb("$$host"),port:Kb("$$port"),path:Ed("$$path",function(a){a=null!==a?a.toString():"";return"/"===a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;
case 1:if(C(a)||W(a))a=a.toString(),this.$$search=Tc(a);else if(G(a))a=Ia(a,{}),p(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw mb("isrcharg");break;default:v(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:Ed("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};p([Dd,wc,vc],function(a){a.prototype=Object.create(ch);a.prototype.state=function(b){if(!arguments.length)return this.$$state;
if(a!==vc||!this.$$html5)throw mb("nostate");this.$$state=v(b)?null:b;this.$$urlUpdatedByLocation=!0;return this}});var Xa=K("$parse"),Fg={}.constructor.prototype.valueOf,Rb=R();p("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Rb[a]=!0});var dh={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},zc=function(a){this.options=a};zc.prototype={constructor:zc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),
'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdentifierStart(this.peekMultichar()))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Rb[b],e=Rb[d];Rb[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",
this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdentifierStart:function(a){return this.options.isIdentifierStart?this.options.isIdentifierStart(a,this.codePointAt(a)):this.isValidIdentifierStart(a)},isValidIdentifierStart:function(a){return"a"<=
a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isIdentifierContinue:function(a){return this.options.isIdentifierContinue?this.options.isIdentifierContinue(a,this.codePointAt(a)):this.isValidIdentifierContinue(a)},isValidIdentifierContinue:function(a,b){return this.isValidIdentifierStart(a,b)||this.isNumber(a)},codePointAt:function(a){return 1===a.length?a.charCodeAt(0):(a.charCodeAt(0)<<10)+a.charCodeAt(1)-56613888},peekMultichar:function(){var a=this.text.charAt(this.index),b=this.peek();if(!b)return a;
var d=a.charCodeAt(0),c=b.charCodeAt(0);return 55296<=d&&56319>=d&&56320<=c&&57343>=c?a+b:a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=t(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw Xa("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=N(this.text.charAt(this.index));if("."===d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"===d&&this.isExpOperator(c))a+=
d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"===a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!==a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){var a=this.index;for(this.index+=this.peekMultichar().length;this.index<this.text.length;){var b=this.peekMultichar();if(!this.isIdentifierContinue(b))break;this.index+=b.length}this.tokens.push({index:a,
text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):d+=dh[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,
value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var r=function(a,b){this.lexer=a;this.options=b};r.Program="Program";r.ExpressionStatement="ExpressionStatement";r.AssignmentExpression="AssignmentExpression";r.ConditionalExpression="ConditionalExpression";r.LogicalExpression="LogicalExpression";r.BinaryExpression="BinaryExpression";r.UnaryExpression="UnaryExpression";r.CallExpression="CallExpression";r.MemberExpression="MemberExpression";r.Identifier="Identifier";r.Literal=
"Literal";r.ArrayExpression="ArrayExpression";r.Property="Property";r.ObjectExpression="ObjectExpression";r.ThisExpression="ThisExpression";r.LocalsExpression="LocalsExpression";r.NGValueParameter="NGValueParameter";r.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),
!this.expect(";"))return{type:r.Program,body:a}},expressionStatement:function(){return{type:r.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();if(this.expect("=")){if(!Id(a))throw Xa("lval");a={type:r.AssignmentExpression,left:a,right:this.assignment(),operator:"="}}return a},ternary:function(){var a=this.logicalOR(),
b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:r.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:r.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:r.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),
b;b=this.expect("==","!=","===","!==");)a={type:r.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:r.BinaryExpression,operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:r.BinaryExpression,operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),
b;b=this.expect("*","/","%");)a={type:r.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:r.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=Ia(this.selfReferential[this.consume().text]):
this.options.literals.hasOwnProperty(this.peek().text)?a={type:r.Literal,value:this.options.literals[this.consume().text]}:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:r.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:r.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):
"."===b.text?a={type:r.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:r.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.filterChain());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",
a);return{type:r.Identifier,name:a.text}},constant:function(){return{type:r.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:r.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:r.Property,kind:"init"};this.peek().constant?(b.key=this.constant(),b.computed=!1,this.consume(":"),
b.value=this.expression()):this.peek().identifier?(b.key=this.identifier(),b.computed=!1,this.peek(":")?(this.consume(":"),b.value=this.expression()):b.value=b.key):this.peek("[")?(this.consume("["),b.key=this.expression(),this.consume("]"),b.computed=!0,this.consume(":"),b.value=this.expression()):this.throwError("invalid key",this.peek());a.push(b)}while(this.expect(","))}this.consume("}");return{type:r.ObjectExpression,properties:a}},throwError:function(a,b){throw Xa("syntax",b.text,a,b.index+
1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw Xa("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw Xa("ueoe",this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,e){if(this.tokens.length>a){a=this.tokens[a];var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},
expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},selfReferential:{"this":{type:r.ThisExpression},$locals:{type:r.LocalsExpression}}};var Gd=2;Kd.prototype={compile:function(a){var b=this;this.state={nextId:0,filters:{},fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};X(a,b.$filter);var d="",c;this.stage="assign";if(c=Jd(a))this.state.computing="assign",d=this.nextId(),this.recurse(c,d),this.return_(d),d="fn.assign="+this.generateFunction("assign",
"s,v,l");c=Hd(a.body);b.stage="inputs";p(c,function(a,c){var d="fn"+c;b.state[d]={vars:[],body:[],own:{}};b.state.computing=d;var k=b.nextId();b.recurse(a,k);b.return_(k);b.state.inputs.push({name:d,isPure:a.isPure});a.watchId=c});this.state.computing="fn";this.stage="main";this.recurse(a);a='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+d+this.watchFns()+"return fn;";a=(new Function("$filter","getStringValue","ifDefined","plus",a))(this.$filter,
Cg,Dg,Fd);this.state=this.stage=void 0;return a},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;p(b,function(b){a.push("var "+b.name+"="+d.generateFunction(b.name,"s"));b.isPure&&a.push(b.name,".isPure="+JSON.stringify(b.isPure)+";")});b.length&&a.push("fn.inputs=["+b.map(function(a){return a.name}).join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;
p(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,d,c,e,f){var g,k,h=this,l,m,n;c=c||B;if(!f&&t(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case r.Program:p(a.body,
function(b,c){h.recurse(b.expression,void 0,void 0,function(a){k=a});c!==a.body.length-1?h.current().body.push(k,";"):h.return_(k)});break;case r.Literal:m=this.escape(a.value);this.assign(b,m);c(b||m);break;case r.UnaryExpression:this.recurse(a.argument,void 0,void 0,function(a){k=a});m=a.operator+"("+this.ifDefined(k,0)+")";this.assign(b,m);c(m);break;case r.BinaryExpression:this.recurse(a.left,void 0,void 0,function(a){g=a});this.recurse(a.right,void 0,void 0,function(a){k=a});m="+"===a.operator?
this.plus(g,k):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(k,0):"("+g+")"+a.operator+"("+k+")";this.assign(b,m);c(m);break;case r.LogicalExpression:b=b||this.nextId();h.recurse(a.left,b);h.if_("&&"===a.operator?b:h.not(b),h.lazyRecurse(a.right,b));c(b);break;case r.ConditionalExpression:b=b||this.nextId();h.recurse(a.test,b);h.if_(b,h.lazyRecurse(a.alternate,b),h.lazyRecurse(a.consequent,b));c(b);break;case r.Identifier:b=b||this.nextId();d&&(d.context="inputs"===h.stage?"s":this.assign(this.nextId(),
this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);h.if_("inputs"===h.stage||h.not(h.getHasOwnProperty("l",a.name)),function(){h.if_("inputs"===h.stage||"s",function(){e&&1!==e&&h.if_(h.isNull(h.nonComputedMember("s",a.name)),h.lazyAssign(h.nonComputedMember("s",a.name),"{}"));h.assign(b,h.nonComputedMember("s",a.name))})},b&&h.lazyAssign(b,h.nonComputedMember("l",a.name)));c(b);break;case r.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();h.recurse(a.object,
g,void 0,function(){h.if_(h.notNull(g),function(){a.computed?(k=h.nextId(),h.recurse(a.property,k),h.getStringValue(k),e&&1!==e&&h.if_(h.not(h.computedMember(g,k)),h.lazyAssign(h.computedMember(g,k),"{}")),m=h.computedMember(g,k),h.assign(b,m),d&&(d.computed=!0,d.name=k)):(e&&1!==e&&h.if_(h.isNull(h.nonComputedMember(g,a.property.name)),h.lazyAssign(h.nonComputedMember(g,a.property.name),"{}")),m=h.nonComputedMember(g,a.property.name),h.assign(b,m),d&&(d.computed=!1,d.name=a.property.name))},function(){h.assign(b,
"undefined")});c(b)},!!e);break;case r.CallExpression:b=b||this.nextId();a.filter?(k=h.filter(a.callee.name),l=[],p(a.arguments,function(a){var b=h.nextId();h.recurse(a,b);l.push(b)}),m=k+"("+l.join(",")+")",h.assign(b,m),c(b)):(k=h.nextId(),g={},l=[],h.recurse(a.callee,k,g,function(){h.if_(h.notNull(k),function(){p(a.arguments,function(b){h.recurse(b,a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m=g.name?h.member(g.context,g.name,g.computed)+"("+l.join(",")+")":k+"("+l.join(",")+
")";h.assign(b,m)},function(){h.assign(b,"undefined")});c(b)}));break;case r.AssignmentExpression:k=this.nextId();g={};this.recurse(a.left,void 0,g,function(){h.if_(h.notNull(g.context),function(){h.recurse(a.right,k);m=h.member(g.context,g.name,g.computed)+a.operator+k;h.assign(b,m);c(b||m)})},1);break;case r.ArrayExpression:l=[];p(a.elements,function(b){h.recurse(b,a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(b||m);break;case r.ObjectExpression:l=
[];n=!1;p(a.properties,function(a){a.computed&&(n=!0)});n?(b=b||this.nextId(),this.assign(b,"{}"),p(a.properties,function(a){a.computed?(g=h.nextId(),h.recurse(a.key,g)):g=a.key.type===r.Identifier?a.key.name:""+a.key.value;k=h.nextId();h.recurse(a.value,k);h.assign(h.member(b,g,a.computed),k)})):(p(a.properties,function(b){h.recurse(b.value,a.constant?void 0:h.nextId(),void 0,function(a){l.push(h.escape(b.key.type===r.Identifier?b.key.name:""+b.key.value)+":"+a)})}),m="{"+l.join(",")+"}",this.assign(b,
m));c(b||m);break;case r.ThisExpression:this.assign(b,"s");c(b||"s");break;case r.LocalsExpression:this.assign(b,"l");c(b||"l");break;case r.NGValueParameter:this.assign(b,"v"),c(b||"v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=
this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},isNull:function(a){return a+"==null"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,
b){var d=/[^$_a-zA-Z0-9]/g;return/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b)?a+"."+b:a+'["'+b.replace(d,this.stringEscapeFn)+'"]'},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},lazyRecurse:function(a,b,d,c,e,f){var g=this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,
stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(C(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(W(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw Xa("esc");},nextId:function(a,b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};
Ld.prototype={compile:function(a){var b=this;X(a,b.$filter);var d,c;if(d=Jd(a))c=this.recurse(d);d=Hd(a.body);var e;d&&(e=[],p(d,function(a,c){var d=b.recurse(a);d.isPure=a.isPure;a.input=d;e.push(d);a.watchId=c}));var f=[];p(a.body,function(a){f.push(b.recurse(a.expression))});a=0===a.body.length?B:1===a.body.length?f[0]:function(a,b){var c;p(f,function(d){c=d(a,b)});return c};c&&(a.assign=function(a,b,d){return c(a,d,b)});e&&(a.inputs=e);return a},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,
a.watchId);switch(a.type){case r.Literal:return this.value(a.value,b);case r.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case r.BinaryExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case r.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case r.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),
b);case r.Identifier:return f.identifier(a.name,b,d);case r.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d):this.nonComputedMember(c,e,b,d);case r.CallExpression:return g=[],p(a.arguments,function(a){g.push(f.recurse(a))}),a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var n=[],q=0;q<g.length;++q)n.push(g[q](a,c,
d,f));a=e.apply(void 0,n,f);return b?{context:void 0,name:void 0,value:a}:a}:function(a,c,d,f){var n=e(a,c,d,f),q;if(null!=n.value){q=[];for(var p=0;p<g.length;++p)q.push(g[p](a,c,d,f));q=n.value.apply(n.context,q)}return b?{value:q}:q};case r.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,f,g){var n=c(a,d,f,g);a=e(a,d,f,g);n.context[n.name]=a;return b?{value:a}:a};case r.ArrayExpression:return g=[],p(a.elements,function(a){g.push(f.recurse(a))}),function(a,
c,d,e){for(var f=[],q=0;q<g.length;++q)f.push(g[q](a,c,d,e));return b?{value:f}:f};case r.ObjectExpression:return g=[],p(a.properties,function(a){a.computed?g.push({key:f.recurse(a.key),computed:!0,value:f.recurse(a.value)}):g.push({key:a.key.type===r.Identifier?a.key.name:""+a.key.value,computed:!1,value:f.recurse(a.value)})}),function(a,c,d,e){for(var f={},q=0;q<g.length;++q)g[q].computed?f[g[q].key(a,c,d,e)]=g[q].value(a,c,d,e):f[g[q].key]=g[q].value(a,c,d,e);return b?{value:f}:f};case r.ThisExpression:return function(a){return b?
{value:a}:a};case r.LocalsExpression:return function(a,c){return b?{value:c}:c};case r.NGValueParameter:return function(a,c,d){return b?{value:d}:d}}},"unary+":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=t(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=t(d)?-d:-0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,
e,f,g);k=Fd(k,c);return d?{value:k}:k}},"binary-":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,e,f,g);k=(t(k)?k:0)-(t(c)?c:0);return d?{value:k}:k}},"binary*":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,
f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,
g,k){e=a(e,f,g,k)?b(e,f,g,k):d(e,f,g,k);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:void 0,name:void 0,value:a}:a}},identifier:function(a,b,d){return function(c,e,f,g){c=e&&a in e?e:c;d&&1!==d&&c&&null==c[a]&&(c[a]={});e=c?c[a]:void 0;return b?{context:c,name:a,value:e}:e}},computedMember:function(a,b,d,c){return function(e,f,g,k){var h=a(e,f,g,k),l,m;null!=h&&(l=b(e,f,g,k),l+="",c&&1!==c&&h&&!h[l]&&(h[l]={}),m=h[l]);return d?{context:h,name:l,value:m}:m}},nonComputedMember:function(a,
b,d,c){return function(e,f,g,k){e=a(e,f,g,k);c&&1!==c&&e&&null==e[b]&&(e[b]={});f=null!=e?e[b]:void 0;return d?{context:e,name:b,value:f}:f}},inputs:function(a,b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};xc.prototype={constructor:xc,parse:function(a){a=this.ast.ast(a);var b=this.astCompiler.compile(a);b.literal=0===a.body.length||1===a.body.length&&(a.body[0].expression.type===r.Literal||a.body[0].expression.type===r.ArrayExpression||a.body[0].expression.type===r.ObjectExpression);b.constant=
a.constant;return b}};var qa=K("$sce"),ka={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},Ac=/_([a-z])/g,Hg=K("$compile"),ea=x.document.createElement("a"),Pd=ua(x.location.href);Qd.$inject=["$document"];ed.$inject=["$provide"];var Xd=22,Wd=".",Cc="0";Rd.$inject=["$locale"];Td.$inject=["$locale"];var Sg={yyyy:$("FullYear",4,0,!1,!0),yy:$("FullYear",2,0,!0,!0),y:$("FullYear",1,0,!1,!0),MMMM:ob("Month"),MMM:ob("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),LLLL:ob("Month",!1,!0),
dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:ob("Day"),EEE:ob("Day",!0),a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Lb(Math[0<a?"floor":"ceil"](a/60),2)+Lb(Math.abs(a%60),2))},ww:Zd(2),w:Zd(1),G:Dc,GG:Dc,GGG:Dc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},
Rg=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/,Qg=/^-?\d+$/;Sd.$inject=["$locale"];var Lg=aa(N),Mg=aa(wb);Ud.$inject=["$parse"];var Ie=aa({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===la.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),xb={};p(Hb,function(a,b){function d(a,d,e){a.$watch(e[c],
function(a){e.$set(b,!!a)})}if("multiple"!==a){var c=Ea("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==e[c]&&d(a,b,e)});xb[c]=function(){return{restrict:"A",priority:100,link:e}}}});p(td,function(a,b){xb[b]=function(){return{priority:100,link:function(a,c,e){if("ngPattern"===b&&"/"===e.ngPattern.charAt(0)&&(c=e.ngPattern.match(Wg))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});p(["src","srcset","href"],function(a){var b=Ea("ng-"+a);xb[b]=
function(){return{priority:99,link:function(d,c,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===la.call(c.prop("href"))&&(g="xlinkHref",e.$attr[g]="xlink:href",f=null);e.$observe(b,function(b){b?(e.$set(g,b),Ba&&f&&c.prop(f,e[g])):"href"===a&&e.$set(g,null)})}}}});var Nb={$addControl:B,$$renameControl:function(a,b){a.$name=b},$removeControl:B,$setValidity:B,$setDirty:B,$setPristine:B,$setSubmitted:B};Mb.$inject=["$element","$attrs","$scope","$animate","$interpolate"];Mb.prototype={$rollbackViewValue:function(){p(this.$$controls,
function(a){a.$rollbackViewValue()})},$commitViewValue:function(){p(this.$$controls,function(a){a.$commitViewValue()})},$addControl:function(a){Oa(a.$name,"input");this.$$controls.push(a);a.$name&&(this[a.$name]=a);a.$$parentForm=this},$$renameControl:function(a,b){var d=a.$name;this[d]===a&&delete this[d];this[b]=a;a.$name=b},$removeControl:function(a){a.$name&&this[a.$name]===a&&delete this[a.$name];p(this.$pending,function(b,d){this.$setValidity(d,null,a)},this);p(this.$error,function(b,d){this.$setValidity(d,
null,a)},this);p(this.$$success,function(b,d){this.$setValidity(d,null,a)},this);cb(this.$$controls,a);a.$$parentForm=Nb},$setDirty:function(){this.$$animate.removeClass(this.$$element,Ya);this.$$animate.addClass(this.$$element,Sb);this.$dirty=!0;this.$pristine=!1;this.$$parentForm.$setDirty()},$setPristine:function(){this.$$animate.setClass(this.$$element,Ya,Sb+" ng-submitted");this.$dirty=!1;this.$pristine=!0;this.$submitted=!1;p(this.$$controls,function(a){a.$setPristine()})},$setUntouched:function(){p(this.$$controls,
function(a){a.$setUntouched()})},$setSubmitted:function(){this.$$animate.addClass(this.$$element,"ng-submitted");this.$submitted=!0;this.$$parentForm.$setSubmitted()}};be({clazz:Mb,set:function(a,b,d){var c=a[b];c?-1===c.indexOf(d)&&c.push(d):a[b]=[d]},unset:function(a,b,d){var c=a[b];c&&(cb(c,d),0===c.length&&delete a[b])}});var je=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||B}return{name:"form",restrict:a?"EAC":"E",require:["form",
"^^?form"],controller:Mb,compile:function(d,f){d.addClass(Ya).addClass(pb);var g=f.name?"name":a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var n=f[0];if(!("action"in e)){var q=function(b){a.$apply(function(){n.$commitViewValue();n.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",q);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",q)},0,!1)})}(f[1]||n.$$parentForm).$addControl(n);var p=g?c(n.$name):B;g&&(p(a,n),e.$observe(g,function(b){n.$name!==
b&&(p(a,void 0),n.$$parentForm.$$renameControl(n,b),p=c(n.$name),p(a,n))}));d.on("$destroy",function(){n.$$parentForm.$removeControl(n);p(a,void 0);O(n,Nb)})}}}}}]},Je=je(),Ve=je(!0),Tg=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,eh=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,fh=/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
Ug=/^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,ke=/^(\d{4,})-(\d{2})-(\d{2})$/,le=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Kc=/^(\d{4,})-W(\d\d)$/,me=/^(\d{4,})-(\d\d)$/,ne=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,de=R();p(["date","datetime-local","month","time","week"],function(a){de[a]=!0});var oe={text:function(a,b,d,c,e,f){Va(a,b,d,c,e,f);Fc(c)},date:qb("date",ke,Ob(ke,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":qb("datetimelocal",le,Ob(le,"yyyy MM dd HH mm ss sss".split(" ")),
"yyyy-MM-ddTHH:mm:ss.sss"),time:qb("time",ne,Ob(ne,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:qb("week",Kc,function(a,b){if(ia(a))return a;if(C(a)){Kc.lastIndex=0;var d=Kc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=0,k=0,h=Yd(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),k=b.getMilliseconds());return new Date(c,0,h.getDate()+e,d,f,g,k)}}return NaN},"yyyy-Www"),month:qb("month",me,Ob(me,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f){Gc(a,b,d,c);ee(c);Va(a,b,d,c,e,f);var g,
k;if(t(d.min)||d.ngMin)c.$validators.min=function(a){return c.$isEmpty(a)||v(g)||a>=g},d.$observe("min",function(a){g=Wa(a);c.$validate()});if(t(d.max)||d.ngMax)c.$validators.max=function(a){return c.$isEmpty(a)||v(k)||a<=k},d.$observe("max",function(a){k=Wa(a);c.$validate()});if(t(d.step)||d.ngStep){var h;c.$validators.step=function(a,b){return c.$isEmpty(b)||v(h)||fe(b,g||0,h)};d.$observe("step",function(a){h=Wa(a);c.$validate()})}},url:function(a,b,d,c,e,f){Va(a,b,d,c,e,f);Fc(c);c.$$parserName=
"url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||eh.test(d)}},email:function(a,b,d,c,e,f){Va(a,b,d,c,e,f);Fc(c);c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||fh.test(d)}},radio:function(a,b,d,c){var e=!d.ngTrim||"false"!==P(d.ngTrim);v(d.name)&&b.attr("name",++sb);b.on("click",function(a){var g;b[0].checked&&(g=d.value,e&&(g=P(g)),c.$setViewValue(g,a&&a.type))});c.$render=function(){var a=d.value;e&&(a=P(a));b[0].checked=a===c.$viewValue};
d.$observe("value",c.$render)},range:function(a,b,d,c,e,f){function g(a,c){b.attr(a,d[a]);d.$observe(a,c)}function k(a){n=Wa(a);ba(c.$modelValue)||(m?(a=b.val(),n>a&&(a=n,b.val(a)),c.$setViewValue(a)):c.$validate())}function h(a){q=Wa(a);ba(c.$modelValue)||(m?(a=b.val(),q<a&&(b.val(q),a=q<n?n:q),c.$setViewValue(a)):c.$validate())}function l(a){p=Wa(a);ba(c.$modelValue)||(m&&c.$viewValue!==b.val()?c.$setViewValue(b.val()):c.$validate())}Gc(a,b,d,c);ee(c);Va(a,b,d,c,e,f);var m=c.$$hasNativeValidators&&
"range"===b[0].type,n=m?0:void 0,q=m?100:void 0,p=m?1:void 0,r=b[0].validity;a=t(d.min);e=t(d.max);f=t(d.step);var w=c.$render;c.$render=m&&t(r.rangeUnderflow)&&t(r.rangeOverflow)?function(){w();c.$setViewValue(b.val())}:w;a&&(c.$validators.min=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||v(n)||b>=n},g("min",k));e&&(c.$validators.max=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||v(q)||b<=q},g("max",h));f&&(c.$validators.step=m?function(){return!r.stepMismatch}:function(a,
b){return c.$isEmpty(b)||v(p)||fe(b,n||0,p)},g("step",l))},checkbox:function(a,b,d,c,e,f,g,k){var h=ge(k,a,"ngTrueValue",d.ngTrueValue,!0),l=ge(k,a,"ngFalseValue",d.ngFalseValue,!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return sa(a,h)});c.$parsers.push(function(a){return a?h:l})},hidden:B,button:B,submit:B,reset:B,file:B},Zc=["$browser","$sniffer","$filter",
"$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,k){k[0]&&(oe[N(g.type)]||oe.text)(e,f,g,k[0],b,a,d,c)}}}}],gh=/^(true|false|\d+)$/,nf=function(){function a(a,d,c){var e=t(c)?c:9===Ba?"":null;a.prop("value",e);d.$set("value",c)}return{restrict:"A",priority:100,compile:function(b,d){return gh.test(d.ngValue)?function(b,d,f){b=b.$eval(f.ngValue);a(d,f,b)}:function(b,d,f){b.$watch(f.ngValue,function(b){a(d,f,b)})}}}},Ne=["$compile",function(a){return{restrict:"AC",
compile:function(b){a.$$addBindingClass(b);return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=cc(a)})}}}}],Pe=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=v(a)?"":a})}}}}],Oe=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,
e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(b){return a.valueOf(b)});d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){var d=f(b);c.html(a.getTrustedHtml(d)||"")})}}}}],mf=aa({restrict:"A",require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Qe=Ic("",!0),Se=Ic("Odd",0),Re=Ic("Even",1),Te=Ua({compile:function(a,b){b.$set("ngCloak",void 0);a.removeClass("ng-cloak")}}),Ue=[function(){return{restrict:"A",
scope:!0,controller:"@",priority:500}}],dd={},hh={blur:!0,focus:!0};p("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=Ea("ng-"+a);dd[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(e,f){var g=d(f[b]);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};hh[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var Xe=["$animate","$compile",
function(a,b){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(d,c,e,f,g){var k,h,l;d.$watch(e.ngIf,function(d){d?h||g(function(d,f){h=f;d[d.length++]=b.$$createComment("end ngIf",e.ngIf);k={clone:d};a.enter(d,c.parent(),c)}):(l&&(l.remove(),l=null),h&&(h.$destroy(),h=null),k&&(l=vb(k.clone),a.leave(l).done(function(a){!1!==a&&(l=null)}),k=null))})}}}],Ye=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,
terminal:!0,transclude:"element",controller:fa.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",k=e.autoscroll;return function(c,e,m,n,q){var p=0,r,w,u,A=function(){w&&(w.remove(),w=null);r&&(r.$destroy(),r=null);u&&(d.leave(u).done(function(a){!1!==a&&(w=null)}),w=u,u=null)};c.$watch(f,function(f){var m=function(a){!1===a||!t(k)||k&&!c.$eval(k)||b()},y=++p;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&y===p){var b=c.$new();n.template=a;a=q(b,function(a){A();d.enter(a,null,e).done(m)});
r=b;u=a;r.$emit("$includeContentLoaded",f);c.$eval(g)}},function(){c.$$destroyed||y!==p||(A(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(A(),n.template=null)})}}}}],pf=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(b,d,c,e){la.call(d[0]).match(/SVG/)?(d.empty(),a(fd(e.template,x.document).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],Ze=Ua({priority:450,compile:function(){return{pre:function(a,
b,d){a.$eval(d.ngInit)}}}}),lf=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=d.ngList||", ",f="false"!==d.ngTrim,g=f?P(e):e;c.$parsers.push(function(a){if(!v(a)){var b=[];a&&p(a.split(g),function(a){a&&b.push(f?P(a):a)});return b}});c.$formatters.push(function(a){if(I(a))return a.join(e)});c.$isEmpty=function(a){return!a||!a.length}}}},pb="ng-valid",ae="ng-invalid",Ya="ng-pristine",Sb="ng-dirty",rb=K("ngModel");Pb.$inject="$scope $exceptionHandler $attrs $element $parse $animate $timeout $q $interpolate".split(" ");
Pb.prototype={$$initGetterSetters:function(){if(this.$options.getOption("getterSetter")){var a=this.$$parse(this.$$attr.ngModel+"()"),b=this.$$parse(this.$$attr.ngModel+"($$$p)");this.$$ngModelGet=function(b){var c=this.$$parsedNgModel(b);E(c)&&(c=a(b));return c};this.$$ngModelSet=function(a,c){E(this.$$parsedNgModel(a))?b(a,{$$$p:c}):this.$$parsedNgModelAssign(a,c)}}else if(!this.$$parsedNgModel.assign)throw rb("nonassign",this.$$attr.ngModel,Aa(this.$$element));},$render:B,$isEmpty:function(a){return v(a)||
""===a||null===a||a!==a},$$updateEmptyClasses:function(a){this.$isEmpty(a)?(this.$$animate.removeClass(this.$$element,"ng-not-empty"),this.$$animate.addClass(this.$$element,"ng-empty")):(this.$$animate.removeClass(this.$$element,"ng-empty"),this.$$animate.addClass(this.$$element,"ng-not-empty"))},$setPristine:function(){this.$dirty=!1;this.$pristine=!0;this.$$animate.removeClass(this.$$element,Sb);this.$$animate.addClass(this.$$element,Ya)},$setDirty:function(){this.$dirty=!0;this.$pristine=!1;this.$$animate.removeClass(this.$$element,
Ya);this.$$animate.addClass(this.$$element,Sb);this.$$parentForm.$setDirty()},$setUntouched:function(){this.$touched=!1;this.$untouched=!0;this.$$animate.setClass(this.$$element,"ng-untouched","ng-touched")},$setTouched:function(){this.$touched=!0;this.$untouched=!1;this.$$animate.setClass(this.$$element,"ng-touched","ng-untouched")},$rollbackViewValue:function(){this.$$timeout.cancel(this.$$pendingDebounce);this.$viewValue=this.$$lastCommittedViewValue;this.$render()},$validate:function(){if(!ba(this.$modelValue)){var a=
this.$$lastCommittedViewValue,b=this.$$rawModelValue,d=this.$valid,c=this.$modelValue,e=this.$options.getOption("allowInvalid"),f=this;this.$$runValidators(b,a,function(a){e||d===a||(f.$modelValue=a?b:void 0,f.$modelValue!==c&&f.$$writeModelToScope())})}},$$runValidators:function(a,b,d){function c(){var c=!0;p(h.$validators,function(d,e){var g=Boolean(d(a,b));c=c&&g;f(e,g)});return c?!0:(p(h.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;p(h.$asyncValidators,function(e,
g){var h=e(a,b);if(!h||!E(h.then))throw rb("nopromise",h);f(g,void 0);c.push(h.then(function(){f(g,!0)},function(){d=!1;f(g,!1)}))});c.length?h.$$q.all(c).then(function(){g(d)},B):g(!0)}function f(a,b){k===h.$$currentValidationRunId&&h.$setValidity(a,b)}function g(a){k===h.$$currentValidationRunId&&d(a)}this.$$currentValidationRunId++;var k=this.$$currentValidationRunId,h=this;(function(){var a=h.$$parserName||"parse";if(v(h.$$parserValid))f(a,null);else return h.$$parserValid||(p(h.$validators,function(a,
b){f(b,null)}),p(h.$asyncValidators,function(a,b){f(b,null)})),f(a,h.$$parserValid),h.$$parserValid;return!0})()?c()?e():g(!1):g(!1)},$commitViewValue:function(){var a=this.$viewValue;this.$$timeout.cancel(this.$$pendingDebounce);if(this.$$lastCommittedViewValue!==a||""===a&&this.$$hasNativeValidators)this.$$updateEmptyClasses(a),this.$$lastCommittedViewValue=a,this.$pristine&&this.$setDirty(),this.$$parseAndValidate()},$$parseAndValidate:function(){var a=this.$$lastCommittedViewValue,b=this;if(this.$$parserValid=
v(a)?void 0:!0)for(var d=0;d<this.$parsers.length;d++)if(a=this.$parsers[d](a),v(a)){this.$$parserValid=!1;break}ba(this.$modelValue)&&(this.$modelValue=this.$$ngModelGet(this.$$scope));var c=this.$modelValue,e=this.$options.getOption("allowInvalid");this.$$rawModelValue=a;e&&(this.$modelValue=a,b.$modelValue!==c&&b.$$writeModelToScope());this.$$runValidators(a,this.$$lastCommittedViewValue,function(d){e||(b.$modelValue=d?a:void 0,b.$modelValue!==c&&b.$$writeModelToScope())})},$$writeModelToScope:function(){this.$$ngModelSet(this.$$scope,
this.$modelValue);p(this.$viewChangeListeners,function(a){try{a()}catch(b){this.$$exceptionHandler(b)}},this)},$setViewValue:function(a,b){this.$viewValue=a;this.$options.getOption("updateOnDefault")&&this.$$debounceViewValueCommit(b)},$$debounceViewValueCommit:function(a){var b=this.$options.getOption("debounce");W(b[a])?b=b[a]:W(b["default"])&&(b=b["default"]);this.$$timeout.cancel(this.$$pendingDebounce);var d=this;0<b?this.$$pendingDebounce=this.$$timeout(function(){d.$commitViewValue()},b):this.$$scope.$root.$$phase?
this.$commitViewValue():this.$$scope.$apply(function(){d.$commitViewValue()})},$overrideModelOptions:function(a){this.$options=this.$options.createChild(a)}};be({clazz:Pb,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]}});var kf=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Pb,priority:1,compile:function(b){b.addClass(Ya).addClass("ng-untouched").addClass(pb);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||g.$$parentForm;if(f=f[2])g.$options=
f.$options;g.$$initGetterSetters();b.$addControl(g);e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){function g(){k.$setTouched()}var k=f[0];if(k.$options.getOption("updateOn"))c.on(k.$options.getOption("updateOn"),function(a){k.$$debounceViewValueCommit(a&&a.type)});c.on("blur",function(){k.$touched||(a.$$phase?b.$evalAsync(g):b.$apply(g))})}}}}}],Qb,ih=/(\s+|^)default(\s+|$)/;Jc.prototype=
{getOption:function(a){return this.$$options[a]},createChild:function(a){var b=!1;a=O({},a);p(a,function(d,c){"$inherit"===d?"*"===c?b=!0:(a[c]=this.$$options[c],"updateOn"===c&&(a.updateOnDefault=this.$$options.updateOnDefault)):"updateOn"===c&&(a.updateOnDefault=!1,a[c]=P(d.replace(ih,function(){a.updateOnDefault=!0;return" "})))},this);b&&(delete a["*"],he(a,this.$$options));he(a,Qb.$$options);return new Jc(a)}};Qb=new Jc({updateOn:"",updateOnDefault:!0,debounce:0,getterSetter:!1,allowInvalid:!1,
timezone:null});var of=function(){function a(a,d){this.$$attrs=a;this.$$scope=d}a.$inject=["$attrs","$scope"];a.prototype={$onInit:function(){var a=this.parentCtrl?this.parentCtrl.$options:Qb,d=this.$$scope.$eval(this.$$attrs.ngModelOptions);this.$options=a.createChild(d)}};return{restrict:"A",priority:10,require:{parentCtrl:"?^^ngModelOptions"},bindToController:!0,controller:a}},$e=Ua({terminal:!0,priority:1E3}),jh=K("ngOptions"),kh=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
hf=["$compile","$document","$parse",function(a,b,d){function c(a,b,c){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function f(a){var b;if(!p&&oa(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var n=a.match(kh);if(!n)throw jh("iexp",a,Aa(b));var q=n[5]||n[7],p=n[6];a=/ as /.test(n[0])&&n[1];var r=n[9];b=d(n[2]?n[1]:q);var w=a&&d(a)||b,t=r&&d(r),A=r?function(a,b){return t(c,b)}:function(a){return Sa(a)},
v=function(a,b){return A(a,z(a,b))},s=d(n[2]||n[1]),y=d(n[3]||""),D=d(n[4]||""),H=d(n[8]),x={},z=p?function(a,b){x[p]=b;x[q]=a;return x}:function(a){x[q]=a;return x};return{trackBy:r,getTrackByValue:v,getWatchables:d(H,function(a){var b=[];a=a||[];for(var d=f(a),e=d.length,g=0;g<e;g++){var k=a===d?g:d[g],l=a[k],k=z(l,k),l=A(l,k);b.push(l);if(n[2]||n[1])l=s(c,k),b.push(l);n[4]&&(k=D(c,k),b.push(k))}return b}),getOptions:function(){for(var a=[],b={},d=H(c)||[],g=f(d),k=g.length,n=0;n<k;n++){var q=d===
g?n:g[n],p=z(d[q],q),t=w(c,p),q=A(t,p),u=s(c,p),F=y(c,p),p=D(c,p),t=new e(q,t,u,F,p);a.push(t);b[q]=t}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[v(a)]},getViewValueFromOption:function(a){return r?Ia(a.viewValue):a.viewValue}}}}}var e=x.document.createElement("option"),f=x.document.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=B},post:function(d,k,h,l){function m(a){var b=(a=A.getOptionFromViewValue(a))&&
a.element;b&&!b.selected&&(b.selected=!0);return a}function n(a,b){a.element=b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,b.textContent=a.label);b.value=a.selectValue}var q=l[0],r=l[1],v=h.multiple;l=0;for(var w=k.children(),u=w.length;l<u;l++)if(""===w[l].value){q.hasEmptyOption=!0;q.emptyOption=w.eq(l);break}k.empty();l=!!q.emptyOption;z(e.cloneNode(!1)).val("?");var A,x=c(h.ngOptions,k,d),s=b[0].createDocumentFragment();q.generateUnknownOptionValue=function(a){return"?"};v?(q.writeValue=
function(a){if(A){var b=a&&a.map(m)||[];A.items.forEach(function(a){a.element.selected&&-1===Array.prototype.indexOf.call(b,a)&&(a.element.selected=!1)})}},q.readValue=function(){var a=k.val()||[],b=[];p(a,function(a){(a=A.selectValueMap[a])&&!a.disabled&&b.push(A.getViewValueFromOption(a))});return b},x.trackBy&&d.$watchCollection(function(){if(I(r.$viewValue))return r.$viewValue.map(function(a){return x.getTrackByValue(a)})},function(){r.$render()})):(q.writeValue=function(a){if(A){var b=k[0].options[k[0].selectedIndex],
c=A.getOptionFromViewValue(a);b&&b.removeAttribute("selected");c?(k[0].value!==c.selectValue&&(q.removeUnknownOption(),k[0].value=c.selectValue,c.element.selected=!0),c.element.setAttribute("selected","selected")):q.selectUnknownOrEmptyOption(a)}},q.readValue=function(){var a=A.selectValueMap[k.val()];return a&&!a.disabled?(q.unselectEmptyOption(),q.removeUnknownOption(),A.getViewValueFromOption(a)):null},x.trackBy&&d.$watch(function(){return x.getTrackByValue(r.$viewValue)},function(){r.$render()}));
l&&(a(q.emptyOption)(d),k.prepend(q.emptyOption),8===q.emptyOption[0].nodeType?(q.hasEmptyOption=!1,q.registerOption=function(a,b){""===b.val()&&(q.hasEmptyOption=!0,q.emptyOption=b,q.emptyOption.removeClass("ng-scope"),r.$render(),b.on("$destroy",function(){var a=q.$isEmptyOptionSelected();q.hasEmptyOption=!1;q.emptyOption=void 0;a&&r.$render()}))}):q.emptyOption.removeClass("ng-scope"));d.$watchCollection(x.getWatchables,function(){var a=A&&q.readValue();if(A)for(var b=A.items.length-1;0<=b;b--){var c=
A.items[b];t(c.group)?Gb(c.element.parentNode):Gb(c.element)}A=x.getOptions();var d={};A.items.forEach(function(a){var b;if(t(a.group)){b=d[a.group];b||(b=f.cloneNode(!1),s.appendChild(b),b.label=null===a.group?"null":a.group,d[a.group]=b);var c=e.cloneNode(!1);b.appendChild(c);n(a,c)}else b=e.cloneNode(!1),s.appendChild(b),n(a,b)});k[0].appendChild(s);r.$render();r.$isEmpty(a)||(b=q.readValue(),(x.trackBy||v?sa(a,b):a===b)||(r.$setViewValue(b),r.$render()))})}}}}],af=["$locale","$interpolate","$log",
function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,k){function h(a){g.text(a||"")}var l=k.count,m=k.$attr.when&&g.attr(k.$attr.when),n=k.offset||0,q=f.$eval(m)||{},r={},t=b.startSymbol(),w=b.endSymbol(),u=t+l+"-"+n+w,A=fa.noop,x;p(k,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+N(c[2]),q[c]=g.attr(k.$attr[b]))});p(q,function(a,d){r[d]=b(a.replace(c,u))});f.$watch(l,function(b){var c=parseFloat(b),e=ba(c);e||c in q||(c=a.pluralCat(c-n));c===x||e&&ba(x)||(A(),e=r[c],v(e)?
(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),A=B,h()):A=f.$watch(e,h),x=c)})}}}],bf=["$parse","$animate","$compile",function(a,b,d){var c=K("ngRepeat"),e=function(a,b,c,d,e,m,n){a[c]=d;e&&(a[e]=m);a.$index=b;a.$first=0===b;a.$last=b===n-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var k=g.ngRepeat,h=d.$$createComment("end ngRepeat",k),l=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if(!l)throw c("iexp",k);var m=l[1],n=l[2],q=l[3],r=l[4],l=m.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);if(!l)throw c("iidexp",m);var t=l[3]||l[1],w=l[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(q)))throw c("badident",q);var u,v,x,s,y={$id:Sa};r?u=a(r):(x=function(a,b){return Sa(b)},s=function(a){return a});return function(a,d,f,g,l){u&&(v=function(b,c,d){w&&(y[w]=b);y[t]=c;y.$index=
d;return u(a,y)});var m=R();a.$watchCollection(n,function(f){var g,n,r=d[0],u,y=R(),F,z,E,B,G,C,I;q&&(a[q]=f);if(oa(f))G=f,n=v||x;else for(I in n=v||s,G=[],f)wa.call(f,I)&&"$"!==I.charAt(0)&&G.push(I);F=G.length;I=Array(F);for(g=0;g<F;g++)if(z=f===G?g:G[g],E=f[z],B=n(z,E,g),m[B])C=m[B],delete m[B],y[B]=C,I[g]=C;else{if(y[B])throw p(I,function(a){a&&a.scope&&(m[a.id]=a)}),c("dupes",k,B,E);I[g]={id:B,scope:void 0,clone:void 0};y[B]=!0}for(u in m){C=m[u];B=vb(C.clone);b.leave(B);if(B[0].parentNode)for(g=
0,n=B.length;g<n;g++)B[g].$$NG_REMOVED=!0;C.scope.$destroy()}for(g=0;g<F;g++)if(z=f===G?g:G[g],E=f[z],C=I[g],C.scope){u=r;do u=u.nextSibling;while(u&&u.$$NG_REMOVED);C.clone[0]!==u&&b.move(vb(C.clone),null,r);r=C.clone[C.clone.length-1];e(C.scope,g,t,E,w,z,F)}else l(function(a,c){C.scope=c;var d=h.cloneNode(!1);a[a.length++]=d;b.enter(a,null,r);r=d;C.clone=a;y[C.id]=C;e(C.scope,g,t,E,w,z,F)});m=y})}}}}],cf=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,
function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],We=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],df=Ua(function(a,b,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&p(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),ef=["$animate","$compile",function(a,b){return{require:"ngSwitch",controller:["$scope",function(){this.cases=
{}}],link:function(d,c,e,f){var g=[],k=[],h=[],l=[],m=function(a,b){return function(c){!1!==c&&a.splice(b,1)}};d.$watch(e.ngSwitch||e.on,function(c){for(var d,e;h.length;)a.cancel(h.pop());d=0;for(e=l.length;d<e;++d){var r=vb(k[d].clone);l[d].$destroy();(h[d]=a.leave(r)).done(m(h,d))}k.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&p(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.$$createComment("end ngSwitchWhen");k.push({clone:d});a.enter(d,f.parent(),
f)})})})}}}],ff=Ua({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){a=d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function(a,b,c){return c[b-1]!==a});p(a,function(a){c.cases["!"+a]=c.cases["!"+a]||[];c.cases["!"+a].push({transclude:e,element:b})})}}),gf=Ua({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),lh=K("ngTransclude"),
jf=["$compile",function(a){return{restrict:"EAC",terminal:!0,compile:function(b){var d=a(b.contents());b.empty();return function(a,b,f,g,k){function h(){d(a,function(a){b.append(a)})}if(!k)throw lh("orphan",Aa(b));f.ngTransclude===f.$attr.ngTransclude&&(f.ngTransclude="");f=f.ngTransclude||f.ngTranscludeSlot;k(function(a,c){var d;if(d=a.length)a:{d=0;for(var f=a.length;d<f;d++){var g=a[d];if(g.nodeType!==Ma||g.nodeValue.trim()){d=!0;break a}}d=void 0}d?b.append(a):(h(),c.$destroy())},null,f);f&&!k.isSlotFilled(f)&&
h()}}}}],Ke=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"===d.type&&a.put(d.id,b[0].text)}}}],mh={$setViewValue:B,$render:B},nh=["$element","$scope",function(a,b){function d(){g||(g=!0,b.$$postDigest(function(){g=!1;e.ngModelCtrl.$render()}))}function c(a){k||(k=!0,b.$$postDigest(function(){b.$$destroyed||(k=!1,e.ngModelCtrl.$setViewValue(e.readValue()),a&&e.ngModelCtrl.$render())}))}var e=this,f=new Ib;e.selectValueMap={};e.ngModelCtrl=mh;
e.multiple=!1;e.unknownOption=z(x.document.createElement("option"));e.hasEmptyOption=!1;e.emptyOption=void 0;e.renderUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);a.prepend(e.unknownOption);Ha(e.unknownOption,!0);a.val(b)};e.updateUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);Ha(e.unknownOption,!0);a.val(b)};e.generateUnknownOptionValue=function(a){return"? "+Sa(a)+" ?"};e.removeUnknownOption=function(){e.unknownOption.parent()&&
e.unknownOption.remove()};e.selectEmptyOption=function(){e.emptyOption&&(a.val(""),Ha(e.emptyOption,!0))};e.unselectEmptyOption=function(){e.hasEmptyOption&&Ha(e.emptyOption,!1)};b.$on("$destroy",function(){e.renderUnknownOption=B});e.readValue=function(){var b=a.val(),b=b in e.selectValueMap?e.selectValueMap[b]:b;return e.hasOption(b)?b:null};e.writeValue=function(b){var c=a[0].options[a[0].selectedIndex];c&&Ha(z(c),!1);e.hasOption(b)?(e.removeUnknownOption(),c=Sa(b),a.val(c in e.selectValueMap?
c:b),Ha(z(a[0].options[a[0].selectedIndex]),!0)):e.selectUnknownOrEmptyOption(b)};e.addOption=function(a,b){if(8!==b[0].nodeType){Oa(a,'"option value"');""===a&&(e.hasEmptyOption=!0,e.emptyOption=b);var c=f.get(a)||0;f.set(a,c+1);d()}};e.removeOption=function(a){var b=f.get(a);b&&(1===b?(f.delete(a),""===a&&(e.hasEmptyOption=!1,e.emptyOption=void 0)):f.set(a,b-1))};e.hasOption=function(a){return!!f.get(a)};e.$hasEmptyOption=function(){return e.hasEmptyOption};e.$isUnknownOptionSelected=function(){return a[0].options[0]===
e.unknownOption[0]};e.$isEmptyOptionSelected=function(){return e.hasEmptyOption&&a[0].options[a[0].selectedIndex]===e.emptyOption[0]};e.selectUnknownOrEmptyOption=function(a){null==a&&e.emptyOption?(e.removeUnknownOption(),e.selectEmptyOption()):e.unknownOption.parent().length?e.updateUnknownOption(a):e.renderUnknownOption(a)};var g=!1,k=!1;e.registerOption=function(a,b,f,g,k){if(f.$attr.ngValue){var p,r=NaN;f.$observe("value",function(a){var d,f=b.prop("selected");t(r)&&(e.removeOption(p),delete e.selectValueMap[r],
d=!0);r=Sa(a);p=a;e.selectValueMap[r]=a;e.addOption(a,b);b.attr("value",r);d&&f&&c()})}else g?f.$observe("value",function(a){e.readValue();var d,f=b.prop("selected");t(p)&&(e.removeOption(p),d=!0);p=a;e.addOption(a,b);d&&f&&c()}):k?a.$watch(k,function(a,d){f.$set("value",a);var g=b.prop("selected");d!==a&&e.removeOption(d);e.addOption(a,b);d&&g&&c()}):e.addOption(f.value,b);f.$observe("disabled",function(a){if("true"===a||a&&b.prop("selected"))e.multiple?c(!0):(e.ngModelCtrl.$setViewValue(null),e.ngModelCtrl.$render())});
b.on("$destroy",function(){var a=e.readValue(),b=f.value;e.removeOption(b);d();(e.multiple&&a&&-1!==a.indexOf(b)||a===b)&&c(!0)})}}],Le=function(){return{restrict:"E",require:["select","?ngModel"],controller:nh,priority:1,link:{pre:function(a,b,d,c){var e=c[0],f=c[1];if(f){if(e.ngModelCtrl=f,b.on("change",function(){e.removeUnknownOption();a.$apply(function(){f.$setViewValue(e.readValue())})}),d.multiple){e.multiple=!0;e.readValue=function(){var a=[];p(b.find("option"),function(b){b.selected&&!b.disabled&&
(b=b.value,a.push(b in e.selectValueMap?e.selectValueMap[b]:b))});return a};e.writeValue=function(a){p(b.find("option"),function(b){var c=!!a&&(-1!==Array.prototype.indexOf.call(a,b.value)||-1!==Array.prototype.indexOf.call(a,e.selectValueMap[b.value]));c!==b.selected&&Ha(z(b),c)})};var g,k=NaN;a.$watch(function(){k!==f.$viewValue||sa(g,f.$viewValue)||(g=ra(f.$viewValue),f.$render());k=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}else e.registerOption=B},post:function(a,b,d,c){var e=
c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},Me=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){var c,e;t(d.ngValue)||(t(d.value)?c=a(d.value,!0):(e=a(b.text(),!0))||d.$set("value",b.text()));return function(a,b,d){var h=b.parent();(h=h.data("$selectController")||h.parent().data("$selectController"))&&h.registerOption(a,b,d,c,e)}}}}],ad=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=
function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",function(){c.$validate()}))}}},$c=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e,f=d.ngPattern||d.pattern;d.$observe("pattern",function(a){C(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw K("ngPattern")("noregexp",f,a,Aa(b));e=a||void 0;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||v(e)||e.test(b)}}}}},cd=function(){return{restrict:"A",require:"?ngModel",
link:function(a,b,d,c){if(c){var e=-1;d.$observe("maxlength",function(a){a=Q(a);e=ba(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>e||c.$isEmpty(b)||b.length<=e}}}}},bd=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=0;d.$observe("minlength",function(a){e=Q(a)||0;c.$validate()});c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=e}}}}};x.angular.bootstrap?x.console&&console.log("WARNING: Tried to load angular more than once."):
(Ce(),Fe(fa),fa.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,
minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,c){var e=a|0,f=c;void 0===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),z(function(){xe(x.document,Uc)}))})(window);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.8.7 - 2016-07-26T16:01:23.393Z
 * License: MIT
 */
!function(){"use strict";angular.module("ui.mask",[]).value("uiMaskConfig",{maskDefinitions:{9:/\d/,A:/[a-zA-Z]/,"*":/[a-zA-Z0-9]/},clearOnBlur:!0,clearOnBlurPlaceholder:!1,escChar:"\\",eventsToHandle:["input","keyup","click","focus"],addDefaultPlaceholder:!0,allowInvalidValue:!1}).provider("uiMask.Config",function(){var e={};this.maskDefinitions=function(n){return e.maskDefinitions=n},this.clearOnBlur=function(n){return e.clearOnBlur=n},this.clearOnBlurPlaceholder=function(n){return e.clearOnBlurPlaceholder=n},this.eventsToHandle=function(n){return e.eventsToHandle=n},this.addDefaultPlaceholder=function(n){return e.addDefaultPlaceholder=n},this.allowInvalidValue=function(n){return e.allowInvalidValue=n},this.$get=["uiMaskConfig",function(n){var t=n;for(var a in e)angular.isObject(e[a])&&!angular.isArray(e[a])?angular.extend(t[a],e[a]):t[a]=e[a];return t}]}).directive("uiMask",["uiMask.Config",function(e){function n(e){return e===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(e.type||e.href||~e.tabIndex)}return{priority:100,require:"ngModel",restrict:"A",compile:function(){var t=angular.copy(e);return function(e,a,i,r){function l(e){return angular.isDefined(e)?(w(e),L?(h(),d(),!0):f()):f()}function u(e){e&&(B=e,!L||0===a.val().length&&angular.isDefined(i.placeholder)||a.val(m(p(a.val()))))}function o(){return l(i.uiMask)}function c(e){return L?(j=p(e||""),R=g(j),r.$setValidity("mask",R),j.length&&(R||Q.allowInvalidValue)?m(j):void 0):e}function s(e){return L?(j=p(e||""),R=g(j),r.$viewValue=j.length?m(j):"",r.$setValidity("mask",R),R||Q.allowInvalidValue?J?r.$viewValue:j:void 0):e}function f(){return L=!1,v(),angular.isDefined(q)?a.attr("placeholder",q):a.removeAttr("placeholder"),angular.isDefined(W)?a.attr("maxlength",W):a.removeAttr("maxlength"),a.val(r.$modelValue),r.$viewValue=r.$modelValue,!1}function h(){j=F=p(r.$modelValue||""),H=_=m(j),R=g(j),i.maxlength&&a.attr("maxlength",2*S[S.length-1]),!q&&Q.addDefaultPlaceholder&&a.attr("placeholder",B);for(var e=r.$modelValue,n=r.$formatters.length;n--;)e=r.$formatters[n](e);r.$viewValue=e||"",r.$render()}function d(){Z||(a.bind("blur",$),a.bind("mousedown mouseup",V),a.bind("keydown",E),a.bind(Q.eventsToHandle.join(" "),O),Z=!0)}function v(){Z&&(a.unbind("blur",$),a.unbind("mousedown",V),a.unbind("mouseup",V),a.unbind("keydown",E),a.unbind("input",O),a.unbind("keyup",O),a.unbind("click",O),a.unbind("focus",O),Z=!1)}function g(e){return e.length?e.length>=T:!0}function p(e){var n,t,i="",r=a[0],l=A.slice(),u=N,o=u+C(r),c="";return e=e.toString(),n=0,t=e.length-B.length,angular.forEach(I,function(a){var i=a.position;i>=u&&o>i||(i>=u&&(i+=t),e.substring(i,i+a.value.length)===a.value&&(c+=e.slice(n,i),n=i+a.value.length))}),e=c+e.slice(n),angular.forEach(e.split(""),function(e){l.length&&l[0].test(e)&&(i+=e,l.shift())}),i}function m(e){var n="",t=S.slice();return angular.forEach(B.split(""),function(a,i){e.length&&i===t[0]?(n+=e.charAt(0)||"_",e=e.substr(1),t.shift()):n+=a}),n}function b(e){var n,t=angular.isDefined(i.uiMaskPlaceholder)?i.uiMaskPlaceholder:i.placeholder;return angular.isDefined(t)&&t[e]?t[e]:(n=angular.isDefined(i.uiMaskPlaceholderChar)&&i.uiMaskPlaceholderChar?i.uiMaskPlaceholderChar:"_","space"===n.toLowerCase()?" ":n[0])}function k(){var e,n,t=B.split("");S&&!isNaN(S[0])&&angular.forEach(S,function(e){t[e]="_"}),e=t.join(""),n=e.replace(/[_]+/g,"_").split("_"),n=n.filter(function(e){return""!==e});var a=0;return n.map(function(n){var t=e.indexOf(n,a);return a=t+1,{value:n,position:t}})}function w(e){var n=0;if(S=[],A=[],B="",angular.isString(e)){T=0;var t=!1,a=0,i=e.split(""),r=!1;angular.forEach(i,function(e,i){r?(r=!1,B+=e,n++):Q.escChar===e?r=!0:Q.maskDefinitions[e]?(S.push(n),B+=b(i-a),A.push(Q.maskDefinitions[e]),n++,t||T++,t=!1):"?"===e?(t=!0,a++):(B+=e,n++)})}S.push(S.slice().pop()+1),I=k(),L=S.length>1?!0:!1}function $(){if((Q.clearOnBlur||Q.clearOnBlurPlaceholder&&0===j.length&&i.placeholder)&&(N=0,z=0,R&&0!==j.length||(H="",a.val(""),e.$apply(function(){r.$pristine||r.$setViewValue("")}))),j!==U){var n=a.val(),t=""===j&&n&&angular.isDefined(i.uiMaskPlaceholderChar)&&"space"===i.uiMaskPlaceholderChar;t&&a.val(""),y(a[0]),t&&a.val(n)}U=j}function y(e){var n;angular.isFunction(window.Event)&&!e.fireEvent?(n=new Event("change",{view:window,bubbles:!0,cancelable:!1}),e.dispatchEvent(n)):"createEvent"in document?(n=document.createEvent("HTMLEvents"),n.initEvent("change",!1,!0),e.dispatchEvent(n)):e.fireEvent&&e.fireEvent("onchange")}function V(e){"mousedown"===e.type?a.bind("mouseout",M):a.unbind("mouseout",M)}function M(){z=C(this),a.unbind("mouseout",M)}function E(e){var n=8===e.which,t=P(this)-1||0,i=90===e.which&&e.ctrlKey;if(n){for(;t>=0;){if(D(t)){x(this,t+1);break}t--}K=-1===t}i&&(a.val(""),e.preventDefault())}function O(n){n=n||{};var t=n.which,i=n.type;if(16!==t&&91!==t){var l,u=a.val(),o=_,c=!1,s=p(u),f=F,h=P(this)||0,d=N||0,v=h-d,g=S[0],b=S[s.length]||S.slice().shift(),k=z||0,w=C(this)>0,$=k>0,y=u.length>o.length||k&&u.length>o.length-k,V=u.length<o.length||k&&u.length===o.length-k,M=t>=37&&40>=t&&n.shiftKey,E=37===t,O=8===t||"keyup"!==i&&V&&-1===v,A=46===t||"keyup"!==i&&V&&0===v&&!$,I=(E||O||"click"===i)&&h>g;if(z=C(this),!M&&(!w||"click"!==i&&"keyup"!==i&&"focus"!==i)){if(O&&K)return a.val(B),e.$apply(function(){r.$setViewValue("")}),void x(this,d);if("input"===i&&V&&!$&&s===f){for(;O&&h>g&&!D(h);)h--;for(;A&&b>h&&-1===S.indexOf(h);)h++;var T=S.indexOf(h);s=s.substring(0,T)+s.substring(T+1),s!==f&&(c=!0)}for(l=m(s),_=l,F=s,!c&&u.length>l.length&&(c=!0),a.val(l),c&&e.$apply(function(){r.$setViewValue(l)}),y&&g>=h&&(h=g+1),I&&h--,h=h>b?b:g>h?g:h;!D(h)&&h>g&&b>h;)h+=I?-1:1;(I&&b>h||y&&!D(d))&&h++,N=h,x(this,h)}}}function D(e){return S.indexOf(e)>-1}function P(e){if(!e)return 0;if(void 0!==e.selectionStart)return e.selectionStart;if(document.selection&&n(a[0])){e.focus();var t=document.selection.createRange();return t.moveStart("character",e.value?-e.value.length:0),t.text.length}return 0}function x(e,t){if(!e)return 0;if(0!==e.offsetWidth&&0!==e.offsetHeight)if(e.setSelectionRange)n(a[0])&&(e.focus(),e.setSelectionRange(t,t));else if(e.createTextRange){var i=e.createTextRange();i.collapse(!0),i.moveEnd("character",t),i.moveStart("character",t),i.select()}}function C(e){return e?void 0!==e.selectionStart?e.selectionEnd-e.selectionStart:window.getSelection?window.getSelection().toString().length:document.selection?document.selection.createRange().text.length:0:0}var S,A,B,I,T,j,H,R,_,F,N,z,K,L=!1,Z=!1,q=i.placeholder,W=i.maxlength,G=r.$isEmpty;r.$isEmpty=function(e){return G(L?p(e||""):e)};var J=!1;i.$observe("modelViewValue",function(e){"true"===e&&(J=!0)}),i.$observe("allowInvalidValue",function(e){Q.allowInvalidValue=""===e?!0:!!e,c(r.$modelValue)});var Q={};i.uiOptions?(Q=e.$eval("["+i.uiOptions+"]"),Q=angular.isObject(Q[0])?function(e,n){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(void 0===n[t]?n[t]=angular.copy(e[t]):angular.isObject(n[t])&&!angular.isArray(n[t])&&(n[t]=angular.extend({},e[t],n[t])));return n}(t,Q[0]):t):Q=t,i.$observe("uiMask",l),angular.isDefined(i.uiMaskPlaceholder)?i.$observe("uiMaskPlaceholder",u):i.$observe("placeholder",u),angular.isDefined(i.uiMaskPlaceholderChar)&&i.$observe("uiMaskPlaceholderChar",o),r.$formatters.unshift(c),r.$parsers.unshift(s);var U=a.val();a.bind("mousedown mouseup",V),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var n=Object(this),t=n.length>>>0;if(0===t)return-1;var a=0;if(arguments.length>1&&(a=Number(arguments[1]),a!==a?a=0:0!==a&&a!==1/0&&a!==-(1/0)&&(a=(a>0||-1)*Math.floor(Math.abs(a)))),a>=t)return-1;for(var i=a>=0?a:Math.max(t-Math.abs(a),0);t>i;i++)if(i in n&&n[i]===e)return i;return-1})}}}}])}();
/*
 AngularJS v1.6.5
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(x,p){'use strict';function s(f,k){var e=!1,a=!1;this.ngClickOverrideEnabled=function(b){return p.isDefined(b)?(b&&!a&&(a=!0,t.$$moduleName="ngTouch",k.directive("ngClick",t),f.decorator("ngClickDirective",["$delegate",function(a){if(e)a.shift();else for(var b=a.length-1;0<=b;){if("ngTouch"===a[b].$$moduleName){a.splice(b,1);break}b--}return a}])),e=b,this):e};this.$get=function(){return{ngClickOverrideEnabled:function(){return e}}}}function v(f,k,e){n.directive(f,["$parse","$swipe",function(a,
b){return function(l,u,g){function h(c){if(!d)return!1;var a=Math.abs(c.y-d.y);c=(c.x-d.x)*k;return r&&75>a&&0<c&&30<c&&.3>a/c}var m=a(g[f]),d,r,c=["touch"];p.isDefined(g.ngSwipeDisableMouse)||c.push("mouse");b.bind(u,{start:function(c,a){d=c;r=!0},cancel:function(c){r=!1},end:function(c,d){h(c)&&l.$apply(function(){u.triggerHandler(e);m(l,{$event:d})})}},c)}}])}var n=p.module("ngTouch",[]);n.info({angularVersion:"1.6.5"});n.provider("$touch",s);s.$inject=["$provide","$compileProvider"];n.factory("$swipe",
[function(){function f(a){a=a.originalEvent||a;var b=a.touches&&a.touches.length?a.touches:[a];a=a.changedTouches&&a.changedTouches[0]||b[0];return{x:a.clientX,y:a.clientY}}function k(a,b){var l=[];p.forEach(a,function(a){(a=e[a][b])&&l.push(a)});return l.join(" ")}var e={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"},pointer:{start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel"}};return{bind:function(a,
b,l){var e,g,h,m,d=!1;l=l||["mouse","touch","pointer"];a.on(k(l,"start"),function(c){h=f(c);d=!0;g=e=0;m=h;b.start&&b.start(h,c)});var r=k(l,"cancel");if(r)a.on(r,function(c){d=!1;b.cancel&&b.cancel(c)});a.on(k(l,"move"),function(c){if(d&&h){var a=f(c);e+=Math.abs(a.x-m.x);g+=Math.abs(a.y-m.y);m=a;10>e&&10>g||(g>e?(d=!1,b.cancel&&b.cancel(c)):(c.preventDefault(),b.move&&b.move(a,c)))}});a.on(k(l,"end"),function(c){d&&(d=!1,b.end&&b.end(f(c),c))})}}}]);var t=["$parse","$timeout","$rootElement",function(f,
k,e){function a(a,d,b){for(var c=0;c<a.length;c+=2){var g=a[c+1],e=b;if(25>Math.abs(a[c]-d)&&25>Math.abs(g-e))return a.splice(c,c+2),!0}return!1}function b(b){if(!(2500<Date.now()-u)){var d=b.touches&&b.touches.length?b.touches:[b],e=d[0].clientX,d=d[0].clientY;if(!(1>e&&1>d||h&&h[0]===e&&h[1]===d)){h&&(h=null);var c=b.target;"label"===p.lowercase(c.nodeName||c[0]&&c[0].nodeName)&&(h=[e,d]);a(g,e,d)||(b.stopPropagation(),b.preventDefault(),b.target&&b.target.blur&&b.target.blur())}}}function l(a){a=
a.touches&&a.touches.length?a.touches:[a];var b=a[0].clientX,e=a[0].clientY;g.push(b,e);k(function(){for(var a=0;a<g.length;a+=2)if(g[a]===b&&g[a+1]===e){g.splice(a,a+2);break}},2500,!1)}var u,g,h;return function(h,d,k){var c=f(k.ngClick),n=!1,q,s,t,v;d.on("touchstart",function(a){n=!0;q=a.target?a.target:a.srcElement;3===q.nodeType&&(q=q.parentNode);d.addClass("ng-click-active");s=Date.now();a=a.originalEvent||a;a=(a.touches&&a.touches.length?a.touches:[a])[0];t=a.clientX;v=a.clientY});d.on("touchcancel",
function(a){n=!1;d.removeClass("ng-click-active")});d.on("touchend",function(c){var h=Date.now()-s,f=c.originalEvent||c,m=(f.changedTouches&&f.changedTouches.length?f.changedTouches:f.touches&&f.touches.length?f.touches:[f])[0],f=m.clientX,m=m.clientY,w=Math.sqrt(Math.pow(f-t,2)+Math.pow(m-v,2));n&&750>h&&12>w&&(g||(e[0].addEventListener("click",b,!0),e[0].addEventListener("touchstart",l,!0),g=[]),u=Date.now(),a(g,f,m),q&&q.blur(),p.isDefined(k.disabled)&&!1!==k.disabled||d.triggerHandler("click",
[c]));n=!1;d.removeClass("ng-click-active")});d.onclick=function(a){};d.on("click",function(a,b){h.$apply(function(){c(h,{$event:b||a})})});d.on("mousedown",function(a){d.addClass("ng-click-active")});d.on("mousemove mouseup",function(a){d.removeClass("ng-click-active")})}}];v("ngSwipeLeft",-1,"swipeleft");v("ngSwipeRight",1,"swiperight")})(window,window.angular);
//# sourceMappingURL=angular-touch.min.js.map

angular.module("ivpusic.cookie",["ipCookie"]),angular.module("ipCookie",["ng"]).factory("ipCookie",["$document",function(e){"use strict";function i(e){try{return decodeURIComponent(e)}catch(i){}}return function(){function t(t,n,r){var o,s,p,u,a,c,d,x,f;r=r||{};var g=r.decode||i,l=r.encode||encodeURIComponent;if(void 0!==n)return n="object"==typeof n?JSON.stringify(n):n+"","number"==typeof r.expires&&(f=r.expires,r.expires=new Date,-1===f?r.expires=new Date("Thu, 01 Jan 1970 00:00:00 GMT"):void 0!==r.expirationUnit?"hours"===r.expirationUnit?r.expires.setHours(r.expires.getHours()+f):"minutes"===r.expirationUnit?r.expires.setMinutes(r.expires.getMinutes()+f):"seconds"===r.expirationUnit?r.expires.setSeconds(r.expires.getSeconds()+f):"milliseconds"===r.expirationUnit?r.expires.setMilliseconds(r.expires.getMilliseconds()+f):r.expires.setDate(r.expires.getDate()+f):r.expires.setDate(r.expires.getDate()+f)),e[0].cookie=[l(t),"=",l(n),r.expires?"; expires="+r.expires.toUTCString():"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join("");for(s=[],x=e[0].cookie,x&&(s=x.split("; ")),o={},d=!1,p=0;s.length>p;++p)if(s[p]){if(u=s[p],a=u.indexOf("="),c=u.substring(0,a),n=g(u.substring(a+1)),angular.isUndefined(n))continue;if(void 0===t||t===c){try{o[c]=JSON.parse(n)}catch(m){o[c]=n}if(t===c)return o[c];d=!0}}return d&&void 0===t?o:void 0}return t.remove=function(e,i){var n=void 0!==t(e);return n&&(i||(i={}),i.expires=-1,t(e,"",i)),n},t}()}]);
/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    angular.module(moduleName, [])
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider)
        .run(['$templateCache',dirPaginationControlsTemplateInstaller]);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            priority: 100,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs){

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/v1.4.x/src/ng/directive/ngRepeat.js#L339
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:\s*(.*\(\s*\w*\)|([^\)]*?(?=\s+as\s+))|[^\)]*)/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs){

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                
                // (TODO: this seems sound, but I'm reverting as many bug reports followed it's introduction in 0.11.0.
                // Needs more investigation.)
                // In case rawId != paginationId we deregister using rawId for the sake of general cleanliness
                // before registering using paginationId
                // paginationService.deregisterInstance(rawId);
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled =  $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function() {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    paginationService.setAsyncModeFalse(paginationId);
                    scope.$watchCollection(function() {
                        return collectionGetter(scope);
                    }, function(collection) {
                        if (collection) {
                            var collectionLength = (collection instanceof Array) ? collection.length : Object.keys(collection).length;
                            paginationService.setCollectionLength(paginationId, collectionLength);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);
                 
                // (TODO: Reverting this due to many bug reports in v 0.11.0. Needs investigation as the
                // principle is sound)
                // When the scope is destroyed, we make sure to remove the reference to it in paginationService
                // so that it can be properly garbage collected
                // scope.$on('$destroy', function destroyDirPagination() {
                //     paginationService.deregisterInstance(paginationId);
                // });
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:\s*[^|\s]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // If the current-page attribute was not set, we'll make our own.
                // Replace any non-alphanumeric characters which might confuse
                // the $parse service and give unexpected results.
                // See https://github.com/michaelbromley/angularUtils/issues/233
                var defaultCurrentPage = (paginationId + '__currentPage').replace(/\W/g, '_');
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsTemplateInstaller($templateCache) {
        $templateCache.put('angularUtils.directives.dirPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        var DDO = {
            restrict: 'AE',
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?',
                autoHide: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        // We need to check the paginationTemplate service to see whether a template path or
        // string has been specified, and add the `template` or `templateUrl` property to
        // the DDO as appropriate. The order of priority to decide which template to use is
        // (highest priority first):
        // 1. paginationTemplate.getString()
        // 2. attrs.templateUrl
        // 3. paginationTemplate.getPath()
        var templateString = paginationTemplate.getString();
        if (templateString !== undefined) {
            DDO.template = templateString;
        } else {
            DDO.templateUrl = function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            };
        }
        return DDO;

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId ||  DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                if (window.console) {
                    console.warn('Pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive, which was not found at link time.');
                }
            }

            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.autoHide = scope.autoHide === undefined ? true : scope.autoHide;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch('maxSize', function(val) {
                if (val) {
                    paginationRange = Math.max(scope.maxSize, 5);
                    generatePagination();
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }
            }, function(length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getItemsPerPage(paginationId));
                }
            }, function(current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return paginationService.getCurrentPage(paginationId);
                }
            }, function(currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    num = parseInt(num, 10);
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            /**
             * Custom "track by" function which allows for duplicate "..." entries on long lists,
             * yet fixes the problem of wrongly-highlighted links which happens when using
             * "track by $index" - see https://github.com/michaelbromley/angularUtils/issues/153
             * @param id
             * @param index
             * @returns {string}
             */
            scope.tracker = function(id, index) {
                return id + '_' + index;
            };

            function goToPage(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    var oldPageNumber = scope.pagination.current;

                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as the first argument
                    // and the previous page number as a second argument
                    if (scope.onPageChange) {
                        scope.onPageChange({
                            newPageNumber : num,
                            oldPageNumber : oldPageNumber
                        });
                    }
                }
            }

            function generatePagination() {
                if (paginationService.isRegistered(paginationId)) {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;
                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                if (paginationService.isRegistered(paginationId)) {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }
            }
            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (angular.isObject(collection)) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                if (collection instanceof Array) {
                    // the array just needs to be sliced
                    return collection.slice(start, end);
                } else {
                    // in the case of an object, we need to get an array of keys, slice that, then map back to
                    // the original object.
                    var slicedObject = {};
                    angular.forEach(keys(collection).slice(start, end), function(key) {
                        slicedObject[key] = collection[key];
                    });
                    return slicedObject;
                }
            } else {
                return collection;
            }
        };
    }

    /**
     * Shim for the Object.keys() method which does not exist in IE < 9
     * @param obj
     * @returns {Array}
     */
    function keys(obj) {
        if (!Object.keys) {
            var objKeys = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    objKeys.push(i);
                }
            }
            return objKeys;
        } else {
            return Object.keys(obj);
        }
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.deregisterInstance = function(instanceId) {
            delete instances[instanceId];
        };
        
        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.setAsyncModeFalse = function(instanceId) {
            instances[instanceId].asyncMode = false;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'angularUtils.directives.dirPagination.template';
        var templateString;

        /**
         * Set a templateUrl to be used by all instances of <dir-pagination-controls>
         * @param {String} path
         */
        this.setPath = function(path) {
            templatePath = path;
        };

        /**
         * Set a string of HTML to be used as a template by all instances
         * of <dir-pagination-controls>. If both a path *and* a string have been set,
         * the string takes precedence.
         * @param {String} str
         */
        this.setString = function(str) {
            templateString = str;
        };

        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                },
                getString: function() {
                    return templateString;
                }
            };
        };
    }
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/main.html',
    '<div class="sp_wrapper" data-ng-show="global.auth"><div class="bns_inner_block"><div class="bns_top"><div class="bns_top_left" data-sailplay-profile=""><span class="bns_top_head">Профиль</span><div class="bns_top_ava"><img data-ng-src="{{ user().user.pic }}" alt="Аватар"></div><div class="bns_top_prof_info"><span class="bns_top_prof_info_name" data-ng-bind="user().user.first_name || user().user.last_name ? user().user.first_name + \' \' + user().user.last_name : \'Имя не указано\'"></span> <span class="bns_top_prof_info_phone" data-ng-bind="user().user.phone && (user().user.phone | tel) || \'Телефон не указан\'"></span> <span class="bns_top_prof_info_email" data-ng-bind="user().user.email || \'E-mail не указан\'"></span> <a target="_blank" data-ng-href="{{ config.data.page && config.data.page.logout }}" class="bns_log_out">Выйти</a></div><div class="bns_top_prof_info_soc"><div class="bns_top_prof_info_soc_item" data-ng-class="{act: actions && actions() && actions().connectedAccounts.vk}"><img src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/cff30fc71680eb10f1abb116e820f093.png" alt="Vkontakte"></div><div class="bns_top_prof_info_soc_item" data-ng-class="{act: actions && actions() && actions().connectedAccounts.fb}"><img src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/4d7501c88d3fb199f2c63a491a48c586.png" alt="Facebook"></div><div class="bns_top_prof_info_soc_item" data-ng-class="{act: actions && actions() && actions().connectedAccounts.gp}"><img src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/e1f24e51b4be3db620fb8c5b15c78c20.png" alt="Google Plus"></div><div class="bns_top_prof_info_soc_item" data-ng-class="{act: actions && actions() && actions().connectedAccounts.ok}"><img src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/78b8d9be7fe3e8e0f82a92b518937e8b.png" alt="Odnoklassniki"></div></div><a href="#" class="bns_bot_linck js_open_edit" data-ng-click="$event.preventDefault();edit_profile();body_lock(true);">Редактировать профиль</a></div><div class="bns_top_center" data-sailplay-profile=""><a target="_blank" data-ng-href="{{ config.data.page && config.data.page.about_program }}" class="bns_top_head bns_top_head_sm js_open_about">О бонусной программе</a> <span class="bns_top_bal" data-ng-bind="user().user_points.confirmed | number"></span> <span class="bns_top_bal_np" data-ng-bind="\'Неподтвержденных \' + (user().user_points.unconfirmed | number)"></span> <a href="#" class="bns_bot_linck js_open_hist" data-ng-click="$event.preventDefault();show_history();body_lock(true)">История заказов</a></div><div class="bns_top_right" data-sailplay-badges=""><span class="bns_top_head">Бейджи</span><p class="empty_badges" data-ng-if="badges().multilevel_badges[0] && !(badges().multilevel_badges[0] | filter:{is_received:true}).length">У вас пока не бейджей</p><div class="bns_top_achiv js-slick-slider" data-ng-show="badges().multilevel_badges[0] && (badges().multilevel_badges[0] | filter:{is_received:true}).length"><div class="bns_top_achiv_item" data-slack-slider="" data-slack-config="{{ badge_config }}" data-ng-repeat="badge in badges().multilevel_badges[0] | filter:{is_received:true} track by $index"><img data-ng-src="{{ badge.thumbs.url_250x250 }}" alt="{{ badge.name }}"></div></div><a href="#" class="bns_bot_linck js_open_achiv" data-ng-click="$event.preventDefault();show_achievements();body_lock(true);">Все бейджи</a></div></div><div class="bns_line_wrap" data-sailplay-status=""><div class="bns_line" data-ng-if="badges()"><div class="bns_line_fil" data-ng-style="{{ getStatusPercents() }}"></div><div class="bns_line_item bns_line_item{{ $index+1 }}" data-ng-repeat="badge in $parent.badges().multilevel_badges[1] track by $index | limitTo:3" data-ng-class="{act: badge.is_received}"><div class="b-polygon b-polygon_hexagon b-polygon_hexagon2"><span class="b-polygon-part"><span class="b-polygon-part b-polygon-part_content"><img data-ng-src="{{ badge.thumbs.url_250x250 }}" class="bns_poly_img"></span></span></div><span class="bns_line_item_name" data-ng-bind="badge.name"></span> <span class="bns_line_item_sckid" data-ng-bind="badge.descr"></span> <span class="bns_line_item_til" data-ng-if="getSumForStatus(badge) > user().purchases.sum" data-ng-bind="((getSumForStatus(badge) - user().purchases.sum) | sailplay_pluralize:\'Остался,Осталось,Осталось\') + \' \' + (getSumForStatus(badge) - user().purchases.sum) + \' \' + ((getSumForStatus(badge) - user().purchases.sum) | sailplay_pluralize:\'рубль,рубля,рублей\')"></span></div></div></div><div class="bns_two_col" data-sailplay-actions=""><div class="bns_col_left"><span class="bns_top_head">Задания</span><p class="bns_quest_main_empty" data-ng-if="actions && !actions.length">Вы выполнили все задания!</p><div class="bns_quest_main"><div class="prev" data-ng-show="page > 0" data-ng-click="page=page-1;"></div><div class="bns_quest_wr" data-ng-repeat="action in getPage(actions)"><div class="bns_quest_item" data-ng-if="action._actionId"><div class="bns_quest_item_img"><img data-ng-src="{{ action_data($parent.action).image }}"></div><span class="bns_quest_item_name" data-ng-bind="action_data($parent.action).name"></span> <span class="bns_quest_item_bal" data-ng-bind="$parent.action.points | number"></span> <a href="#" data-ng-click="$event.preventDefault();$parent.$parent.show = $parent.action;">Получить</a></div><div class="bns_quest_item" data-ng-if="!action._actionId"><div class="bns_quest_item_img"><img data-ng-src="{{ action.icon | sailplay_pic }}"></div><span class="bns_quest_item_name" data-ng-bind="action.name"></span> <span class="bns_quest_item_bal" data-ng-bind="action.points | number"></span> <a href="#" data-ng-click="$event.preventDefault();$parent.$parent.show = $parent.action;">Получить</a></div></div><div class="next" data-ng-show="(page+1) < ((actions.length / size) | math_ceil)" data-ng-click="page=page+1;"></div></div><div class="bns_overlay bns_overlay_action" data-ng-if="show"><div class="bns_overlay_inner"><a href="#" class="bns_close" data-ng-click="$event.preventDefault();$parent.show = null;body_lock(false);"></a><div data-ng-if="$parent.show._actionId"><span class="bns_over_head" data-ng-bind="action_data($parent.$parent.show).name" style="text-align: center;"></span><div class="bns_overlay_action_main"><div class="bns_overlay_action_btn" data-ng-class="{bns_btn: $parent.$parent.show.path}" data-sailplay-action="" data-action="$parent.$parent.show" data-text="Получить" data-styles="{{ action_styles(action_data($parent.$parent.show)) }}">Получить</div></div></div><div data-ng-if="!$parent.show._actionId"><div class="bns_overlay_action_main"><div class="bns_overlay_action_custom" data-sailplay-action-custom="" data-action="$parent.$parent.show"></div></div></div><div class="nms_overlay_bottom"><a href="#" class="bns_btn js_close" data-ng-click="$event.preventDefault();$parent.show = null;body_lock(false);">Закрыть</a></div></div></div></div><div class="bns_col_right" data-hw-block=""><span class="bns_top_head">Вишлист</span><div class="bns_wish_main" data-ng-show="wish_list()"><div class="bns_wish_item" data-ng-repeat="item in wish_list() track by $index | limitTo:4"><div class="bns_wish_item_img"><img data-ng-src="{{ item.image }}"> <span class="bns_wish_item_label" data-ng-if="item | wish_state" data-ng-bind="$parent.item | wish_state"></span></div><span class="bns_wish_item_name" data-ng-bind="item.title"></span> <a data-ng-if="!item.old_price" data-ng-href="{{ $parent.item.link }}" data-ng-bind="$parent.item.price + \' руб.\'" target="_blank"></a> <a data-ng-if="item.old_price" data-ng-href="{{ $parent.item.link }}" target="_blank">{{ $parent.item.price }} <span class="bns_old_price" data-ng-bind="$parent.item.price + \' руб.\'"></span></a></div></div><a data-ng-href="{{ $parent.config.data.page && $parent.config.data.page.wish_list }}" class="bns_bot_linck">Показать все</a></div></div><div class="bns_two_col" data-hw-block=""><div class="bns_col_left"><span class="bns_top_head">Рекомендованные товары</span><div class="bns_recom" data-ng-show="recommend_list()"><div class="bns_recom_item" data-ng-repeat="item in recommend_list() track by $index | limitTo:4"><a data-ng-href="{{ item.link }}" target="_blank" class="bns_recom_item_img"><img data-ng-src="{{ item.image }}"> <span data-ng-bind="item.title"></span></a></div></div></div><div class="bns_col_right"><span class="bns_top_head">Игра дня</span><div class="bns_game_day" data-ng-show="game_of_day()[0]"><div class="bns_game_day_left"><span class="bns_game_day_name" data-ng-bind="game_of_day()[0].title"></span> <a data-ng-href="{{ game_of_day()[0].link }}" target="_blank">{{ game_of_day()[0].price }} <span class="bns_old_price" data-ng-bind="game_of_day()[0].old_price + \' руб.\'"></span></a></div><div class="bns_game_day_right"><img data-ng-src="{{ game_of_day()[0].image }}"></div></div></div></div><div class="bns_block" data-sailplay-gifts=""><span class="bns_top_head">Подарки</span><div class="bns_gift_main" data-ng-show="gifts()"><div class="bns_gift_item" data-ng-repeat="gift in gifts()" data-slack-slider="" data-slack-config="gifts_config"><div class="bns_gift_img"><img data-ng-src="{{ gift.thumbs.url_250x250 | sailplay_pic }}"></div><span class="bns_gift_name" data-ng-bind="gift.name"></span> <span class="bns_gift_point" data-ng-bind="gift.points | number"></span> <a href="#" data-ng-click="$event.preventDefault();$parent.gift_get = gift;body_lock(true);">Получить</a></div></div><div class="bns_overlay bns_overlay_get" data-ng-if="gift_get && !gift_geted"><div class="bns_overlay_inner"><a href="#" class="bns_close" data-ng-click="$event.preventDefault();body_lock(false);$parent.gift_get = null;"></a> <span class="bns_over_head">Получение подарка</span><div class="bns_get_gift_main"><div class="bns_get_gift_img"><img data-ng-src="{{ $parent.gift_get.thumbs.url_250x250 | sailplay_pic }}"></div><div class="bns_get_gift_info"><span class="bns_name" data-ng-bind="$parent.gift_get.name"></span> <span class="bns_point" data-ng-bind="$parent.gift_get.points | number"></span></div><div class="bns_gift_desc" data-ng-bind-html="$parent.gift_get.descr | to_trusted"></div></div><div class="nms_overlay_bottom"><a href="#" class="bns_btn bns_btn_l js_open_get_fin type_blue" data-ng-if="user().user_points.confirmed > $parent.gift_get.points" data-ng-click="$event.preventDefault();get($parent.$parent.gift_get);">Далее</a> <a href="#" class="bns_btn bns_btn_l js_open_get_fin disabled" data-ng-if="user().user_points.confirmed < $parent.gift_get.points" data-ng-click="$event.preventDefault();" data-ng-bind="\'Не хватает \' + ($parent.$parent.gift_get.points - user().user_points.confirmed)"></a> <a href="#" class="bns_btn bns_btn_r js_close" data-ng-click="$event.preventDefault();$parent.gift_get = null;body_lock(false);">Отмена</a></div></div></div><div class="bns_overlay bns_overlay_get_fin" data-ng-if="gift_geted && !gift_get"><div class="bns_overlay_inner"><a href="#" class="bns_close" data-ng-click="$event.preventDefault();$parent.gift_geted = null;body_lock(false);"></a> <span class="bns_over_head">Позравляем!<br>Подарок получен</span><div class="bns_get_gift_main_fin"><div class="bns_get_gift_img"><img data-ng-src="{{ $parent.gift_geted.thumbs.url_250x250 | sailplay_pic }}"></div><div class="bns_get_gift_info"><span class="bns_name" data-ng-bind="$parent.gift_geted.name"></span></div></div><div class="nms_overlay_bottom"><a href="#" class="bns_btn js_close" data-ng-click="$event.preventDefault();$parent.gift_geted = null;body_lock(false);">Закрыть</a></div></div></div></div></div><div class="bns_overlay bns_overlay_edit" data-sailplay-profile-edit="" data-ng-if="show_prof"><div class="bns_overlay_inner"><a href="#" class="bns_close" data-ng-click="$event.preventDefault();clear_show(\'show_prof\');"></a> <span class="bns_over_head">Редактировать профиль</span><div></div><form name="profile_edit" data-ng-submit="save(profile_edit, clear_show(\'show_prof\'))"><div class="bns_edit_ava"><img data-ng-src="{{user().user.pic}}" alt=""> <a href="#" class="bns_over_edit_ava" onclick="document.getElementById(\'sailplay_upload_avatar\').click()">Редактировать аватар</a> <input data-ng-hide="true" accept=".jpg,.jpeg,.png,.gif" data-file="" type="file" name="avatar" id="sailplay_upload_avatar" data-ng-model="avatarImg" data-ng-change="uploadAvatar()"></div><div class="bns_edit_col"><div class="bns_input_block" data-ng-class="{ bns_err: !form.lastName && profile_edit.last_name.$touched }"><label>Фамилия <span class="bns_err_text">Ошибка</span></label> <input type="text" name="last_name" data-ng-model="form.lastName" required=""></div><div class="bns_input_block" data-ng-class="{ bns_err: !form.firstName && profile_edit.first_name.$touched }"><label>Имя <span class="bns_err_text">Ошибка</span></label> <input type="text" name="first_name" data-ng-model="form.firstName" required=""></div><div class="bns_input_block" data-ng-class="{ bns_err: !form.middleName && profile_edit.middle_name.$touched }"><label>Отчество <span class="bns_err_text">Ошибка</span></label> <input type="text" name="middle_name" data-ng-model="form.middleName" required=""></div><div class="bns_input_block" data-ng-class="{ bns_err: !form.addPhone && profile_edit.phone.$touched }"><label>Телефон <span class="bns_err_text">Ошибка</span></label> <input type="text" name="phone" data-ng-model="form.addPhone" data-model-view-value="true" data-ui-mask="7 (999) 999-99-99" required=""></div><div class="bns_input_block" data-ng-class="{ bns_err: !form.addEmail && profile_edit.email.$touched }"><label>Email <span class="bns_err_text">Ошибка</span></label> <input type="text" name="email" data-ng-model="form.addEmail" required=""></div><div class="bns_input_block bns_input_block_int" data-ng-class="{ bns_err: !(tags | selectedInterests) && profile_edit.$valid }"><label>Мои интересы <span class="bns_err_text">Ошибка</span></label> <span class="bns_input_block_int_item" data-ng-repeat="interest in interests track by $index"><input type="checkbox" data-ng-model="tags[interest]" id="bns_int_{{ $index }}"> <label for="bns_int_{{ $index }}" data-ng-bind="interest"></label></span></div></div><div class="bns_edit_col"><div class="bns_input_block" data-ng-class="{ bns_err: !vars[\'Никнейм\'] && profile_edit.nickname.$touched }"><label>Никнейм <span class="bns_err_text">Ошибка</span></label> <input type="text" name="nickname" data-ng-model="vars[\'Никнейм\']" required=""></div><div class="bns_input_block bns_input_block_date" data-ng-class="{ bns_err: !form.birthDate && profile_edit.birth_date.$touched }"><label>Дата рождения <span class="bns_err_text">Ошибка</span></label><date-picker name="birth_date" data-ng-model="form.birthDate"></date-picker></div><div class="bns_input_block" data-ng-class="{ bns_err: !form.sex && profile_edit.sex.$touched }"><label>Пол <span class="bns_err_text">Ошибка</span></label> <input type="radio" data-ng-value="1" name="sex" data-ng-model="form.sex" id="bns_pol" class="type_circle" required=""> <label for="bns_pol">Мужской</label> <input type="radio" data-ng-value="2" name="sex" data-ng-model="form.sex" id="bns_pol2" class="type_circle" required=""> <label for="bns_pol2">Женский</label></div><div class="bns_input_block" data-ng-class="{ bns_err: !vars[\'Страна\'] && profile_edit.country.$touched }"><label>Страна <span class="bns_err_text">Ошибка</span></label><div class="bns_select"><span>{{ vars[\'Страна\'] || \'&nbsp;\' }}</span> <input type="hidden" name="country" data-ng-model="vars[\'Страна\']" required=""><div class="bns_select_popup"><a href="#" data-ng-repeat="country in countries track by $index" data-ng-bind="country" data-ng-click="$event.preventDefault();$parent.vars[\'Страна\']=country;"></a></div></div></div><div class="bns_input_block" data-ng-class="{ bns_err: !vars[\'Город\'] && profile_edit.city.$touched }"><label>Город <span class="bns_err_text">Ошибка</span></label> <input type="text" name="city" data-ng-model="vars[\'Город\']" required=""></div><div class="bns_input_block" data-ng-class="{ bns_err: !vars[\'Адрес\'] && profile_edit.address.$touched }"><label>Адрес <span class="bns_err_text">Ошибка</span></label> <input type="text" name="address" data-ng-model="vars[\'Адрес\']" required=""></div><div class="bns_input_block" data-ng-class="{ bns_err: !vars[\'Запомнить адрес доставки\'] && profile_edit.remember.$touched }"><input type="checkbox" id="bns_zap_adr" name="remember" data-ng-model="vars[\'Запомнить адрес доставки\']"> <label for="bns_zap_adr">Запомнить адрес доставки</label></div><div class="bns_input_block bns_input_block_pol"><label>Редактирование подписки</label> <input type="checkbox" id="bns_podp" data-ng-model="form.subscriptions.sms" data-ng-true-value="1" data-ng-false-value="0"> <label for="bns_podp">SMS</label> <input type="checkbox" id="bns_podp2" data-ng-model="form.subscriptions.email" data-ng-true-value="1" data-ng-false-value="0"> <label for="bns_podp2">Email</label></div><div class="bns_input_block"><a data-ng-href="{{ $parent.config.data.page && $parent.config.data.page.change_password }}" class="bns_edit_pas" target="_blank">Изменить пароль</a></div><div class="nms_overlay_bottom"><input type="submit" class="bns_btn bns_btn_l type_blue" data-ng-disabled="!(tags | selectedInterests) || profile_edit.$invalid" value="Сохранить"><a href="#" class="bns_btn bns_btn_r js_close" data-ng-click="$event.preventDefault();clear_show(\'show_prof\');">Назад</a></div></div></form></div></div><div class="bns_overlay bns_overlay_hist" data-sailplay-history="" data-ng-if="show_hist"><div class="bns_overlay_inner"><a href="#" class="bns_close" data-ng-click="$event.preventDefault();clear_show(\'show_hist\');"></a> <span class="bns_over_head">История заказов</span><table><tr><td></td><td><span>Дата</span></td><td><span>Номер заказа/действие</span></td><td><span>Статус</span></td><td><span>Cтоимость заказа</span></td><td>Баллы</td></tr><tr data-dir-paginate="item in history() | filter:filter | itemsPerPage:10" data-pagination-id="history_pages"><td><img data-ng-src="{{ item | history_icon }}"></td><td><span data-ng-bind="item.action_date | date:\'dd.MM.yyyy HH:mm\'"></span></td><td><strong data-ng-bind="item | history_item"></strong> <a data-ng-if="item.order_num" target="_blank" data-ng-href="{{ $parent.item | order_link }}" data-ng-bind="\'(\' + $parent.item.order_num + \')\'"></a></td><td><span data-ng-if="item.order_num" data-ng-bind="$parent.item | order_status"></span></td><td><span data-ng-show="item.price" data-ng-bind="(item.price | number) + \' руб.\'"></span></td><td><span class="bns_hist_bal" data-ng-if="item.points_delta" data-ng-bind="(item.points_delta < 0 ? \'\' : \'+ \') + (item.points_delta | number)"></span></td></tr></table><div class="bns_hist_bottom"><dir-pagination-controls data-max-size="5" data-pagination-id="history_pages" data-template-url="/html/ui/ui.pagination.controls.html" data-auto-hide="true"></dir-pagination-controls><div class="bns_input_block bns_input_block_ch"><input type="checkbox" id="bns_hist" data-ng-model="only_orders"> <label for="bns_hist">Только заказы</label></div></div><div class="nms_overlay_bottom"><a href="#" class="bns_btn js_close" data-ng-click="$event.preventDefault();clear_show(\'show_hist\');">Назад</a></div></div></div><div class="bns_overlay bns_overlay_ach" data-sailplay-badges="" data-ng-if="show_ach"><div class="bns_overlay_inner"><a href="#" class="bns_close" data-ng-click="$event.preventDefault();clear_show(\'show_ach\');"></a> <span class="bns_over_head">Бейджи</span><div class="bns_over_achiv_main"><a href="#" class="bns_over_achiv_item" data-ng-class="{act: badge.is_received, bns_ach_open: $parent.open_index == $index}" data-ng-click="$event.preventDefault();$parent.open_index=$index;$parent.open = badge;" data-ng-repeat="badge in badges().multilevel_badges[0] track by $index"><img data-ng-src="{{ badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs }}" alt="{{ badge.name }}"></a></div><div class="bns_over_achiv_text"><div class="bns_over_achiv_text_item act"><span class="bns_over_achiv_text_item_head" data-ng-bind="open.name"></span> <span class="bns_over_achiv_text_item_desc" data-ng-bind="open.descr"></span></div></div><div class="nms_overlay_bottom"><a href="#" class="bns_btn js_close" data-ng-click="$event.preventDefault();clear_show(\'show_ach\');">Назад</a></div></div></div><notify-popup></notify-popup></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/ui/ui.datepicker.html',
    '<div><div class="bns_select bns_select__day"><span data-ng-bind="model[0] || \'День\'"></span><div class="bns_select_popup"><a href="#" data-ng-repeat="day in range(1, days[model[1] || 1])" data-ng-bind="day" data-ng-click="$event.preventDefault();$parent.model[0] = day;"></a></div></div><div class="bns_select bns_select__month"><span data-ng-bind="months[model[1]] || \'Месяц\'"></span><div class="bns_select_popup"><a href="#" data-ng-repeat="(key, value) in months track by $index" data-ng-bind="value" data-ng-click="$event.preventDefault();$parent.model[1] = +key;"></a></div></div><div class="bns_select bns_select__year"><span data-ng-bind="model[2] || \'Год\'"></span><div class="bns_select_popup"><a href="#" data-ng-repeat="year in years" data-ng-bind="year" data-ng-click="$event.preventDefault();$parent.model[2] = year;"></a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/ui/ui.notify.popup.html',
    '<div class="bns_overlay" data-ng-if="data"><div class="bns_overlay_inner" style="text-align: center"><a href="#" class="bns_close" data-ng-click="$event.preventDefault();$parent.data = null;body_lock(false);"></a><div class="bns_over_head" data-ng-bind="$parent.data.title"></div><p data-ng-bind-html="$parent.data.text | to_trusted"></p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/ui/ui.pagination.controls.html',
    '<div class="bns_hist_page" data-ng-if="1 < pages.length || !autoHide"><a href="#" data-ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" data-ng-class="{ \'act\' : pagination.current == pageNumber }" data-ng-click="setCurrent(pageNumber);$event.preventDefault();" data-ng-bind="pageNumber"></a></div>');
}]);
})();

angular.module('hobby_world', [
  'core',
  'ui',
  'sp',
  'templates'
])

  .run(["hwDataService", function(hwDataService){

    // Load custom data
    hwDataService.loadData();


  }])

  .service('hwDataService', ["$rootScope", "$http", "$q", function ($rootScope, $http, $q) {

    var self = this;

    var data = {};

    self.loadData = function () {

      var recommend_list = $http({
        method: "GET",
        url: $rootScope.config.data.urls.get_recommend_list
      }).then(function (res) {
        data['recommend_list'] = res.data.upsale;
      });

      var game_of_the_day = $http({
        method: "GET",
        url: $rootScope.config.data.urls.get_game_of_the_day
      }).then(function (res) {
        data['game_of_day'] = res.data.game_of_day;
      });

      var wish_list = $http({
        method: "GET",
        url: $rootScope.config.data.urls.get_wish_list
      }).then(function (res) {
        data['wish_list'] = res.data.wishlist;
      });

      return $q.all(recommend_list, game_of_the_day, wish_list);

    };

    self.getData = function (key) {
      return function () {
        return data[key];
      };
    };

    return self;

  }])

  .filter('wish_state', function () {
    var types = {
      follow: 'Отслеживаемый товар',
      available: 'Снова в продаже'
    };
    return function (wish) {
      return types[wish.state]
    }
  })

  .directive('hwBlock', ["hwDataService", function (hwDataService) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.wish_list = hwDataService.getData('wish_list');
        scope.game_of_day = hwDataService.getData('game_of_day');
        scope.recommend_list = hwDataService.getData('recommend_list');

      }
    }
  }])

  .directive('sailplayHw', ["$rootScope", "$locale", function ($rootScope, $locale) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/main.html',
      link: function (scope, element) {

        scope.global = $rootScope;

        // $rootScope.debug = true;

        scope.show_history = function () {
          scope.show_hist = true;
        };

        scope.show_achievements = function () {
          scope.show_ach = true;
        };

        scope.edit_profile = function () {
          scope.show_prof = true;
        };

        scope.clear_show = function (name) {
          scope[name] = null;
          scope.body_lock(false);
        };

        scope.body_lock = function (state) {
          if (state) {
            $('body').css('overflow', 'hidden');
          } else {
            $('body').css('overflow', '');
          }
        };

        $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

      }
    }
  }]);


setTimeout(function () {

  var app_container = document.getElementsByTagName('sailplay-hw')[0];

  app_container && angular.bootstrap(app_container, ['hobby_world']);

}, 0);


(function () {

  angular.module('core', [
    'ipCookie'
  ])

    .run(["sp", "ipCookie", "sp_api", "$rootScope", "actions_data", function (sp, ipCookie, sp_api, $rootScope, actions_data) {

      $rootScope.config = window.sailplay_config || {};
      
      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1616,
        domain: $rootScope.config.domain || '//sailplay.ru',
        lang: 'ru'

      });

      $rootScope.remote_login_options = {
        background: 'rgba(0, 0, 0, 0.5)',
        lang: 'ru',
        disabled_options: ['socials', 'agreement']
      };


      $rootScope.loaded = false;

      $rootScope.auth = false;

      sp.on('init.success', function () {

        $rootScope.$apply(function () {

          $rootScope.loaded = true;

          // $rootScope.$broadcast('login.remote');

          $rootScope.config.auth_hash && sp.send('login', $rootScope.config.auth_hash);

        });

      });

      sp.on('login.error', function () {

        $rootScope.$apply(function () {

          $rootScope.loaded = true;

        });

      });

      sp.on('login.success', function () {

        sp_api.reset();

        $rootScope.$apply(function () {

          $rootScope.auth = true;

          sp_api.call('load.actions.list');

          sp_api.call('load.actions.custom.list');

          loadData();

        })

      });

      sp.on('logout.success', function () {

        sp_api.reset();

        if ($(".js-slick-slider.slick-initialized").length) {
          $(".js-slick-slider.slick-initialized").slick('unslick');
        }

        $rootScope.$apply(function () {

          $rootScope.auth = false;

        });

      });

      sp.on('tags.add.success', function () {

        setTimeout(function () {

          $rootScope.$apply(loadData);

        }, 3000);

      });


      sp.on('users.update.success', function () {

        $rootScope.$apply(loadData);

      });

      sp.on('actions.perform.success', function (res) {

        $rootScope.$apply(loadData);

      });

      sp.on('gift.purchase.force_complete.success', function (res) {

        // $rootScope.$apply(loadData);

      });

      sp.on('gifts.purchase.success', function () {

        // $rootScope.$apply(loadData);

      });

      sp.on('actions.perform.error', function (res) {

        sp_api.call('load.actions.list');

        sp_api.call('load.actions.custom.list');

        $rootScope.$apply();

      });

      $rootScope.$on('update', function () {
        loadData();
      });

      function getTimeZone() {
        var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
      }

      function loadData() {

        if ($(".js-slick-slider.slick-initialized").length) {
          $(".js-slick-slider.slick-initialized").slick('unslick');
        }

        if ($(".slick-initialized").length) {
          $(".slick-initialized").slick('unslick');
        }

        // sp_api.call('load.actions.list');

        // sp_api.call('load.actions.custom.list');

        sp_api.call('load.badges.list', {include_rules: 1});

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.user.history', {tz: getTimeZone()});

      }

    }]);

}());

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!1,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(a.currentSlide-1===0&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",null),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,c.options.infinite||(c.slideCount<=c.options.slidesToShow?c.currentSlide=0:c.currentSlide>e&&(c.currentSlide=e)),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d);
}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(a){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          "name": 'Пригласить друга',
          "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/e58337730cbddd5f67843ed9dd5cb9f0.png"
        }
      },
      "social": {
        "fb": {
          "like": {
            "name": "Вступить в группу в Facebook",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/09fa34945d5b09e70d7253786d647c96.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании в Facebook",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/09fa34945d5b09e70d7253786d647c96.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке в Facebook",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/09fa34945d5b09e70d7253786d647c96.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "vk": {
          "like": {
            "name": "Вступить в группу в Вконтакте",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/e0bbed923fe5841091133f2794d8277c.png",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании в Вконтакте",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/e0bbed923fe5841091133f2794d8277c.png",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке в Вконтакте",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/e0bbed923fe5841091133f2794d8277c.png",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "ok": {
          "like": {
            "name": "Вступить в группу в Одноклассниках",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/78b8d9be7fe3e8e0f82a92b518937e8b.png",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать в Одноклассниках",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/78b8d9be7fe3e8e0f82a92b518937e8b.png",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке в Одноклассниках",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/78b8d9be7fe3e8e0f82a92b518937e8b.png",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "tw": {
          "partner_page": {
            "name": "Рассказать в Twitter",
            "styles": {
              "tw_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#6eb1ba",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        }
      }
    })

    .service('spAction', ["actions_data", function (actions_data) {

      var self = this;

      self.stringify_widget_css = function (prefix, obj) {

        var css_string = '';

        for (var selector in obj) {

          if (obj.hasOwnProperty(selector)) {

            css_string += prefix + ' .' + selector + '{ ';

            var selector_styles = obj[selector];

            for (var prop in selector_styles) {

              if (selector_styles.hasOwnProperty(prop)) {

                css_string += prop + ':' + selector_styles[prop] + ' !important;';

              }

            }

            css_string += ' }';

          }

        }

        return css_string;

      };

      self.get_action_data = function (action) {

        var data = {};

        if (!action) return data;

        if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

        if (actions_data.system[action.type]) data = actions_data.system[action.type];

        return data;

      };

      return self;

    }])

    .directive('sailplayAction', ["sp", "$rootScope", "$compile", "$timeout", function (sp, $rootScope, $compile, $timeout) {

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm, attrs) {

          init_state = elm[0].innerHTML;

          elm.on('click', function (e) {
            e.preventDefault();
          });

          function parse_action(action) {
            $timeout(function () {
              attrs.styles && elm.attr('data-styles', attrs.styles);
              attrs.text && elm.attr('data-text', attrs.text);
              sp.actions && action && sp.actions.parse(elm[0], action);
            }, 0);
          }

          scope.$watch('action', function (new_value) {
            if (new_value) {
              elm.append($compile(init_state)(scope.$parent));
              parse_action(new_value);
            }
          });

        }

      };

    }])

    /**
     * @ngdoc directive
     * @name sailplay.actions.directive:sailplayActionCustom
     * @scope
     * @restrict A
     *
     * @description
     * Renders SailPlay custom action in element.
     *
     * @param {object}  action   A SailPlay custom action object, received from api.
     *
     */
    .directive('sailplayActionCustom', ["sp", "$document", function (sp, $document) {

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm, attrs) {

          var iframe = $document[0].createElement('iframe');

          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency = "true";

          elm.append(iframe);

          scope.$watch('action', function (action) {

            if (action) {

              var config = sp.config();

              iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash + '&lang=' + config.lang))) || '';

              iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');

            }
            else {
              iframe.src = '';
            }

          });

        }

      };

    }])

    .directive('sailplayActions', ["sp_api", "sp", "spAction", "tagHelper", "$rootScope", "$filter", "$timeout", function (sp_api, sp, spAction, tagHelper, $rootScope, $filter, $timeout) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = [];

          // scope.actions_config = {
          //   selector: '.bns_quest_main',
          //   data: {
          //     slidesPerRow: 4,
          //     rows: 2
          //   }
          // };

          scope.size = 8;

          scope.page = 0;

          // sp_api.data('load.actions.list')

          scope.show = null;

          scope.action_data = spAction.get_action_data;

          scope.getPage = function () {
            var from = scope.page * scope.size;
            var to = from + scope.size > scope.actions.length ? scope.actions.length : from + scope.size;
            return scope.actions.slice(from, to)
          };

          scope.createActions = function (new_val, old_val) {

            var actions = [];

            if (sp_api.data('load.actions.list')() && sp_api.data('load.actions.list')().actions) {
              actions = actions.concat(sp_api.data('load.actions.list')().actions);
            }

            if (sp_api.data('load.actions.custom.list')() && sp_api.data('load.actions.custom.list')()) {
              actions = actions.concat(sp_api.data('load.actions.custom.list')());
            }

            scope.actions = angular.copy(actions);

          };

          /**
           * Выполнение действия
           * @param action
           */
          scope.perform_action = function (action) {
            sp.send('actions.perform', action);
          };

          sp.on('actions.perform.success', function (res) {

            sp_api.call('load.actions.list');

            sp_api.call('load.actions.custom.list');

            $rootScope.$apply(function () {

              scope.show = null;
              var msg = '', header = '';
              if (res.data.response.status == 'ok') {
                header = 'Поздравляем, задание выполнено!';
                msg = 'Вам начиcленно: ' + res.data.response.points + ' ' + $filter('sailplay_pluralize')(res.data.response.points, 'балл,балла,баллов') + '</span>'
              } else {
                header = 'Ошибка';
                msg = res.data.response.message;
              }
              $rootScope.$broadcast('notify:show', {
                title: header,
                text: msg
              });

            });
          });

          scope.action_styles = function (action_data) {
            return action_data.styles && spAction.stringify_widget_css('', action_data.styles);
          };

          scope.$watch(function () {
            return angular.toJson([
              sp_api.data('load.actions.list')(),
              sp_api.data('load.actions.custom.list')()
            ])
          }, scope.createActions);

        }

      };

    }]);

}());

(function () {

  angular.module('sp.badges', [])

    .directive('sailplayBadges', ["sp", "sp_api", function (sp, sp_api) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = sp_api.data('load.badges.list');

          scope.user = sp_api.data('load.user.info');

          scope.badge_config = {
            selector: '.bns_top_achiv',
            data: {
              // infinite: false,
              slidesToShow: 5,
              slidesToScroll: 1,
              slide: '.bns_top_achiv_item',
              responsive: [
                {
                  breakpoint: 930,
                  settings: {
                    slidesToShow: 4
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 3
                  }
                }]
            }
          };

        }

      };

    }]);

}());

angular.module('sp.gifts', [])

  .directive('sailplayGifts', ["sp", "sp_api", "$rootScope", function (sp, sp_api, $rootScope) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.gifts = sp_api.data('load.gifts.list');

        scope.user = sp_api.data('load.user.info');

        scope.gifts_config = {
          selector: '.bns_gift_main',
          data: {
            slidesToShow: 5,
            slidesToScroll: 1,
            slide: '.bns_gift_item',
            responsive: [
              {
                breakpoint: 1135,
                settings: {
                  slidesToShow: 4
                }
              },
              {
                breakpoint: 860,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 730,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 1
                }
              }]
          }
        };

        scope.get = function (gift) {
          scope.gift_geted = gift;
          sp.send('gifts.purchase', {gift: gift});
        };

        sp.on('gifts.purchase.success', function () {
          $rootScope.$apply(function () {
            scope.gift_get = null;
          });
        });

        sp.on('gifts.purchase.error', function (res) {
          $rootScope.$apply(function () {
            scope.gift_geted = null;
            $rootScope.$broadcast('notify:show', {
              title: 'Ошибка',
              text: res.message
            });
          });
        });

      }

    };

  }]);

angular.module('sp.history', [])

  .service('hwOrderService', ["$rootScope", "$http", function ($rootScope, $http) {

    var self = this;

    self.data = [];

    self.getStatus = function (order_nums) {
      return $http({
        method: "GET",
        url: $rootScope.config.data.urls.get_order_history
      }).then(function (res) {
        self.data = res.data.orders_list;
      })
    };

    self.getDetails = function (order_num) {
      var filter_function = function (item) {
        return order_num == item.order_num
      };
      return self.data.filter(filter_function)[0];
    };

    return self;

  }])

  .constant('history_texts', {
    "purchase": "Покупка",
    "gift_purchase": "Подарок",
    "badge": "Бейджик",
    "registration": "Регистрация",
    "referral": "Регистрация друга",
    "referred": "Регистрация по приглашению",
    "referred_purchase": "Покупка приглашенного пользователя",
    "promocode": "За ввод промокода",
    "enter_group": "Вступление в группу ",
    "share_purchase": "Рассказал о покупке в ",
    "social_share": "Рассказал в ",
    "share_badge": "Рассказал о бейджике в ",
    "earn_badge": 'Получен бейджик ',
    "extra": "Экстра "
  })

  .constant('social_list', {
    "vk": "Вконтакте",
    "ok": "Одноклассиниках",
    "tw": "Twitter",
    "fb": "Facebook"
  })

  .constant('history_icon', {
    "hist1": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/54375f98bdda3752d71f61375b7a5513.png",
    "hist2": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/16f75927885e8764f722c983fcf1f55d.png",
    "hist3": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/13533c803a8241a840344fb1e048af0b.png",
    "hist4": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b05745e76c9b1c0a80bb3ff690f2661f.png",
    "hist5": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/fe8a83246d1c8875aa93fde7b23a078f.png"
  })

  .filter('order_status', ["hwOrderService", function (hwOrderService) {
    return function (historyItem) {
      if (!historyItem || !historyItem.order_num) return;
      var order = hwOrderService.getDetails(historyItem.order_num);
      return order ? order.state : null;
    }
  }])

  .filter('order_link', ["hwOrderService", function (hwOrderService) {
    return function (historyItem) {
      if (!historyItem || !historyItem.order_num) return;
      var order = hwOrderService.getDetails(historyItem.order_num);
      return order ? order.link : null;
    }
  }])

  .filter('history_icon', ["history_icon", function (history_icon) {
    return function (historyItem) {

      switch (historyItem.action) {
        case 'purchase':
          return history_icon.hist4;
        default:
          return history_icon.hist5;
          break;
      }


    }
  }])

  .filter('history_item', ["history_texts", "social_list", function (history_texts, social_list) {
    return function (historyItem) {

      switch (historyItem.action) {
        case 'gift_purchase':
          return history_texts.gift_purchase + ': ' + historyItem.name;
        case 'event':
          return historyItem.name || history_texts.custom_action;
        case 'extra':
          return historyItem.name || history_texts.custom_action;
        case 'custom_action':
          return historyItem.name || history_texts.custom_action;
        case 'badge':
          return history_texts.badge + ': ' + historyItem.name;
        case 'purchase':
          return historyItem.name || history_texts.purchase;
        case 'sharing':
          switch (historyItem.social_action) {
            case 'like':
              return history_texts.enter_group + social_list[historyItem.social_type] || historyItem.social_type;
            case 'purchase':
              return history_texts.share_purchase + social_list[historyItem.social_type] || historyItem.social_type;
            case 'partner_page':
              return history_texts.social_share + social_list[historyItem.social_type] || historyItem.social_type;
            case 'badge':
              return history_texts.share_badge + social_list[historyItem.social_type] || historyItem.social_type;
          }
      }
      return history_texts[historyItem.action];

    }
  }])

  .directive('sailplayHistory', ["sp", "sp_api", "hwOrderService", function (sp, sp_api, hwOrderService) {
    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.init = false;

        scope.only_orders = false;

        scope.filter = function (item) {
          if (scope.only_orders && item.order_num) {
            return true;
          } else if (!scope.only_orders) {
            return true;
          }
        };

        scope.user = sp_api.data('load.user.info');

        scope.history = sp_api.data('load.user.history');

        scope.$watch(function () {
          return angular.toJson([scope.history()]);
        }, function (new_val) {

          if (!new_val) return;

          var order_nums = scope.history().filter(function (item) {
            return item.order_num
          }).map(function (item) {
            return item.order_num
          });

          hwOrderService.getStatus(order_nums).then(function () {
            scope.init = true;
          });

        });

      }

    };
  }]);


angular.module('sp', [

  'sp.actions',
  'sp.gifts',
  'sp.profile',
  'sp.status',
  'sp.badges',
  'sp.history'

])

  .service('sp', ["$window", function ($window) {

    return $window.SAILPLAY || {};

  }])

  .service('sp_api', ["$q", "sp", "$rootScope", function ($q, sp, $rootScope) {

    var self = this;

    var data = {};

    var points = [

      'load.user.info',
      'load.gifts.list',
      'load.user.history',
      'tags.exist',
      'load.badges.list',
      'load.actions.list',
      'load.actions.custom.list'

    ];

    angular.forEach(points, function (point) {

      sp.on(point + '.success', function (res) {

        $rootScope.$apply(function () {
          self.data(point, res);

          if ($rootScope.debug) {
            console.log('sailplay.api:' + point + '.success');
            console.dir(self.data(point)());
          }

        });

      });

      sp.on(point + '.error', function (res) {
        $rootScope.$apply(function () {

          if ($rootScope.debug) {
            console.log('sailplay.api:' + point + '.error');
            console.dir(res);
          }

          self.data(point, null);
        });
      });

    });

    self.data = function (key, value) {

      if (typeof value !== 'undefined') {

        data[key] = angular.copy(value);

      }

      return function () {
        return data[key];
      };

    };

    self.call = function (name, params, callback) {

      sp.send(name, params, callback);

    };

    self.reset = function () {

      data = {};

    }

  }])

  .service('tagHelper', function () {

    var self = this;

    self.checkTag = function (tag, exist) {

      return exist.tags.filter(function (item) {
        return item.name == tag && item.exist
      }).length

    };

    return self;

  })

  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])

  .filter('math_ceil', function () {
    return function (number) {
      return Math.ceil(number);
    };
  })

  .filter('sailplay_pluralize', function () {
    var cases = [2, 0, 1, 1, 1, 2];
    return function (input, titles) {
      input = Math.abs(input);
      titles = titles.split(',');
      return titles[(input % 100 > 4 && input % 100 < 20) ? 2 : cases[(input % 10 < 5) ? input % 10 : 5]];
    }
  })

  .filter('tel', function () {
    return function (tel) {

      if (!tel) {
        return '';
      }

      tel = tel.replace(/[^\d]/g, "");

      //check if number length equals to 10
      if (tel.length >= 10) {
        //reformat and return phone number
        return tel.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5");
      }

      return null

    };
  })

  .filter('is_default', function () {

    function check(url) {
      if (url === '//sailplay.cdnvideo.ru/static/no_avatar100x100.jpg') {
        return true
      } else {
        return false;
      }
    }

    return function (url) {
      if (!url) return true;
      return check(url)
    }

  })

  .filter('sailplay_pic', ["sp", function (sp) {

    function repair_pic_url(url) {
      if (/^((http|https|ftp):\/\/)/.test(url)) {
        return url;
      }
      if (url.indexOf('//') === 0) {
        return window.location.protocol + url;
      }
      else {
        return sp.config().DOMAIN + url;
      }
    }

    return function (pic_url) {

      if (!pic_url) return '';

      return repair_pic_url(pic_url);

    };

  }]);
angular.module('sp.profile', [])

  .constant('spProfileErrors', {
    '-200007': 'Указанный телефон уже принадлежит другому пользователю.',
    '-200010': 'Указанный email адрес уже принадлежит другому пользователю.'
  })

  .constant('interests', [
    'Популярные настольные игры',
    'Вечериночные игры',
    'Игротеки в моем городе',
    'Warhammer',
    'World of Tanks',
    'Новинки',
    'Скидки и акции',
    'Magic the Gathering',
    'Детские игры',
    'Берсерк'
  ])

  .constant('countries', [
    'Азербайджан',
    'Армения',
    'Беларусь',
    'Казахстан',
    'Киргизия',
    'Латвия',
    'Литва',
    'Молдова',
    'Россия',
    'Таджикистан',
    'Туркменистан',
    'Узбекистан',
    'Украина',
    'Эстония'
  ])

  .constant('varsProfile', [
    'Никнейм',
    'Страна',
    'Город',
    'Адрес',
    'Запомнить адрес доставки'
  ])

  .constant('defaultProfile', {
    firstName: null,
    lastName: null,
    middleName: null,
    addEmail: null,
    addPhone: null,
    sex: null,
    birthDate: null,
    subscriptions: {
      email: 0,
      sms: 0
    }
  })


  .filter('selectedInterests', function () {
    return function (data) {
      if (!data || !Object.keys(data).length) return;
      var match = 0;
      Object.keys(data).forEach(function (item) {
        if (data[item]) {
          match++;
        }
      });
      return match;
    }
  })

  .service('spProfile', ["sp_api", "defaultProfile", "$http", "$rootScope", function (sp_api, defaultProfile, $http, $rootScope) {

    var self = this;

    self.user = sp_api.data('load.user.info');

    var format_phone = function (phone) {
      if (!phone) return;
      return phone.slice(1);
    }

    self.getForm = function () {

      var _form = angular.copy(defaultProfile);

      if (!self.user || !self.user()) return _form;

      _form.firstName = self.user().user.first_name;
      _form.lastName = self.user().user.last_name;
      _form.middleName = self.user().user.middle_name;
      _form.sex = self.user().user.sex;
      _form.addEmail = self.user().user.email;
      _form.addPhone = format_phone(self.user().user.phone);
      _form.birthDate = self.user().user.birth_date;
      _form.sex = self.user().user.sex;
      _form.subscriptions = {
        email: self.user().user.is_email_notifications || 0,
        sms: self.user().user.is_sms_notifications || 0
      };

      return _form;

    };

    self.sendForm = function (params) {

      var data = {
        last_name: params.form.lastName,
        middle_name: params.form.middleName,
        first_name: params.form.firstName,
        phone: params.form.addPhone,
        birth_date: params.form.birthDate,
        gender: params.form.sex,
        nickname: params.vars['Никнейм'],
        country: params.vars['Страна'],
        city: params.vars['Город'],
        address: params.vars['Адрес'],
        interests: params.tags
      };

      return $http({
        method: "GET",
        url: $rootScope.config.data.urls.update_profile,
        params: data,
        transformRequest: angular.identity,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        responseType: "json"
      });
      
    };

    return self;

  }])

  .directive('file', () => {
    return {
      require: "ngModel",
      restrict: 'A',
      link: ($scope, el, attrs, ngModel) => {
        el.bind('change', (event) => {
          let files = event.target.files;
          let file = files[0];

          ngModel.$setViewValue(file);
          $scope.$apply();
        });
      }
    };
  })

  .factory('hwUploadAvatar', ["sp", "$rootScope", "$http", "$timeout", "sp_api", function(sp, $rootScope, $http, $timeout, sp_api){
    var obj = {
      img: false
    }
    var url = $rootScope.config.data.urls.upload_avatar
    obj.uploadAvatar = function(){
      $timeout(function(){

        if (!obj.img) {
          return;
        }

        if (obj.img.size>2*1024*1024) {
          $rootScope.$broadcast('notify:show', {
            title: 'Ошибка загрузки аватара',
            text: 'Файл должен быть меньше 2 мегабайт'
          });
        }

        var user = sp_api.data('load.user.info')

        let fd = new FormData();

        fd.append('avatar', obj.img);

        fd.append('oid', user().user.origin_user_id)


        function cb(res){
          if (res.status == 'ok') {
            $rootScope.$broadcast('notify:show', {
              title: 'Успех',
              text: res.message
            });
            SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
          } else {
            $rootScope.$broadcast('notify:show', {
              title: 'Ошибка',
              text: res.message
            });
          }
        }

        return $http.post(url, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(cb,cb)

      }, 50)
    }
    return obj
  }])

  .directive('sailplayProfileEdit', ["sp", "sp_api", "$rootScope", "hwUploadAvatar", "spProfile", "spProfileErrors", "countries", "interests", "varsProfile", function (sp, sp_api, $rootScope, hwUploadAvatar, spProfile, spProfileErrors, countries, interests, varsProfile) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.countries = countries;

        scope.interests = interests;

        scope.actions = sp_api.data('load.actions.list');

        scope.user = sp_api.data('load.user.info');

        scope.form = spProfile.getForm();

        scope.vars = {};

        scope.tags = {};

        sp_api.call('tags.exist', {tags: interests}, function (res_tags_exist) {
          if (res_tags_exist && res_tags_exist.tags) {
            res_tags_exist.tags.forEach(function (tag) {
              scope.tags[tag.name] = tag.exist;
            });
            scope.$digest();
          }
        });

        sp_api.call('vars.batch', {names: varsProfile}, function (res_vars_batch) {
          if (res_vars_batch && res_vars_batch.vars) {
            res_vars_batch.vars.forEach(function (variable) {
              scope.vars[variable.name] = variable.value;
            });
            scope.$digest();
          }
        });

        scope.uploadAvatar = hwUploadAvatar.uploadAvatar
        scope.avatarImg = hwUploadAvatar.avatarImg
        scope.$watch('avatarImg', function(newVal) {
          if(newVal){
            hwUploadAvatar.img = newVal
          }
        })
        

        scope.save = function (form, success) {

          if (!form || !form.$valid) return;

          var _tags = Object.keys(scope.tags).filter(function (field) {
            return scope.tags[field]
          }).map(function (tag) {
            return tag
          });

          // Подготовка данных к передаче
          var data = {};

          if (scope.form.firstName !== scope.user().user.first_name) {
            data.firstName = scope.form.firstName;
          }

          if (scope.form.lastName !== scope.user().user.last_name) {
            data.lastName = scope.form.lastName;
          }

          if (scope.form.middleName !== scope.user().user.middle_name) {
            data.middleName = scope.form.middleName;
          }

          if (scope.form.sex !== scope.user().user.sex) {
            data.sex = scope.form.sex;
          }

          if (scope.form.birthDate !== scope.user().user.birth_date) {
            data.birthDate = scope.form.birthDate;
          }

          if (scope.form.addEmail !== scope.user().user.email) {
            data.addEmail = scope.form.addEmail;
          }

          var phone = scope.form.addPhone
            .replace(/\-/g, '')
            .replace(/\s/g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .replace(/\+/g, '');

          if (phone !== scope.user().user.phone) {
            data.addPhone = phone;
          }

          data.subscriptions = JSON.stringify(scope.form.subscriptions);

          data.auth_hash = sp.config().auth_hash;

          // Обновление профиля
          sp_api.call('users.update', data, function (res_user_update) {

            if (res_user_update.status == 'error') {

              $rootScope.$apply(function () {
                $rootScope.$broadcast('notify:show', {
                  title: 'Ошибка',
                  text: spProfileErrors[res_user_update.status_code] || res_user_update.message || 'Не получилось обновления профиля.'
                });
              });

            } else if (res_user_update.status == 'ok') {

              // Удаление тегов (Интересов)
              sp_api.call('tags.delete', {tags: interests}, function (res_tags_delete) {

                // Добавление тегов (Интересов)
                sp_api.call('tags.add', {tags: _tags}, function (res_tags_add) {

                  // Добавление переменных
                  sp_api.call('vars.add', {custom_vars: scope.vars}, function (res_vars_add) {

                    // Запрос к HW
                    spProfile.sendForm({
                      form: scope.form,
                      vars: scope.vars,
                      tags: _tags
                    }).then(function (hw_response) {

                      success && success();

                      $rootScope.$broadcast('notify:show', {
                        title: 'Готово',
                        text: 'Профиль обновлен'
                      });

                      scope.$digest();

                    })

                  });

                });

              });
            }

          });

        };

      }
    };
  }])

  .directive('sailplayProfile', ["sp", "sp_api", function (sp, sp_api) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.user = sp_api.data('load.user.info');

        scope.logout = function () {
          sp.send('logout');
        };

      }

    };

  }]);


angular.module('sp.status', [])

  .constant('spPurchaseTag', 10000017)

  .filter('spBadgeDesc', function () {
    return function (badge) {
      if (!badge) return {};
      return JSON.parse(badge.descr || '{}');
    }
  })

  .directive('sailplayStatus', ["sp", "sp_api", "spPurchaseTag", function (sp, sp_api, spPurchaseTag) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.badges = sp_api.data('load.badges.list');

        scope.user = sp_api.data('load.user.info');

        /**
         * Get purchases sum for status from rules
         * @param status
         * @returns {*}
         */
        scope.getSumForStatus = function (status) {
          var purchase_rule = status.rules.filter(function (rule) {
            return rule.event_id == spPurchaseTag
          })[0];
          return purchase_rule && purchase_rule.value_to_success;
        };

        /**
         * Get percents for status bar
         * @returns {string}
         */
        scope.getStatusPercents = function () {
          var received_statuses = scope.badges().multilevel_badges[1].filter(function (badge) {
            return badge.is_received
          }).length;
          var len = scope.badges().multilevel_badges[1].length;
          var percents = 100 / len * received_statuses;
          percents = percents > 100 ? 100 : percents < 0 ? 0 : percents;
          return {
            'width': percents + '%'
          };
        };

      }

    };

  }]);
angular.module('ui.datepicker', [])

  .service('dateService', function () {

    var self = this;

    self.months = {
      "1": "Январь",
      "2": "Февраль",
      "3": "Март",
      "4": "Апрель",
      "5": "Май",
      "6": "Июнь",
      "7": "Июль",
      "8": "Август",
      "9": "Сентябрь",
      "10": "Октябрь",
      "11": "Ноябрь",
      "12": "Декабрь"
    };

    self.days = {
      1: 31,
      2: 29,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    };

    var current_year = new Date().getFullYear();
    var arr = [];
    for (var i = 90; i > 0; i--) {
      arr.push(current_year - i);
    }

    self.years = arr.reverse();

    return this;

  })

  .directive('datePicker', ["dateService", function (dateService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/html/ui/ui.datepicker.html',
      scope: true,
      require: 'ngModel',
      link: function (scope, elm, attrs, NgModel) {

        scope.model = [null, null, null];

        scope.months = dateService.months;
        scope.days = dateService.days;
        scope.years = dateService.years;


        NgModel.$render = function () {
          if (NgModel.$modelValue) {
            var value = NgModel.$modelValue.split('-').reverse().map(function (x) {
              return parseInt(x, 10);
            });
            scope.model = value;
          }
        };

        scope.$watchCollection('model', function () {
          var check = scope.model.every(function (item) {
            return item;
          });
          if (!check) return;
          var new_value = angular.copy(scope.model);
          NgModel.$setViewValue(new_value.reverse().join('-'));
        });

        scope.range = function (start, end) {
          var result = [];
          for (var i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
        };

      }
    }

  }]);

(function () {

  angular.module('ui', [
    'angularUtils.directives.dirPagination',
    'ui.datepicker',
    'ui.mask',
    'ngTouch'
  ])

    .directive('notifyPopup', function () {

      return {

        restrict: 'E',
        replace: false,
        templateUrl: '/html/ui/ui.notify.popup.html',
        scope: true,
        link: function (scope) {

          scope.data = null;

          scope.$on('notify:show', function (e, info) {
            scope.data = info;
          });

          scope.$on('notify:hide', function () {
            scope.data = null;
          });

        }

      }

    })

    .directive('scrollTo', function () {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el, attr) {

          var to = $(attr.scrollTo);
          var time = attr.scrollTime;

          $(el).on('click', function () {

            if (!to.length) return;

            var offset = to.offset().top + $(window).height() > $('body').height() ? $('body').height() - $(window).height() : to.offset().top;

            $("html, body").delay(100).animate({
              scrollTop: offset
            }, time || 500, function () {
              to.addClass('scrolled');
              setTimeout(function () {
                to.removeClass('scrolled')
              }, 1000)
            });

          })

        }
      }
    })

    .directive('spAuth', ["$rootScope", "sp", function ($rootScope, sp) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el, attrs) {

          var opts = scope.$eval(attrs.spAuth);

          var options = {
            node: el[0]
          };

          angular.merge(options, opts);

          $rootScope.$on('login.remote', function () {

            sp.send('login.remote', options);

          });

          sp.config() && sp.config().partner && sp.send('login.remote', options);

        }
      }
    }])

    .directive('slackSlider', ["$timeout", function ($timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el, attrs) {

          scope.slackConfig = scope.$eval(attrs.slackConfig);

          if (scope.$last) { // all are rendered
            $timeout(function () {
              $(scope.slackConfig.selector).not('.slick-initialized').slick(scope.slackConfig.data);
            });
          }

        }

      };
    }]);

}());
