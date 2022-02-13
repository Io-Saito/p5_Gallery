
import * as p5 from 'p5';

export const sketch = (p: p5) => {
let count = 5;
let colors = ["#005f73","#0a9396","#94d2bd", "#e9d8a6" ,"#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];
let no;
let fish=[];
let wave=[];

p.setup=()=> {
	p.createCanvas(600, 600);
	p.noLoop();
	p.background("#EEEEEE");
	let a=100
        let b=0.1
for (let j = 0; j < p.PI*4; j+=0.2) {
            let x=a*p.exp(b*j)*p.cos(j)
            let y = a*p.exp(b*j)*p.sin(j)
            let dx=a*p.exp(b*j)*(b*p.cos(j)-p.sin(j))
            let dy=a*p.exp(b*j)*(b*p.sin(j)+p.cos(j))
            let arc=p.atan((dy+0.001)/(dx+0.001))
            let x_scale =p.random(1.5,2.0)
            let y_scale = 1
            for (let k=0; k<2; k++){
            fish.push(new Fish({x:x+p.random(0,150),y:y+p.random(0,150)},{x:x_scale,y:y_scale},arc))
            }
            }
    // for (let n=0; n<5; n++){
    //     wave.push(new Wave({x:p.random(0,150),y:p.random(0,150)}))
    // }

	no = p.createGraphics(p.width, p.height);
	no.noStroke();
	let col = p.color("#ffffff");
	col.setAlpha(100);
	no.fill(col);
	p.blendMode(p.BURN);
}

p.draw=()=> {
    for(let i = 0;i<fish.length;i++) {
            fish[i].makefish();
        } 
}




    interface Place{
        x:number;
        y:number;
    }



class Fish{
        pos:Place;
        scale:Place;
        arc:number;

        constructor(pos:Place,scale:Place,arc){
            this.pos=pos
            this.scale=scale
            this.arc=arc
        }
    makefish=()=>{
	p.push();
	p.translate(this.pos.x, this.pos.y);
    p.rotate(this.arc)

	let x = [];
	let y = [];
	// p.stroke(p.random(colors))
    p.noStroke()
	p.beginShape();
	for (let i=0; i<p.TWO_PI; i+=0.1) {

		x[i] = 10*(p.cos(i)-p.sin(i)**2/p.sqrt(2))*this.scale.x
		y[i] = 10*(p.cos(i)*p.sin(i))*this.scale.y
        let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(0, 0, x[i], y[i]);
		grad.addColorStop(0, p.random(colors));
		grad.addColorStop(1, p.random(colors));
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
		p.vertex(x[i], y[i]);
	}
	p.endShape();
        p.rotate(-this.arc)
    p.translate(-this.pos.x, -this.pos.y);

	p.pop();
}
}
}
