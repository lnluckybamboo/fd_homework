// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    require("nav").init();
    require("menuleft").init();
    require("menuright").init();
    require("banner");
    require("focuswork");
    require("livetab").init();
    require("hotlesson").init();
    require("title").init();
    require("excelesson").init();
    require("wiki").init();
    require("strategy");
    require("toggleArrow").init();
    require("footer").init(); 
});
