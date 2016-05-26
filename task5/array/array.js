function find() {
    var arrayStr = document.getElementById("input-array").value;
    if (arrayStr.length > 0) {
        var array = arrayStr.split(',');
        console.log(array);

        // 构造“字母-下标”的对象和“字母-次数”的对象
        var indexs = {}; //所在顺序对象{字母:[下标1,下标2...],字母:[下标1,下标2...],....}
        var count = {}; //出现次数对象{字母:次数,字母:次数...}
        for (var i = 0; i < array.length; i++) {
            if (indexs[array[i]] == undefined) {
                indexs[array[i]] = "" + i;
                count[array[i]] = 1;
            } else {
                indexs[array[i]] += "," + i;
                count[array[i]]++;
            }
        }
        console.log(indexs);
        console.log(count);

        // 计算最大次数，找出出现最多的字母
        var maxCount = 1;
        var maxkey;
        for (var i = 0; i < Object.keys(count).length; i++) {
            var curkey = Object.keys(count)[i]
            var curcount = count[curkey];
            if (curcount > maxCount) {
                maxCount = curcount;
                maxkey = curkey;
            }
        }
        var resultStr;
        if (maxkey == undefined || maxkey == "") {
            resultStr = "没有找到出现次数最多的字母";
        } else {
            resultStr = "出现最多的字母是：" + maxkey + "; 出现次数为：" + maxCount + "; 出现序列为:" + indexs[maxkey];
        }
        // 清除上一次增加的div
        var result = document.getElementById("result");
        if (result != null) {
            result.parentNode.removeChild(result);
        }
        document.getElementById("main").innerHTML +=
            "\<div id=\"result\"\>" +
            "您输入的字符串为：" + arrayStr + "\<br \\\>" + resultStr +
            "\</div\>";
    } else {
        alert("请输入字符串");
    }

}
