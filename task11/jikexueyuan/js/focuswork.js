/**
 * 3个一组图片轮播
 * @type {Swiper}
 */
define(function(require, exports, module) {
    var swiperSea = require('swiper');
    new swiperSea('.focusworkbox', {
        loop: true,
        nextButton: '#focuswork-right',
        prevButton: '#focuswork-left',
        slidesPerView: 3
    });
});
