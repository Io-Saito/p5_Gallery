"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var li = [];
    p.setup = function () {
        p.createCanvas(600, 600);
        p.noLoop();
        p.stroke(50);
        p.angleMode("radians");
        p.colorMode("hsb");
        var r = 40;
        var c = 0;
        for (var j = -200; j <= 200; j += (r * 1.5)) {
            for (var i = -200; i <= 200; i += (r * p.sqrt(3))) {
                if (c % 2 == 0) {
                    li.push(new Hxagon(i, j));
                }
                else {
                    li.push(new Hxagon(i + (r * p.sqrt(3) / 2), j));
                }
            }
            c += 1;
        }
    };
    p.draw = function () {
        p.translate(300, 300);
        p.background("#ffffff");
        p.noStroke();
        li.map(function (x) {
            x.create();
        });
        p.translate(-300, -300);
    };
    var Hxagon = /** @class */ (function () {
        function Hxagon(x_, y_) {
            var _this = this;
            this.x = x_;
            this.y = y_;
            this.stroke = new Array(3).fill(0).map(function (x) {
                if (p.random(0, 1) > 0.8) {
                    return true;
                }
            });
            this.fill = new Array(3).fill(0).map(function (x, _) {
                if (_this.stroke[_]) {
                    return false;
                }
                else if (p.random(0, 1) > 0.8) {
                    return true;
                }
            });
            this.c = new Array(3).fill(0).map(function (_) { return p.color(p.random(0, 360), 360, 100, 0.5); });
        }
        Hxagon.prototype.create = function () {
            for (var _ = 0; _ <= 2; _++) {
                this.wrap(_);
                switch (_) {
                    case 0: this.left();
                    case 1: this.right();
                    case 2: this.top();
                }
                p.noStroke();
                p.noFill();
            }
        };
        Hxagon.prototype.wrap = function (num) {
            if (this.stroke[num]) {
                p.stroke(this.c[num]);
            }
            if (this.fill[num]) {
                p.fill(this.c[num]);
            }
        };
        Hxagon.prototype.left = function () {
            p.beginShape();
            p.vertex(this.x - (20 * p.sqrt(3)), this.y - 20);
            p.vertex(this.x - (20 * p.sqrt(3)), this.y + 20);
            p.vertex(this.x, this.y + 40);
            p.vertex(this.x, this.y);
            p.endShape();
        };
        Hxagon.prototype.right = function () {
            p.beginShape();
            p.vertex(this.x + (20 * p.sqrt(3)), this.y - 20);
            p.vertex(this.x + (20 * p.sqrt(3)), this.y + 20);
            p.vertex(this.x, this.y + 40);
            p.vertex(this.x, this.y);
            p.endShape();
        };
        Hxagon.prototype.top = function () {
            p.beginShape();
            p.vertex(this.x, this.y - 40);
            p.vertex(this.x + (20 * p.sqrt(3)), this.y - 20);
            p.vertex(this.x, this.y);
            p.vertex(this.x - (20 * p.sqrt(3)), this.y - 20);
            p.endShape();
        };
        Hxagon.prototype.changeColor = function () {
            var _this = this;
            this.c.map(function (_) { return p.color(p.random(0, 360), 360, 100, 0.6); });
            this.stroke.map(function (x) {
                if (p.random(0, 1) > 0.8) {
                    return true;
                }
            });
            this.fill.map(function (x, _) {
                if (_this.stroke[_]) {
                    return false;
                }
                else if (p.random(0, 1) > 0.8) {
                    return true;
                }
            });
        };
        return Hxagon;
    }());
};
exports.sketch = sketch;
