define(function(require, exports, module) {
    var swiperSea = require('swiper');
    new swiperSea('.strategy-box', {
        loop: true,
        nextButton: '#banner-right3',
        prevButton: '#banner-left3',
        slidesPerView: 6
    });
});