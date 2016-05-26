/**
 * 页脚二维码
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var footerjs = {};
    footerjs.init = function() {
        this.render();
        this.bind();
    };
    footerjs.render = function() {
        this.qqIcon = $(".qq-icon");
        this.top = $(".top");
    };
    footerjs.bind = function() {
        this.qqIcon.hover(this.event["weinxinpop"]);
        this.top.click(this.event['top']);
        $(window).scroll(function(event) {
            if ($(window).scrollTop() > 100) {
                $(".top").fadeIn(200);
            } else {
                $(".top").fadeOut(200);
            }
        });
    };
    footerjs.event = {
        weinxinpop: function() {
            $(this).children(".weinxinpop").stop().fadeToggle(200);
        },
        top: function() {
            $("body,html").animate({ scrollTop: 0 }, 300);
        }
    };
    module.exports = footerjs;
});
