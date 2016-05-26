// 结果显示器
var view = document.getElementById('result-view');

var leftNum, // 第一个操作数
    rightNum, //第二个操作数
    currentOp, //操作符
    result; //结果
var isNew = true; //是否是新数据的开始

// 事件绑定监听
function addEvent(obj, eventtype, fn) {
    try { // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(eventtype, fn, false);
    } catch (e) {
        try { // IE8.0及其以下版本
            obj.attachEvent('on' + eventtype, fn);
        } catch (e) { // 早期浏览器
            obj['on' + eventtype] = fn;
        }
    }
}
// 增加一些IE事件对象缺乏的方法
function fixEvent(event) {
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
}

fixEvent.preventDefault = function() {
    this.returnValue = false;
}

fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
}

// 基本按键表格及监听事件
var tableBasic = document.getElementById('table-basic');
addEvent(tableBasic, 'click', function(e) {
    var event = e || fixEvent(window.event);
    var target = event.srcElement ? event.srcElement : event.target;
    // 数字键添加监听
    if (target && target.name == "basic-num") {
        if (view.value == "0" || isNew) {
            if (target.id == "dot") {
                view.value = "0" + target.value;
            } else {
                view.value = target.value;
            }
            isNew = false;
        } else {
            if(target.id=="dot" && view.value.indexOf(".")!="-1"){
              return;
            }
            view.value += target.value;
        }
    }
    // 操作符添加监听
    else if (target && target.name == "op") {
        if (currentOp) {
            rightNum = view.value;
            view.value = getResult();
        }
        leftNum = view.value;
        currentOp = target.value;
        isNew = true;

    }
    // 等号监听
    else if (target && target.id == "equal") {
        rightNum = view.value;
        view.value = getResult();
        initParam();
        isNew = true;
    }
    // 清屏
    else if (target && target.id == "clear") {
        initParam();
        view.value = 0;
    }
    // 退格
    else if (target && target.id == "backspace") {
        var value = view.value;
        view.value = value.substr(0, value.length - 1);
    }
    // 取反
    else if (target && target.id == "trans") {
        view.value = 0 - view.value;
    }
});

/**
 * 计算结果
 * @return 计算结果
 */
function getResult() {
    var x = leftNum - 0;
    var y = rightNum - 0;
    switch (currentOp) {
        case '+':
            result = parseFloat((x + y).toFixed(8));
            break;
        case '-':
            result = parseFloat((x - y).toFixed(8));
            break;
        case '*':
            result = parseFloat((x * y).toFixed(8));
            break;
        case '/':
            if (y == 0) {
                alert("除数不能为0");
                if (x > 0) result = x; //显示仍为被除数
            } else
                result = parseFloat((x / y).toFixed(8));
            break;
        case 'pow':
            result = Math.pow(x, y);
            break;
        default:
            result = view.value;
    }

    return result;
}

function initParam() {
    leftNum = "";
    rightNum = "";
    currentOp = "";
}
// 初始化结果为0
window.onload = function() {
    view.value = 0;
}


// 三角函数表格及运算
var tableScience = document.getElementById('table-science');
addEvent(tableScience, 'click', function(e) {
    var event = e || fixEvent(window.event);
    var target = event.srcElement ? event.srcElement : event.target;
    var math = target.value;
    isNew = true;
    if (math == "pow") {
        leftNum = view.value;
        currentOp = target.value;
    } else {
        view.value = getMathResult(math);
        initParam();
    }
});

//获取三角函数的结果
function getMathResult(math) {
    switch (math) {
        case 'sin':
            return Math.sin(view.value);
        case 'cos':
            return Math.cos(view.value);
        case 'tan':
            return Math.tan(view.value);
        case 'asin':
            return Math.asin(view.value);
        case 'acos':
            return Math.acos(view.value);
        case 'atan':
            return Math.atan(view.value);
        case 'exp':
            return Math.exp(view.value);
        case 'log':
            return Math.log(view.value);
        case 'sqrt':
            return Math.sqrt(view.value);

    }
}
