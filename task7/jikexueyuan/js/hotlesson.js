/**
 * 热门课程(页签切换，鼠标移入)
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var hotlessonjs = {};
    hotlessonjs.init = function() {
        this.render();
        this.bind();
    };
    hotlessonjs.render = function() {
        this.hotlessonNav = $(".hotlesson-nav");
        this.hotlessonbox = $(".hotlesson-box");
    };
    hotlessonjs.bind = function() {
        this.hotlessonNav.mouseover(this.event['changetab']);
        this.hotlessonbox.mouseenter(this.event['showInfo']);
        this.hotlessonbox.mouseleave(this.event['hideInfo']);
        this.hotlessonbox.mousemove(function(event) {
            console.log("move");
        });
    };
    hotlessonjs.event = {
        changetab: function(event) {
            var li = event.target;
            var index = $(li).index();
            $(".hotlesson-tab-selected").removeClass('hotlesson-tab-selected');
            $(li).addClass('hotlesson-tab-selected');
            $(".hotlesson-div-selected").removeClass('hotlesson-div-selected');
            $(".hotlesson-div").eq(index).addClass('hotlesson-div-selected');
        },
        showInfo: function() {
            $(this).find(".lesson-img-hide").fadeIn(200);
            $(this).find(".lesson-info-hide").slideDown(200);
        },
        hideInfo: function() {
            $(this).find(".lesson-img-hide").fadeOut(200);
            $(this).find(".lesson-info-hide").slideUp(200);
        }
    };
    module.exports = hotlessonjs;
});
