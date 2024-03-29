"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var count = 3;
    var color = [["#fcde35", "#feffdc", "#ffea72"],
        ["#fcac06", "#fdffde", "#fec432"],
        ["#a1d567", "#FEFFDB", "#d9ed7c"],
        ["#ffdf32", "#fdffde", "#FFA478"]];
    p.setup = function () {
        p.angleMode(p.DEGREES);
        p.createCanvas(900, 900);
        p.noLoop();
        p.textFont("Sawarabi Mincho");
        // p=p.createGraphics(p.width, p.height) //背景
        //     pg2=p.createGraphics(p.width-10, p.height-10) //文字
    };
    p.draw = function () {
        p.background("#D2F4D0");
        for (var i = 0; i < 10; i++) {
            var x = p.random(p.width);
            var y = p.random(p.height);
            var size = p.random(p.width / 5, p.width / 3);
            myCircle(x, y, size);
        }
        for (var i = 0; i < p.width * p.height / 100; i++) {
            var x = p.random(p.width);
            var y = p.random(p.height);
            p.stroke("#FFFFFF");
            p.point(x, y);
        }
        var cells = 5; //格子の数
        var offset = 10;
        var w = (p.width - offset * 2) / cells;
        var h = (p.height - offset * 2) / cells;
        for (var j = 0; j < cells; j++) {
            for (var i = 0; i < cells; i++) {
                var x = offset + i * w;
                var y = offset + j * h;
                var cx = x + w / 2; //格子の中心座標
                var cy = y + h / 2;
                var stroke_num = 1.5; //図形の線の太さ
                var d = w; //d = w - stroke_num
                var rotate_num = p.int(p.random(5));
                rotate_num = rotate_num * 90;
                var shape_num = p.int(p.random(7));
                var color_list = p.random(color);
                p.push();
                p.translate(cx, cy);
                p.rotate(rotate_num);
                p.fill("#F5E64E");
                p.strokeWeight(1.5);
                p.stroke("#F5E64E");
                switch (shape_num) {
                    case 0: {
                        Lemon(0, 0, d, 0, 360, color_list);
                        break;
                    }
                    case 1: {
                        Lemon(0, -d / 2, d, 0, 180, color_list);
                        Lemon(0, d / 2, d, 180, 360, color_list);
                        break;
                    }
                    case 2: {
                        // Lemon(-d / 2, -d / 2, d * p.sqrt(2), 0, 90,color_list);
                        // Lemon(d / 2, d / 2, d * p.sqrt(2),180, 270,color_list);
                        break;
                    }
                    case 3: {
                        Lemon(-d / 2, -d / 2, 2 * d, 0, 90, color_list);
                        break;
                    }
                    case 4: {
                        Lemon(0, -d / 2, d, 0, 180, color_list);
                        break;
                    }
                    case 5: {
                        break;
                    }
                }
                p.pop();
            }
        }
        function Lemon(x, y, r, angle_start, angle_end, c_list) {
            var isLemon = p.int(p.random(100));
            if (isLemon % 3 == 0) {
                p.noStroke();
                p.fill(c_list[0]);
                p.arc(x, y, r, r, angle_start, angle_end);
                p.fill(c_list[1]);
                p.arc(x, y, r * 0.85, r * 0.85, angle_start, angle_end);
                p.fill(c_list[2]);
                p.arc(x, y, r * 0.75, r * 0.75, angle_start, angle_end);
                p.stroke(c_list[1]);
                var len = r * 0.4;
                for (var i = angle_start; i <= angle_end; i += 30) {
                    p.line(x, y, x + len * p.cos(i), y + len * p.sin(i));
                }
            }
            else {
                p.noStroke();
                p.fill(c_list[2]);
                p.arc(x, y, r, r, angle_start, angle_end);
            }
        }
    };
    function myCircle(cx, cy, radius) {
        var cs = ["#D0F7D3", "#B8ECA5", "#F7F6D9"];
        var count = radius * 2;
        var c = p.color(p.random(cs));
        for (var i = 0; i < count; i++) {
            var alpha = p.map(i, 0, count, 60, 0);
            p.noFill();
            c.setAlpha(alpha);
            p.stroke(c);
            p.ellipse(cx, cy, radius + i, radius + i);
        }
    }
};
exports.sketch = sketch;
