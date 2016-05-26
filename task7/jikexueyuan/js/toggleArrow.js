 /**
  * 轮播箭头的隐藏和显示
  * @type {Object}
  */
 define(function(require, exports, module) {
     var $ = require('jquery');
     var toggleArrowjs = {};
     toggleArrowjs.init = function() {
         this.render();
         this.bind();
     };
     toggleArrowjs.render = function() {
         this.swiperBox = $(".swiper-box");
     };
     toggleArrowjs.bind = function() {
         this.swiperBox.hover(this.event["toggleArrow"]);
     };
     toggleArrowjs.event = {
         toggleArrow: function() {
             $(this).children(".arrow-left").stop().fadeToggle(200);
             $(this).children(".arrow-right").stop().fadeToggle(200);
         }
     };
     module.exports = toggleArrowjs;
 });
