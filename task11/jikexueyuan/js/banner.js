/**
 * 广告图片自动轮播
 * @type {Swiper}
 */
define(function(require, exports, module) {
    var swiperSea = require('swiper');
    new swiperSea('.bannerbox', {
        loop: true,
        pagination: '.swiper-pagination',
        nextButton: '#banner-right',
        prevButton: '#banner-left',
        paginationClickable: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
});
