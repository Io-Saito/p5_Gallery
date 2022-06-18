import p5 from "p5";

export const sketch = (p: p5) => {
let NUM = 6;
let NUM_SNOW = 100;// 雪の結晶の数
let data = [];// 空の配列
let c;
let colors=["#168aad","#1a759f","#1e6091","#2a6f97","#2c7da0","#468faf","#61a5c2","#89c2d9"]

p.setup=()=>{
  c=p.createCanvas(1074, 1074);// ウィンドウサイズでキャンバスを作成
  p.noLoop()
  p.blendMode(p.BURN)
  for (let i = 0; i < NUM_SNOW; i++) {
    data.push({// 配列にオブジェクトを追加
      x: p.random(p.width),
      y: p.randomGaussian(0,p.height/4),
      angle: p.random(p.TWO_PI),
      radius: p.random(20, 60),
      col: p.color(p.random(colors)),
      snowType: p.floor(p.random(1, 6))// 1 < x < 6 の範囲のランダム整数 -> 1 or 2 or 3 or 4 or 5
    });
  }
}

function drawSnow01(x, y, angle, radius, col) {
  p.strokeWeight(9);
  p.stroke(col);

  p.push();
  {
    p.translate(x, y);
    p.rotate(angle);
    p.scale(radius / 100);

    for (let i = 0; i < NUM; i++) {
      p.push();
      {
        p.rotate(i * p.TWO_PI / NUM);
        p.line(0, 0, 0, -100);
        p.line(0, 30, 30, 60);
        p.line(0, 30, -30, 60);
      }
      p.pop();
    }
  }
  p.pop();
}

function drawSnow02(x, y, angle, radius, col) {
  p.push();
  {
    p.translate(x, y);
    p.rotate(angle);
    p.scale(radius / 100);
    
    p.stroke(col);
    p.strokeWeight(9);
    
    for (let i = 0; i < NUM; i++) {
      p.push();
      {
        p.rotate(i * p.TWO_PI / NUM);
        
        p.line(0, 0, 0, -100);
        
        p.line(0, 0, 30, 60);
        p.line(0, 0, -30, 60);
        
        p.line(0, 90, 30, 60);
        p.line(0, 90, -30, 60);
      }
      p.pop();
    }
  }
  p.pop();
}

function drawSnow03(x, y, angle, radius, col) {
  p.push();
  {
    p.translate(x, y);
    p.rotate(angle);
    p.scale(radius / 100);
    
    p.stroke(col);
    p.strokeWeight(6);
    
    for (let i = 0; i < NUM; i++) {
      p.push();
      {
        p.rotate(i * p.TWO_PI / NUM);
        
        p.line(0, 0, 0, -100);
        
        p.line(0, 0, 15, 60);
        p.line(0, 0, -15, 60);
        
        p.line(0, 90, 30, 30);
        p.line(0, 90, -30, 30);
        
        p.noStroke();
        p.fill(col);
        p.circle(0, -100, 10);
      }
      p.pop();
    }
  }
  p.pop();
}

function drawSnow04(x, y, angle, radius, col) {
  p.push();
  {
    p.translate(x, y);
    p.rotate(angle);
    p.scale(radius / 100);
    
    p.rectMode(p.CENTER);
    p.stroke(col);
    p.strokeWeight(6);
    
    for (let i = 0; i < NUM; i++) {
      p.push();
      {
        p.rotate(i * p.TWO_PI / NUM);
        
        p.line(0, 0, 0, -90);
        
        p.line(-20, 35, 20, 35);
        p.line(-20, 55, 20, 55);
        p.line(-10, 70, 10, 70);
        
        p.noFill();
        p.translate(0, -100);
        p.rotate(p.PI / 4);
        p.square(0, 0, 15);
      }
      p.pop();
    }
  }
  p.pop();
}

function drawSnow05(x, y, angle, radius, col) {
  p.push();
  {
    p.translate(x, y);
    p.rotate(angle);
    p.scale(radius / 100);
    
    p.stroke(col);
    p.strokeWeight(6);
    
    for (let i = 0; i < NUM; i++) {
      p.push();
      {
        p.rotate(i * p.TWO_PI / NUM);
        
        p.line(0, 0, 0, -90);
        
        p.line(0, 35, 20, 45);
        p.line(0, 35, -20, 45);
        
        p.line(0, 55, 30, 70);
        p.line(0, 55, -30, 70);
        
        p.line(0, 75, 10, 85);
        p.line(0, 75, -10, 85);
      }
      p.pop();
    }
  }
  p.pop();
}

p.draw=()=> {
  p.background("#F3F2EE");

  for (let i = 0; i < data.length; i++) {
    let obj = data[i];// data[i]だらけになっちゃうので、変数にいれる


    if (obj.y - obj.radius > p.height) {
      obj.radius = p.random(10, 30);
      obj.x = p.random(p.width);
      obj.y = -obj.radius;
      obj.angle = p.random(p.TWO_PI);
      obj.color = p.color(p.random(80, 200), 200, 255);
      obj.snowType = p.floor(p.random(1, 6));
    }

    if (obj.snowType === 1) {
      drawSnow01(obj.x, obj.y, obj.angle, obj.radius, obj.col);
    }
    if (obj.snowType === 2) {
      drawSnow02(obj.x, obj.y, obj.angle, obj.radius, obj.col);
    }
    if (obj.snowType === 3) {
      drawSnow03(obj.x, obj.y, obj.angle, obj.radius, obj.col);
    }
    if (obj.snowType === 4) {
      drawSnow04(obj.x, obj.y, obj.angle, obj.radius, obj.col);
    }
    if (obj.snowType === 5) {
      drawSnow05(obj.x, obj.y, obj.angle, obj.radius, obj.col);
    }
  }
}

        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '12', 'png');
}
}