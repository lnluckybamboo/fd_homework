var boxWidth = 0;
var curCount = 0;

$(function($) {
    imageLocation();
    var imgData = { "data": [{ "src": "0.jpg" }, { "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }, { "src": "6.jpg" }, { "src": "7.jpg" }, { "src": "8.jpg" }, { "src": "9.jpg" }, ] };
    $(window).scroll(function(event) {
        if (scrollside()) {
            //动态增加图片
            $.each(imgData.data, function(index, el) {
                var addbox = $("<div>").addClass('box').appendTo('.container');
                var content = $("<div>").addClass('content').appendTo(addbox);
                $("<img>").attr("src", "img/" + $(el).attr("src")).appendTo(content);
            });
            //新增图片定位
            imageLocation();
        }
    });

});

$(window).resize(function(event) {
    refreshWaterfall();
    imageLocation();
});

// 适配浏览器宽度变化
function refreshWaterfall() {
    var docWidth = $(document).find('body').width();
    var newCount = Math.floor(docWidth / boxWidth);
    if (curCount != newCount) {
        window.location.reload(); //刷新当前页面
        curCount = newCount;
    }
}
/**
 * 滚动鼠标加载图片条件
 */
function scrollside() {
    var box = $(".box"); //包含新加入的box
    var lastBoxHeight = box.last().get(0).offsetTop + box.last().height() / 2; //最后一张图片加载到一半是的高度
    var scrollHeight = $(window).scrollTop(); //鼠标滚动的高度
    var windowHeight = $(window).height(); //当前高度
    return lastBoxHeight < scrollHeight + windowHeight;
}

/**
 * 图片位置摆放
 * @return {[type]} [description]
 */
function imageLocation() {
    var box = $(".box");
    boxWidth = box.width();
    var windowWidth = $(window).width();
    curCount = Math.floor(windowWidth / boxWidth);
    var boxArray = []; //存放box高度的数组
    box.each(function(index, element) {
        var boxHeight = box.eq(index).height();
        if (index < curCount) {
            boxArray[index] = boxHeight;
        } else {
            var minBoxHeight = Math.min(Math.min.apply(null, boxArray));
            var minBoxIndex = $.inArray(minBoxHeight, boxArray);
            //绝对定位放置新图片的位置，在当前上一行高度最小的图片下方
            $(element).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": boxWidth * minBoxIndex
            });
            boxArray[minBoxIndex] = minBoxHeight + boxHeight; //更改当前最小高度
        }
    });
}
