import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors = ["#e4cbc0", "#afb278", "#843f4b","#3b4f5d"];
    let canvas;
let g;
let g2;
let c=600

    p.setup=()=>{
        canvas=p.createCanvas(600,600);
        g=p.createGraphics(600,600);
        g2=p.createGraphics(600,600);
        p.background("#EEEEEE")
        p.noLoop()
        p.angleMode("degrees")
        p.blendMode(p.BURN);
        // p.filter(p.BLUR,30)
    }
    
    p.draw=()=>{
        
        p.background("#EEEEEE")
        let x=p.width/2
        let y=p.width*0.6

    for (let r=0; r<c; r++){
        let placex=p.random(-100,p.width+100)
        let placey=p.random(-100,p.height+100)
        let distx=p.sqrt(p.abs(placex-x))
        let disty=p.sqrt(p.abs(placey-y))
        let sizex=distx*2
        let sizey=disty*6
        let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(0, 0, sizex, sizey);
		grad.addColorStop(0, p.random(colors));
		grad.addColorStop(1, p.random(colors));
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
        // let c=p.color(p.random(colors))
        // c.setAlpha(100)
        // p.fill(c)
        p.noStroke()
        p.rect(placex,placey,sizex,sizey)
    }
    }
}


//         p.keyPressed=()=> {

//       console.log("pressed")
//       p.saveCanvas(canvas, 'myCanvas', 'jpg');
// }
