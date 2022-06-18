import * as p5 from 'p5';

export const sketch = (p: p5) => {
let flowers = [];
let canvas;
let BG;
let c
let BG2;
let colors = ["#c9184a","#ff4d6d","#ff758f","#ff8fa3","#d0253c"];


    p.setup=()=>{
        c=p.createCanvas(1074, 1074);
        colors = p.shuffle(colors);
        p.background("#F3F2EE");
        p.noLoop();
		// p.angleMode(p.RADIANS)
        p.blendMode(p.BURN)
        BG = createBG();
			
}

    p.draw=()=>{
	    
		p.image(BG, 0, 0);
    }

const createBG=()=>{

	let pg = p.createGraphics(p.width, p.height);
	pg.blendMode(p.BURN)
	

		pg.translate(pg.width/2,pg.height/2)

	wave2(pg)

	pg.translate(-pg.width/2,-pg.height/2)
	
	
	return pg;
}

const wave2=(bg)=>{

	p.noiseSeed(p.random(100));
	let r=p.random(0,30)
		for (let i=p.PI;i <= p.TWO_PI; i+=0.005){
			bg.strokeWeight(1);
            let prob=p.random(0,1)
            let x=p.cos(i)*700+p.random(-200,200)-100
            let y=p.sin(i)*700+p.random(-200,200)+100

				let ww = p.noise(x * 0.1, y * 0.1) * 150 
				let overlapping = false
				for(let i=0; i<flowers.length; i++){
					let other=flowers[i]
					let d=p.dist(x,y,other[0],other[1])
					if (d<ww+other[2]-20){
						overlapping=true
						break
					}
				}
				if(!overlapping){
					flowers.push([x,y,ww])
                
					flower(bg,x,y,ww)
				
				
				
			

			

		p.noStroke()
                
	
		}
			
    }

}


function flower(bg,cx, cy, d) { //黒い花弁があるやつ
	bg.noStroke()
    bg.translate(cx,cy)
	let k=p.random(0,p.TWO_PI)
	bg.rotate(k)
	let petalNum = 5; // 花びらの数

  bg.push();
  bg.rotate(90);

  bg.beginShape();
  let x_=[]
  let y_=[]
  for (let theta = 0; theta < 360; theta++) {
    let A = petalNum / 180 * theta;
    let md = p.floor(A) % 2;
    let r = p.pow(-1, md) * (A - p.floor(A)) + md;
    let R = r + 2 * calcH(r);
	x_[theta]=d * R * p.cos(p.radians(theta));
    y_[theta] = d * R * p.sin(p.radians(theta));
let l=bg.drawingContext as CanvasRenderingContext2D;
		let grad = l.createRadialGradient(0, 0,10, x_[theta], y_[theta],d);
		grad.addColorStop(0, p.random(colors));
		grad.addColorStop(1, p.random(colors));
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
    

    bg.vertex(x_[theta], y_[theta]);
  }
  bg.endShape(p.CLOSE);

  bg.pop();
	bg.rotate(-k)
	bg.translate(-cx,-cy)
}

function calcH(x) {
  if (x < 0.8) {
    return 0;
  } else {
    return 0.8 - x;
  }
}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '03', 'png');
}
}


