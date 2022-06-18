import * as p5 from 'p5';

export const sketch = (p: p5) => {
let flowers = [];
let canvas;
let BG;
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];


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
    let low=6
    let col=6
    for (let j=0; j<=low/2; j++){
for (let i=col/2; i>j; i--){
    let x_center=(3+i)*100-50 
    let y_center=j*100+ 50
        pg.translate(x_center,y_center)
    pg.rotate(95)
    hana(pg,x_center,y_center,p.width/col)
    pg.rotate(-95)
    pg.translate(-x_center,-y_center)

    console.log(x_center,y_center)
}
    }

        for (let j=low/2; j<=low; j++){
for (let i=0; i<=(j-3); i++){
    let x_center=i*100+50 
    let y_center=(j+1)*100 - 50
    pg.translate(x_center,y_center)
    pg.rotate(95)
    hana(pg,x_center,y_center,p.width/col)
    pg.rotate(-95)
    pg.translate(-x_center,-y_center)
    console.log(x_center,y_center)
}
    }

	return pg;
}

let hana=(pg,x,y,s_)=>{
    
    let s=s_*0.6
    pg.noStroke();
			pg.push();
			pg.fill(p.random(colors));
			pg.ellipse(0, -s / 4, s / 2, s/2 );
			pg.ellipse(0, s/4,s/2,s/2);
			pg.ellipse(s/4, 0,s/2,s/2);
			pg.ellipse(-s/4, 0,s/2,s/2);

			pg.erase()
			pg.ellipse(0, 0,s/2,s/2);
            pg.noErase()

			pg.fill(p.random(colors));
			pg.ellipse(0, 0, s/4, s/4);
			pg.pop();

}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'png');
}

}
