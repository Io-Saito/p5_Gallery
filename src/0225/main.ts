import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let circleG;
let flowers = [];
let canvas;
let BG;
let BG2;
let colors = ["#92a577", "#6D4043",  "#cea2a1"];

    p.setup=()=>{
        canvas=p.createCanvas(600, 600);
        colors = p.shuffle(colors);
        p.background("#eceadf");
        p.noLoop();
		// p.angleMode(p.RADIANS)
        
        BG = createBG();
			
}

    p.draw=()=>{
	    
		p.image(BG, 0, 0);
    }

const createBG=()=>{

	let pg = p.createGraphics(p.width, p.height);
	
	for (let i = 0; i < 3; i++){
		pg.translate(pg.width/2,pg.height/2)
		let r=p.random(0,10)
		pg.rotate(r)
	wave2(pg)
	pg.rotate(-r)
	pg.translate(-pg.width/2,-pg.height/2)
	}
	
	return pg;
}

const wave2=(bg)=>{
		let strkColor = p.color("#AD9767");
	p.noiseSeed(p.random(100));
	let r=p.random(0,30)
	for(var o=0;o<5;o++){
	let before=[];
		for (let x=-p.width;x <= bg.width; x+=1){
			bg.strokeWeight(1);
			bg.stroke(strkColor);

			let y = p.sin(p.PI*x/p.width*2+((o+1)/8))*50+p.noise(o*0.05+x*0.0005)*200+o*10+10*r;
			bg.line(before[1], before[0], y,x)
			if(o==2){
			if(x%10==0){
				let xx = x+p.random(-60,60)
				let yy = y+p.random(-60,60)
				let ww = p.noise(x * 0.1, y * 0.1) * 100 
                let prob=p.random(1)
				let overlapping = false
				for(let i=0; i<flowers.length; i++){
					let other=flowers[i]
					let d=p.dist(yy,xx,other[0],other[1])
					if (d<ww+other[2]+5){
						overlapping=true
						break
					}
				}
				if(!overlapping){
					flowers.push([yy,xx,ww])
                if(prob<0.4){
					bg.fill(colors[p.int(p.random(0, colors.length))]);
					bg.noStroke()
					bg.ellipse(yy,xx,ww,ww)
				}else{
					flower(bg,yy,xx,ww)
				}
				}
				
			}
		}
			if (x!=0){ 
			before[0] =x
            before[1]=y
            }
			

		p.noStroke()
                
	
		}
			
    }

}


function flower(bg,cx, cy, d) { //黒い花弁があるやつ
	bg.push();
	bg.translate(cx, cy);
	let num = 5;
	let angle = p.TWO_PI / num;



	bg.noStroke();
	for (let i = 0; i <= num; i++) {
		bg.rotate(angle);
		bg.fill(colors[p.int(p.random(0, colors.length))]);
		bg.ellipse(0, d / 4, d / 2, d / 2);
		bg.erase();
		bg.ellipse(0, 0, d / 2, d / 2);
		bg.noErase();
	}

	for (let i = 0; i <= num; i++) {
		bg.rotate(angle);
		bg.noStroke();
		bg.fill(colors[p.int(p.random(0, colors.length))]);
		bg.rect(0, 0, 2, d / 4); //d/10は適当に変えてください
	}
	bg.pop();
}

        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}
}


