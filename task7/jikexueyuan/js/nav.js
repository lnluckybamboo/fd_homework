/**
 * 导航
 */
define(function(require, exports, module) {
    var $ = require("jquery");
    var navjs = {};
    navjs.init = function() {
        this.render();
        this.bind();
    };
    navjs.render = function() {
        this.navbox = $(".navbox");
        this.navboxa = this.navbox.children('a');
        this.navlistItem = $(".panel-item");
    };
    navjs.bind = function() {
        this.navbox.hover(this.event['shownavlist']);
        this.navboxa.hover(this.event['changelistItem']);
        this.navlistItem.hover(this.event['changeNavlistBg']);
    };
    navjs.event = {
        shownavlist: function() {
            $(".navlist").toggle(200);
        },
        changelistItem: function() {
            var index = $(this).index();
            $(".panel-item-hover").removeClass('panel-item-hover');
            $(".panel-item").eq(index - 1).addClass('panel-item-hover');
            $(".panel-item").eq(index - 1).children('.angle').toggle();
        },
        changeNavlistBg: function() {
            $(".panel-item-hover").removeClass('panel-item-hover');
            $(this).addClass('panel-item-hover');
            $(this).children('.angle').toggle();
        }
    };

    // 或者通过 module.exports 提供整个接口
    module.exports = navjs;

});
