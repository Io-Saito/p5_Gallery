import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let flowers = [];
let canvas;
let pg;
let z
let vertex
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];



    p.setup=()=>{
    p.angleMode(p.DEGREES);
    canvas=p.createCanvas(600, 600);
    p.noLoop()
p.blendMode(p.BURN)
	p.background("#F6F6F6");
    pg=p.createGraphics(600,600)
    // pg.blendMode(p.BURN)
        pg.angleMode(p.DEGREES)
    vertex=Array(100).fill(0).map(x=>p.createVector(p.random(-100,700),p.random(-100,700)))
    }

    p.draw=()=>{
        for(let i=0; i<vertex.length-2; i++){
            let x=p.color(p.random(colors))
            x.setAlpha(20)
            p.fill(x)
            p.stroke(x)
            p.beginShape()
            p.vertex(vertex[i].x,vertex[i].y)
            p.vertex(vertex[i+1].x,vertex[i+1].y)
            p.vertex(vertex[i+2].x,vertex[i+2].y)
            p.endShape()
        }
        	pg.background("#F6F6F6");
        pg.fill("#F6F6F6")
        pg.noStroke();
        pg.rect(600,600)
        
        p.image(pg,0,0)
    }



	//  p.keyPressed=()=> {
    //   console.log("pressed")
    //   p.saveCanvas(canvas, 'myCanvas', 'jpg');
    // }

}