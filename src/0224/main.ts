import * as p5 from 'p5';

export const sketch = (p: p5) => {
let colors = ["#6e4637", "#5e747b", "#eceadf", "#cea2a1"];
let g;
let canvas;

    p.setup=()=>{
        canvas=p.createCanvas(600, 600);
		// g=p.createGraphics(600,600);
        p.background(colors[0]);
        p.noLoop();
		setBg()

    }

	const setBg=()=> {
  g = p.createGraphics(600, 600);
  g.background("#eeeeee")
  g.blendMode(p.MULTIPLY)
 let l=g.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(0,0,g.width, g.height);
		grad.addColorStop(0, "#E98260");
		grad.addColorStop(1, "#066186");
		l.fillStyle=grad;
		g.noStroke()
		g.rect(0, 0,600,600)
		
  
  return g;
}
  // _

    p.draw=()=>{
		p.image(g,0,0)
		p.blendMode(p.OVERLAY)
		p.translate(p.width/2, p.height/2);
		p.rotate(p.QUARTER_PI)
		p.translate(-p.width/2, -p.height/2);
		let c=p.color("#FFFFFF")
		// c.setAlpha(30)
		p.stroke(c)
		p.strokeWeight(1)
	for (let i=0; i<3000; i++){
		p.point(p.random(-p.width,p.width),p.random(-p.height,p.height));
	}
		for (let i=-p.width/2; i<(p.width*3/2); i+=p.random(10,30)){
			p.strokeWeight(p.random(0,1))

	    p.line(i,p.random(-p.width/2,p.width),i,p.random(-p.width/2,p.width))
		}
		p.noStroke()
			for (let i=0; i<5; i++){
		p.ellipse(p.random(0,p.width),p.random(0,p.height),p.random(50,300));
	}
			p.noFill()
			p.stroke("#FFFFFF")
			p.strokeWeight(1)
			for (let i=0; i<5; i++){
		p.ellipse(p.random(0,p.width),p.random(0,p.height),p.random(50,300));
	}
		
    }
	        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'png');
}

}




