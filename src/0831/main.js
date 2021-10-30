"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var colors = ["#ff7480", "#ff8b94", "#ffaaa5", "#ffd3b6", "#dcedc1", "#a8e6cf", "#84e3c8"];
    var colors_bg = ["#e7d7c1", "#e6ccb0", "#f3d6b9", "#f7ebde"];
    var flowers = [];
    p.setup = function () {
        p.createCanvas(600, 600);
        p.colorMode("rgb");
        p.angleMode("radians");
        p.noLoop();
        var _loop_1 = function (i) {
            var x = p.random(p.width);
            var y = p.randomGaussian(p.height, p.height / 4);
            var dia = p.noise(x * 0.01, y * 0.01) * 60 + 15;
            if (flowers.every(function (c) { return p.dist(x, y, c.position.x, c.position.y) > (dia + c.size) * 0.6; })) {
                flowers.push(new flower({ x: x, y: y }, dia));
            }
        };
        for (var i = 0; i < p.width * p.height * 0.05; i++) {
            _loop_1(i);
        }
    };
    p.draw = function () {
        p.background("#e6ccb0");
        p.strokeWeight(3);
        for (var i = 0; i < p.height; i += 40) {
            var c = p.color(p.random(colors_bg));
            p.stroke(c);
            p.noFill();
            p.beginShape();
            for (var y = 0; y < p.height; y++) {
                p.strokeWeight(2 + p.noise(y * 0.01));
                p.curveVertex(i + p.sin((p.noise(i * 0.01) * p.PI) * y / 100) * 20, y);
            }
            p.endShape();
        }
        for (var i = 0; i < flowers.length; i++) {
            flowers[i].makeflower();
        }
    };
    var flower = /** @class */ (function () {
        function flower(x, dia) {
            var _this = this;
            this.makeflower = function () {
                var a = ["#f6f2f0"];
                while (a.length < 4) {
                    var x = p.random(colors);
                    if (a.includes(x) == false) {
                        a.push(x);
                    }
                }
                _this.color = a;
                p.translate(_this.position.x, _this.position.y);
                p.rotate(p.atan(_this.position.y / _this.position.x));
                p.point(0, 0);
                _this.hana(_this.size);
                p.rotate(2 * p.PI - p.atan(_this.position.y / _this.position.x));
                p.translate(-_this.position.x, -_this.position.y);
            };
            this.hana = function (size) {
                p.translate(-1 * size, 0);
                for (var i = 0; i <= 23; i++) {
                    _this.shizuku(size, _this.color[Math.floor(i / 3) % 4]);
                    p.translate(size, 0);
                    p.rotate(2 * p.PI / 24);
                    p.translate(-size, 0);
                }
            };
            this.shizuku = function (size, c) {
                p.stroke("#e8e8e8");
                p.strokeWeight(1);
                p.fill(c);
                p.beginShape();
                for (var t = 0; t < p.TWO_PI; t += 0.1) {
                    var r = 1 / (11 * p.sin(t / 2) + 1);
                    p.vertex(size * r * p.cos(t), size * r * p.sin(t));
                }
                p.endShape(p.CLOSE);
            };
            this.alpha = 200;
            this.position = x;
            this.size = dia;
        }
        return flower;
    }());
};
exports.sketch = sketch;
