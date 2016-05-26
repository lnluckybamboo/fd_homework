/**
 * 菜单右侧列表
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var menurightjs = {};

    menurightjs.init = function() {
        this.render();
        this.bind();
    };
    menurightjs.render = function() {
        this.startlistPre = $(".start-list li:lt(4)");
        this.startlistNext = $(".start-list li:gt(3)");
        this.typelistli = $(".type-list li");
        this.movelist = $(".move-list");
    };
    menurightjs.bind = function() {
        this.startlistPre.mouseenter(this.event["changeToList"]);
        this.startlistNext.mouseenter(this.event["changeColor"]);
        this.startlistNext.mouseleave(this.event["changeColorBack"]);
        this.typelistli.mouseenter(this.event["changeTab"]);
        this.movelist.mouseleave(this.event["changeToCard"]);
    };
    menurightjs.event = {
        changeToList: function() {
            var index = $(this).index();
            $(".start-list").stop().hide();
            $(".move-list").stop().show();
            $(".active").removeClass("active");
            $(".type-list li").eq(index).addClass("active");
            $(".tab-content").eq(index).fadeIn();
        },
        changeColor: function() {
            $(this).children('a').addClass("active");
        },
        changeColorBack: function() {
            $(".active").removeClass("active");
        },
        changeTab: function() {
            $(".active").removeClass("active");
            $(this).addClass("active");
            $(".tab-content").stop().hide().eq($(this).index()).stop().show();
        },
        changeToCard: function() {
            $(".move-list").stop().hide();
            $(".start-list").stop().show();
        }
    };
    module.exports = menurightjs;
});
