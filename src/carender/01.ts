import * as p5 from 'p5';

export const sketch = (p: p5) => {
let pg;
let colors =["#002962","#212f45","#001b29"];

let c;

p.setup=()=>{
	c=p.createCanvas(1074, 1074);
	p.background("#F3F2EE");
	// p.angleMode(p.DEGREES);
	p.noLoop();

	pg = p.createGraphics(p.width, p.height);
	pg.blendMode(p.BURN)
	p.blendMode(p.BURN)
}

p.draw=()=>{
	showGraphics(pg);
}

function showGraphics(pg) {
	pg.background("#F3F2EE");
    pg.fill("#ffba08")
    pg.noStroke();
	pg.ellipse(p.width / 3, p.height / 4, 250, 250);
	showCircle(pg, p.width / 3, p.height / 4, 250);
    showMountain(pg,900,1300)

	p.image(pg, 0, 0);
}

function showCircle(pg, x, y, radius) {
	pg.push();
	pg.translate(x, y);
	let num = 60;
	let angle = p.TWO_PI / num;
	let count = 1500;
	let c = pg.color("#ffba08");
	for (let i = 0; i < count; i++) {
		//let alpha = map(i, 0, count, 127, 0);
		for (let a = 0; a < num; a++) {
			if (a % 3 == 0) {
				pg.noFill();
				//c.setAlpha(alpha);
				pg.stroke(c);
				pg.arc(0, 0, radius + i, radius + i, a * angle, (a + 1) * angle);
			}
		}
	}
	pg.pop();
}

function showMountain(pg,x,y){
    pg.translate(x,y)
    pg.rotate(p.PI)
    let p_b=[]
    let p_u=[]
    pg.beginShape()
    for (let i=-10; i<10; i+=0.1){
        if (p.abs(i)<=1.5){
            p_b.push([i,(0.25*p.cos(p.TWO_PI*i)+4.8)])

        }else{
            p_b.push([i,12/(p.abs(i)*1+1)])
            p_u.push([i,12/(p.abs(i)*1+1)])
        }
        if(p.abs(i)<=1){
            p_u.push([i,(p.pow(i,4)-p.pow(i,2)+6)])
        }
        
    }

    // pg.beginShape()
	// for (let i=0; i<p_u.length; i++){
	// 	pg.curveVertex(p_u[i][0]*80,p_u[i][1]*100)
	// }
	// pg.endShape()
	pg.erase()
	// pg.fill("")
	pg.beginShape()
    for (let j = 0; j <p_u.length; j++) {
		pg.curveVertex(p_u[j][0]*140,p_u[j][1]*160)
	}
	pg.endShape(p.CLOSE)
	pg.noErase()

	pg.fill("#E2E3DD")
	pg.beginShape()
    for (let j = 0; j <p_u.length; j++) {
		pg.curveVertex(p_u[j][0]*140,p_u[j][1]*160)
	}
	pg.endShape(p.CLOSE)

	pg.beginShape()
    for (let j = 0; j <p_b.length; j++) {
        let l=pg.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(p_b[j][0], 0,p_b[j][0],p_b[j][1]);
        let c1=colors[0]
    let c2=colors[1]
		grad.addColorStop(0, c1);
		grad.addColorStop(1,c2);
		l.fillStyle = grad;
    pg.curveVertex(p_b[j][0]*140,p_b[j][1]*160)
    }
    pg.endShape()

	

    pg.rotate(-p.PI)
    pg.translate(-x,-y)
}


        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '01', 'png');
}

}
