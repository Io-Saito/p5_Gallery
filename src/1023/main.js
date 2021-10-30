"use strict";
exports.__esModule = true;
exports.sketch = void 0;
var sketch = function (p) {
    var colorlist = function (x) {
        return x.split("/").reverse()[0].split("-").map(function (x) { return "#" + x; });
    };
    var col = ["#1199d5", "#aaddeb", "#cbd964", "#45b9c0", "#fbc83a"];
    var pg;
    p.setup = function () {
        p.createCanvas(700, 700);
        p.noFill();
        p.noLoop();
        p.stroke(0);
        p.angleMode("radians");
        pg = p.createGraphics(p.width, p.height);
        pg.textFont("Sawarabi Mincho");
    };
    function grain() {
        drawText("朧月夜");
    }
    function drawText(tt) {
        pg.push();
        pg.translate(pg.width / 2, pg.height / 2);
        pg.rectMode(p.CENTER);
        pg.fill(20);
        pg.rect(0, -18, p.width - 270, 140); // tate
        pg.fill(255);
        pg.textSize(156);
        pg.erase();
        pg.textAlign(p.CENTER, p.CENTER);
        pg.text(tt, 0, 0);
        pg.noErase();
        pg.pop();
    }
    p.draw = function () {
        p.background(20);
        p.noStroke();
        p.blendMode(p.SCREEN);
        divideRect();
        p.blendMode(p.BLEND);
        grain();
        p.image(pg, 0, 0);
    };
    var divideRect = function () {
        for (var i = 0; i < p.width - 50; i += 60) {
            for (var j = 0; j < p.height - 50; j += 60) {
                randomArc(i + p.random(-20, 20), j + p.random(-20, 20), p.random(40, 80));
            }
        }
    };
    var randomArc = function (x, y, r) {
        var i = p.int(p.random(1, 100));
        p.translate(x, y);
        switch (i % 4) {
            //右上
            case 0:
                leaf(r);
            //左上
            case 1:
                p.translate(2 * r, 0);
                p.rotate(p.HALF_PI);
                leaf(r);
                p.rotate(-p.HALF_PI);
                p.translate(-2 * r, 0);
            //右下
            case 2:
                p.translate(2 * r, 2 * r);
                p.rotate(p.PI);
                leaf(r);
                p.rotate(-p.PI);
                p.translate(-2 * r, -2 * r);
            // //左下
            case 3:
                p.translate(0, 2 * r);
                p.rotate(p.PI + p.HALF_PI);
                leaf(r);
                p.rotate(-(p.PI + p.HALF_PI));
                p.translate(0, -2 * r);
        }
        p.translate(-x, -y);
    };
    var leaf = function (r) {
        var color = p.color(p.random(col));
        color.setAlpha(230);
        p.fill(color);
        p.arc(0, 0, 2 * r, 2 * r, 0, p.HALF_PI, p.OPEN);
        p.arc(r, r, 2 * r, 2 * r, p.PI, p.PI + p.PI / 2, p.OPEN);
    };
};
exports.sketch = sketch;
