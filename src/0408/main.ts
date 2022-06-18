import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let flowers = [];
let canvas;
let pg;
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];



    p.setup=()=>{
    p.angleMode(p.DEGREES);
    canvas=p.createCanvas(600, 600);
    p.noLoop()
	p.blendMode(p.BURN)
	p.background("#F6F6F6");
    }

    p.draw=()=>{

	let cells = 3;//格子の数
    let offset=10
    let w = (p.width-offset*2) / cells;
    let h = (p.height - offset * 2) / cells;
    for (let j = 0; j < cells; j++) {
        for (let i = 0; i < cells; i++) {
            let x = offset+i * w;
            let y = offset+j * h;
            let cx = x + w / 2;//格子の中心座標
            let cy = y + h / 2;
            p.push();
            p.translate(cx, cy);
            p.noStroke()
            for(let i=0; i<2; i++){
            let theta=0
            while (theta<360){
                p.fill(p.random(colors))
                let r=p.random(w/2- 50,w/2)
                let arctheta=p.random(10,30)
                let lottheta=p.random(20,50)
                p.arc(0,0,r,r,theta,theta+arctheta)
                theta+=lottheta
            }
        }
            p.translate(-cx, -cy);
            p.pop()
        }
    }
    }



	 p.keyPressed=()=> {
      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
    }

}