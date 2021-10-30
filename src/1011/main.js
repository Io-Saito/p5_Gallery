"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var i = 0;
    var shapes = [];
    var dis;
    var colors = ["#ff794e", "#ff9394", "#ffdb8d", "#a2ffc9", "#07c5ce", "#5973fe"];
    p.setup = function () {
        var size;
        size = p.min([p.windowHeight, p.windowWidth]) * 0.9;
        p.createCanvas(size, size);
        dis = size / 600;
        p.rectMode(p.CENTER);
        p.ellipseMode(p.CENTER);
        // shapes.push(new  RotatingTri(150))
        p.angleMode("degrees");
        for (var i_1 = 0; i_1 < 3; i_1++) {
            var low_s = [];
            for (var r = 0; r < 3; r++) {
                switch (i_1 * 3 + r) {
                    case 0: low_s.push(new RotatingTri_(100 * dis));
                    case 1: low_s.push(new MovingCirc_(50 * dis));
                    case 2: low_s.push(new ExpandingArc_(120 * dis));
                    case 3: low_s.push(new RotatingLine_(60 * dis));
                    case 4: low_s.push(new SinCurve_(100 * dis));
                    case 5: low_s.push(new ExplodingTri(40 * dis));
                    case 6: low_s.push(new RotatingBar_(40 * dis));
                    case 7: low_s.push(new PointsSquair(150 * dis));
                    case 8: low_s.push(new ExpandingSquair_(50 * dis));
                }
            }
            shapes.push(low_s);
        }
    };
    p.draw = function () {
        p.background("#2A3D52");
        p.translate(p.width / 2, p.height / 2);
        for (var i_2 = 0; i_2 < 3; i_2++) {
            for (var r = 0; r < 3; r++) {
                shapes[i_2][r].create();
                shapes[i_2][r].move();
            }
        }
        // p.square(0,0,100)
        i += 1;
        //     for(let i = 0;i<shapes.length;i++) {
        //     shapes[i].create();
        //     shapes[i].move();
        // }
    };
    var RotatingTri_ = /** @class */ (function () {
        function RotatingTri_(size) {
            var x = [];
            for (i = 0; i < 6; i++) {
                x.push(new RotatingTri(size, (i + 1) / 2, colors[i]));
            }
            this.parts = x;
        }
        RotatingTri_.prototype.create = function () {
            this.parts.forEach(function (x) { x.create(); });
        };
        RotatingTri_.prototype.move = function () {
            this.parts.forEach(function (x) { x.move(); });
        };
        return RotatingTri_;
    }());
    var RotatingTri = /** @class */ (function () {
        function RotatingTri(size, speed, c) {
            this.size = size;
            this.angle = 0;
            this.speed = speed;
            this.place = { l: -200 * dis, c: -200 * dis };
            this.c = c;
        }
        RotatingTri.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            p.noFill();
            p.rotate(this.angle);
            p.stroke(this.c);
            p.beginShape();
            p.vertex(0, -this.size / p.sqrt(3));
            p.vertex(this.size / 2, this.size / (2 * p.sqrt(3)));
            p.vertex(-this.size / 2, this.size / (2 * p.sqrt(3)));
            p.vertex(0, -this.size / p.sqrt(3));
            p.endShape();
            p.rotate(-this.angle);
            p.translate(-this.place.l, -this.place.c);
        };
        RotatingTri.prototype.move = function () {
            this.angle += this.speed;
        };
        return RotatingTri;
    }());
    var MovingCirc_ = /** @class */ (function () {
        function MovingCirc_(size) {
            var x = [];
            for (i = 0; i < 6; i++) {
                x.push(new MovingCirc(size, 1 + i / 6, colors[i]));
            }
            this.parts = x;
        }
        MovingCirc_.prototype.create = function () {
            this.parts.forEach(function (x) { x.create(); });
        };
        MovingCirc_.prototype.move = function () {
            this.parts.forEach(function (x) { x.move(); });
        };
        return MovingCirc_;
    }());
    var MovingCirc = /** @class */ (function () {
        function MovingCirc(size, speed, c) {
            this.size = size;
            this.angle = 0;
            this.place = { l: -200 * dis, c: 0 };
            this.speed = speed;
            this.c = c;
        }
        MovingCirc.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            p.noFill();
            p.rotate(this.angle);
            p.stroke(this.c);
            p.fill(this.c);
            p.circle(this.size, this.size, this.size / 5);
            p.rotate(-this.angle);
            p.translate(-this.place.l, this.place.c);
        };
        MovingCirc.prototype.move = function () {
            this.angle += p.sin(i / 3) * this.speed;
        };
        return MovingCirc;
    }());
    var ExpandingArc_ = /** @class */ (function () {
        function ExpandingArc_(size) {
            var x = [];
            for (i = 0; i < 6; i++) {
                x.push(new ExpandingArc(size * (1 - (i / 6)), colors[i], (6 - i) * 30));
            }
            this.parts = x;
        }
        ExpandingArc_.prototype.create = function () {
            this.parts.forEach(function (x) {
                x.create();
            });
        };
        ExpandingArc_.prototype.move = function () {
            this.parts.forEach(function (x) { x.move(); });
        };
        return ExpandingArc_;
    }());
    var ExpandingArc = /** @class */ (function () {
        function ExpandingArc(size, c, angle) {
            this.size = size;
            this.angle = angle;
            this.place = { l: -200 * dis, c: 200 * dis };
            this.c = c;
        }
        ExpandingArc.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            p.beginShape();
            p.fill(this.c);
            p.stroke(this.c);
            p.arc(0, 0, this.size, this.size, this.angle, this.angle + 180);
            p.endShape();
            p.translate(-this.place.l, -this.place.c);
        };
        ExpandingArc.prototype.move = function () {
            this.angle += 1;
        };
        return ExpandingArc;
    }());
    var RotatingLine_ = /** @class */ (function () {
        function RotatingLine_(size) {
            var x = [];
            for (i = 0; i < 6; i++) {
                x.push(new RotatingLine(size, 30 + (i * 20), 30 + (i * 10), colors[i]));
            }
            this.parts = x;
        }
        RotatingLine_.prototype.create = function () {
            this.parts.forEach(function (x) {
                x.create();
            });
        };
        RotatingLine_.prototype.move = function () {
            this.parts.forEach(function (x) { x.move(); });
        };
        return RotatingLine_;
    }());
    var RotatingLine = /** @class */ (function () {
        function RotatingLine(size, angle1, angle2, c) {
            this.size = size;
            this.angle1 = angle1;
            this.angle2 = angle2;
            this.place = { l: 0, c: -200 * dis };
            this.c = c;
        }
        RotatingLine.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            p.noFill();
            p.stroke(this.c);
            var inner_x = this.size / 2 * p.cos(this.angle1);
            var inner_y = this.size / 2 * p.sin(this.angle1);
            var outer_x = this.size * p.cos(this.angle2);
            var outer_y = this.size * p.sin(this.angle2);
            p.line(inner_x, inner_y, outer_x, outer_y);
            p.translate(-this.place.l, -this.place.c);
        };
        RotatingLine.prototype.move = function () {
            this.angle1 += 1;
            this.angle2 -= 1;
        };
        return RotatingLine;
    }());
    var SinCurve_ = /** @class */ (function () {
        function SinCurve_(size) {
            var x = [];
            for (i = 0; i < 6; i++) {
                x.push(new SinCurve(size, i / 6, colors[i]));
            }
            this.parts = x;
        }
        SinCurve_.prototype.create = function () {
            this.parts.forEach(function (x) { x.create(); });
        };
        SinCurve_.prototype.move = function () {
            this.parts.forEach(function (x) { x.move(); });
        };
        return SinCurve_;
    }());
    var SinCurve = /** @class */ (function () {
        function SinCurve(size, speed, c) {
            this.size = 0;
            this.place = { l: 0, c: 0 };
            this.speed = speed;
            this.c = c;
        }
        SinCurve.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            for (var i_3 = -100; i_3 < 100; i_3++) {
                var x = i_3;
                var y = p.sin(i_3 * 2) * this.size;
                p.stroke(this.c);
                p.point(x, y);
            }
            p.translate(-this.place.l, -this.place.c);
        };
        SinCurve.prototype.move = function () {
            this.size += p.cos(i) * this.speed;
        };
        return SinCurve;
    }());
    var ExplodingTri = /** @class */ (function () {
        function ExplodingTri(size) {
            this.size = 0;
            this.place = { l: 0, c: 200 * dis };
            this.angle = 0;
        }
        ExplodingTri.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            p.rotate(this.angle);
            for (var k = 0; k <= 5; k++) {
                p.fill(colors[k]);
                p.stroke(colors[k]);
                p.triangle(this.size, this.size, this.size + 10 * p.sqrt(3), this.size + 10, this.size + 10 * p.sqrt(3), this.size - 10);
                p.rotate(60);
            }
            p.rotate(-this.angle);
            p.translate(-this.place.l, -this.place.c);
        };
        ExplodingTri.prototype.move = function () {
            this.size += p.sin(i) / 2;
            if (i % 360 == 0) {
                this.angle += 60;
            }
        };
        return ExplodingTri;
    }());
    var RotatingBar_ = /** @class */ (function () {
        function RotatingBar_(size) {
            var x = [];
            for (i = 0; i < 6; i++) {
                x.push(new RotatingBar(size, (i + 1) / 2, colors[i]));
            }
            this.parts = x;
        }
        RotatingBar_.prototype.create = function () {
            this.parts.forEach(function (x) { x.create(); });
        };
        RotatingBar_.prototype.move = function () {
            this.parts.forEach(function (x) { x.move(); });
        };
        return RotatingBar_;
    }());
    var RotatingBar = /** @class */ (function () {
        function RotatingBar(size, speed, c) {
            this.size = size;
            this.angle = 0;
            this.place = { l: 200 * dis, c: -200 * dis };
            this.speed = speed;
            this.c = c;
        }
        RotatingBar.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            p.rotate(this.angle);
            p.noFill();
            p.stroke(this.c);
            p.rect(0, 0, this.size / 2, this.size);
            p.rotate(-this.angle);
            p.translate(-this.place.l, -this.place.c);
        };
        RotatingBar.prototype.move = function () {
            this.angle += this.speed;
            this.size += p.sin(i) * this.speed / 6;
        };
        return RotatingBar;
    }());
    var PointsSquair = /** @class */ (function () {
        function PointsSquair(size) {
            this.size = size;
            this.k = 0;
            this.place = { l: 200 * dis, c: 0 };
        }
        PointsSquair.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            for (var i_4 = this.k; i_4 <= this.k + 4; i_4++) {
                var r = void 0;
                if (i_4 == 6) {
                    r = 6;
                }
                else if (i_4 > 6) {
                    r = 12 - i_4;
                }
                else {
                    r = i_4;
                }
                var start = (1 - r) * this.size / 10;
                var y = (i_4 - 6) * this.size / 10;
                for (var l = 1; l <= r; l++) {
                    var x = start + (l - 1) * this.size / 5;
                    p.fill(colors[r - 1]);
                    p.stroke(colors[r - 1]);
                    p.circle(x, y, 10);
                }
            }
            p.translate(-this.place.l, -this.place.c);
        };
        PointsSquair.prototype.move = function () {
            if (i % 10 == 0) {
                this.k += 1;
                if (this.k >= 12) {
                    this.k = 0;
                }
            }
        };
        return PointsSquair;
    }());
    var ExpandingSquair_ = /** @class */ (function () {
        function ExpandingSquair_(size) {
            var x = [];
            for (i = 0; i < 6; i++) {
                x.push(new ExpandingSquair(size, i * 10 - 90, colors[i]));
            }
            this.parts = x;
        }
        ExpandingSquair_.prototype.create = function () {
            this.parts.forEach(function (x) { x.create(); });
        };
        ExpandingSquair_.prototype.move = function () {
            this.parts.forEach(function (x) { x.move(); });
        };
        return ExpandingSquair_;
    }());
    var ExpandingSquair = /** @class */ (function () {
        function ExpandingSquair(size, angle, c) {
            this.size = size;
            this.angle = angle;
            this.place = { l: 200 * dis, c: 200 * dis };
            this.c = c;
        }
        ExpandingSquair.prototype.create = function () {
            p.translate(this.place.l, this.place.c);
            p.point(0, 0);
            var y = this.angle;
            var x = this.angle;
            var len = p.sin(this.angle) * this.size / 2;
            p.fill(this.c);
            p.stroke(this.c);
            p.square(x, y, len);
            p.translate(-this.place.l, -this.place.c);
        };
        ExpandingSquair.prototype.move = function () {
            this.angle += p.sin(i);
        };
        return ExpandingSquair;
    }());
};
exports.sketch = sketch;
