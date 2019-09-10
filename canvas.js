var canvas = document.getElementById('xxx');
var context = canvas.getContext('2d');

var eraserEnabled = false;
var eraser = document.getElementById('eraser');
var brush = document.getElementById('brush');
var div = document.getElementById('actions');

autoSetCanvasSize(canvas);

listenToUser(canvas);

eraser.onclick = function () {
    eraserEnabled = true;
    div.className = 'actions x';
}

brush.onclick = function(){
    eraserEnabled = false;
    div.className = 'actions';
}

function listenToUser(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };
    // 特性检测
    if(document.body.ontouchstart !== undefined){
        // 触屏设备
        canvas.ontouchstart = function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
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
        canvas.ontouchmove = function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
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
        canvas.ontouchend = function(){
            using = false;
        }
    }else{
        // 非触屏设备
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
        canvas.onmouseup = function () {
            using = false;
        }
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
