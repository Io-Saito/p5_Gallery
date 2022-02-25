import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let circleG;
let circles = [];
let canvas;
let colors = ["#6e4637", "#5e747b", "#eceadf", "#cea2a1"];

    p.setup=()=>{
        canvas=p.createCanvas(600, 600);
        colors = p.shuffle(colors);
        p.background(colors[0]);
        p.noLoop();
        
        circleG = noOverlappingCircle();
    }

    p.draw=()=>{
	    p.image(circleG, 0, 0);
    }

const noOverlappingCircle=()=>{
	let pg = p.createGraphics(p.width, p.height);
	while (circles.length < 100) {
		let index = 0;
		let offset = p.width * 0.1;
		let circle = {
			x: p.random(offset, p.width-offset),
			y: p.random(offset, p.height-offset),
			r: p.random(p.width * 0.005, p.width * 0.06)
		}

		let overlapping = false;
		for (let i = 0; i < circles.length; i++) {
			let other = circles[i];
			let d = p.dist(circle.x, circle.y, other.x, other.y);
			if (d < circle.r + other.r + 10) {
				overlapping = true;
				break;
			}
		}

		if (!overlapping) {
			circles.push(circle);
			index++;
			if (index > 500) {
				break;
			}
		}
	}
	for (let i = 0; i < circles.length; i++) {
		pg.strokeWeight(circles[i].r / 20);
		//pg.stroke("#297328");
		pg.noStroke();
		//shadow(pg)
		flower(pg, circles[i].x, circles[i].y, circles[i].r * 2);
		if (p.random() < 0.5) {
            let l=pg.drawingContext as CanvasRenderingContext2D;
			l.save();
            let c=p.random(1, colors.length)
			pg.noStroke();
			pg.fill(colors[p.int(c)]);
			pg.ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
			l.restore();
		}
	}

	return pg;
}

function flower(p, cx, cy, d) { //黒い花弁があるやつ
	p.push();
	p.translate(cx, cy);
	let num = 5;
	let angle = p.TWO_PI / num;



	p.noStroke();
	for (let i = 0; i <= num; i++) {
        let l=p.drawingContext as CanvasRenderingContext2D;
        l.shadowBlur=100
		p.rotate(angle);
		p.fill(colors[p.int(p.random(1, colors.length))]);
		p.ellipse(0, d / 4, d / 2, d / 2);
		p.erase();
		p.ellipse(0, 0, d / 2, d / 2);
		p.noErase();
	}

	for (let i = 0; i <= num; i++) {
		p.rotate(angle);
		p.noStroke();
		p.fill(colors[p.int(p.random(1, colors.length))]);
		p.rect(0, 0, 2, d / 4); //d/10は適当に変えてください
	}
	p.pop();
}

        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}
}


