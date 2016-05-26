/**
 * 精品课程
 * @type {Object}
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var excelessonjs = {};
    excelessonjs.init = function() {
        this.render();
        this.bind();
    };
    excelessonjs.render = function() {
        this.exceBox = $(".execllent-box");
    };
    excelessonjs.bind = function() {
        this.exceBox.hover(this.event['showteacher']);
    };
    excelessonjs.event = {
        showteacher: function() {
            $(this).find(".describe").fadeToggle(200);
        }
    };
    module.exports = excelessonjs;
});
