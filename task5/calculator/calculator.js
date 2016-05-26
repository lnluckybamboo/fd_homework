function calculate() {
    var num1 = document.getElementById("num1").value;
    if (num1 == undefined || num1 == "") {
        alert("请输入第一个要计算的数字！");
        return;
    } else {
        num1 = num1 - 0;

    }
    var num2 = document.getElementById("num2").value;
    if (num2 == undefined || num2 == "") {
        alert("请输入第二个要计算的数字！");
        return;
    } else {
        num2 = num2 - 0;
    }
    var op = document.getElementById("op").value;
    if (op == undefined || op == "") {
        alert("请选择运算符！");
        return;
    }
    // else if (op == "/" && num2 == 0) {
    //     alert("除法时第二个参数不能为0，请重新输入！");
    //     return;
    // }
    var result = getResult(num1, num2, op);
    document.getElementById("result").value = result;
}

function getResult(x, y, op) {
    var result;
    switch (op) {
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
            	alert("除法时第二个参数不能为0，请重新输入！");
                if (x > 0) result = Number.POSITIVE_INFINITY;
                else if (x = 0) result = Number.NaN;
                else if (x < 0) result = Number.NEGATIVE_INFINITY;
            } else
                result = parseFloat((x / y).toFixed(8));
            break;
        default:
            result = "计算失败";
    }
    return result;
}
