//点击清除按钮，清除搜索框中文字,并隐藏清除按钮
function clear() {
    document.getElementById("searchText").value = "";
    document.getElementById("quickdelete").style.display = "none";
}

// 隐藏或显示a标签的清除按钮
function clearShowHide(event) {
    var clearA = document.getElementById("quickdelete");
    if (event.target.value == "") {
        clearA.style.display = "none";
    } else {
        clearA.style.display = "block";
    }
}
