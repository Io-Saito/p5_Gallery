"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var color_list = ["#86ABD3", "#8ECBD5", "#E7D66D", "#E78089", "#EBB8C4"];
    var chara = ["△", "×", "○", "□", "●", "▲", "■"];
    var pg;
    var canvas;
    p.setup = function () {
        p.angleMode(p.DEGREES);
        canvas = p.createCanvas(600, 600);
        p.noLoop();
        p.blendMode(p.BURN);
        p.background("#F6F6F6");
        pg = p.createGraphics(600, 600);
        for (var i = 0; i < 400; i++) {
            pg.rotate(p.random(p.HALF_PI));
            pg.textSize(p.randomGaussian(12, 5));
            pg.fill("#CDCFCF");
            pg.text(p.random(chara), p.randomGaussian(p.width / 2, p.width * 0.3), p.randomGaussian(p.height / 2, p.height * 0.3));
        }
        pg.blendMode(p.LIGHTEST);
    };
    p.draw = function () {
        var cells = 5; //格子の数
        var offset = 10;
        var w = (p.width - offset * 2) / cells;
        var h = (p.height - offset * 2) / cells;
        for (var j = 0; j < cells; j++) {
            for (var i = 0; i < cells; i++) {
                var shape_1 = void 0;
                for (var k = 0; k < 3; k++) {
                    var x = offset + i * w;
                    var y = offset + j * h;
                    var cx = x + w / 2; //格子の中心座標
                    var cy = y + h / 2;
                    var stroke_num = 1.5; //図形の線の太さ
                    var d = w; //d = w - stroke_num
                    var rotate_num = p.int(p.random(5));
                    rotate_num = rotate_num * 90;
                    var shape_num = p.int(p.random(5));
                    if (k > 0) {
                        do {
                            shape_num = p.int(p.random(5));
                        } while (shape_1 == shape_num);
                    }
                    p.push();
                    p.translate(cx, cy);
                    p.rotate(rotate_num);
                    switch (shape_num) {
                        case 0: {
                            Lemon(0, 0, d, 0, 360);
                            break;
                        }
                        case 1: {
                            Lemon(0, -d / 2, d, 0, 180);
                            Lemon(0, d / 2, d, 180, 360);
                            break;
                        }
                        case 2: {
                            // Lemon(-d / 2, -d / 2, d * p.sqrt(2), 0, 90);
                            // Lemon(d / 2, d / 2, d * p.sqrt(2),180, 270);
                            break;
                        }
                        case 3: {
                            Lemon(-d / 2, -d / 2, 2 * d, 0, 90);
                            break;
                        }
                        case 4: {
                            Lemon(0, -d / 2, d, 0, 180);
                            break;
                        }
                        case 5: {
                            break;
                        }
                    }
                    p.pop();
                    shape_1 = shape_num;
                }
            }
        }
        p.image(pg, 0, 0);
    };
    function Lemon(x, y, r, angle_start, angle_end) {
        var x_ = [];
        var y_ = [];
        // p.stroke(p.random(colors))
        p.noStroke();
        var l2 = p.drawingContext;
        var c1 = p.random(color_list);
        l2.shadowColor = c1;
        l2.shadowOffsetX = 8;
        l2.shadowOffsetY = 8;
        l2.shadowBlur = 8;
        p.beginShape();
        p.push();
        p.vertex(x, y);
        for (var t = angle_start; t <= angle_end; t += 1) {
            x_[t] = x + r / 2 * p.cos(t);
            y_[t] = y + r / 2 * p.sin(t);
            var c2 = p.random(color_list);
            c1 == c2 ? c2 : c2 = p.random(color_list);
            var l = p.drawingContext;
            var grad = l.createLinearGradient(x, y, x_[t], y_[t]);
            grad.addColorStop(0, c1);
            grad.addColorStop(1, c2);
            l.fillStyle = grad;
            p.vertex(x_[t], y_[t]);
        }
        p.endShape();
        p.pop();
    }
    p.keyPressed = function () {
        console.log("pressed");
        p.saveCanvas(canvas, 'myCanvas', 'jpg');
    };
};
exports.sketch = sketch;
