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
let count=[3,4,5,6]

    p.setup=()=>{
        canvas=p.createCanvas(600, 600);
        colors = p.shuffle(colors);
        p.background("#F3F2EE");
        p.angleMode(p.DEGREES)
        p.noLoop();
        p.blendMode(p.BURN)


        
        BG = createBG();
			
}

    p.draw=()=>{
	    
		p.image(BG, 0, 0);
    }


const createBG=()=>{

	let pg = p.createGraphics(p.width, p.height);
	pg.blendMode(p.BURN)
	wave2(pg)
	return pg;
}

const wave2=(bg)=>{

    for (let i=0; i<15; i++){
				let xx = p.randomGaussian(300,200)
				let yy = p.randomGaussian(450,300)
				let ww = 20+p.noise(xx * 0.1, yy * 0.1) * 20 
                let c=p.random(count)
                
                bg.noStroke()
					flower(bg,xx,yy,ww,c,25)
    			}
	}



 function wave_circle(bg,posX, posY, r, wavelength, amplitude,rot) {
   bg.push();
   bg.translate(posX, posY);
   bg.rotate(rot)
   bg.beginShape();
   for (let i=0; i <= 2*p.degrees(p.PI); i += p.degrees(p.PI)/180) {
     let x = p.cos(i)*( r + amplitude * ( p.sin(i*wavelength) - 1 ) );
     let y = p.sin(i)*( r + amplitude * ( p.sin(i*wavelength)-1) );
     bg.vertex(x, y);
   }
    bg.endShape();
	bg.rotate(-rot)
    bg.translate(-posX, -posY);
    bg.pop();
 }

function flower(bg, centerX,centerY,Rc,c,dia){

let n=p.random(10,30)
for(let i=1; i<c+1; i++){
    let col=p.color(p.random(colors))
    col.setAlpha(100)
bg.fill(col)

let xx=centerX+(p.cos(360*i/c)*dia)
let yy=centerY+(p.sin(360*i/c)*dia)
wave_circle(bg,xx,yy,Rc,3,Rc/n,360*(i-1)/c)
}
}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}
}
