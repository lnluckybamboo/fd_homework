document.createElement('header');
document.createElement('nav');
document.createElement('article');
document.createElement('footer');

function setFocusBorder() {
    document.getElementById("searchText").style.border = "1px solid #3385ff";
}

function setBlurBorder() {
    document.getElementById("searchText").style.border = "1px solid #b6b6b6";
}

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