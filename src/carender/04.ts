import * as p5 from 'p5';

export const sketch = (p: p5) => {
let flowers = [];
let canvas;
let BG;
let c
let BG2;
let colors = ["#0a5c36","#0f5132","#14452f","#aad576"];
let colors_ = ["#ff9a1f","#fb804b","#fb6423","#ff4747","#f9c22e","#ff4d6d"];


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
		for (let i=0;i <= p.PI; i+=0.005){
			bg.strokeWeight(1);
            let prob=p.random(0,1)
            let x=p.cos(i)*800+p.random(-200,200)
            let y=p.sin(i)*700+p.random(-200,150)-200
			// let y = p.sqrt(300**2-(x**2));

			let xx = x
			let yy = y
			let ww = p.noise(x * 0.1, y * 0.1) * 150 
			let overlapping = false
				for(let i=0; i<flowers.length; i++){
					let other=flowers[i]
					let d=p.dist(xx,yy,other[0],other[1])
					if (d<ww+other[2]-30){
						overlapping=true
						break
					}
				}
				if(!overlapping){
					flowers.push([xx,yy,ww])
                    if (prob>0.4){
					clover(bg,xx,yy,ww/2)
                    }else{
                        flower(bg,xx,yy,ww)
                    }
                    
		p.noStroke()
		}
		
    }

}


function clover(bg,cx, cy, d) { //黒い花弁があるやつ
    let k=p.random(0,360)
    bg.noStroke()
	bg.push();
	bg.translate(cx, cy);
    bg.rotate(k)
	let num = 4;
	let angle = p.TWO_PI / 4;
    for (let i=0; i<num; i++){
    let x_=[]
    let y_=[]
    bg.beginShape()
     for (let t = 0; t < 360; t += 1) {
        x_[t]=16*p.pow(p.sin(t),3)*d*0.03
        y_[t]=(-1*(13*p.cos(t)-5*p.cos(2*t)-2*p.cos(3*t)-p.cos(4*t))-17)*d*0.03

        let l=bg.drawingContext as CanvasRenderingContext2D;
		let grad = l.createRadialGradient(0, 0, 10,x_[t], y_[t],100);
        let c1=p.random(colors);
        let c2;
        do{
            c2=p.random(colors)
        }while(c1==c2)
		grad.addColorStop(0, c1);
		grad.addColorStop(1,c2);
		l.fillStyle = grad;
        bg.curveVertex(x_[t], y_[t]);
    }
    bg.endShape()
    bg.rotate(angle)
}
bg.rotate(-k)
bg.translate(-cx, -cy);
bg.pop();
    
}
function flower(bg,cx, cy, d) { //黒い花弁があるやつ
    let k=p.random(0,360)
	bg.push();
	bg.translate(cx, cy);
    p.rotate(k)
	let num = 5;
	let angle = p.TWO_PI / num;



	bg.noStroke();
	let c=p.random(0, colors.length)
	let col=p.color(colors[p.int(c)])
	col.setAlpha(250)
    let l=bg.drawingContext as CanvasRenderingContext2D;
		let grad = l.createRadialGradient(0,d/4,10,d/2,d/2,30);
		grad.addColorStop(0, p.random(colors_));
		grad.addColorStop(1,p.random(colors_));
		l.fillStyle = grad;
	for (let i = 0; i <num; i++) {
		bg.rotate(angle);
        
		bg.fill(col);
		myCircle(bg,0, d / 4, d / 2);
        bg.circle(0, d / 4, d / 2);
		bg.erase();
		bg.ellipse(0, 0, d / 2, d / 2);
		bg.noErase();
	}


    p.rotate(-k)
	bg.pop();
}

function myCircle(bg,x,y,r){
    let x_=[]
    let y_=[]

    bg.beginShape();
    let c1=p.random(colors_)
    let c2=p.random(colors_)
    for (let t = 0; t < 360; t += 1) {
        x_[t]=r/2*p.cos(t)
        y_[t]=r/2*p.sin(t)

        let l=bg.drawingContext as CanvasRenderingContext2D;
		let grad = l.createRadialGradient(x, y, 10,x_[t], y_[t],30);
		grad.addColorStop(0, c1);
		grad.addColorStop(1,c2);
		l.shadowColor = p.random(colors_);
		l.fillStyle = grad;
        bg.curveVertex(x_[t], y_[t]);
    }
    bg.endShape()

}

        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '04', 'png');
}
}


