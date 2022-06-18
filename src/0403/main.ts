import * as p5 from 'p5';

export const sketch = (p: p5) => {
let flowers = [];
let canvas;
let BG;
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];
//#DB5724,#ECC898,#EDC05C,
//#CEE3D7,#A2CEC7,#83af9b,
//#375128,#CBDBE3,#54A6C7,
//#3C4F66,#E9C6C2,#C2C6D5,
//#B7BEE4,#F3F2EE,#fc9d9a,#c8c8a9

    p.setup=()=>{
        canvas=p.createCanvas(600, 600);
        colors = p.shuffle(colors);
        p.background("#F3F2EE");
        p.angleMode(p.DEGREES)
        p.noLoop();
        p.blendMode(p.BURN)
		// p.angleMode(p.RADIANS)
        
        BG = createBG();
			
}

    p.draw=()=>{
	    
		p.image(BG, 0, 0);
    }

const createBG=()=>{

	let pg = p.createGraphics(p.width, p.height);
	pg.blendMode(p.BURN)
	// for (let i = 0; i < 3; i++){
	// 	pg.translate(pg.width/2,pg.height/2)
	// 	let r=p.random(0,10)
	// 	pg.rotate(r)
	wave2(pg)
	// pg.rotate(-r)
	// pg.translate(-pg.width/2,-pg.height/2)
	// }
	
	return pg;
}

const wave2=(bg)=>{

    for (let i=0; i<50; i++){
				let xx = p.random(0,600)
				let yy = p.random(0,600)
				let ww = p.noise(xx * 0.1, yy * 0.1) * 80 


                    bg.strokeWeight(2);
                    let c=p.color(p.random(colors))
                    bg.stroke(c);
                    c.setAlpha(200)
                    bg.fill(c)
                    bg.strokeWeight(1)
                    let a=p.random([3])
                    let b=p.random([5])
                    let n=p.max([a,b])/p.min([a,b])
					rose(bg,xx,yy,ww,n)
    }
				}
		// p.noStroke()


function rose(bg, centerX,centerY,a, n){
  bg.translate(centerX,centerY)
  let r=p.random(0,360)
  bg.rotate(r)
bg.beginShape();
// bg.noFill();

  for (let i = 0; i <360000; i++){

      let X=centerX+a*p.sin(n*p.radians(i))*p.cos(p.radians(i))
      let Y=centerY+a*p.sin(n*p.radians(i))*p.sin(p.radians(i))
  bg.vertex(X,Y);
}

bg.endShape()
bg.rotate(-r)
bg.translate(-centerX,-centerY)
}


        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}


}
