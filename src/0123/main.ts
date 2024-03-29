import * as p5 from 'p5';

export const sketch = (p: p5) => {
    
let _minWidth;
let _palette =
["b3001b","ffd275","255c99"];

let strings=["きみの感性のかけらは","つめたく透き通っていて","しゃりしゃりと音がして","桜の香りがして","淋しいのだろう",
"それを一つぶ一つぶ","丁寧に喰べる","わたしの憧憬を","きみの孤独は","しっかりと映していて","きみの感性は","美味しいのだった","それで充分かな"]

let colors=[
  ["#caf0f8","#48cae4","#ffffff","#0096c7"],//blue
  ["#fff0f3","#ffccd5","#ffffff","#ff4d6d"],//red
  ["#80ffdb","#b2f7ef","#3dccc7","#ffffff"]//turquoise
]
let stringcolor=["#0096c7","#3dccc7","#ff4d6d"]
let bg=["#f2b5d4","#c4fff9","#ffffff"]
let _points;
let c;

let tCount = 100;
let trangX = [];
let trangY = [];
let _bg;

p.setup=()=>{
  c=p.createCanvas(750, 750);
  p.colorMode(p.RGB);
  p.noStroke();
  p.strokeJoin(p.ROUND);
  p.noLoop()
  p.textFont("Sawarabi Mincho");

  setObject();
  _bg=setBg();
}

let gems=[]
function setObject() {
  _minWidth =30;
  p.shuffle(_palette, true);
  p.strokeWeight(_minWidth/100);
  p.stroke(100);
  
  for (let i=0; i<50; i++){
  gems.push(new Points());
  }


}


const setBg=()=> {
  _bg = p.createGraphics(750, 750);
  _bg.background("#ffffff")
  for (let i = 0; i < tCount; i++) {
		trangX[i] = p.random(-200, p.width + 200);
		trangY[i] = p.random(-200, p.height + 200);
	}
for (let i = 0; i < tCount - 3; i++) {
		let c = p.color(p.random(colors));
		c.setAlpha(1);
		_bg.noStroke();
		_bg.fill(c);
		_bg.triangle(trangX[i], trangX[i + 1], trangX[i + 2], trangY[i], trangY[i + 1], trangY[i + 2]);
	}
  return _bg;
}
  // _bg.noStroke();
  // _bg.colorMode(p.RGB, 360, 100, 100, 255);
  // let d = _bg.pixelDensity();
  // _bg.loadPixels();
  // for (let x = 0; x < _bg.width * d; x++) {
  //   for (let y = 0; y < _bg.height * d; y++) {
  //     let index = (y * _bg.width * d + x) * 4;
  //     let brt = p.int(p.random(255));
	// 		let alp = 50;
  //     _bg.pixels[index] = brt;
  //     _bg.pixels[index+1] = brt;
  //     _bg.pixels[index+2] = brt;
  //     _bg.pixels[index+3] = alp;
  //   }
  // }
 

class Points {
    center:place;
    numPoints:number;
    noiseSeedInit:Array<Array<number>>;
    noiseSpeed:[number, number];
    noiseFreq:[number, number];
    aryPoints:Array<any>
    colors:Array<p5.Color>
    
  constructor() {
    
    this.colors =colors[p.int(p.random(0,2))].map(x=>p.color(x))
    console.log(this.colors)
    this.center={x:p.noise(p.random(1000,10000))*p.width*1.5,y:p.noise(p.random(1000,100000))*p.height*1.5}
    this.numPoints = 20;//14;
    this.noiseSeedInit = [];
    for (let i = 0; i < this.numPoints; i++) {
      this.noiseSeedInit[i] = [p.random(1000), p.random(1000)];
    }
    this.noiseSpeed = [0.0015, 0.001/3];
    this.noiseFreq = [3, 3];
  }

  update() {
    this.aryPoints = [];
    for (let i = 0; i < this.numPoints; i++) {
      let r = _minWidth * 0.6 * p.sin(2*p.PI * this.noiseFreq[0] * p.noise(this.noiseSpeed[0] * p.frameCount + this.noiseSeedInit[i][0]));
      let ang = 2*p.PI * p.sin(2*p.PI * this.noiseFreq[1] * p.noise(this.noiseSpeed[1] * p.frameCount + this.noiseSeedInit[i][1]));
      this.aryPoints[i] = p.createVector(r * p.cos(ang), r * p.sin(ang));
    }
  }
}

function calcDelaunayDiagram(aryPoints) { //return triangle array of Delaunay diagram
  let aryTriangles = [];
  let baseTriangle = getBaseTriangle();

  aryTriangles[0] = baseTriangle;
  let currentAryPoints = [];
  currentAryPoints = [[baseTriangle.xy1, -1], [baseTriangle.xy2, -1], [baseTriangle.xy3, -1]];
  for (let i = 0; i < aryPoints.length; i++) {
    let aryTrianglesLength = aryTriangles.length;
    
    let aryAddTriangles = [];
    for (let j = aryTrianglesLength - 1; j >= 0; j--) {
      if (checkPointInCircumcircle(aryTriangles[j], [aryPoints[i], i]) == true) {
        let triangel1 = new Triangle(aryPoints[i], aryTriangles[j].xy1, aryTriangles[j].xy2, i, aryTriangles[j].i1, aryTriangles[j].i2);
        let triangel2 = new Triangle(aryPoints[i], aryTriangles[j].xy2, aryTriangles[j].xy3, i, aryTriangles[j].i2, aryTriangles[j].i3);
        let triangel3 = new Triangle(aryPoints[i], aryTriangles[j].xy3, aryTriangles[j].xy1, i, aryTriangles[j].i3, aryTriangles[j].i1);
        aryTriangles.splice(j, 1);
        if (checkTriangleIncludePoints(triangel1, currentAryPoints) == true) {
          triangel1.includePoint = true;
        }
        if (checkTriangleIncludePoints(triangel2, currentAryPoints) == true) {
          triangel2.includePoint = true;
        }
        if (checkTriangleIncludePoints(triangel3, currentAryPoints) == true) {
          triangel3.includePoint = true;
        }
        aryAddTriangles.push(triangel1);
        aryAddTriangles.push(triangel2);
        aryAddTriangles.push(triangel3);
      }
    }
    aryAddTriangles = removeDuplicate(aryAddTriangles);

    for (let i = 0; i < aryAddTriangles.length; i++) {
      aryTriangles.push(aryAddTriangles[i]);
    }

    currentAryPoints.push([aryPoints[i], i]);
  }

  for (let i = aryTriangles.length - 1; i >= 0; i--) {
    if (aryTriangles[i].includePoint == true ||
      checkIncludeBasetriangle(aryTriangles[i]) == true) {
      aryTriangles.splice(i, 1);
    }
  }

  return aryTriangles;
}

function removeDuplicate(aryTriangles) {
  let newAryTriangles = aryTriangles;
  for (let i = newAryTriangles.length-1; i >= 1; i--) {
    let newAryIndex_i = [newAryTriangles[i].i1, newAryTriangles[i].i2, newAryTriangles[i].i3];
    for (let j = 0; j < i; j++) {
      let newAryIndex_j = [newAryTriangles[j].i1, newAryTriangles[j].i2, newAryTriangles[j].i3];
      newAryIndex_i.sort();
      newAryIndex_j.sort();
      if (
        newAryIndex_i[0] == newAryIndex_j[0] &&
        newAryIndex_i[1] == newAryIndex_j[1] &&
        newAryIndex_i[2] == newAryIndex_j[2]
      ) {
        newAryTriangles.splice(i, 1);
        break;
      }
    }
  }

  return newAryTriangles;
}

function checkIncludeBasetriangle(thisTriangle) {
  let check = false;
  if (thisTriangle.i1 < 0 || thisTriangle.i2 < 0 || thisTriangle.i3 < 0) {
    check = true;
  }

  return check;
}

function checkTriangleIncludePoints(thisTriangle, aryPoints) { //aryPoints = [[xy, index], ...]
  let inCircle = false;
  for (let i = 0; i < aryPoints.length; i++) {
    if (checkPointInCircumcircle(thisTriangle, aryPoints[i]) == true) {
      inCircle = true;
      break;
    }
  }

  return inCircle;
}

function checkPointInCircumcircle(thisTriangle, point) { //point = [xy, index]
  let inCircle = false;
  if (thisTriangle.i1 != point[1] && thisTriangle.i2 != point[1] && thisTriangle.i3 != point[1]) {
    let distance = p5.Vector.dist(thisTriangle.xyCentCircle, point[0]);
    if (distance < thisTriangle.rCircle) {
      inCircle = true;
    }
  }

  return inCircle;
}

function getBaseTriangle() { //a triangle including all points
  let x = 4;
  let baseXy1 = p.createVector(-p.width*x, -p.height*x);
  let baseXy2 = p.createVector(p.width*x, -p.height*x);
  let baseXy3 = p.createVector(0, p.height*x);

  let baseTriangle = new Triangle(baseXy1, baseXy2, baseXy3, -1, -2, -3);

  return baseTriangle;
}

interface place{
    x: number;
    y: number;
}

class Triangle {
    xy1:place;
    xy2:place;
    xy3:place;
    i1:number;
    i2:number;
    i3:number;
    xyCentCircle:number|p5.Vector;
    rCircle:number|p5.Vector;
    includePoint:boolean;
    xyCent:number|p5.Vector;
    innerR:number;

  constructor(xy1, xy2, xy3, i1, i2, i3) { //xy = vector, i = index of each point in array points
    this.xy1 = xy1;
    this.xy2 = xy2;
    this.xy3 = xy3;
    this.i1 = i1;
    this.i2 = i2;
    this.i3 = i3;

    let circumcircle = calcCircumcircle(this.xy1, this.xy2, this.xy3);
    this.xyCentCircle = circumcircle[0];
    this.rCircle = circumcircle[1];
    this.includePoint = false;
  }

  calcInnerCircle() {
    this.xyCent = calcInnerCircleCenter(this.xy1, this.xy2, this.xy3);
    this.innerR = calcDistPointLine(this.xyCent, this.xy1, this.xy2);
  }

  draw() {
    p.beginShape();
    p.vertex(this.xy1.x, this.xy1.y);
    p.vertex(this.xy2.x, this.xy2.y);
    p.vertex(this.xy3.x, this.xy3.y);
    p.endShape(p.CLOSE);
  }

  drawChaikin() {
    let aryXy = [this.xy1, this.xy2, this.xy3];
    let numRecursive = 4;
    for (let i = 0; i < numRecursive; i++) {
      aryXy = chaikin(aryXy, true);
    }
    
    p.beginShape();
    for (let i = 0; i < aryXy.length; i++) {
      p.vertex(aryXy[i].x, aryXy[i].y);
    }
    p.endShape(p.CLOSE);
  }
}

function calcCircumcircle(xy1, xy2, xy3) { //[center vertor of circumcircle, radius of circumcircle]
  //c = 2 { (x2 - x1)(y3 - y1) - (y2 - y1)(x3 - x1) }
  //x = { (y3 - y1)(x2**2 - x1**2 + y2**2 - y1**2) + (y1 - y2)(x3**2 - x1**2 + y3**2 - y1**2) } / c
  //y = { (x1 - x3)(x2**2 - x1**2 + y2**2 - y1**2) + (x2 - x1)(x3**2 - x1**2 + y3**2 - y1**2) } / c

  let c = 2 * ((xy2.x - xy1.x) * (xy3.y - xy1.y) - (xy2.y - xy1.y) * (xy3.x - xy1.x));
  let centx = ((xy3.y - xy1.y) * (xy2.x**2 - xy1.x**2 + xy2.y**2 - xy1.y**2) + (xy1.y - xy2.y) * (xy3.x**2 - xy1.x**2 + xy3.y**2 - xy1.y**2)) / c;
  let centy = ((xy1.x - xy3.x) * (xy2.x**2 - xy1.x**2 + xy2.y**2 - xy1.y**2) + (xy2.x - xy1.x) * (xy3.x**2 - xy1.x**2 + xy3.y**2 - xy1.y**2)) / c;
  let xyCent = p.createVector(centx, centy);
  let r = p5.Vector.dist(xy1, xyCent);

  return [xyCent, r];
}

function calculateCross(xy1, xy2, xy3, xy4) { //cross point of line xy1-xy2 and xy3-xy4
  //ax+by+c=0
  let a1 = xy1.y - xy2.y;
  let b1 = xy2.x - xy1.x;
  let c1 = xy1.x * xy2.y - xy2.x * xy1.y;
  let a2 = xy3.y - xy4.y;
  let b2 = xy4.x - xy3.x;
  let c2 = xy3.x * xy4.y - xy4.x * xy3.y;
  //cross point of line xy1-2 and line xy3-4
  let xcross = (b1*c2 - b2*c1) / (a1*b2 - a2*b1);
  let ycross = (a2*c1 - a1*c2) / (a1*b2 - a2*b1);
  let cross = p.createVector(xcross, ycross);

  return cross;
}

function calcInnerCircleCenter(xy1, xy2, xy3) { //Triangle xy1 xy2 xy3
  let xy_1_2 = p5.Vector.sub(xy2, xy1).normalize();
  let xy_1_3 = p5.Vector.sub(xy3, xy1).normalize();
  let midAngleXy1 = p5.Vector.add(xy_1_2, xy_1_3);

  let xy_2_3 = p5.Vector.sub(xy3, xy2).normalize();
  let xy_2_1 = p5.Vector.sub(xy1, xy2).normalize();
  let midAngleXy2 = p5.Vector.add(xy_2_3, xy_2_1);

  let xyCent = calculateCross(xy1, p5.Vector.add(xy1, midAngleXy1), xy2, p5.Vector.add(xy2, midAngleXy2));

  return xyCent;
}

function calcDistPointLine(xy_a, xy_b, xy_c) { //distance between point xy_a and line through xy_b and xy_c
  //ax + by + c = 0
  //a = y1 - y2
  //b = x2 - x1
  //c = x1*y2 - x2*y1
  //dist = abs(a*x0 + b*y0 + c) / (a**2 + b**2)**0.5
  let d;
  if (xy_b.x == xy_c.x) { d = p.abs(xy_a.x - xy_b.x); }
  else {
    let a = xy_b.y - xy_c.y;
    let b = xy_c.x - xy_b.x;
    let c = xy_b.x * xy_c.y - xy_c.x * xy_b.y;
    d = p.abs(a * xy_a.x + b * xy_a.y + c) / (a**2 + b**2)**0.5;
  }

  return d;
}

function chaikin(aryXy, type) { //length >= 3, type=true -> CLOSE
  let ratio = 0.75;
  let newAryXy = [];
  if (type == true) {
    for (let i = 0; i < aryXy.length; i++) {
      let previ;
      if (i == 0) { previ = aryXy.length-1; }
      else { previ = i - 1; }
      let xy1 = p5.Vector.lerp(aryXy[previ], aryXy[i], ratio);
      let nexti;
      if (i == aryXy.length-1) { nexti = 0; }
      else { nexti = i + 1; }
      let xy2 = p5.Vector.lerp(aryXy[nexti], aryXy[i], ratio);
      newAryXy.push(xy1);
      newAryXy.push(xy2);
    }
  } else {
    newAryXy.push(aryXy[0]);
    for (let i = 1; i < aryXy.length-1; i++) {
      let previ = i - 1;
      let xy1 = p5.Vector.lerp(aryXy[previ], aryXy[i], ratio);
      let nexti = i + 1;
      let xy2 = p5.Vector.lerp(aryXy[nexti], aryXy[i], ratio);
      newAryXy.push(xy1);
      newAryXy.push(xy2);
    }
    newAryXy.push(aryXy[aryXy.length-1]);
  }
  
  return newAryXy;
}

p.draw=()=> {
  // p.translate(p.width/2, p.height/2);
  p.background("#ffffff");
  // p.image(_bg, 0,0);
    for (let i = 0; i < tCount; i++) {
		trangX[i] = p.random(-200, p.width + 200);
		trangY[i] = p.random(-200, p.height + 200);
	}
for (let i = 0; i < tCount - 3; i++) {
		let c = p.color(p.random(bg));
		c.setAlpha(30);
		p.noStroke();
		p.fill(c);
		p.triangle(trangX[i], trangX[i + 1], trangX[i + 2], trangY[i], trangY[i + 1], trangY[i + 2]);
	}
  for (let i=0; i<gems.length; i++){
    p.translate(gems[i].center.x, gems[i].center.y);
  gems[i].update();
  let aryTriangles = [];
  aryTriangles = calcDelaunayDiagram(gems[i].aryPoints);
  let num = aryTriangles.length;
  for (let i = 0; i < num; i++) {
		let col_i = aryTriangles[i].i1 + aryTriangles[i].i2 + aryTriangles[i].i3;
		let col = p.random(gems[i].colors);
		p.push();
		p.fill(col);
    p.stroke("#ffffff")
		aryTriangles[i].draw();
		p.pop();
  }
  p.translate(-gems[i].center.x, -gems[i].center.y);
}
	let str=strings.map(x=>x.split('').join('\n'))
	console.log(str)
	      for (let s=0; s<15; s++){
        let string=str[s]
        p.fill(p.random(stringcolor))
        p.textSize(15);
        p.text(string, 660-(p.width-120)*s/13, p.random(80,150));
    }

}

p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, 'myCanvas', 'jpg');
}
}