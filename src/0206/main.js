"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var colors = ["#d83721", "#df6e2b", "#e09c1d", "#f2c800", "#fbc83a", "#f5d51b"];
    var tCount = 200;
    var trangX = [];
    var trangY = [];
    var c;
    var fish = [];
    p.setup = function () {
        c = p.createCanvas(600, 600);
        p.colorMode("rgb");
        p.angleMode("radians");
        // p.blendMode(p.DARKEST)
        p.noLoop();
        for (var i = 0; i < tCount; i++) {
            trangX[i] = p.random(-200, p.width + 200);
            trangY[i] = p.random(-200, p.height + 200);
        }
        var a = 100;
        var b = 0.1;
        for (var j = 0; j < p.PI * 4; j += 0.4) {
            var x = a * p.exp(b * j) * p.cos(j);
            var y = a * p.exp(b * j) * p.sin(j);
            var dx = a * p.exp(b * j) * (b * p.cos(j) - p.sin(j));
            var dy = a * p.exp(b * j) * (b * p.sin(j) + p.cos(j));
            var arc = p.atan(dy / dx);
            var x_scale = p.random(1.5, 2.0);
            var y_scale = 1;
            for (var k = 0; k < 7; k++) {
                fish.push(new Fish({ x: x + p.random(0, 150), y: y + p.random(0, 150) }, { x: x_scale, y: y_scale }, arc));
            }
        }
    };
    p.draw = function () {
        p.background(255, 255, 255);
        for (var i = 0; i < tCount - 3; i++) {
            var c_1 = p.color(p.random(colors));
            c_1.setAlpha(15);
            p.noStroke();
            p.fill(c_1);
            p.triangle(trangX[i], trangX[i + 1], trangX[i + 2], trangY[i], trangY[i + 1], trangY[i + 2]);
        }
        var c = p.color("#FFFFFF");
        c.setAlpha(200);
        p.noFill();
        p.stroke(c);
        for (var x = 0; x < p.random(15, 25); x++) {
            var x_1 = p.random(0, 600);
            var y = p.random(0, 600);
            var r = p.random(20, 50);
            p.ellipse(x_1, y, r, r);
        }
        for (var i = 0; i < p.width * p.height / 100; i++) {
            var x = p.random(p.width);
            var y = p.random(p.height);
            p.stroke("#FFFFFF");
            p.point(x, y);
        }
        p.translate(p.width / 2, p.height / 2);
        for (var i = 0; i < fish.length; i++) {
            fish[i].makefish();
        }
        p.translate(-p.width / 2, -p.height / 2);
    };
    p.keyPressed = function () {
        console.log("pressed");
        p.saveCanvas(c, 'myCanvas', 'jpg');
    };
    var Fish = /** @class */ (function () {
        function Fish(pos, scale, arc) {
            var _this = this;
            this.makefish = function () {
                p.translate(_this.pos.x, _this.pos.y);
                p.rotate(_this.arc);
                c = p.color("#FFFFFF");
                c.setAlpha(150);
                p.fill(c);
                p.stroke(c);
                p.beginShape();
                for (var i = 0; i < p.TWO_PI; i += 0.1) {
                    var x = 10 * (p.cos(i) - Math.pow(p.sin(i), 2) / p.sqrt(2)) * _this.scale.x;
                    var y = 10 * (p.cos(i) * p.sin(i)) * _this.scale.y;
                    p.vertex(x, y);
                }
                p.endShape();
                p.rotate(-_this.arc);
                p.translate(-_this.pos.x, -_this.pos.y);
            };
            this.pos = pos;
            this.scale = scale;
            this.arc = arc;
        }
        return Fish;
    }());
    p.keyPressed = function () {
        console.log("pressed");
        p.saveCanvas(c, 'myCanvas', 'jpg');
    };
};
exports.sketch = sketch;
