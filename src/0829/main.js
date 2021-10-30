"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var colors = ["#ffedcd", "#ff3b5f", "#fe923d", "#6fc3c3", "#ffcab0", "#274a64"];
    p.setup = function () {
        p.createCanvas(600, 600);
        p.colorMode("rgb");
        p.angleMode("radians");
        p.noLoop();
    };
    p.draw = function () {
        var scale = 120;
        p.background("#274a64");
        for (var x = 0; x <= p.width; x += scale) {
            for (var y = 0; y <= p.width; y += scale) {
                p.stroke(p.color(colors[0]));
                p.noFill();
                p.square(x, y, 120);
                p.translate(x + scale / 2, y + scale / 2);
                Pattern(x, y);
                p.translate(-(x + scale / 2), -(y + scale / 2));
            }
        }
    };
    var Pattern = function (x, y) {
        // let n=p.int(p.random(3,8))
        var c = [0, 1, 2, 3, 4];
        var c_ = c.map(function (x) { return p.random(colors); });
        var n = p.int(p.random(3, 6));
        for (var k = 0; k <= 4; k++) {
            var g = p.int(p.random(1, 100));
            if (g % 2 == 0) {
                p.rotate(p.PI / n);
            }
            for (var i = 0; i <= n - 1; i++) {
                switch (k) {
                    case 0: nakami_1(35, n, c_[0], x, y);
                    case 1: circle(35, n, c_[1], x, y);
                    case 2: diamond(35, n, c_[2], x, y);
                    case 3: nakami_2(35, n, c_[3], x, y);
                    case 4: nakami_3(35, n, c_[4], x, y);
                }
                p.rotate(2 * p.PI / n);
            }
            if (g % 2 == 0) {
                p.rotate(-p.PI / n);
            }
        }
    };
    var circle = function (size, n, color, x, y) {
        p.stroke(p.color(color));
        p.circle(size, 0, size * p.noise(size * x * 0.5 + size * y * 0.8) / 2);
    };
    var triangle = function (size, n, color, x, y) {
        var length_1 = 12 * p.noise(size * x * 0.4 + size * y * 0.9);
        var length_2 = 10 * p.noise(size * x * 0.2 + size * y * 0.01);
        p.stroke(p.color(color));
        p.beginShape();
        p.vertex(size, 0);
        p.vertex(size + length_1, length_2);
        p.vertex(size + length_1, -1 * length_2);
        p.vertex(size, 0);
        p.endShape();
    };
    var diamond = function (size, n, color, x, y) {
        var length_1 = 12 * p.noise(size * x * 0.3 + size * y * 0.25);
        var length_2 = 10 * p.noise(size * x * 0.99 + size * y * 0.014);
        p.stroke(p.color(color));
        p.beginShape();
        p.vertex(size, 0);
        p.vertex(size + length_1, length_2);
        p.vertex(size + length_1 * 2, 0);
        p.vertex(size + length_1, -1 * length_2);
        p.vertex(size, 0);
        p.endShape();
    };
    var nakami_1 = function (size, n, c, x, y) {
        var length = 2 * p.noise(size * x * 0.98 + size * y * 0.024);
        p.strokeWeight(1);
        p.stroke(p.color(c));
        var x_ = size * length * p.cos(2 * p.PI / n);
        var y_ = size * length * p.sin(2 * p.PI / n);
        p.line(0, 0, x_, y_);
    };
    var nakami_2 = function (size, n, c, x, y) {
        var length = 2 * p.noise(size * x * 0.97 + size * y * 0.034);
        p.stroke(p.color(c));
        p.strokeWeight(1);
        var x_ = size * length * p.cos(2 * p.PI / n);
        var y_ = size * length * p.sin(2 * p.PI / n);
        p.line(size * length, 0, x_, y_);
    };
    var nakami_3 = function (size, n, c, x, y) {
        var length = 2 * p.noise(size * x * 0.96 + size * y * 0.044);
        p.strokeWeight(1);
        p.stroke(p.color(c));
        p.circle(0, 0, size * length);
    };
};
exports.sketch = sketch;
