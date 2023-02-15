import{h as he,o as _,c as k,a as $,g as Q,w as K,e as U,t as A,i as j,u as G,k as R,F as z,l as V,b as de,r as pe,d as ue}from"./index-4d811fd1.js";function ge(h){if(h.__esModule)return h;var M=h.default;if(typeof M=="function"){var c=function I(){if(this instanceof I){var y=[null];y.push.apply(y,arguments);var w=Function.bind.apply(M,y);return new w}return M.apply(this,arguments)};c.prototype=M.prototype}else c={};return Object.defineProperty(c,"__esModule",{value:!0}),Object.keys(h).forEach(function(I){var y=Object.getOwnPropertyDescriptor(h,I);Object.defineProperty(c,I,y.get?y:{enumerable:!0,get:function(){return h[I]}})}),c}var ce={},oe={};const ve={},_e=Object.freeze(Object.defineProperty({__proto__:null,default:ve},Symbol.toStringTag,{value:"Module"})),me=ge(_e);(function(h){(function(M){var c=M.Markdown=function(i){switch(typeof i){case"undefined":this.dialect=c.dialects.Gruber;break;case"object":this.dialect=i;break;default:if(i in c.dialects)this.dialect=c.dialects[i];else throw new Error("Unknown Markdown dialect '"+String(i)+"'");break}this.em_state=[],this.strong_state=[],this.debug_indent=""};M.parse=function(i,e){var t=new c(e);return t.toTree(i)},M.toHTML=function(e,t,r){var n=M.toHTMLTree(e,t,r);return M.renderJsonML(n)},M.toHTMLTree=function(e,t,r){typeof e=="string"&&(e=this.parse(e,t));var n=E(e),s={};n&&n.references&&(s=n.references);var l=W(e,s,r);return X(l),l};function I(){return"Markdown.mk_block( "+uneval(this.toString())+", "+uneval(this.trailing)+", "+uneval(this.lineNumber)+" )"}function y(){var i=me;return"Markdown.mk_block( "+i.inspect(this.toString())+", "+i.inspect(this.trailing)+", "+i.inspect(this.lineNumber)+" )"}var w=c.mk_block=function(i,e,t){arguments.length==1&&(e=`

`);var r=new String(i);return r.trailing=e,r.inspect=y,r.toSource=I,t!=null&&(r.lineNumber=t),r};function S(i){for(var e=0,t=-1;(t=i.indexOf(`
`,t+1))!==-1;)e++;return e}c.prototype.split_blocks=function(e,t){e=e.replace(/(\r\n|\n|\r)/g,`
`);var r=/([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,n=[],s,l=1;for((s=/^(\s*\n)/.exec(e))!=null&&(l+=S(s[0]),r.lastIndex=s[0].length);(s=r.exec(e))!==null;)s[2]==`
#`&&(s[2]=`
`,r.lastIndex--),n.push(w(s[1],s[2],l)),l+=S(s[0]);return n},c.prototype.processBlock=function(e,t){var r=this.dialect.block,n=r.__order__;if("__call__"in r)return r.__call__.call(this,e,t);for(var s=0;s<n.length;s++){var l=r[n[s]].call(this,e,t);if(l)return(!H(l)||l.length>0&&!H(l[0]))&&this.debug(n[s],"didn't return a proper array"),l}return[]},c.prototype.processInline=function(e){return this.dialect.inline.__call__.call(this,String(e))},c.prototype.toTree=function(e,t){var r=e instanceof Array?e:this.split_blocks(e),n=this.tree;try{this.tree=t||this.tree||["markdown"];e:for(;r.length;){var s=this.processBlock(r.shift(),r);if(!s.length)continue e;this.tree.push.apply(this.tree,s)}return this.tree}finally{t&&(this.tree=n)}},c.prototype.debug=function(){var i=Array.prototype.slice.call(arguments);i.unshift(this.debug_indent),typeof print<"u"&&print.apply(print,i),typeof console<"u"&&typeof console.log<"u"&&console.log.apply(null,i)},c.prototype.loop_re_over_block=function(i,e,t){for(var r,n=e.valueOf();n.length&&(r=i.exec(n))!=null;)n=n.substr(r[0].length),t.call(this,r);return n},c.dialects={},c.dialects.Gruber={block:{atxHeader:function(e,t){var r=e.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);if(r){var n=["header",{level:r[1].length}];return Array.prototype.push.apply(n,this.processInline(r[2])),r[0].length<e.length&&t.unshift(w(e.substr(r[0].length),e.trailing,e.lineNumber+2)),[n]}},setextHeader:function(e,t){var r=e.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);if(r){var n=r[2]==="="?1:2,s=["header",{level:n},r[1]];return r[0].length<e.length&&t.unshift(w(e.substr(r[0].length),e.trailing,e.lineNumber+2)),[s]}},code:function(e,t){var r=[],n=/^(?: {0,3}\t| {4})(.*)\n?/;if(!e.match(n))return;e:do{var s=this.loop_re_over_block(n,e.valueOf(),function(l){r.push(l[1])});if(s.length){t.unshift(w(s,e.trailing));break e}else if(t.length){if(!t[0].match(n))break e;r.push(e.trailing.replace(/[^\n]/g,"").substring(2)),e=t.shift()}else break e}while(!0);return[["code_block",r.join(`
`)]]},horizRule:function(e,t){var r=e.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);if(r){var n=[["hr"]];return r[1]&&n.unshift.apply(n,this.processBlock(r[1],[])),r[3]&&t.unshift(w(r[3])),n}},lists:function(){var i="[*+-]|\\d+\\.",e=/[*+-]/,t=new RegExp("^( {0,3})("+i+")[ 	]+"),r="(?: {0,3}\\t| {4})";function n(u){return new RegExp("(?:^("+r+"{0,"+u+"} {0,3})("+i+")\\s+)|(^"+r+"{0,"+(u-1)+"}[ ]{0,4})")}function s(u){return u.replace(/ {0,3}\t/g,"    ")}function l(u,d,f,L){if(d){u.push(["para"].concat(f));return}var g=u[u.length-1]instanceof Array&&u[u.length-1][0]=="para"?u[u.length-1]:u;L&&u.length>1&&f.unshift(L);for(var b=0;b<f.length;b++){var T=f[b],m=typeof T=="string";m&&g.length>1&&typeof g[g.length-1]=="string"?g[g.length-1]+=T:g.push(T)}}function o(u,d){for(var f=new RegExp("^("+r+"{"+u+"}.*?\\n?)*$"),L=new RegExp("^"+r+"{"+u+"}","gm"),g=[];d.length>0&&f.exec(d[0]);){var b=d.shift(),T=b.replace(L,"");g.push(w(T,b.trailing,b.lineNumber))}return g}function v(u,d,f){var L=u.list,g=L[L.length-1];if(!(g[1]instanceof Array&&g[1][0]=="para"))if(d+1==f.length)g.push(["para"].concat(g.splice(1,g.length-1)));else{var b=g.pop();g.push(["para"].concat(g.splice(1,g.length-1)),b)}}return function(u,d){var f=u.match(t);if(!f)return;function L(ee){var le=e.exec(ee[2])?["bulletlist"]:["numberlist"];return g.push({list:le,indent:ee[1]}),le}var g=[],b=L(f),T,m=!1,C=[g[0].list],N;e:for(;;){for(var D=u.split(/(?=\n)/),P="",te=0;te<D.length;te++){var Y="",ne=D[te].replace(/^\n/,function(ee){return Y=ee,""}),fe=n(g.length);if(f=ne.match(fe),f[1]!==void 0){P.length&&(l(T,m,this.processInline(P),Y),m=!1,P=""),f[1]=s(f[1]);var Z=Math.floor(f[1].length/4)+1;if(Z>g.length)b=L(f),T.push(b),T=b[1]=["listitem"];else{var re=!1;for(N=0;N<g.length;N++)if(g[N].indent==f[1]){b=g[N].list,g.splice(N+1,g.length-(N+1)),re=!0;break}re||(Z++,Z<=g.length?(g.splice(Z,g.length-Z),b=g[Z-1].list):(b=L(f),T.push(b))),T=["listitem"],b.push(T)}Y=""}ne.length>f[0].length&&(P+=Y+ne.substr(f[0].length))}P.length&&(l(T,m,this.processInline(P),Y),m=!1,P="");var ie=o(g.length,d);ie.length>0&&(O(g,v,this),T.push.apply(T,this.toTree(ie,[])));var ae=d[0]&&d[0].valueOf()||"";if(ae.match(t)||ae.match(/^ /)){u=d.shift();var se=this.dialect.block.horizRule(u,d);if(se){C.push.apply(C,se);break}O(g,v,this),m=!0;continue e}break}return C}}(),blockquote:function(e,t){if(e.match(/^>/m)){var r=[];if(e[0]!=">"){for(var n=e.split(/\n/),s=[],l=e.lineNumber;n.length&&n[0][0]!=">";)s.push(n.shift()),l++;var o=w(s.join(`
`),`
`,e.lineNumber);r.push.apply(r,this.processBlock(o,[])),e=w(n.join(`
`),e.trailing,l)}for(;t.length&&t[0][0]==">";){var v=t.shift();e=w(e+e.trailing+v,v.trailing,e.lineNumber)}var u=e.replace(/^> ?/gm,"");this.tree;var d=this.toTree(u,["blockquote"]),f=E(d);return f&&f.references&&(delete f.references,J(f)&&d.splice(1,1)),r.push(d),r}},referenceDefn:function(e,t){var r=/^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;if(e.match(r)){E(this.tree)||this.tree.splice(1,0,{});var n=E(this.tree);n.references===void 0&&(n.references={});var s=this.loop_re_over_block(r,e,function(l){l[2]&&l[2][0]=="<"&&l[2][l[2].length-1]==">"&&(l[2]=l[2].substring(1,l[2].length-1));var o=n.references[l[1].toLowerCase()]={href:l[2]};l[4]!==void 0?o.title=l[4]:l[5]!==void 0&&(o.title=l[5])});return s.length&&t.unshift(w(s,e.trailing)),[]}},para:function(e,t){return[["para"].concat(this.processInline(e))]}}},c.dialects.Gruber.inline={__oneElement__:function(e,t,r){var n,l;t=t||this.dialect.inline.__patterns__;var s=new RegExp("([\\s\\S]*?)("+(t.source||t)+")");if(n=s.exec(e),n){if(n[1])return[n[1].length,n[1]]}else return[e.length,e];var l;return n[2]in this.dialect.inline&&(l=this.dialect.inline[n[2]].call(this,e.substr(n.index),n,r||[])),l=l||[n[2].length,n[2]],l},__call__:function(e,t){var r=[],n;function s(l){typeof l=="string"&&typeof r[r.length-1]=="string"?r[r.length-1]+=l:r.push(l)}for(;e.length>0;)n=this.dialect.inline.__oneElement__.call(this,e,t,r),e=e.substr(n.shift()),O(n,s);return r},"]":function(){},"}":function(){},__escape__:/^\\[\\`\*_{}\[\]()#\+.!\-]/,"\\":function(e){return this.dialect.inline.__escape__.exec(e)?[2,e.charAt(1)]:[1,"\\"]},"![":function(e){var t=e.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);if(t){t[2]&&t[2][0]=="<"&&t[2][t[2].length-1]==">"&&(t[2]=t[2].substring(1,t[2].length-1)),t[2]=this.dialect.inline.__call__.call(this,t[2],/\\/)[0];var r={alt:t[1],href:t[2]||""};return t[4]!==void 0&&(r.title=t[4]),[t[0].length,["img",r]]}return t=e.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/),t?[t[0].length,["img_ref",{alt:t[1],ref:t[2].toLowerCase(),original:t[0]}]]:[2,"!["]},"[":function(e){var t=String(e),r=c.DialectHelpers.inline_until_char.call(this,e.substr(1),"]");if(!r)return[1,"["];var n=1+r[0],s=r[1],l,o;e=e.substr(n);var v=e.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);if(v){var u=v[1];if(n+=v[0].length,u&&u[0]=="<"&&u[u.length-1]==">"&&(u=u.substring(1,u.length-1)),!v[3])for(var d=1,f=0;f<u.length;f++)switch(u[f]){case"(":d++;break;case")":--d==0&&(n-=u.length-f,u=u.substring(0,f));break}return u=this.dialect.inline.__call__.call(this,u,/\\/)[0],o={href:u||""},v[3]!==void 0&&(o.title=v[3]),l=["link",o].concat(s),[n,l]}return v=e.match(/^\s*\[(.*?)\]/),v?(n+=v[0].length,o={ref:(v[1]||String(s)).toLowerCase(),original:t.substr(0,n)},l=["link_ref",o].concat(s),[n,l]):s.length==1&&typeof s[0]=="string"?(o={ref:s[0].toLowerCase(),original:t.substr(0,n)},l=["link_ref",o,s[0]],[n,l]):[1,"["]},"<":function(e){var t;return(t=e.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/))!=null?t[3]?[t[0].length,["link",{href:"mailto:"+t[3]},t[3]]]:t[2]=="mailto"?[t[0].length,["link",{href:t[1]},t[1].substr(7)]]:[t[0].length,["link",{href:t[1]},t[1]]]:[1,"<"]},"`":function(e){var t=e.match(/(`+)(([\s\S]*?)\1)/);return t&&t[2]?[t[1].length+t[2].length,["inlinecode",t[3]]]:[1,"`"]},"  \n":function(e){return[3,["linebreak"]]}};function B(i,e){var t=i+"_state",r=i=="strong"?"em_state":"strong_state";function n(s){this.len_after=s,this.name="close_"+e}return function(s,l){if(this[t][0]==e)return this[t].shift(),[s.length,new n(s.length-e.length)];var o=this[r].slice(),v=this[t].slice();this[t].unshift(e);var u=this.processInline(s.substr(e.length)),d=u[u.length-1];if(this[t].shift(),d instanceof n){u.pop();var f=s.length-d.len_after;return[f,[i].concat(u)]}else return this[r]=o,this[t]=v,[e.length,e]}}c.dialects.Gruber.inline["**"]=B("strong","**"),c.dialects.Gruber.inline.__=B("strong","__"),c.dialects.Gruber.inline["*"]=B("em","*"),c.dialects.Gruber.inline._=B("em","_"),c.buildBlockOrder=function(i){var e=[];for(var t in i)t=="__order__"||t=="__call__"||e.push(t);i.__order__=e},c.buildInlinePatterns=function(i){var e=[];for(var t in i)if(!t.match(/^__.*__$/)){var r=t.replace(/([\\.*+?|()\[\]{}])/g,"\\$1").replace(/\n/,"\\n");e.push(t.length==1?r:"(?:"+r+")")}e=e.join("|"),i.__patterns__=e;var n=i.__call__;i.__call__=function(s,l){return l!=null?n.call(this,s,l):n.call(this,s,e)}},c.DialectHelpers={},c.DialectHelpers.inline_until_char=function(i,e){for(var t=0,r=[];;){if(i.charAt(t)==e)return t++,[t,r];if(t>=i.length)return null;var n=this.dialect.inline.__oneElement__.call(this,i.substr(t));t+=n[0],r.push.apply(r,n.slice(1))}},c.subclassDialect=function(i){function e(){}e.prototype=i.block;function t(){}return t.prototype=i.inline,{block:new e,inline:new t}},c.buildBlockOrder(c.dialects.Gruber.block),c.buildInlinePatterns(c.dialects.Gruber.inline),c.dialects.Maruku=c.subclassDialect(c.dialects.Gruber),c.dialects.Maruku.processMetaHash=function(e){for(var t=x(e),r={},n=0;n<t.length;++n)if(/^#/.test(t[n]))r.id=t[n].substring(1);else if(/^\./.test(t[n]))r.class?r.class=r.class+t[n].replace(/./," "):r.class=t[n].substring(1);else if(/\=/.test(t[n])){var s=t[n].split(/\=/);r[s[0]]=s[1]}return r};function x(i){for(var e=i.split(""),t=[""],r=!1;e.length;){var n=e.shift();switch(n){case" ":r?t[t.length-1]+=n:t.push("");break;case"'":case'"':r=!r;break;case"\\":n=e.shift();default:t[t.length-1]+=n;break}}return t}c.dialects.Maruku.block.document_meta=function(e,t){if(!(e.lineNumber>1)&&e.match(/^(?:\w+:.*\n)*\w+:.*$/)){E(this.tree)||this.tree.splice(1,0,{});var r=e.split(/\n/);for(p in r){var n=r[p].match(/(\w+):\s*(.*)$/),s=n[1].toLowerCase(),l=n[2];this.tree[1][s]=l}return[]}},c.dialects.Maruku.block.block_meta=function(e,t){var r=e.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);if(r){var n=this.dialect.processMetaHash(r[2]),s;if(r[1]===""){var l=this.tree[this.tree.length-1];if(s=E(l),typeof l=="string")return;s||(s={},l.splice(1,0,s));for(a in n)s[a]=n[a];return[]}var o=e.replace(/\n.*$/,""),v=this.processBlock(o,[]);s=E(v[0]),s||(s={},v[0].splice(1,0,s));for(a in n)s[a]=n[a];return v}},c.dialects.Maruku.block.definition_list=function(e,t){var r=/^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,n=["dl"],s,l;if(l=e.match(r)){for(var o=[e];t.length&&r.exec(t[0]);)o.push(t.shift());for(var v=0;v<o.length;++v){var l=o[v].match(r),u=l[1].replace(/\n$/,"").split(/\n/),d=l[2].split(/\n:\s+/);for(s=0;s<u.length;++s)n.push(["dt",u[s]]);for(s=0;s<d.length;++s)n.push(["dd"].concat(this.processInline(d[s].replace(/(\n)\s+/,"$1"))))}}else return;return[n]},c.dialects.Maruku.block.table=function(e,t){var r=function(d,f){f=f||"\\s",f.match(/^[\\|\[\]{}?*.+^$]$/)&&(f="\\"+f);for(var L=[],g=new RegExp("^((?:\\\\.|[^\\\\"+f+"])*)"+f+"(.*)"),b;b=d.match(g);)L.push(b[1]),d=b[2];return L.push(d),L},n=/^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,s=/^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,l,o;if(o=e.match(n))o[3]=o[3].replace(/^\s*\|/gm,"");else if(!(o=e.match(s)))return;var v=["table",["thead",["tr"]],["tbody"]];o[2]=o[2].replace(/\|\s*$/,"").split("|");var u=[];for(O(o[2],function(d){d.match(/^\s*-+:\s*$/)?u.push({align:"right"}):d.match(/^\s*:-+\s*$/)?u.push({align:"left"}):d.match(/^\s*:-+:\s*$/)?u.push({align:"center"}):u.push({})}),o[1]=r(o[1].replace(/\|\s*$/,""),"|"),l=0;l<o[1].length;l++)v[1][1].push(["th",u[l]||{}].concat(this.processInline(o[1][l].trim())));return O(o[3].replace(/\|\s*$/mg,"").split(`
`),function(d){var f=["tr"];for(d=r(d,"|"),l=0;l<d.length;l++)f.push(["td",u[l]||{}].concat(this.processInline(d[l].trim())));v[2].push(f)},this),[v]},c.dialects.Maruku.inline["{:"]=function(e,t,r){if(!r.length)return[2,"{:"];var n=r[r.length-1];if(typeof n=="string")return[2,"{:"];var s=e.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);if(!s)return[2,"{:"];var l=this.dialect.processMetaHash(s[1]),o=E(n);o||(o={},n.splice(1,0,o));for(var v in l)o[v]=l[v];return[s[0].length,""]},c.dialects.Maruku.inline.__escape__=/^\\[\\`\*_{}\[\]()#\+.!\-|:]/,c.buildBlockOrder(c.dialects.Maruku.block),c.buildInlinePatterns(c.dialects.Maruku.inline);var H=Array.isArray||function(i){return Object.prototype.toString.call(i)=="[object Array]"},O;Array.prototype.forEach?O=function(i,e,t){return i.forEach(e,t)}:O=function(i,e,t){for(var r=0;r<i.length;r++)e.call(t||i,i[r],r,i)};var J=function(i){for(var e in i)if(hasOwnProperty.call(i,e))return!1;return!0};function E(i){return H(i)&&i.length>1&&typeof i[1]=="object"&&!H(i[1])?i[1]:void 0}M.renderJsonML=function(i,e){e=e||{},e.root=e.root||!1;var t=[];if(e.root)t.push(q(i));else for(i.shift(),i.length&&typeof i[0]=="object"&&!(i[0]instanceof Array)&&i.shift();i.length;)t.push(q(i.shift()));return t.join(`

`)};function F(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function q(i){if(typeof i=="string")return F(i);var e=i.shift(),t={},r=[];for(i.length&&typeof i[0]=="object"&&!(i[0]instanceof Array)&&(t=i.shift());i.length;)r.push(q(i.shift()));var n="";for(var s in t)n+=" "+s+'="'+F(t[s])+'"';return e=="img"||e=="br"||e=="hr"?"<"+e+n+"/>":"<"+e+n+">"+r.join("")+"</"+e+">"}function W(i,e,t){var r;t=t||{};var n=i.slice(0);typeof t.preprocessTreeNode=="function"&&(n=t.preprocessTreeNode(n,e));var s=E(n);if(s){n[1]={};for(r in s)n[1][r]=s[r];s=n[1]}if(typeof n=="string")return n;switch(n[0]){case"header":n[0]="h"+n[1].level,delete n[1].level;break;case"bulletlist":n[0]="ul";break;case"numberlist":n[0]="ol";break;case"listitem":n[0]="li";break;case"para":n[0]="p";break;case"markdown":n[0]="html",s&&delete s.references;break;case"code_block":n[0]="pre",r=s?2:1;var l=["code"];l.push.apply(l,n.splice(r,n.length-r)),n[r]=l;break;case"inlinecode":n[0]="code";break;case"img":n[1].src=n[1].href,delete n[1].href;break;case"linebreak":n[0]="br";break;case"link":n[0]="a";break;case"link_ref":n[0]="a";var o=e[s.ref];if(o)delete s.ref,s.href=o.href,o.title&&(s.title=o.title),delete s.original;else return s.original;break;case"img_ref":n[0]="img";var o=e[s.ref];if(o)delete s.ref,s.src=o.href,o.title&&(s.title=o.title),delete s.original;else return s.original;break}if(r=1,s){for(var v in n[1]){r=2;break}r===1&&n.splice(r,1)}for(;r<n.length;++r)n[r]=W(n[r],e,t);return n}function X(i){for(var e=E(i)?2:1;e<i.length;)typeof i[e]=="string"?e+1<i.length&&typeof i[e+1]=="string"?i[e]+=i.splice(e+1,1)[0]:++e:(X(i[e]),++e)}})(function(){return h}())})(oe);(function(h){h.markdown=oe,h.parse=h.markdown.toHTML})(ce);const ye=["id"],be={class:"card-header"},ke={key:0},we={class:"card-content"},$e=["innerHTML"],Me={key:1,class:"arg-list"},Le=["innerHTML"],Te={key:3,class:"arg-list"},He={class:"arg-row"},Se=["innerHTML"],Ee={class:"arg-row return-row"},Ne=$("span",null,"Returns:",-1),Be={key:4,class:"arg-list"},Oe={class:"arg-row"},Ae=["innerHTML"],Ce={key:6},Ie={key:8},xe={__name:"LibraryCard",props:["entry"],setup(h){var w,S;const{entry:M}=h,c=ce.markdown,I=he(`${M.name||((w=M.meta)==null?void 0:w.name)||((S=M.context)==null?void 0:S.name)}`),y=M.kind==="namespace"?3:4;return(B,x)=>{var H,O,J,E,F,q,W,X,i,e,t,r,n,s,l,o,v,u,d,f,L,g,b,T;return _(),k("div",{class:"card--library card",id:`${I.value}`},[$("div",be,[(_(),Q(j(`h${G(y)}`),null,{default:K(()=>{var m,C,N,D,P;return[U(A(((m=h.entry)==null?void 0:m.name)||((N=(C=h.entry)==null?void 0:C.meta)==null?void 0:N.name)||((P=(D=h.entry)==null?void 0:D.context)==null?void 0:P.name)||"No Name found"),1)]}),_:1})),h.entry.kind!=="namespace"?(_(),k("span",ke,A(h.entry.kind||"mixin"),1)):R("",!0)]),$("div",we,[$("p",{innerHTML:G(c).toHTML((E=((H=h.entry)==null?void 0:H.description)||((J=(O=h.entry)==null?void 0:O.meta)==null?void 0:J.description)||"")==null?void 0:E.replace(/\{@link (.+?)\}/g,"[$1](#$1)"))},null,8,$e),(F=h.entry)!=null&&F.properties?(_(),Q(j(`h${G(y)+1}`),{key:0},{default:K(()=>[U("Properties")]),_:1})):R("",!0),(q=h.entry)!=null&&q.properties?(_(),k("div",Me,[(_(!0),k(z,null,V(h.entry.properties,(m,C)=>{var N,D;return _(),k("div",{class:"arg-row",key:`entry-${B.index}-arg-${C}`},[$("span",null,A(m.name),1),$("code",null,A((D=(N=m.type)==null?void 0:N.names)==null?void 0:D.join(" | ")),1),$("p",{innerHTML:G(c).toHTML(m.description||"")},null,8,Le)])}),128))])):R("",!0),(W=h.entry)!=null&&W.params&&h.entry.params.length||(i=(X=h.entry)==null?void 0:X.meta)!=null&&i.arguments?(_(),Q(j(`h${G(y)+1}`),{key:2},{default:K(()=>[U("Parameters")]),_:1})):R("",!0),(e=h.entry)!=null&&e.params&&h.entry.params.length||(t=h.entry)!=null&&t.returns?(_(),k("div",Te,[(_(!0),k(z,null,V((r=h.entry)==null?void 0:r.params,(m,C)=>{var N,D;return _(),k("div",He,[$("span",null,A(m.name),1),$("code",null,A((D=(N=m.type)==null?void 0:N.names)==null?void 0:D.join(" | ")),1),$("p",{innerHTML:G(c).toHTML((m==null?void 0:m.description)||"")},null,8,Se)])}),256)),(_(!0),k(z,null,V(h.entry.returns,m=>(_(),k("div",Ee,[Ne,$("code",null,A(m.type.names.join(" | ")),1)]))),256))])):R("",!0),(s=(n=h.entry)==null?void 0:n.meta)!=null&&s.arguments?(_(),k("div",Be,[(_(!0),k(z,null,V(h.entry.meta.arguments,(m,C)=>(_(),k("div",Oe,[$("span",null,A(m.name),1),$("code",null,A(m.type),1),$("p",{innerHTML:G(c).toHTML(m.description)},null,8,Ae)]))),256))])):R("",!0),(o=(l=h.entry)==null?void 0:l.meta)!=null&&o.example||(v=h.entry)!=null&&v.examples||(u=h.entry)!=null&&u.example?(_(),Q(j(`h${G(y)+1}`),{key:5},{default:K(()=>[U("Example")]),_:1})):R("",!0),(f=(d=h.entry)==null?void 0:d.meta)!=null&&f.example?(_(),k("pre",Ce,[$("code",null,A(h.entry.meta.example.replace(/include \.\.\/_k.pug/g,"include k-scaffold")),1)])):R("",!0),(_(!0),k(z,null,V((L=h.entry)==null?void 0:L.examples,(m,C)=>(_(),k("pre",{key:`${I.value}-example-${C}`},[$("code",null,A(m.replace(/\r|\n/g,`
`)),1)]))),128)),(_(!0),k(z,null,V((g=h.entry)==null?void 0:g.example,(m,C)=>(_(),k("pre",{key:`${I.value}-example-${C}`},[$("code",null,A(m.code.replace(/\r|\n/g,`
`)),1)]))),128)),(b=h.entry)!=null&&b.output?(_(),Q(j(`h${G(y)+1}`),{key:7},{default:K(()=>[U("Output")]),_:1})):R("",!0),(T=h.entry)!=null&&T.output?(_(),k("pre",Ie,[$("code",null,A(h.entry.output),1)])):R("",!0)])],8,ye)}}};const De={class:"library-container"},Ge={class:"library-nav"},Pe={class:"library-content"},qe={__name:"Library",props:["data"],setup(h){const{data:M}=h,c=M.reduce((y,w)=>{const S=w.kind==="namespace"?w.name.toLowerCase():w.memberof.toLowerCase();return y[S]=y[S]||{members:[]},w.kind==="namespace"?y[S].head=w:y[S].members.push(w),y},{});console.log("namespaceObjs",c);const I=Object.entries(c).reduce((y,[w,S])=>(y.push(S.head,...S.members.sort((B,x)=>{var H,O;return(B.name||((H=B.meta)==null?void 0:H.name)).localeCompare(x.name||((O=x.meta)==null?void 0:O.name))})),y),[]);return(y,w)=>{const S=de("routerLink");return _(),k("div",De,[$("nav",Ge,[$("ul",null,[(_(!0),k(z,null,V(Object.values(G(c)),(B,x)=>(_(),k("li",{key:`nav-entry-${x}`},[ue(S,{class:"nav-head",to:`#${B.head.name}`},{default:K(()=>[U(A(B.head.name),1)]),_:2},1032,["to"]),$("ul",null,[(_(!0),k(z,null,V(B.members,(H,O)=>{var J,E;return _(),k("li",{key:`nav-entry-${x}-${O}`},[ue(S,{to:`#${H.name||((J=H.meta)==null?void 0:J.name)||((E=H.context)==null?void 0:E.name)}`},{default:K(()=>{var F,q;return[U(A(H.name||((F=H.meta)==null?void 0:F.name)||((q=H.context)==null?void 0:q.name)),1)]}),_:2},1032,["to"])])}),128))])]))),128))])]),$("div",Pe,[pe(y.$slots,"default"),(_(!0),k(z,null,V(G(I),(B,x)=>(_(),Q(xe,{key:`entry-${x}`,entry:{...B,index:x}},null,8,["entry"]))),128))])])}}};export{qe as _};
