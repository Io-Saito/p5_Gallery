"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var flowers = [];
    var colors = ["#1199d5", "#aaddeb", "#cbd964", "#45b9c0", "#fbc83a"];
    var tCount = 200;
    var trangX = [];
    var trangY = [];
    p.setup = function () {
        p.createCanvas(600, 600);
        p.colorMode("rgb");
        p.angleMode("radians");
        p.blendMode(p.DARKEST);
        p.noLoop();
        for (var i = 0; i < 50; i++) {
            var x = p.random(0, 600);
            var y = p.sin(p.PI * x / p.width * 5) * 40 + 100 * p.random(1.5, 3.5) + p.noise(x * 0.5) * 100;
            var dia = p.noise(x * 0.01, y * 0.01) * 40;
            flowers.push(new flower({ x: x, y: y }, dia));
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
            c.setAlpha(3);
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
                p.stroke(_this.color);
                p.translate(_this.position.x, _this.position.y);
                // p.noStroke()
                if (p.int(p.random(0, 100)) % 3 == 0) {
                    p.fill(_this.color);
                    tenten(_this.size, p.int(p.random(15, 40)));
                }
                else if (p.int(p.random(0, 100)) % 3 == 1) {
                    doushinen(_this.size, p.int(p.random(15, 40)));
                }
                else {
                    uni(_this.size, p.int(p.random(15, 40)));
                }
                ;
                p.translate(-_this.position.x, -_this.position.y);
            };
            this.color = p.color(colors[p.int(p.random(0, 5))]);
            this.alpha = 350;
            this.position = x;
            this.size = dia;
        }
        return flower;
    }());
    var uni = function (size, num) {
        p.strokeWeight(1);
        for (var i = 0; i < num; i++) {
            var x = size * p.cos(2 * p.PI * i / num) * 1.5;
            var y = size * p.sin(2 * p.PI * i / num) * 1.5;
            p.line(0, 0, x, y);
        }
    };
    var doushinen = function (size, num) {
        p.strokeWeight(1);
        p.noFill();
        for (var i = 0; i < num; i++) {
            if (i % 3 == 1) {
                p.ellipse(0, 0, size * 3.5 * i / num);
            }
        }
    };
    var tenten = function (size, num) {
        for (var i = 0; i < num; i++) {
            p.rotate(2 * p.PI * i / num);
            p.ellipse(size, size, size * 1 / 20, size * 1 / 10);
            p.rotate(-2 * p.PI * i / num);
        }
    };
};
exports.sketch = sketch;
