$(function() {
    var newsTable = new NewsTable();
    newsTable.init();

    var buttonGroup = new ButtonGroup();
    buttonGroup.init();
});

var NewsTable = function() {
    var newstable = this;
    newstable.init = function() {
        $.ajax({
            url: 'news/queryAll',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(data) {
                $.each(data, function(index, val) {
                    var tbody = $("#newstable").children('tbody');
                    var tr = $("<tr>").appendTo(tbody);
                    var newsid = $("<td>").addClass('newsid').attr('width', '5%').text(val.newsid).appendTo(tr);
                    var newstitle = $("<td>").addClass('newstitle').attr('width', '12%').text(val.newstitle).appendTo(tr);
                    var newsimg = $("<td>").addClass('newsimg').attr('width', '10%').append(formatImg(val.newsimg)).appendTo(tr);
                    var newscontent = $("<td>").addClass('newscontent').attr('width', '40%').text(val.newscontent).appendTo(tr);
                    var newstype = $("<td>").addClass('newstype').attr('width', '8%').text(formatType(val.newstype)).appendTo(tr);
                    var addtime = $("<td>").addClass('addtime').attr('width', '10%').text(formatDate(val.addtime)).appendTo(tr);
                    var operate = $("<td>").attr('width', '15%').appendTo(tr);
                    var addBtn = $("<span>").addClass('addBtn glyphicon glyphicon-plus').appendTo(operate);
                    var editBtn = $("<span>").addClass('editBtn glyphicon glyphicon-pencil').appendTo(operate);
                    var delBtn = $("<span>").addClass('delBtn glyphicon glyphicon-remove').appendTo(operate);
                });
            }
        });
    };
};

var ButtonGroup = function() {
    var buttongroup = this;

    buttongroup.init = function() {
        buttongroup.render();
        buttongroup.bind();
    };

    buttongroup.render = function() {
        buttongroup.newstable = $("#newstable");
        buttongroup.insertBtn = $("#insertBtn");
        buttongroup.updateBtn = $("#updateBtn");
    };
    buttongroup.bind = function() {
        buttongroup.newstable.on('click', function(event) {
            var className = event.target.className;
            if (/addBtn/.test(className)) {
                buttongroup.event.add(event.target);
            } else if (/editBtn/.test(className)) {
                buttongroup.event.edit(event.target);
            } else if (/delBtn/.test(className)) {
                buttongroup.event.delete(event.target);
            }
        });
        buttongroup.insertBtn.on('click', buttongroup.event.insert);
        buttongroup.updateBtn.on('click', buttongroup.event.update);
    };
    buttongroup.event = {
        add: function() {
            $("#newsModal").modal({ show: true });
            $("#insertBtn").show();
            $("#updateBtn").hide();
            $("#newsid").val("");
            $("#newsid").attr('readonly', 'readonly');
            $("#newstitle").val("");
            $("#newstype").val("0");
            $("#newsimg").val("");
            $("#newscontent").val("");
            $("#addtime").val(new Date().toDateInputValue());
        },
        insert: function() {
            var newstitle = $("#newstitle").val();
            var newstype = $("#newstype").val();
            var newsimg = $("#newsimg").val();
            var newscontent = $("#newscontent").val();
            var addtime = $("#addtime").val();
            var paramEncode = "newstitle=" + encodeURIComponent(newstitle);
            paramEncode += "&newstype=" + encodeURIComponent(newstype);
            paramEncode += "&newsimg=" + encodeURIComponent(newsimg);
            paramEncode += "&newscontent=" + encodeURIComponent(newscontent);
            paramEncode += "&addtime=" + encodeURIComponent(addtime);
            $.ajax({
                url: 'news/insert',
                type: 'POST',
                dataType: 'json',
                data: paramEncode,
                success: function(data) {
                    console.log("新增成功", data);
                    $("tbody").children().remove();
                    var newsTable = new NewsTable();
                    newsTable.init();
                },
                error: function(data) {
                    alert("新增失败", data);
                }
            });
        },
        edit: function(element) {
            $("#newsModal").modal({ show: true });
            $("#updateBtn").show();
            $("#insertBtn").hide();
            var tr = $(element).parent().parent();
            $("#newsid").val(tr.children('.newsid').text());
            $("#newsid").attr('readonly', 'readonly');
            $("#newstitle").val(tr.children('.newstitle').text());
            $("#newstype").val(changeToTypeCode(tr.children('.newstype').text()));
            $("#newsimg").val(tr.children('.newsimg').children('img').attr('src'));
            $("#newscontent").val(tr.children('.newscontent').text());
            $("#addtime").val(new Date(tr.children('.addtime').text()).toDateInputValue());
        },
        update: function() {
            var newsid = $("#newsid").val();
            var newstitle = $("#newstitle").val();
            var newstype = $("#newstype").val();
            var newsimg = $("#newsimg").val();
            var newscontent = $("#newscontent").val();
            var addtime = $("#addtime").val();
            var paramEncode = "newsid=" + encodeURIComponent(newsid);
            paramEncode += "&newstitle=" + encodeURIComponent(newstitle);
            paramEncode += "&newstype=" + encodeURIComponent(newstype);
            paramEncode += "&newsimg=" + encodeURIComponent(newsimg);
            paramEncode += "&newscontent=" + encodeURIComponent(newscontent);
            paramEncode += "&addtime=" + encodeURIComponent(addtime);
            $.ajax({
                url: 'news/update',
                type: 'POST',
                dataType: 'json',
                data: paramEncode,
                success: function(data) {
                    console.log("修改成功");
                    $("tbody").children().remove();
                    var newsTable = new NewsTable();
                    newsTable.init();
                },
                error: function() {
                    alert("修改失败!");
                }
            });
        },
        delete: function(element) {
            var tr = $(element).parent().parent();
            var selectid = tr.children('.newsid').text();
            $.ajax({
                url: 'news/delete',
                type: 'post',
                dataType: 'json',
                data: { newsid: selectid },
                success: function(data) {
                    console.log("删除成功 ", data);
                    tr.remove();
                },
                error: function(data) {
                    alert("删除失败", data);
                }
            });

        }
    };
};

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
/**
 * 将&分割的参数列表转换成json
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
function changeToJson(param) {
    var paramJson = new Object();
    var params = decodeURI(encodeURI(param)).split("&");  
    for (var i = 0; i < params.length; i++) {
        paramJson[params[i].split("=")[0]] = decodeURIComponent(params[i].split("=")[1]);  
    }
    return paramJson;
}

/**
 * 格式化新闻类别
 * @param  {[type]} type [新闻类别编码]
 * @return {[type]}      [新闻类别名称]
 */
function formatType(type) {
    switch (type) {
        case 0:
            return "推荐";
            break;
        case 1:
            return "本地";
            break;
        default:
            return "其他";
    }
}

function changeToTypeCode(typeStr) {
    switch (typeStr) {
        case "推荐":
            return 0;
            break;
        case "本地":
            return 1;
            break;
        case "其他":
            return 2;
    }
}

/**
 * 格式化新闻图片
 * @param  {[type]} img [图片src]
 * @return {[type]}     [img元素]
 */
function formatImg(img) {
    if (img == "" || img == null) {
        return "没有图片";
    } else if (img.match(/[a-zA-z]+:\/\/[^\s]+/)) {
        var jQimg = $("<img>").attr({
            src: img,
            width: 100
        });
        return jQimg;
    } else {
        return "图片地址错误";
    }

}


function formatDate(dateStr) {
    var fulldate = new Date(dateStr);
    var year = fulldate.getFullYear();
    var month = fulldate.getMonth() + 1;
    var day = fulldate.getDate();
    return year + "-" + month + "-" + day;
}
