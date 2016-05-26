$(function() {

    //1.初始化Table
    var newsTable = new NewsTable();
    newsTable.init();

    //2.初始化Button的点击事件
    var buttonGroup = new ButtonGroup();
    buttonGroup.init();

});

var selectIndex;
var NewsTable = function() {
    var newstable = this;
    //初始化Table
    newstable.init = function() {
        $('#newstable').bootstrapTable({
            url: './php/querynews.php', //请求后台的URL（*）
            method: 'GET', //请求方式（*）
            toolbar: '#toolbar', //工具按钮用哪个容器
            striped: true, //是否显示行间隔色
            cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            sortable: false, //是否启用排序
            sortOrder: "asc", //排序方式
            showColumns: true, //是否显示所有的列
            showRefresh: true, //是否显示刷新按钮
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
                width: '20%',
                editable: true
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
                width: '50%',
                editable: true
            }, {
                field: 'addtime',
                title: '创建时间',
                width: '8%',
                editable: true
            }, {
                field: 'newstype',
                title: '新闻类别',
                width: '7%',
                editable: true,
                formatter: function(value, row, index) {
                    return formatType(value);
                }
            }],
            onClickRow: function(row, ele) {
                selectIndex = ele.index($(this).parent()[0]);
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
        buttongroup.inputNewsid = $("#newsid");
        buttongroup.addBtn = $("#btn_add");
        buttongroup.editBtn = $("#btn_edit");
        buttongroup.delBtn = $("#btn_delete");
        buttongroup.insertBtn = $("#insertBtn");
        buttongroup.updateBtn = $("#updateBtn");
    };
    buttongroup.bind = function() {
        buttongroup.inputNewsid.on('blur', buttongroup.event.validateId);
        buttongroup.addBtn.on('click', buttongroup.event.addBtn);
        buttongroup.editBtn.on('click', buttongroup.event.editBtn);
        buttongroup.delBtn.on('click', buttongroup.event.delete);
        buttongroup.insertBtn.on('click', buttongroup.event.insert);
        buttongroup.updateBtn.on('click', buttongroup.event.update);
    };
    buttongroup.event = {
        validateId: function() {
            var newsid = encodeURIComponent($("#newsid").val());
            $.ajax({
                url: './php/validateId.php',
                type: 'POST',
                dataType: 'json',
                data: { newsid: newsid },
                success: function(data) {
                    if (data.length > 0) {
                        alert("新闻id已存在，请重新输入");
                        $("#newsid").val("");
                        // var newsIdEle=$("newsid");
                        // newsIdEle.attr('placeholder', '新闻id已存在，请重新输入');
                        // $("#newsidDiv").addClass('has-error');
                    } else {
                        console.log("验证成功，新闻id" + newsid + "不存在");
                    }
                },
                error: function(data) {
                    alert("新闻id验证失败", data);
                    $("#newsid").val("");
                }
            });

        },
        addBtn: function() {
            $("#insertBtn").show();
            $("#updateBtn").hide();
            $("#newsid").val("");
            $("#newsid").removeAttr('readonly');
            $("#newstitle").val("");
            $("#newstype").val("0");
            $("#newsimg").val("");
            $("#newscontent").val("");
            $("#addtime").val(new Date().toDateInputValue());
        },
        editBtn: function() {
            var selections = $("#newstable").bootstrapTable('getSelections');
            if (selections.length < 1) {
                alert("请选择一行数据");
                $("#newsModal").modal({ show: false });
                return;
            }
            $("#newsModal").modal({ show: true });
            $("#updateBtn").show();
            $("#insertBtn").hide();

            $("#newsid").val(selections[0].newsid);
            $("#newsid").attr('readonly', 'readonly');
            $("#newstitle").val(selections[0].newstitle);
            $("#newstype").val(selections[0].newstype);
            $("#newsimg").val(selections[0].newsimg);
            $("#newscontent").val(selections[0].newscontent);
            $("#addtime").val(selections[0].addtime);
        },
        delete: function() {
            var selections = $("#newstable").bootstrapTable('getSelections');
            if (selections.length < 1) {
                alert("请选择一行删除");
                return;
            } else {
                var delId = selections[0].newsid;
                $.ajax({
                    url: './php/delnews.php',
                    type: 'POST',
                    dataType: 'text',
                    data: { newsid: delId },
                    success: function(data) {
                        $("#newstable").bootstrapTable('remove', { field: 'newsid', values: [delId] });
                        alert("删除成功 " + delId);
                    },
                    error: function(data) {
                        alert("删除失败" + data);
                    }
                });
            }
        },
        insert: function() {
            var newsid = $("#newsid").val();
            if (newsid == "" || newsid == undefined) {
                alert("新闻编号不允许为空！");
            } else {
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
                    url: './php/addnews.php',
                    type: 'POST',
                    dataType: 'text',
                    data: paramEncode,
                    success: function(data) {
                        console.log(data);
                        if (data) {
                            var paramJson = changeToJson(paramEncode);
                            $("#newstable").bootstrapTable('append', paramJson);
                            alert("新增成功");
                        } else {
                            alert("新增失败" + data);
                        }

                    },
                    error: function(data) {
                        alert("新增失败" + data);
                    }
                });
            }
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
                url: './php/updatenews.php',
                type: 'POST',
                dataType: 'html',
                data: paramEncode,
                success: function(msg) {
                    if (msg) {
                        var paramJson = changeToJson(paramEncode);
                        $("#newstable").bootstrapTable('updateRow', { index: selectIndex, row: paramJson });
                        alert("修改成功");
                    } else {
                        alert("修改失败" + msg);
                    }
                },
                error: function() {
                    alert("修改失败!");
                }
            });
        },
    }

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
        case "0":
            return "推荐";
            break;
        case "1":
            return "本地";
            break;
        default:
            return "其他";
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
        return "<img src=" + img + " width=100 />";
    } else {
        return "图片地址错误";
    }

}
