var canvas = document.getElementById('xxx');
var using = false;
var context = canvas.getContext('2d');
var lastPoint = {
    x: undefined,
    y: undefined
};
var eraserEnabled = false;
var eraser = document.getElementById('eraser');
var brush = document.getElementById('brush');
var div = document.getElementById('actions');

autoSetCanvasSize(canvas);

listenToMouse(canvas);

eraser.onclick = function () {
    eraserEnabled = true;
    div.className = 'actions x';
}

brush.onclick = function(){
    eraserEnabled = false;
    div.className = 'actions';
}

function listenToMouse(canvas) {
    // 按下鼠标
    canvas.onmousedown = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        using = true;
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            lastPoint = {
                x: x,
                y: y
            };
        }
    }

    // 动鼠标
    canvas.onmousemove = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        if (!using){return}
        if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
        } else {
                var newPoint = {
                    x: x,
                    y: y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
    }

    // 松开鼠标
    canvas.onmouseup = function () {
        using = false;
    }
}

function autoSetCanvasSize(canvas) {
    setCanvasSize();

    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHight;
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.stroke()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.moveTo(x1, y1);
    context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
canvas.ontouchstart = function(){
    console.log('开始摸我了')
}
canvas.ontouchmove = function(){
    console.log('边摸变动');
}
canvas.ontouchend = function(){
    console.log('摸完了');
}