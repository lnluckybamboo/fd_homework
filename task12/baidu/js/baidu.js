$(function() {
    // 导航栏更多选项
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var nav = {
        init: function() {
            var me=this;
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.settings = $("#settings");
            me.product = $("#product");
            me.settingsli = $("#settings li");
            me=null;
        },
        bind: function() {
            var me=this;
            me.settings.hover(this.event['setnavhover']);
            me.product.hover(this.event['pronavhover']);
            me.settingsli.hover(this.event['lihoverin'], this.event['lihoverout']);
            me=null;
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
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var navlogin = {
        init: function() {
            var me=this;
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.login = $("#login");
            me=null;
        },
        bind: function() {
            var me=this;
            me.login.click(this.event['login']);
            me=null;
        },
        event: {
            login: function() {
                $(".login-dialog,.login-background").toggle(200);
            }

        }
    };
    // 导航栏登录后
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var navloginafter = {
        init: function() {
            var me=this;
            $("#login>a").text(pageResouces.getpageResouces("username"));
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.login = $("#login");
            me.loginli = $("#login li");
            me.logout = $("#logout");
            me=null;
        },
        bind: function() {
            var me=this;
            me.login.hover(this.event['loginhover']);
            me.loginli.hover(this.event['lihoverin'], this.event['lihoverout']);
            me.logout.click(this.event['logout']);
            me=null;
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
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var signindialog = {
        init: function() {
            var me=this;
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.close = $('.login-dialog .login-title .close');
            me.signin = $(".login-signin");
            me=null;
        },
        bind: function() {
            var me=this;
            me.close.click(closeDialog);
            me.signin.submit(this.event['submit']);
            me=null;
        },
        event: {
            submit: function() {
                var username = $("#username").val();
                var password = $("#password").val();
                var params = "username=" + username + "&password=" + password;

                pageResouces.addpageResouces("username", username);
                closeDialog();
                navloginafter.init();
                aftersignin();
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
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var cloth = {
        init: function() {
            // 根据已选背景初始化
            var bgStorage = pageResouces.getpageResouces("background")
            if (bgStorage) {
                setBackground(bgStorage);
                changeBaiduImage();
            }
            var me=this;
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.cloth = $(".cloth");
            me.clothClose = $(".cloth-close"); //收起皮肤面板
            me.noCloth = $(".nocloth"); //不使用皮肤
            me.image = $(".cloth-image ul"); //更换背景
            me=null;
        },
        bind: function() {
            var me=this;
            me.cloth.click(this.event['showClothPanel']);
            me.clothClose.click(this.event['hideClothPanel']);
            me.noCloth.click(this.event['removeCloth']);
            me.image.click(this.event['changeCloth']);
            me=null;
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
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var tab = {
        init: function() {
            var me=this;
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.tabul = $(".main ul");
            me=null;
        },
        bind: function() {
            var me=this;
            me.tabul.click(this.event['changeContent']);
            me=null;
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
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var top = {
        init: function() {
            var me=this;
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.top = $(".top");
            me=null;
        },
        bind: function() {
            var me=this;
            me.top.click(this.event['top']);
            $(window).scroll(function(event) {
                if ($(window).scrollTop() > 100) {
                    $(".top").fadeIn(200);
                    $(".searchpanel").fadeIn(200);
                } else {
                    $(".top").fadeOut(200);
                    $(".searchpanel").fadeOut(200);
                }
            });
            me=null;
        },
        event: {
            top: function() {
                $("body,html").animate({ scrollTop: 0 }, 300);
            }
        }
    };
    // 对localStorage的操作，IE兼容cookies
    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
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

    // 单例模式（1.模块间通信；2.系统中某个类的对象只有一个；3.保护自己的属性和方法）
    var searchText = {
        init: function() {
            var me=this;
            me.render();
            me.bind();
            me=null;
        },
        render: function() {
            var me=this;
            me.searchTxt = $("#searchText");
            me.qkdelete = $("#quickdelete");
            me=null;
        },
        bind: function() {
            var me=this;
            me.searchTxt.focus(this.event['focus']);
            me.searchTxt.blur(this.event['blur']);
            me.searchTxt.bind("input propertychange", this.event['clearShowHide']) // 隐藏或显示a标签的清除按钮
            me.qkdelete.click(this.event['clear']); //清除搜索框中文字,并隐藏清除按钮
            me=null;
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
