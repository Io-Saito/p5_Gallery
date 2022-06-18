"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var shapes = [];
    var colors = ["#FFC312", "#C4E538", "#12CBC4", "#FDA7DF", "#ED4C67"].map(function (x) { return p.color(x); });
    var c;
    var num = 5;
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
        p.frameRate(30);
        var size;
        size = p.min([p.windowHeight, p.windowWidth]) * 0.9;
        c = p.createCanvas(size, size);
        p.rectMode(p.CENTER);
        p.ellipseMode(p.CENTER);
        colors.forEach(function (x) { return x.setAlpha(180); });
        p.angleMode("degrees");
        for (var i = 0; i < num; i++) {
            shapes.push(new MovingShape(p.createVector(p.random(p.width / 4, p.width * 3 / 4), p.random(p.height, p.height + 100)), p.createVector(p.random(-10, 10), -60), p.int(p.random(-0.5, 7))));
            console.log(shapes[i].shape);
        }
    };
    p.draw = function () {
        p.background("#001d3d");
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].display();
            shapes[i].move();
            if (shapes[i].pos.y > p.height + 110) {
                shapes.splice(i, 1);
            }
            if (p.random(0, 1) > 0.9 && shapes.length < 10) {
                shapes.push(new MovingShape(p.createVector(p.random(p.width / 4, p.width * 3 / 4), p.random(p.height, p.height + 100)), p.createVector(p.random(-10, 10), -60), p.int(p.random(-0.5, 7))));
            }
        }
    };
    function cross(c) {
        p.noStroke();
        p.fill(c);
        p.rect(0, 0, 45, 15);
        p.rect(0, 0, 15, 45);
        p.noFill();
    }
    function circle(c) {
        p.noFill();
        p.stroke(c);
        p.strokeWeight(10);
        p.ellipse(0, 0, 30, 30);
        p.noStroke();
    }
    function sqrt(c) {
        p.noFill();
        p.stroke(c);
        p.strokeWeight(10);
        p.rect(0, 0, 30, 30);
        p.noStroke();
    }
    function triangle(c) {
        p.noFill();
        p.stroke(c);
        p.strokeWeight(10);
        p.beginShape();
        p.vertex(0, 10 * p.sqrt(3));
        p.vertex(15, -5 * p.sqrt(3));
        p.vertex(-15, -5 * p.sqrt(3));
        p.endShape(p.CLOSE);
        p.noStroke();
    }
    function arc(c) {
        p.noFill();
        p.stroke(c);
        p.strokeWeight(10);
        p.arc(0, 0, 30, 30, 0, 180);
        p.noStroke();
    }
    function line(c) {
        p.fill(c);
        p.noStroke();
        p.rect(0, 0, 15, 35);
        p.noStroke();
    }
    function pentagon(c) {
        p.noFill();
        p.stroke(c);
        p.strokeWeight(10);
        p.beginShape();
        p.vertex(0, 10 / p.sin(36));
        p.vertex(20 * p.cos(36), 10 / p.sin(36) - 20 * p.sin(36));
        p.vertex(10, -10 / p.tan(36));
        p.vertex(-10, -10 / p.tan(36));
        p.vertex(-20 * p.cos(36), 10 / p.sin(36) - 20 * p.sin(36));
        p.endShape(p.CLOSE);
        p.noStroke();
    }
    var MovingShape = /** @class */ (function () {
        function MovingShape(pos, velocity, s) {
            var _this = this;
            this.display = function () {
                p.translate(_this.pos.x, _this.pos.y);
                p.rotate(_this.theta);
                // p.strokeWeight(5)
                p.noStroke();
                p.noFill();
                if (_this.shape == 0) {
                    circle(_this.c);
                }
                else if (_this.shape == 1) {
                    cross(_this.c);
                }
                else if (_this.shape == 2) {
                    sqrt(_this.c);
                }
                else if (_this.shape == 3) {
                    triangle(_this.c);
                }
                else if (_this.shape == 4) {
                    pentagon(_this.c);
                }
                else if (_this.shape == 5) {
                    arc(_this.c);
                }
                else if (_this.shape == 6) {
                    line(_this.c);
                }
                p.rotate(-_this.theta);
                p.translate(-_this.pos.x, -_this.pos.y);
            };
            this.move = function () {
                if (-15 < _this.velocity.y && _this.velocity.y < 15) {
                    for (var i = 0; i <= 360; i += 60) {
                        p.fill(p.random(colors));
                        p.ellipse(_this.pos.x + _this.r * p.cos(i), _this.pos.y + _this.r * p.sin(i), 5, 5);
                    }
                    _this.r += 5;
                }
                _this.pos.x += _this.velocity.x;
                _this.pos.y += _this.velocity.y;
                _this.theta += (_this.velocity.x * _this.velocity.mag()) / 10.0;
                _this.velocity.x += _this.acceleration.x;
                _this.velocity.y += _this.acceleration.y;
            };
            this.pos = pos;
            this.velocity = velocity;
            this.acceleration = p.createVector(0, 3);
            this.c = p.random(colors);
            this.r = 5;
            this.theta = 0;
            this.shape = s;
        }
        return MovingShape;
    }());
};
exports.sketch = sketch;
