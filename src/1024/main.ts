import * as p5 from 'p5';

export const sketch = (p: p5) => {
    var colorlist = function (x) {
        return x.split("/").reverse()[0].split("-").map(function (x) { return "#" + x; });
    };
    var count = 4; //再帰回数
    var col = colorlist("https://coolors.co/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0");
    var pg;
    p.setup = function () {
        p.createCanvas(600, 600);
        p.noFill();
        p.noLoop();
        p.stroke(0);
        p.angleMode("radians");
        p.textFont("Sawarabi Mincho");
        pg=p.createGraphics(p.width-30, p.height-30)
    };

    function grain(){
  drawText("決\nし\nて\nあ\nな\nた\nを\n捨\nて\nま\nせ\nん");
}

function drawText(tt) {
  p.push();
  p.translate(p.width/2, p.height/2);
  p.rectMode(p.CENTER);
  p.fill(20);
//  rect(0, 10, width - 100, 50); // yoko
  p.erase()
  p.rect(15, 0, 50, p.width - 80); 
  p.noErase()// tate
  p.fill(255);
  p.textSize(36);
  p.textAlign(p.CENTER, p.CENTER);
  p.text(tt, 0,0);
  p.pop(); 
}
    p.draw = function () {
        p.background(30);
        p.noStroke();
        divideRect(0, 0, p.width, p.height, count);
      pg.background(0)
      pg.blendMode(p.BLEND)
			pg.stroke(0,0,0)
      pg.fill(0,0,0);
      pg.rect(30,30,p.width-60,p.height-60);
      grain()
      p.image(pg,30,30)
    };
    var divideRect = function (x, y, w, h, n) {
        p.blendMode(p.SCREEN);
        for (var i = 0; i < 2; i++) {
            randomArc(x, y, p.random([w, h]));
        }
        n--;
        if (n >= 0) {
            //幅が高さよりも大きい、または幅と高さが等しい場合
            if (w >= h) {
                //ランダムな値を得る
                var randomW = p.random(w * 0.2, w * 0.8);
                //ランダムな値から2つのdivideRectを呼び出す
                divideRect(x, y, randomW, h, n); //左側の四角形
                divideRect(x + randomW, y, w - randomW, h, n); //右側の四角形
            }
            //幅が高さよりも小さい場合
            if (w < h) {
                var randomH = p.random(h * 0.2, h * 0.8);
                divideRect(x, y, w, randomH, n); //上側の四角形
                divideRect(x, y + randomH, w, h - randomH, n); //下側の四角形
            }
        }
        count -= 1;
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
        color.setAlpha(180);
        p.fill(color);
        p.arc(0, 0, 2 * r, 2 * r, 0, p.HALF_PI, p.OPEN);
        p.arc(r, r, 2 * r, 2 * r, p.PI, p.PI + p.PI / 2, p.OPEN);
    };
};