function caculateRank() {
    var score = document.getElementById("score").value;
    //根据分数计算等级
    var rank;
    switch (true) {
        case score > 100:
            rank = "分数不能大于100，请重新输入！";
            break;
        case score > 90 && score <= 100:
            rank = 1;
            break;
        case score > 80 && score <= 90:
            rank = 2;
            break;
        case score > 70 && score <= 80:
            rank = 3;
            break;
        case score > 60 && score <= 70:
            rank = 4;
            break;
        case score > 50 && score <= 60:
            rank = 5;
            break;
        case score > 40 && score <= 50:
            rank = 6;
            break;
        case score > 30 && score <= 40:
            rank = 7;
            break;
        case score > 20 && score <= 30:
            rank = 8;
            break;
        case score > 10 && score <= 20:
            rank = 9;
            break;
        case score >= 0 && score <= 10:
            rank = 10;
            break;
        case score < 0:
            rank = "分数不能小于0，请重新输入！";
            break;
        default:
            rank = "您输入的分数不符合规范，请重新输入！";
    }
    // 清除上一次增加的div
    var rankdiv = document.getElementById("rankdiv");
    if (rankdiv != null) {
        rankdiv.parentNode.removeChild(rankdiv);
    }
    if (typeof rank == "number") {
        rank = "等级为：" + rank;
    }
    // 根据新的分数和等级，创建新的div并显示
    document.getElementById("main").innerHTML +=
        "\<div id=\"rankdiv\" class=\"col-md-offset-4 \"\>" +
        "您输入的分数为:" + score + "; " +
        rank +
        "\</div\>";
}
