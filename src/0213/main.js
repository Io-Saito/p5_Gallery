"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var colors = ["#005f73", "#0a9396", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"];
    var rain = [];
    var Cloud;
    var no;
    p.setup = function () {
        p.createCanvas(600, 600);
        p.noLoop();
        p.background("#EEEEEE");
        var z = p.int(p.random(0, 2));
        var x = 100 + (z * 50);
        var y = 100;
        Cloud = new cloud({ x: x, y: y }, 5, 4, z);
        for (var j = 0; j <= 5 + z; j++) {
            for (var i = 0; i < p.random(3, 8); i++) {
                rain.push(new Rain({ x: (x - z * 50) + j * 50, y: i * 50 + y + 25 * 6 }));
            }
        }
        // for (let n=0; n<5; n++){
        //     wave.push(new Wave({x:p.random(0,150),y:p.random(0,150)}))
        // }
        no = p.createGraphics(p.width, p.height);
        no.background("#EEEEEE");
        // no.noStroke();
        // let col = p.color("#EEEEEE");
        // col.setAlpha(100);
        // no.fill(col);
        p.blendMode(p.BURN);
    };
    p.draw = function () {
        for (var i = 0; i < rain.length; i++) {
            rain[i].makedrop();
        }
        Cloud.makecloud();
        p.image(no, 0, 0);
    };
    var Rain = /** @class */ (function () {
        function Rain(pos) {
            var _this = this;
            this.makedrop = function () {
                p.push();
                p.translate(_this.pos.x, _this.pos.y);
                p.rotate(p.radians(-90));
                var x = [];
                var y = [];
                // p.stroke(p.random(colors))
                p.noStroke();
                p.beginShape();
                var R = 20;
                var A = 5;
                for (var t = 0; t < p.TWO_PI; t += 0.1) {
                    var r = 1 / (A * p.sin(t / 2) + 1);
                    x[t] = R * r * p.cos(t);
                    y[t] = R * r * p.sin(t);
                    var l = p.drawingContext;
                    var grad = l.createLinearGradient(0, 0, x[t], y[t]);
                    grad.addColorStop(0, p.random(colors));
                    grad.addColorStop(1, p.random(colors));
                    l.shadowColor = p.random(colors);
                    l.fillStyle = grad;
                    p.vertex(x[t], y[t]);
                }
                p.endShape();
                p.rotate(90);
                p.translate(-_this.pos.x, -_this.pos.y);
                p.pop();
            };
            this.pos = pos;
        }
        return Rain;
    }());
    var cloud = /** @class */ (function () {
        function cloud(pos, col, row, z) {
            var _this = this;
            this.makecloud = function () {
                //各カラムの場所を決める
                // p.fill("#FFFFFF")
                var s = 50;
                var harf = p.int(_this.row / 2);
                for (var r = harf; 0 <= r; r--) {
                    for (var c = 0; c <= (_this.col - r); c++) {
                        var x_ = _this.position.x - (s / 2 * r);
                        var y_ = _this.position.y;
                        var x = x_ + ((_this.col - c) * s);
                        var y = y_ + ((harf - r) * s / 2);
                        if (r != harf && r != 0) {
                            _this.doushinen(x, y, s, true);
                        }
                        if (r == harf && p.random(0, 1) > 0.5) {
                            _this.doushinen(x, y, s, true);
                        }
                        if (r == 0) {
                            _this.guru(x, y, s, true);
                        }
                    }
                }
                for (var r = _this.row; harf <= r; r--) {
                    for (var c = _this.z; c <= (_this.col + _this.z - (r - harf)); c++) {
                        var x_ = _this.position.x - (s / 2 * r);
                        var y_ = _this.position.y;
                        var x = x_ + (_this.col - c + 1 / 2) * s;
                        var y = y_ + r * s / 2;
                        if (r != _this.row && r != harf) {
                            _this.doushinen(x, y, s, false);
                        }
                        if (r == _this.row && p.random(0, 1) > 0.5) {
                            _this.doushinen(x, y, s, true);
                        }
                        if (r == harf) {
                            _this.guru(x, y, s, false);
                        }
                    }
                }
            };
            this.guru = function (x, y, s, b) {
                //ぐるぐる
                no.fill("#FFFFFF");
                no.stroke("#353652");
                if (b == true) {
                    no.arc(x, y, s, s, p.PI, p.TWO_PI);
                }
                else {
                    no.arc(x, y, s, s, 0, p.PI);
                }
                no.noFill();
                no.strokeWeight(1);
                for (var i = 10; i < s + 10; i += 10) {
                    if (b == true) {
                        no.arc(x, y, i, i, p.PI, p.TWO_PI);
                    }
                    else {
                        no.arc(x, y, i, i, 0, p.PI);
                    }
                }
            };
            this.doushinen = function (x, y, s, b) {
                //ぐるぐる
                no.fill("#FFFFFF");
                if (b == true) {
                    no.ellipse(x, y, s, s);
                }
                else {
                    no.ellipse(x, y, s, s);
                }
                no.stroke("#353652");
                no.noFill();
                no.strokeWeight(1);
                // p.translate(x,y)
                // p.rotate(p.PI*5/3)
                for (var i = 10; i < s + 10; i += 10) {
                    if (b == true) {
                        no.ellipse(x, y, i, i);
                    }
                    else {
                        no.ellipse(x, y, i, i);
                    }
                }
            };
            this.position = pos;
            this.col = col;
            this.row = row;
            this.z = z;
        }
        return cloud;
    }());
};
exports.sketch = sketch;
