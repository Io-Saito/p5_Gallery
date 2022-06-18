import * as p5 from 'p5';

export const sketch = (p: p5) => {
let colors = ["#0a5c36","#0f5132","#14452f","#94d2bd","#aad576"];
let c;

p.setup=()=>{
	c=p.createCanvas(1074, 1074);
    p.background("#F3F2EE");
    p.angleMode(p.DEGREES)
    p.blendMode(p.BURN)
    p.noLoop()
}

p.draw=()=>{
    p.translate(0,1124)
    p.translate(50,0)
    branch(105)
    p.translate(p.width/2-50,0)
    branch(105)
    p.translate(p.width/2-50,0)
    branch(105)
}

function branch(len) {//criação da estrutura do galho
    
 p.push()
  if(len>30){
      p.strokeWeight(p.map(len,10,100,1,15))
      p.stroke("#353652")
    p.line(0,0,0,-len)
    p.translate(0,-len)
    p.rotate(p.random(-20, -30))
    branch(len *p.random(0.7, 0.9))
    p.rotate(p.random(50,80))
    branch(len *p.random(0.7, 0.9))
    if(len <80){
        leaf(p.random(20,50),p.random(20,50),30,0)
    }
} else if(p.random(0,1)>0.3){ //criação das folhas
    
    leaf(p.random(30,80),p.random(30,80),60,0)
    
    // for (let i = 45; i < 135;i++){
    //     let rad = 15
    //     let x = rad * p.cos(i)
    //     let y = rad * p.sin(i)
    //     p.vertex(x, y)
    // }
    // for (let i = 135; i > 40;i--){
    //     let rad = 15
    //     let x = rad * p.cos(i)
    //     let y = rad * p.sin(-i) + 20
    //     p.vertex(x, y)
    // }
    p.endShape(p.CLOSE)
}
p.pop()
}

    function leaf(x,y,r,theta) {
        let c1=p.random(colors)
        let c2=p.random(colors)
        p.noStroke()
        p.translate(x,y)
        p.rotate(theta)
        p.beginShape()
        let x_=[];
        let y_=[]
         for (let t = 0; t <= 180; t += 1) {
            if(t<=90){
        x_[t]=r*p.cos(t)
        y_[t]=r*p.sin(t)
            }else{
        x_[t]=r+r*p.cos(t+90)
        y_[t]=r+r*p.sin(t+90)
            }
        let l=p.drawingContext as CanvasRenderingContext2D;
		let grad  = l.createLinearGradient(0, 0, x_[t], y_[t]);
		grad.addColorStop(0, c1);
		grad.addColorStop(1,c2);
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
        p.curveVertex(x_[t], y_[t]);
    }
    p.endShape()
        p.rotate(-theta)
        p.translate(-x,-y)

    };
            p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '05', 'png');
}
}
