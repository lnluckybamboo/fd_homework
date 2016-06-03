$(function() {
    var newsTable = new NewsTable();
    newsTable.init();

    var buttonGroup = new ButtonGroup();
    buttonGroup.init();
});

var NewsTable = function() {
    var newstable = this;
    newstable.init = function() {
        $('#newstable').bootstrapTable({
            url: 'news/queryAll', //请求后台的URL（*）
            method: 'GET', //请求方式（*）
            clickToSelect: true, //是否启用点击选中行
            singleSelect: true,
            uniqueId: "newsid", //每一行的唯一标识，一般为主键列
            columns: [{
                checkbox: true
            }, {
                field: 'newsid',
                title: '新闻编号',
                width: '5%',
                editable: true
            }, {
                field: 'newstitle',
                title: '新闻标题',
                width: '12%',
                editable: true,
            }, {
                field: 'newsimg',
                title: '新闻图片',
                width: '10%',
                editable: true,
                formatter: function(value, row, index) {
                    return formatImg(value);
                }
            }, {
                field: 'newscontent',
                title: '新闻内容',
                width: '40%',
                editable: true,
            }, {
                field: 'addtime',
                title: '创建时间',
                width: '8%',
                editable: true,
                formatter: function(value, row, index) {
                    return formatDate(value);
                }
            }, {
                field: 'newstype',
                title: '新闻类别',
                width: '8%',
                editable: true,
                formatter: function(value, row, index) {
                    return formatType(value);
                }
            }, {
                field: 'operate',
                title: '操作',
                width: '10%',
                editable: true,
                formatter: function() {
                    return " <span class='addBtn glyphicon glyphicon-plus'></span><span class='editBtn glyphicon glyphicon-pencil'></span><span class='delBtn glyphicon glyphicon-remove'></span>";
                }
            }]
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
            var param = "newstitle=" + encodeURIComponent(encodeURIComponent(newstitle));
            param += "&newstype=" + encodeURIComponent(encodeURIComponent(newstype));
            param += "&newsimg=" + encodeURIComponent(encodeURIComponent(newsimg));
            param += "&newscontent=" + encodeURIComponent(encodeURIComponent(newscontent));
            param += "&addtime=" + encodeURIComponent(encodeURIComponent(addtime));
            $.ajax({
                url: 'news/insert',
                type: 'POST',
                dataType: 'json',
                data: param,
                success: function(data) {
                    console.log("新增成功", data);
                    window.location.reload();
                },
                error: function(data) {
                    alert("新增失败", data);
                }
            });
        },
        edit: function(element) {
            var selections = $("#newstable").bootstrapTable('getSelections');
            $("#newsModal").modal({ show: true });
            $("#updateBtn").show();
            $("#insertBtn").hide();
            $("#newsid").val(selections[0].newsid);
            $("#newsid").attr('readonly', 'readonly');
            $("#newstitle").html(selections[0].newstitle);
            $("#newstype").html(selections[0].newstype);
            $("#newsimg").html(selections[0].newsimg);
            $("#newscontent").html(selections[0].newscontent);
            $("#addtime").val(new Date(Date.parse(formatDate(selections[0].addtime).replace(/-/g, "/"))).toDateInputValue());
        },
        update: function() {
            var newsid = $("#newsid").val();
            var newstitle = $("#newstitle").val();
            var newstype = $("#newstype").val();
            var newsimg = $("#newsimg").val();
            var newscontent = $("#newscontent").val();
            var addtime = $("#addtime").val();
            var param = "newsid=" + encodeURIComponent(encodeURIComponent(newsid));
            param += "&newstitle=" + encodeURIComponent(encodeURIComponent(newstitle));
            param += "&newstype=" + encodeURIComponent(encodeURIComponent(newstype));
            param += "&newsimg=" + encodeURIComponent(encodeURIComponent(newsimg));
            param += "&newscontent=" + encodeURIComponent(encodeURIComponent(newscontent));
            param += "&addtime=" + encodeURIComponent(encodeURIComponent(addtime));
            $.ajax({
                url: 'news/update',
                type: 'POST',
                dataType: 'json',
                data: param,
                success: function(data) {
                    console.log("修改成功");
                    window.location.reload();
                },
                error: function() {
                    alert("修改失败!");
                }
            });
        },
        delete: function(element) {
            var selections = $("#newstable").bootstrapTable('getSelections');
            var selectid =encodeURIComponent(encodeURIComponent(selections[0].newsid));
            $.ajax({
                url: 'news/delete',
                type: 'post',
                dataType: 'json',
                data: { newsid: selectid },
                success: function(data) {
                    console.log("删除成功 ", data);
                    window.location.reload();
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
    // if (img == "" || img == null) {
    //     return "没有图片";
    // } else if (img.match(/[a-zA-z]+:\/\/[^\s]+/)) {
    //     var jQimg = $("<img>").attr({
    //         src: img,
    //         width: 100
    //     });
    //     return jQimg;
    // } else {
    //     return "图片地址错误";
    // }
    if (img == "" || img == null) {
        return "没有图片";
    } else if (img.match(/[a-zA-z]+:\/\/[^\s]+/)) {
        return "<img src=" + img + " width=100 />";
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
