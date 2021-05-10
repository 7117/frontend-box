(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/news-item/news-item"],{"2ac4":function(t,n,e){},"354f":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var r=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.newsList,(function(n,e){var a=t.__get_orig(n),r=t._f("formatDate")(n.add_time);return{$orig:a,f0:r}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},i=[]},"57ef":function(t,n,e){"use strict";e.r(n);var a=e("354f"),r=e("7cf8");for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);e("c760");var u,c=e("f0c5"),o=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=o.exports},"7cf8":function(t,n,e){"use strict";e.r(n);var a=e("a61c"),r=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=r.a},a61c:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={props:["newsList"],filters:{formatDate:function(t){var n=new Date(t),e=n.getFullYear(),a=n.getMonth().toString().padStart(2,0),r=n.getDay().toString().padStart(2,0);return e+"-"+a+"-"+r}},methods:{navigator:function(t){this.$emit("itemClick",t)}}};n.default=a},c760:function(t,n,e){"use strict";var a=e("2ac4"),r=e.n(a);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/news-item/news-item-create-component',
    {
        'components/news-item/news-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("57ef"))
        })
    },
    [['components/news-item/news-item-create-component']]
]);
