var changeColors = document.getElementsByClassName("changeColor");
var navUl = document.getElementById('nav-ul');

// 根据本地存储的值给主题文字颜色
window.onload = function() {
    setColor(localStorage.color);
}

//选择的颜色改变localStorage存储的主题颜色
var colors = document.getElementById('colors');
colors.addEventListener('click', function(e) {
    var selectedColor = e.target.value; //选择的颜色
    switch (selectedColor) {
        case 'orange':
            setColor("#fa3");
            break;
        case 'green':
            setColor("#6f6");
            break;
        case 'blue':
            setColor("#3cf");
            break;
        default:
            return;
    }
});

// 更改颜色方法
function setColor(color) {
    navUl.style.background = color;
    for (var i = 0; i < changeColors.length; i++) {
        changeColors[i].style.color = color;
    }
    localStorage.color = color;
}
