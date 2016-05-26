$(function() {
    // 导航栏更多选项
    var nav = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            this.settings = $("#settings");
            this.product = $("#product");
            this.settingsli = $("#settings li");
        },
        bind: function() {
            this.settings.hover(this.event['setnavhover']);
            this.product.hover(this.event['pronavhover']);
            this.settingsli.hover(this.event['lihoverin'], this.event['lihoverout']);
        },
        event: {
            setnavhover: function() {
                $(this).children("ul").stop().toggle(200);
                $(this).children("ul").children('li').css({
                    background: '#fff',
                    color: '#333'
                });
            },
            pronavhover: function() {
                $(this).children("ul").stop().toggle(200);
            },
            lihoverin: function() {
                $(this).css("background", '#38f');
                $(this).children("a").css("color", "#fff");
            },
            lihoverout: function() {
                $(this).css("background", '#fff');
                $(this).children("a").css("color", "#333");
            }
        }
    };
    // 导航栏登录选项
    var navlogin = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            this.login = $("#login");
        },
        bind: function() {
            this.login.click(this.event['login']);
        },
        event: {
            login: function() {
                $(".login-dialog,.login-background").toggle(200);
            }

        }
    };
    // 导航栏登录后
    var navloginafter = {
        init: function() {
            $("#login>a").text(pageResouces.getpageResouces("username"));
            this.render();
            this.bind();
        },
        render: function() {
            this.login = $("#login");
            this.loginli = $("#login li");
            this.logout = $("#logout");
        },
        bind: function() {
            this.login.hover(this.event['loginhover']);
            this.loginli.hover(this.event['lihoverin'], this.event['lihoverout']);
            this.logout.click(this.event['logout']);
        },
        event: {
            loginhover: function() {
                $(this).children("ul").stop().toggle(200);
                $(this).children("ul").children('li').css({
                    background: '#fff',
                    color: '#333'
                });
            },
            lihoverin: function() {
                $(this).css("background", '#38f');
                $(this).children("a").css("color", "#fff");
            },
            lihoverout: function() {
                $(this).css("background", '#fff');
                $(this).children("a").css("color", "#333");
            },
            logout: function() {
                pageResouces.removepageResouces("username");
                window.location.reload();
            }
        }
    };
    // 登录弹出窗口
    var signindialog = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            this.close = $('.login-dialog .login-title .close');
            this.signin = $(".login-signin");
        },
        bind: function() {
            this.close.click(closeDialog);
            this.signin.submit(this.event['submit']);
        },
        event: {
            submit: function() {
                var username = $("#username").val();
                var password = $("#password").val();
                var params = "username=" + username + "&password=" + password;
                $.ajax({
                    url: 'signin.php',
                    type: 'get',
                    dataType: 'json',
                    data: params,
                    success: function(data) {
                        pageResouces.addpageResouces("username", data.username);
                        closeDialog();
                        navloginafter.init();
                        aftersignin();
                    },
                    error: function() {
                        alert("登录出错！请联系管理员" + data);
                    }
                });
                return false;
            }
        }
    };

    /**
     * 登录成功后操作
     */
    function aftersignin() {
        $('.nav-left .weather,.nav-left .cloth,.main').show('200');
        cloth.init(); //换肤
        tab.init(); //页签切换
        top.init(); //回到顶部
    }

    // 换肤
    var cloth = {
        init: function() {
            // 根据已选背景初始化
            var bgStorage = pageResouces.getpageResouces("background")
            if (bgStorage) {
                setBackground(bgStorage);
                changeBaiduImage();
            }
            this.render();
            this.bind();
        },
        render: function() {
            this.cloth = $(".cloth");
            this.clothClose = $(".cloth-close"); //收起皮肤面板
            this.noCloth = $(".nocloth"); //不使用皮肤
            this.image = $(".cloth-image ul"); //更换背景
        },
        bind: function() {
            this.cloth.click(this.event['showClothPanel']);
            this.clothClose.click(this.event['hideClothPanel']);
            this.noCloth.click(this.event['removeCloth']);
            this.image.click(this.event['changeCloth']);
        },
        event: {
            showClothPanel: function() {
                $(".clothPanel").show();
            },
            hideClothPanel: function() {
                $(".clothPanel").slideUp();
            },
            removeCloth: function() {
                $(this).hide(); //隐藏不使用皮肤按钮
                removeBackground();
                pageResouces.removepageResouces("background");
            },
            changeCloth: function(event) {
                var src = event.target.src;
                setBackground(src);
                changeBaiduImage();
                pageResouces.addpageResouces("background", src);
            }
        }
    };
    // 页签切换
    var tab = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            this.tabul = $(".main ul");
        },
        bind: function() {
            this.tabul.click(this.event['changeContent']);
        },
        event: {
            changeContent: function(event) {
                var li = event.target;
                var index = $(li).index();
                $(".main .select-tab").removeClass('select-tab');
                $(".main .select-content").removeClass('select-content');
                $(li).addClass('select-tab');
                $(".main .content").eq(index).addClass('select-content');
                if (index == 2) {
                    scoreStar();
                }
            }
        }
    };


    // 返回顶部
    var top = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            this.top = $(".top");
        },
        bind: function() {
            this.top.click(this.event['top']);
            $(window).scroll(function(event) {
                if ($(window).scrollTop() > 100) {
                    $(".top").fadeIn(200);
                    $(".searchpanel").fadeIn(200);
                } else {
                    $(".top").fadeOut(200);
                    $(".searchpanel").fadeOut(200);
                }
            });
        },
        event: {
            top: function() {
                $("body,html").animate({ scrollTop: 0 }, 300);
            }
        }
    };
    // 对localStorage的操作，IE兼容cookies
    var pageResouces = {
        addpageResouces: function(key, value) {
            if (window.localStorage) {
                localStorage.setItem(key, value);
            } else {
                Cookies.write(key, value);
            }
        },
        getpageResouces: function(key) {
            if (window.localStorage) {
                return localStorage.getItem(key);
            } else {
                return Cookies.read(key);
            }
        },
        removepageResouces: function(key) {
            if (window.localStorage) {
                localStorage.removeItem(key);
            } else {
                Cookies.destory(key);
            }

        }
    };

    var searchText = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            this.searchTxt = $("#searchText");
            this.qkdelete = $("#quickdelete");
        },
        bind: function() {
            this.searchTxt.focus(this.event['focus']);
            this.searchTxt.blur(this.event['blur']);
            this.searchTxt.bind("input propertychange", this.event['clearShowHide']) // 隐藏或显示a标签的清除按钮
            this.qkdelete.click(this.event['clear']); //清除搜索框中文字,并隐藏清除按钮
        },
        event: {
            focus: function() {
                $(this).css('border', '1px solid #3385ff');
            },
            blur: function() {
                $(this).css('border', '1px solid #b6b6b6');
            },
            clearShowHide: function(event) {
                if (event.target.value == "") {
                    $("#quickdelete").css('display', 'none');
                } else {
                    $("#quickdelete").css('display', 'block');
                }
            },
            clear: function() {
                $("#searchText").val("");
                $(this).css('display', 'none');
            }
        }
    }

    function init() {
        nav.init();
        searchText.init();
        if (pageResouces.getpageResouces("username")) {
            navloginafter.init();
            aftersignin();
        } else {
            navlogin.init();
            signindialog.init();
        }

    }

    init();
});

/**
 * 根据评分显示星星点亮，不足一个的算半个
 */
function scoreStar() {
    var scores = $(".score");
    $.each(scores, function(index, score) {
        var score = $(score);
        var starnum = score.text() / 10 * 5;
        console.log(score.val());
        var starInt = Math.floor(starnum);
        var starFloat = starnum - starInt;
        $.each(score.children('.star'), function(index, star) {
            if (index < starInt) {
                $(star).addClass('icon-star-full');
            } else if (starFloat > 0 && index == starInt) {
                $(star).addClass('icon-star-half');
            } else if (index >= starInt) {
                $(star).addClass('icon-star-empty');
            }
        });
    });
}

/**
 * 关闭弹出登录框和蒙版
 */
function closeDialog() {
    $('.login-dialog').fadeOut(200);
    $('.login-background').slideUp(200);
}

/**
 * 设置背景皮肤
 */
function setBackground(background) {
    $(".link_other").css({
        background: '#aaa'
            //, opacity: '.5'
    });
    $("body").css({
        "background-image": 'url(' + background + ')',
        "background-size": "cover",
        "background-repeat": "no-repeat", //无重复
        "background-position": "center", //背景居中
        "background-attachment": "fixed" //固定不动
    });
}

/**
 * 清除背景图片
 */
function removeBackground() {
    $("body").css('background', 'none');
    $(".link_other>ul>li>a").css('color', '#333');
    $(".logo img").attr("src", "https://www.baidu.com/img/bd_logo1.png");
}

/**
 * 更改百度搜索框主图片
 */
function changeBaiduImage() {
    $(".link_other>ul>li>a").css('color', '#fff');
    $(".logo img").attr("src", "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png");
}
