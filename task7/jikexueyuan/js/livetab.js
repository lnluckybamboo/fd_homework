/**
 * 公开课页签切换
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var livetabjs = {};

    livetabjs.init = function() {
        this.render();
        this.bind();
    };
    livetabjs.render = function() {
        this.weekul = $(".livebox-week");
    };
    livetabjs.bind = function() {
        this.weekul.mouseover(this.event['changetab']);
    };
    livetabjs.event = {
        changetab: function(event) {
            var li = event.target;
            var index = $(li).index();
            $(".today").removeClass('today');
            $(li).addClass('today');
            $(".lessonshow").removeClass('lessonshow');
            $(".livebox-lesson-list").eq(index).addClass('lessonshow');
        }
    };
    module.exports = livetabjs;
});
