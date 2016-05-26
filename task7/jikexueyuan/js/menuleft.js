/**
 * 菜单左侧列表
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var menuleftjs = {};
    menuleftjs.init = function() {
        this.render();
        this.bind();
    };
    menuleftjs.render = function() {
        this.lessonli = $(".lesson-classfiy-nav>ul>li");
    };
    menuleftjs.bind = function() {
        this.lessonli.mouseenter(this.event['showlessonlist']);
        this.lessonli.mouseleave(this.event['hidelessonlist']);
    };
    menuleftjs.event = {
        showlessonlist: function() {
            $(this).children('div').addClass("lesson-nav-selected");
            $(this).prev().children('div').addClass("lesson-nav-selected-prev");
            $(this).find(".lesson-list-show").show();
        },
        hidelessonlist: function() {
            $(".lesson-nav-selected").removeClass("lesson-nav-selected");
            $(this).find(".lesson-list-show").hide();
        }
    };
    module.exports = menuleftjs;
});
