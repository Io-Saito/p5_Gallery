"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var i = 0;
    var period = 60;
    var fcount = 0;
    var shapes_1 = [];
    var shapes_2 = [];
    var dots = [];
    var dis;
    var colors = ["#82e1df", "#ea96df", "#ff65b3", "#fcd72c", "#ffdd63"].map(function (x) { return p.color(x); });
    var c;
    function easeOutQuart(x) {
        return 1 - p.pow(1 - x, 4);
    }
    function easeOutSine(x) {
        return p.sin((x * p.PI) / 2);
    }
    function easeOutCubic(x) {
        return 1 - p.pow(1 - x, 3);
    }
    function easeOutCirc(x) {
        return p.sqrt(1 - p.pow(x - 1, 2));
    }
    p.setup = function () {
        var size;
        size = p.min([p.windowHeight, p.windowWidth]) * 0.9;
        c = p.createCanvas(size, size);
        dis = size / 600;
        p.rectMode(p.CENTER);
        p.ellipseMode(p.CENTER);
        colors.forEach(function (x) { return x.setAlpha(180); });
        p.angleMode("degrees");
        shapes_1.push(new stretchingArc(450, 10, 60, { x: -p.width / 2, y: -p.height / 2 }, 6, 2));
        shapes_1.push(new RotatingSquare({ x: -p.width / 2 + 1 * p.cos(70) * 225, y: -p.height / 2 + p.sin(70) * 225 }));
        shapes_1.push(new stretchingArc(550, 30, 120, { x: -p.width / 2, y: -p.height / 2 }, 3, 0));
        shapes_1.push(new stretchingArc(565, 30, 120, { x: -p.width / 2, y: -p.height / 2 }, 3, 0));
        shapes_1.push(new RotatingCross({ x: -p.width / 2 + 1 * p.cos(20) * 280, y: -p.height / 2 + p.sin(20) * 280 }));
        shapes_1.push(new stretchingArc(200, 10, 90, { x: -p.width / 2, y: -p.height / 2 }, 20, 0));
        shapes_1.push(new stretchingArrow(380, 270, 340, { x: -p.width / 2, y: -p.height / 2 }, 4));
        shapes_2.push(new stretchingArc(250, 0, 80, { x: -p.width / 2, y: -p.height / 2 }, 10, 2));
        shapes_2.push(new stretchingArc(450, 20, 120, { x: -p.width / 2, y: -p.height / 2 }, 3, 0));
        shapes_2.push(new stretchingArc(465, 20, 120, { x: -p.width / 2, y: -p.height / 2 }, 5, 0));
        shapes_2.push(new RotatingCross({ x: -p.width / 2 + 1 * p.cos(10) * 230, y: -p.height / 2 + p.sin(10) * 230 }));
        shapes_2.push(new stretchingArc(485, 20, 120, { x: -p.width / 2, y: -p.height / 2 }, 7, 0));
        shapes_2.push(new stretchingArrow(350, 270, 340, { x: -p.width / 2, y: -p.height / 2 }, 4));
        shapes_2.push(new RotatingSquare({ x: -p.width / 2 + 1 * p.cos(70) * 500, y: -p.height / 2 + p.sin(70) * 500 }));
        shapes_2.push(new stretchingArc(1000, 10, 60, { x: -p.width / 2, y: -p.height / 2 }, 20, 0));
        for (var i_1 = 0; i_1 < 60; i_1++) {
            dots.push({ x: p.random(-p.width / 2, p.width / 2), y: p.random(-p.height / 2, p.height / 2) });
        }
    };
    p.draw = function () {
        p.background("#001d3d");
        p.translate(p.width / 2, p.height / 2);
        for (var i_2 = 0; i_2 < shapes_1.length; i_2++) {
            shapes_1[i_2].create();
            shapes_1[i_2].move();
        }
        p.rotate(180);
        for (var i_3 = 0; i_3 < shapes_2.length; i_3++) {
            shapes_2[i_3].create();
            shapes_2[i_3].move();
        }
        var c = p.color("#FFFFFF");
        c.setAlpha(50);
        for (var i_4 = 0; i_4 < dots.length; i_4++) {
            p.noStroke();
            p.fill(c);
            p.ellipse(dots[i_4].x, dots[i_4].y, 5, 5);
        }
        p.rotate(-180);
        i += 1;
        fcount = i % 60;
    };
    var RotatingCross = /** @class */ (function () {
        function RotatingCross(place) {
            this.place = place;
            this.weight = 5;
            this.c = p.random(colors);
            this.theta = 0;
        }
        RotatingCross.prototype.create = function () {
            p.translate(this.place.x, this.place.y);
            p.rotate(45);
            p.stroke(this.c);
            p.fill(this.c);
            p.strokeWeight(this.weight);
            p.noStroke();
            p.rotate(this.theta);
            p.rect(0, 0, 30, 10);
            p.rect(0, 0, 10, 30);
            p.rotate(-this.theta);
            p.rotate(-45);
            p.translate(-this.place.x, -this.place.y);
        };
        RotatingCross.prototype.move = function () {
            this.theta += 1 * easeOutCubic(fcount / 20);
        };
        return RotatingCross;
    }());
    var RotatingSquare = /** @class */ (function () {
        function RotatingSquare(place) {
            this.place = place;
            this.weight = 5;
            this.c = p.random(colors);
            this.theta = 0;
        }
        RotatingSquare.prototype.create = function () {
            p.translate(this.place.x, this.place.y);
            p.rotate(45);
            p.stroke(this.c);
            p.strokeWeight(this.weight);
            var x = p.drawingContext;
            x.setLineDash([1, 1]);
            p.noFill();
            p.rotate(this.theta);
            p.rect(0, 0, 20, 20);
            p.rotate(-this.theta);
            p.rotate(-45);
            p.translate(-this.place.x, -this.place.y);
        };
        RotatingSquare.prototype.move = function () {
            this.theta += 1 * easeOutCubic(fcount / 20);
        };
        return RotatingSquare;
    }());
    var stretchingArrow = /** @class */ (function () {
        function stretchingArrow(r, s, e, p_, w) {
            this.r = r;
            this.theta_s = s;
            this.theta_e = e;
            this.place = p_;
            this.c = p.random(colors);
            this.weight = w;
            this.theta_f = this.theta_s;
            this.theta_b = this.theta_s;
            this.lineType = p.random(1);
        }
        stretchingArrow.prototype.arrows = function (b, f) {
            for (var i_5 = b; i_5 <= f; i_5 += 10) {
                p.rotate(i_5);
                var v_1 = { x: 0, y: this.r };
                var v_2 = { x: 10, y: this.r - 10 };
                var v_3 = { x: 10, y: this.r + 10 };
                p.fill(this.c);
                p.triangle(v_1.x, v_1.y, v_2.x, v_2.y, v_3.x, v_3.y);
                p.rotate(-i_5);
            }
        };
        stretchingArrow.prototype.create = function () {
            p.translate(this.place.x, this.place.y);
            p.stroke(this.c);
            p.strokeWeight(this.weight);
            var x = p.drawingContext;
            x.setLineDash([1, 1]);
            this.arrows(this.theta_b, this.theta_f);
            p.translate(-this.place.x, -this.place.y);
        };
        stretchingArrow.prototype.move = function () {
            if (this.theta_f < this.theta_e) {
                this.theta_f += 1;
            }
            else if (this.theta_b < (this.theta_e)) {
                this.theta_f = this.theta_e;
                this.theta_b += 1;
            }
            else {
                this.theta_f = this.theta_s;
                this.theta_b = this.theta_s;
            }
        };
        return stretchingArrow;
    }());
    var stretchingArc = /** @class */ (function () {
        function stretchingArc(r, s, e, p_, w, l) {
            this.r = r;
            this.theta_s = s;
            this.theta_e = e;
            this.place = p_;
            this.c = p.random(colors);
            this.theta_f = this.theta_s;
            this.theta_b = this.theta_s;
            this.weight = w;
            this.lineType = l;
        }
        stretchingArc.prototype.create = function () {
            p.translate(this.place.x, this.place.y);
            p.stroke(this.c);
            p.strokeWeight(this.weight);
            p.noFill();
            var x = p.drawingContext;
            if (this.lineType > 1) {
                p.strokeCap(p.ROUND);
                x.setLineDash([1, 15]);
            }
            else {
                p.strokeCap(p.PROJECT);
                x.setLineDash([1, 1]);
            }
            p.arc(0, 0, this.r, this.r, this.theta_b, this.theta_f);
            p.translate(-this.place.x, -this.place.y);
        };
        stretchingArc.prototype.move = function () {
            if (this.theta_f < this.theta_e) {
                this.theta_f += 1;
            }
            else if (this.theta_b < (this.theta_e)) {
                this.theta_f = this.theta_e;
                this.theta_b += 1;
            }
            else {
                this.theta_f = this.theta_s;
                this.theta_b = this.theta_s;
            }
        };
        return stretchingArc;
    }());
};
exports.sketch = sketch;
