/**
 * Wiki
 * @type {Object}
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var wikijs = {};
    wikijs.init = function() {
        this.render();
        this.bind();
    };
    wikijs.render = function() {
        this.fengmian = $(".fengmian");
        this.dd = $(".wiki-img>dl>dd");
    };
    wikijs.bind = function() {
        this.fengmian.hover(this.event['bookTransform']);
        this.dd.hover(this.event['changeGreen'], this.event['colorBack']);
    };
    wikijs.event = {
        bookTransform: function() {
            $(this).siblings(".look").fadeToggle(600);
        },
        changeGreen: function() {
            $(this).find("h3,span").addClass("greentxt");
        },
        colorBack: function() {
            $(this).find("h3,span").removeClass("greentxt");
        }
    };
    module.exports = wikijs;
});
