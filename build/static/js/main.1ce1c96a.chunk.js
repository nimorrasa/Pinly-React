(this["webpackJsonppinly-react-project"]=this["webpackJsonppinly-react-project"]||[]).push([[0],{18:function(e,t,a){e.exports=a.p+"static/media/logo.1eb45792.png"},29:function(e,t,a){},41:function(e,t,a){e.exports=a(80)},46:function(e,t,a){},47:function(e,t,a){e.exports=a.p+"static/media/RSU_Regular.78cad10a.ttf"},48:function(e,t,a){e.exports=a.p+"static/media/RSU_light.cdd9e6d5.ttf"},49:function(e,t,a){e.exports=a.p+"static/media/RSU_BOLD.f55f1863.ttf"},50:function(e,t,a){},51:function(e,t,a){},69:function(e,t,a){},77:function(e,t,a){},80:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),c=a(17),r=a.n(c),m=(a(46),a(47),a(48),a(49),a(50),a(10)),o=a(90),i=a(91),s=a(38),u=a(83),E=a(84),p=a(85),b=a(86),h=a(87),f=a(88),g=a(89),d=(a(51),function(e){var t=Object(n.useState)(e.isDark),a=Object(m.a)(t,2),c=a[0],r=a[1];return l.a.createElement("button",{className:"icon-button"},l.a.createElement("input",{type:"checkbox",className:"checkbox",id:"night-mode",value:c,onChange:function(){var t=!c;r(t),e.onChangeTheme(t)},defaultChecked:c}),l.a.createElement("label",{htmlFor:"night-mode",className:"label"},l.a.createElement("i",{className:"fa fa-sun-o"}),l.a.createElement("i",{className:"fa fa-moon-o"}),l.a.createElement("div",{className:"blob"})))}),N=a(81),k=a(92),O=a(93),v=a(82),y=(a(29),function(e){var t=Object(n.useState)(!1),a=Object(m.a)(t,2),c=a[0],r=a[1],o=Object(n.useCallback)((function(){r(!0)}),[r]),i=Object(n.useCallback)((function(){r(!1)}),[r]);return l.a.createElement(N.a,{className:e.theme,onMouseOver:o,onMouseLeave:i,isOpen:c,toggle:function(){return r(!c)}},l.a.createElement(k.a,{tag:"button",type:"button",className:"my-button"},"text"===e.titleType?e.title:l.a.createElement("i",{className:e.title})),l.a.createElement(O.a,{right:"right"===e.alignment},e.items.map((function(e,t){return l.a.createElement(v.a,{key:t},l.a.createElement("a",null,e))}))))}),j=(a(69),function(e){var t=Object(n.useState)(!1),a=Object(m.a)(t,2),c=a[0],r=a[1],o=Object(n.useCallback)((function(){r(!0)}),[r]),i=Object(n.useCallback)((function(){r(!1)}),[r]);return l.a.createElement(N.a,{className:e.theme,onMouseOver:o,onMouseLeave:i,isOpen:c,toggle:function(){return r(!c)}},l.a.createElement(k.a,{tag:"button",type:"button",className:"my-button my-setting"},l.a.createElement("i",{className:"fa fa-cog"})),l.a.createElement(O.a,{right:!0},l.a.createElement(v.a,{className:"my-language"},"Language ",l.a.createElement("a",null,"TH"),"/",l.a.createElement("a",null,"EN")),l.a.createElement(v.a,null,l.a.createElement("a",null,"Voice Over")),l.a.createElement(v.a,null,l.a.createElement("a",null,"Logout"))))}),S=function(e){return"icon"===e.type?l.a.createElement("button",{tag:"button",type:"button",className:"my-button"},l.a.createElement("i",{className:e.title})):l.a.createElement("button",{tag:"button",type:"button",className:"my-button"},e.title)},x=a(18),C=a.n(x),T=function(e){var t=Object(n.useState)(!1),a=Object(m.a)(t,2),c=a[0],r=a[1],o=Object(n.useState)("dark"===e.theme),i=Object(m.a)(o,2),s=i[0],N=i[1],k=Object(n.useState)(e.theme),O=Object(m.a)(k,2),v=O[0],x=O[1],T=Object(n.useCallback)((function(t){var a=t?"dark":"light";N(t),x(a),e.onChangeTheme(a)}),[N,x]);return l.a.createElement("div",null,l.a.createElement(u.a,{className:"theme_"+v,bg:v,light:"light"===v,dark:"dark"===v,expand:"md"},l.a.createElement(E.a,{href:"/"},l.a.createElement(p.a,{className:"App-header-logo",src:C.a})),l.a.createElement(b.a,{onClick:function(){return r(!c)}}),l.a.createElement(h.a,{isOpen:c,navbar:!0},l.a.createElement(f.a,{className:"mr-auto",navbar:!0},l.a.createElement(g.a,null,l.a.createElement(S,{type:"text",title:"Home"})),l.a.createElement(g.a,null,l.a.createElement(S,{type:"text",title:"Profile"})),l.a.createElement(g.a,null,l.a.createElement(y,{theme:v,alignment:"left",titleType:"text",title:"Sleep Test",items:["sleep score","sleep form"]})),l.a.createElement(g.a,null,l.a.createElement(S,{type:"text",title:"Setting"})),l.a.createElement(g.a,null,l.a.createElement(S,{type:"icon",title:"fa fa-question-circle"}))),l.a.createElement(f.a,{className:"mr-auto-right",navbar:!0},l.a.createElement(g.a,null,l.a.createElement(d,{isDark:s,onChangeTheme:T})),l.a.createElement(g.a,null,l.a.createElement(j,{theme:v}))))))},A=(a(77),function(e){var t=Object(n.useState)("theme_dark"),a=Object(m.a)(t,2),c=a[0],r=a[1],u=Object(n.useCallback)((function(e){r("theme_"+e)}),[r]),E="theme_dark"===c?"dark":"light";return l.a.createElement("div",{className:"App Home "+c},l.a.createElement(T,{theme:E,onChangeTheme:u}),l.a.createElement("header",{className:"App-header"},l.a.createElement("img",{src:C.a,className:"App-logo",alt:"logo"})),l.a.createElement("div",null,l.a.createElement(o.a,{className:"App-content "+c},l.a.createElement(i.a,{className:"Link-padding"},l.a.createElement("a",{className:"App-link",href:"#login"},"Login")," | ",l.a.createElement("a",{className:"App-link",href:"#sign_up"},"Sign Up")),l.a.createElement(i.a,null,l.a.createElement(s.a,{style:{borderWidth:2,borderRadius:20},className:"App-button"},"GET STARTED")))))});var _=function(){return l.a.createElement(A,{theme:"theme_dark"})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(78),a(79);r.a.render(l.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[41,1,2]]]);
//# sourceMappingURL=main.1ce1c96a.chunk.js.map