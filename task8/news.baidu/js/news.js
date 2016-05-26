$(function() {
    getNewsType();
    initTable("0");
});

/**
 * 获取当前新闻类型
 * @return {[type]} [description]
 */
function getNewsType() {
    $(".nav ul").click(function(event) {
        var target = event.target || event.srcElement;
        $(".active").removeClass('active');
        var newsType = $(target).addClass('active').data('newstype');
        initTable(newsType);
    });
}

/**
 * 初始化新闻列表
 * @param  {[type]} newsType [新闻类型]
 * @return {[type]} [description]
 */
function initTable(newsType) {
    $.ajax({
        url: './php/querynews.php',
        type: 'GET',
        dataType: 'json',
        data: { newstype: newsType },
        success: function(data) {
            $('.news-list').empty(); //清除原有数据
            $.each(data, function(idx, item) {
                var newsItem = $('<div>').addClass('news-item').appendTo('.news-list');
                if (item.newsimg.match(/[a-zA-z]+:\/\/[^\s]+/)) { //有图片并且是正确的网址
                    var newsImg = $('<div>').addClass('news-image').appendTo(newsItem);
                    $('<img>').attr("src", item.newsimg).appendTo(newsImg);
                }
                var newsMainText = $('<div>').addClass('news-main-text').appendTo(newsItem);
                var newsTitle = $('<div>').addClass('news-title').appendTo(newsMainText);
                newsTitle.text(item.newstitle);
                var newsContent = $('<div>').addClass('news-content').appendTo(newsMainText);
                newsContent.text(item.newscontent);
                var newsBottom = $('<div>').addClass('news-bottom').appendTo(newsItem);
                var newsTime = $('<div>').addClass('news-time').appendTo(newsBottom);
                $('<b>').appendTo(newsTime).text(item.addtime);
            });
        },
        error: function(data) {
            console.log(data);
        }
    });
}

