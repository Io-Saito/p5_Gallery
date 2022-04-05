import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let canvas
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];

let li=[];
let x;

p.setup=()=> {
  canvas=p.createCanvas(600, 600);
  x=p.createGraphics(p.width,p.height);
  p.noLoop();
  p.stroke(50);
  x.angleMode("degrees");
  p.blendMode(p.BURN)

  let r=40;
  let c=0;
  for (let j=100; j<=500; j+=(r*1.5)){
      for (let i=100; i<=500; i+=(r*p.sqrt(3))){
        if (c%2==0){
            li.push(new Hxagon(x,i,j))
        }else{
          li.push(new Hxagon(x,i+(r*p.sqrt(3)/2),j))
        }
      }
      c+=1;
  }
  
}

p.draw=()=> {
p.translate(300,300)
p.background("#F3F2EE");
  li.map(l=>{
    l.create();
  });

  p.image(x,-300,-300)
}


class Hxagon{
    pg: any
  x:number;
  y:number;
  c:p5.Color;
  fill:number;


  constructor(pg,x_,y_){
    this.x=x_;
    this.y=y_;
    this.c= p.color(p.random(colors))
    this.fill =p.int(p.random(0,3))
    this.pg=pg
    //fill=0: 線に色
    //fill=1:中抜き
    //fill=2:なし
  }
  create(){

    if(this.fill==1){
        this.pg.noFill()
        this.pg.stroke(this.c)
        this.hex()
        this.katachi(this.x,this.y,110)
    }else if(this.fill==2){
        this.pg.fill(this.c)

        this.hex()
        this.pg.erase()
        this.katachi(this.x,this.y,110)
        this.pg.noErase()

    }else{
        this.pg.noFill()
        this.pg.noStroke()
    }

    
  }
  hex(){
this.pg.beginShape();
this.pg.vertex(this.x+(20*p.sqrt(3)),this.y+20);
this.pg.vertex(this.x+(20*p.sqrt(3)),this.y-20);
this.pg.vertex(this.x,this.y-40);
this.pg.vertex(this.x-(20*p.sqrt(3)),this.y-20);
this.pg.vertex(this.x-(20*p.sqrt(3)),this.y+20);
this.pg.vertex(this.x,this.y+40);
    this.pg.endShape(p.CLOSE);

  }

      

   katachi(x, y, s) {
this.pg.noFill()
	let hs = s / 4
	// let center = s / 2;
	let rad = p.random(hs / 10, hs / 2);
	let linelength = p.random(0, -hs);
	let linelength2 = p.random(0, -hs);

	this.pg.push();

	this.pg.translate(x , y );
	this.pg.strokeWeight(1);
	this.pg.rectMode(this.pg.CENTER);

	for (let i = 0; i < 360; i += 360 / 6) {
		this.pg.push();
		this.pg.rotate(i);
		this.pg.ellipse(0, linelength, rad, linelength2);
		this.pg.pop();
	}

	 let a = p.int(p.random(2));

	 if (a == 1) {//hexagon
		this.pg.noFill();
		this.pg.beginShape();
		let r = p.random(hs / 5, hs);
		for (let i = 0; i < 6; i++) {

			let theta = i * 360 / 6;
			let x = r * p.cos(p.radians(theta));
			let y = r * p.sin(p.radians(theta));
		this.pg.vertex(x, y);
		}
		this.pg.endShape(this.pg.CLOSE);
	}

	this.pg.pop();

}

}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}
}
