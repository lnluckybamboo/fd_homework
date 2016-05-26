//真实内容的高度
var pageHeight = 0;
//视窗的高度
var viewportHeight = $(".main").height();

var itemHeight = 91;
var pageCount = 1, //当前第几页
    AMOUNT = Math.floor(viewportHeight / itemHeight) + 1, //每页显示多少行
    last = 0; //上一页最后一行数



var newsType = 0; //默认的新闻类型

$(function() {
    new NewsType().init();
    initTable(newsType);
    $(".main").on("scroll", scrollFn); //绑定滚动事件
});

function lowEnough() {
    //隐藏的高度
    var scrollHeight = $(".main").scrollTop();
    console.log("真实内容的高度" + pageHeight);
    console.log("视窗的高度" + viewportHeight);
    console.log("隐藏的高度" + scrollHeight);
    return pageHeight - viewportHeight - scrollHeight < 20;
}

function scrollFn() {
    if (lowEnough()) { //如果满足触发条件，执行
        initTable(newsType);
    }
}

var NewsType = function() {
    this.init = function() {
        this.render();
        this.bind();
    };
    this.render = function() {
        this.ul = $(".nav ul");
    };
    this.bind = function() {
        this.ul.on('click', this.event.changeType);
    };
    this.event = {
        changeType: function() {
            var target = event.target || event.srcElement;
            $(".active").removeClass('active');
            newsType = $(target).addClass('active').data('newstype');
            pageCount = 1;
            last = 0;
            $('.news-list').empty(); //清除原有数据
            initTable(newsType);
        }
    }
}

/**
 * 初始化新闻列表
 * @param  {[type]} newsType [新闻类型]
 * @return {[type]} [description]
 */
function initTable(newsType) {
    var param = "newstype=" + newsType;
    param += "&last=" + last;
    param += "&amout=" + AMOUNT;
    $.ajax({
        url: 'news/queryByType',
        type: 'GET',
        dataType: 'json',
        data: param,
        success: function(data) {
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
                $('<b>').appendTo(newsTime).text(formatDate(item.addtime));
            });
            //更新当前页和上一页最后一个数
            last = pageCount * AMOUNT;
            pageCount++;
            pageHeight = $(".news-item").outerHeight() * last;
        },
        error: function(data) {
            console.log(data);
        }
    });
}


function formatDate(dateStr) {
    var fulldate = new Date(dateStr);
    var year = fulldate.getFullYear();
    var month = fulldate.getMonth() + 1;
    var day = fulldate.getDate();
    return year + "-" + month + "-" + day;
}
