(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function n(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?e(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):e(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function o(e,n,o){return(n=function(e){var n=function(e,n){if("object"!==t(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,"string");if("object"!==t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(n)?n:String(n)}(n))in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}var r={sampleData:null,version:"v1.0.0",init:function(t){return this.sampleData=t||null,this},getConfig:function(t){if(window.frameElement)return t=t||window.frameElement.getAttribute("iframe-id"),window.parent.plugMessage?window.parent.getPlugInit(t)||{}:void 0},setMessage:function(t){var e=this.getConfig();window.parent.plugMessage&&window.parent.plugMessage("onMessage",{relatKeys:e.relatKeys,data:t})},setCreated:function(t){var e=this.getConfig();window.parent.plugMessage&&window.parent.plugMessage("onCreated",{relatKeys:e.relatKeys,data:t})},setMounted:function(t){var e=this.getConfig();window.parent.plugMessage&&window.parent.plugMessage("onMounted",{relatKeys:e.relatKeys,data:t})},setLoading:function(t){var e=this.getConfig();window.parent.plugMessage&&window.parent.plugMessage("onLoading",{relatKeys:e.relatKeys,data:t})},setCustom:function(t){var e=this.getConfig();window.parent.plugMessage&&window.parent.plugMessage("onCustom",{relatKeys:e.relatKeys,data:t})},setload:function(t){var e=this.getConfig();window.parent.plugMessage&&window.parent.plugMessage("onload",{relatKeys:e.relatKeys,data:t})},setUnmount:function(t){var e=this.getConfig();window.parent.plugMessage&&window.parent.plugMessage("onUnmount",{relatKeys:e.relatKeys,data:t})},onContent:function(){},onOption:function(){},onCustom:function(){}};window.onContent=function(t,e){r.config=n(n({},r.config),e),r.onContent(t,e)},window.onOption=function(t){if("string"==typeof t&&str.constructor==String)throw new Error("The 'option' parameter does not exist！");var e=r.getConfig();r.onOption(n(n({},e.option),t))},window.onCustom=function(t){r.onCustom(t)},window.weblogic=r})();