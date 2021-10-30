"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var flowers = [];
    var colors = ["#005264", "#fe465d", "#ffab4a", "#6f0150", "#dfc7ea"];
    var tCount = 200;
    var trangX = [];
    var trangY = [];
    p.setup = function () {
        p.createCanvas(600, 600);
        p.colorMode("rgb");
        p.angleMode("radians");
        p.blendMode(p.DARKEST);
        p.noLoop();
        for (var i = 0; i < p.width * p.height * 0.005; i++) {
            var x = p.random(p.width);
            var y = p.random(p.height);
            var dia = p.noise(x * 0.01, y * 0.01) * 80;
            // if (flowers.every((c)=>p.dist(x,y,c.position.x,c.position.y)>(dia + c.size)*0.3)) {
            flowers.push(new flower({ x: x, y: y }, dia));
            // }
        }
        for (var i = 0; i < tCount; i++) {
            trangX[i] = p.random(-200, p.width + 200);
            trangY[i] = p.random(-200, p.height + 200);
        }
    };
    p.draw = function () {
        p.background(255, 255, 255);
        for (var i = 0; i < tCount - 3; i++) {
            var c = p.color(p.random(colors));
            c.setAlpha(1);
            p.noStroke();
            p.fill(c);
            p.triangle(trangX[i], trangX[i + 1], trangX[i + 2], trangY[i], trangY[i + 1], trangY[i + 2]);
        }
        for (var i = 0; i < flowers.length; i++) {
            flowers[i].makeflower();
        }
    };
    var flower = /** @class */ (function () {
        function flower(x, dia) {
            var _this = this;
            this.makeflower = function () {
                _this.color.setAlpha(_this.alpha);
                p.translate(_this.position.x, _this.position.y);
                p.noStroke();
                p.rotate(p.atan(_this.position.y / _this.position.x));
                p.fill(_this.color);
                hana(_this.size, p.int(p.random(3, 7)), _this.color);
                p.rotate(-p.atan(_this.position.y / _this.position.x));
                p.translate(-_this.position.x, -_this.position.y);
            };
            this.color = p.color(colors[p.int(p.random(0, 5))]);
            this.alpha = 200;
            this.position = x;
            this.size = dia;
        }
        return flower;
    }());
    var hana = function (size, n, color) {
        for (var i = 0; i <= n; i++) {
            petal(size, n);
            nakami(size, n, color);
            p.rotate(2 * p.PI / n);
        }
    };
    var petal = function (size, n) {
        p.beginShape();
        p.vertex(0, 0);
        for (var i = 0; i <= n - 1; i++) {
            var x = size * p.cos(p.PI * i / n) + p.noise(i * 80) * 10;
            var y = size * p.sin(p.PI * i / n) + p.noise(i * 0.01) * 10;
            p.curveVertex(x, y);
        }
        p.vertex(0, 0);
        p.endShape();
    };
    var nakami = function (size, n, color) {
        p.strokeWeight(2);
        p.stroke(color);
        var x = size * p.cos(p.PI / n);
        var y = size * p.sin(p.PI / n);
        p.line(0, 0, x, y);
    };
};
exports.sketch = sketch;
