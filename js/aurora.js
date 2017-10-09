(function () {
    var oAurora = document.getElementsByClassName('aurora')[0];
    var width = parseInt(oAurora.width);
    var height = parseInt(oAurora.height);
    var overflow = 300;// 横向超出部分
    var cxt = oAurora.getContext('2d');

    function BezireCurve(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.distance = randomNum(30, 60); // 曲线横向最大宽度
        this.speed = 20;// 曲线参数增量最大值
        this.h = randomNum(30, 60); // 曲线扩展成面的宽度
        this.params = []; //贝塞尔曲线参数
        this.dParams = [];// 贝塞尔曲线参数增量
        var p0 = {}, p1 = {}, p2 = {}, p3 = {};
        // 随机产生贝塞尔函数的四个点，p1 p2在p0 p3构成的矩形内
        p0.x = randomNum(-overflow, width + overflow);
        p0.y = randomNum(0, height);
        p3.x = randomNum(Math.max(-overflow, p0.x - this.distance), Math.min(width + overflow, p0.x + this.distance));
        p3.y = randomNum(0, height);
        this.dx = Math.abs(p0.x - p3.x); // 曲线定点的横向宽度
        p1.x = randomNum(Math.min(p0.x, p3.x), Math.max(p0.x, p3.x));
        p1.y = randomNum(0, height);
        p2.x = randomNum(Math.min(p0.x, p3.x), Math.max(p0.x, p3.x));
        p2.y = randomNum(0, height);
        this.params.push(p0, p1, p2, p3);
        // 随机产生四个点的增量
        for (var i = 0; i < 4; i++) {
            var dp = {};
            var sign = Math.random(-1, 1) < 0 ? -1 : 1;
            dp.x = randomNum(this.speed / 2, this.speed) * sign;
            sign = Math.random(-1, 1) < 0 ? -1 : 1;
            dp.y = randomNum(this.speed / 2, this.speed) * sign;
            this.dParams.push(dp);
        }
    }

    BezireCurve.prototype = {
        bezirePoint: function (percent) {
            var q = [];
            var r = [];
            for (var i = 0; i < this.params.length - 1; i++) {
                q.push(this.percentPoint(this.params[i], this.params[i + 1], percent));
            }
            for (var i = 0; i < q.length - 1; i++) {
                r.push(this.percentPoint(q[i], q[i + 1], percent));
            }
            return this.percentPoint(r[0], r[1], percent);
        },
        percentPoint: function (p1, p2, percent) {
            var p = {};
            p.x = p1.x + (p2.x - p1.x) * percent;
            p.y = p1.y + (p2.y - p1.y) * percent;
            return p;
        },
        move: function () {
            for (var i = 0; i < 4; i++) {
                this.params[i].x += this.dParams[i].x;
                this.params[i].y += this.dParams[i].y;
                if (this.params[i].y < 0 || this.params[i].y > height) {
                    this.dParams[i].y = -this.dParams[i].y;
                    this.params[i].y += this.dParams[i].y;
                }
            }
            this.dx = Math.abs(this.params[0].x - this.params[3].x);
            if (this.params[0].x < -overflow || this.params[0].x > width + overflow) {
                this.dParams[0].x = -this.dParams[0].x;
                this.params[0].x += this.dParams[0].x;
            } else if (this.dx > this.distance) {
                this.dParams[0].x = -this.dParams[0].x;
            }
            if (this.params[3].x < -overflow || this.params[3].x > width + overflow) {
                this.dParams[3].x = -this.dParams[3].x;
                this.params[3].x += this.dParams[3].x;
            } else if (this.dx > this.distance) {
                this.dParams[3].x = -this.dParams[3].x;
            }
            this.dx = Math.abs(this.params[0].x - this.params[3].x);
            var min = Math.min(this.params[0].x, this.params[3].x);
            var max = Math.max(this.params[0].x, this.params[3].x);
            if (this.params[1].x < min || this.params[1].x > max) {
                this.params[1].x = this.params[1].x < min ? min : max;
                this.dParams[1].x = -this.dParams[1].x;
                this.params[1].x += this.dParams[1].x;
            }
            if (this.params[2].x < min || this.params[2].x > max) {
                this.params[2].x = this.params[2].x < min ? min : max;
                this.dParams[2].x = -this.dParams[2].x;
                this.params[2].x += this.dParams[2].x;
            }
        },
        draw: function () {
            this.move();
//            console.log(this.params);
            var lastX = this.params[0].x;
            var lastY = this.params[0].y;
            for (var i = 1; i < this.dx; i++) {
                var point = this.bezirePoint(i / this.dx);
                var x = parseInt(point.x);
                var y = parseInt(point.y);
//                var colorGrand = 20;
                var r = this.r;//+ randomNum(-colorGrand, colorGrand);
                var g = this.g; //+ randomNum(-colorGrand, colorGrand);
                var b = this.b; //+ randomNum(-colorGrand, colorGrand);
                var a = 0.5 + randomNum(-1, 1) * 0.1;
                var rgba0 = 'rgba(' + r + ',' + g + ',' + b + ', 0)';
                var rgba1 = 'rgba(' + r + ',' + g + ',' + b + ', ' + a + ')';
                cxt.save();
                cxt.beginPath();
                var color = cxt.createLinearGradient(x, y - this.h, x, y + this.h);
                color.addColorStop(0, rgba0);
                color.addColorStop(0.8, rgba1);
                color.addColorStop(1, rgba0);
                cxt.fillStyle = color;
                cxt.moveTo(lastX, lastY - this.h);
                cxt.lineTo(x, y - this.h);
                cxt.lineTo(x, y + this.h);
                cxt.lineTo(lastX, lastY + this.h);
                cxt.lineTo(lastX, lastX - this.h);
                cxt.fill();
//                cxt.fillRect(x, y - this.h, 1, 2 * this.h);
                cxt.closePath();
                cxt.restore();
                lastX = x;
                lastY = y;
            }
        }
    };
    var aurora = [];
    for (var i = 0; i < 10; i++) {
        aurora.push(new BezireCurve({r: 80, g: 175, b: 100}));
        // aurora.push(new BezireCurve({r: 110, g: 25, b: 150}));
    }
    setInterval(function () {
        cxt.clearRect(0, 0, width, height);
        for (var i = 0; i < aurora.length; i++) {
            aurora[i].draw();
        }
    }, 100);

    function randomNum(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }
})();