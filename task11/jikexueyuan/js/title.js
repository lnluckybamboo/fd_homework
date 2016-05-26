 /**
  * 带问号的标题
  */
 define(function(require, exports, module) {
     var $ = require('jquery');
     var titlejs = {};
     titlejs.init = function() {
         this.render();
         this.bind();
     };
     titlejs.render = function() {
         this.way = $(".way");
     };
     titlejs.bind = function() {
         this.way.hover(this.event['showInfo']);
     };
     titlejs.event = {
         showInfo: function() {
             $(".way-infor").fadeToggle(400);
         }
     };
     module.exports = titlejs;
 });
