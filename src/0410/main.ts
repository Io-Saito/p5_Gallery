import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let flowers = [];
let canvas;
let pg;
let z
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];



    p.setup=()=>{
    p.angleMode(p.DEGREES);
    canvas=p.createCanvas(600, 600);
    p.noLoop()
p.blendMode(p.BURN)
	p.background("#F6F6F6");
    z=[0,0,0,0].map(x=>p.int(p.random(0,7)))
    console.log(z)
    pg=p.createGraphics(600,600)
    	// pg.blendMode(p.BURN)
        pg.angleMode(p.DEGREES)
    }

    p.draw=()=>{
        let R=p.width*0.7/2
        for(let i=0; i<100; i++){
            let x=p.random(0,600)
            let y=p.random(0,600)
            
        }
        pg.translate(p.width/2, p.height/2);
        for (let i=0; i<6; i+=1){
            pg.rotate(60*i)
            for(let j=0; j<40; j++){
            let c=p.color(p.random(colors))
            c.setAlpha(300)
            pg.stroke(c)
            pg.strokeWeight(1)
            pg.noFill()
            let x1=p.createVector(p.random(-R/2,R/2),p.random(0,R/2))
            let x2=p.createVector(p.random(-R/2,R/2),p.random(R/2,R))
            pg.bezier(10+p.random(-5,5), 10+p.random(-5,5),x1.x ,x1.y,x2.x, x2.y, 0+p.random(-2,2), R+2+p.random(-2,2));
            }
            pg.rotate(-60*i)
        }
        pg.translate(-p.width/2, -p.height/2);
        p.image(pg,0,0)
    }



	//  p.keyPressed=()=> {
    //   console.log("pressed")
    //   p.saveCanvas(canvas, 'myCanvas', 'jpg');
    // }

}