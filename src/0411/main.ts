import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let flowers = [];
let canvas;
let pg;
let z
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];


p.setup=()=> {
  z=p.createCanvas(700, 700);
  p.noFill();
  p.noLoop()
  p.stroke(0);
  p.angleMode("radians")
    
pg=p.createGraphics(p.width, p.height)
}


function drawText(tt) {
  pg.push();
  pg.translate(pg.width/2, pg.height/2);

  pg.pop(); 
}

p.draw=()=> {
  p.background("#F6F6F6");
  p.noStroke();
p.blendMode(p.BURN)
// p.translate(300,300)
// p.rotate(90)
  divideRect();
  p.blendMode(p.BLEND)


  p.image(pg,0,0)

}

    const divideRect=()=> { 

    for(let i=30; i<=p.width-60; i+=60) {
        for (let j=30; j<=p.height-60; j+=60){
            randomArc(i,j,15)
        }
    }

}
const randomArc=(x: number,y: number,r: number)=>{
    
    let i=p.int(p.random(1,100))
    p.translate(x,y)

    switch(i%4){
        //右上
        case 0:
            leaf(r) 
        //左上
        case 1:
            p.translate(2*r,0)
            p.rotate(p.HALF_PI)
            leaf(r)
            p.rotate(-p.HALF_PI)
            p.translate(-2*r,0)
        //右下
        case 2:
            p.translate(2*r,2*r)
            p.rotate(p.PI)
            leaf(r)
            p.rotate(-p.PI)
            p.translate(-2*r,-2*r)
        // //左下
        case 3: 
            p.translate(0,2*r)
            p.rotate(p.PI+p.HALF_PI)
            leaf(r)
            p.rotate(-(p.PI+p.HALF_PI))
            p.translate(0,-2*r)
    }
    p.translate(-x,-y)
}

const leaf =(r: number)=>{
    let color:p5.Color=p.color(p.random(colors))
    color.setAlpha(230)
    p.fill(color)
    p.arc(0, 0, 2*r,2*r,0,p.HALF_PI,p.OPEN)
    p.arc(r,r,2*r,2*r,p.PI,p.PI+p.PI/2,p.OPEN)
}

	 p.keyPressed=()=> {
      console.log("pressed")
      p.saveCanvas(z, 'myCanvas', 'jpg');
    }
}


	//  p.keyPressed=()=> {
    //   console.log("pressed")
    //   p.saveCanvas(canvas, 'myCanvas', 'jpg');
    // }

