import * as p5 from 'p5';

export const sketch = (p: p5) => {
	let colors= ["#91b2dd", "#91d3ee", "#f4c0cd", "#f78fa2", "#f1e076"];
p.setup=()=> {
	p.createCanvas(800, 800);
	p.imageMode(p.CENTER);
	p.colorMode(p.HSB, 360, 100, 100, 100);
	generate() ;
};

const generate=()=> {
	let amp = (p.height / p.int(p.random(10, 20)));

	p.push();
	p.translate(p.width/2, p.height/2);
	
	for (let y = p.height * 1.1; y > 0; y -= amp) {
		let g = p.createGraphics(p.width /1.5, p.height /1.5);
		let caseNum = p.int(p.random(3.5));
		let shapeNum = p.int(p.random(2.5))
		
		g.background("#FFFFFF");
		g.noStroke();
		g.fill(p.random(colors));
		
		if (caseNum == 0) {
			stripeTexture(g.width, g);
		}
		if (caseNum == 1) {
			dotsTexture(g.width, g);
		}
		if (caseNum==2){
			noTexture(g.width, g);
		}
		// g.translate(p.random(0,g.width),p.random(0,g.height))
		g.erase();
		g.beginShape();
		g.vertex(0, 0);
		g.vertex(g.width, 0);
		g.vertex(g.width, g.height);
		g.vertex(0, g.height);
		// g.translate(g.width/2,g.height/2)

		g.beginContour();
		
		if(shapeNum==1){
		g.vertex(2,2 );
		g.vertex(2,g.width/10)
		g.vertex(g.width/10, g.width/10);
		g.vertex(g.width/10,2);
		g.vertex(2, 2);
	}else{
		g.vertex(2, 2);
		g.vertex(2,g.width/10)
		g.vertex(g.width/10, g.width/10);
		g.vertex(2, 2);
	}
		g.endContour();
		g.endShape();
		// g.translate(-g.width/2,-g.height/2)
		// 
		p.rotate(p.random(p.PI));
		g.translate(p.random(0,g.width),p.random(0,g.height))
		p.image(g, p.random(0,g.width), p.random(0,g.height));
	}

	p.pop();
}


function stripeTexture(s, g) {
	let seg = p.int(p.random(20, 200));
	let ss = s / seg;
	let rnd = p.random();
	for (let i = 0; i < seg; i++) {
		for (let j = 0; j < seg; j++) {
			let x = i * ss;
			let y = j * ss;
			let toggle = i % 2;
			if (rnd < 0.5) toggle = j % 2;
			if (toggle == 0) {
				g.rect(x, y, ss, ss);
			}
		}
	}
}

function dotsTexture(s, g) {
	let seg = p.int(p.random(60, 120));
	let ss = s / seg;
	for (let i = 0; i < seg; i++) {
		for (let j = 0; j < seg; j++) {
			let x = i * ss;
			let y = j * ss;
			if ((i + j) % 2 == 0) {
				g.circle(x, y, ss * 0.9);
			}
		}
	}
}

function noTexture(s,g){
	g.rect(0,0,s,s)
}

function getColor() {
	let h = p.random(15);
	let s = p.random(70, 100);
	let b = p.random(90, 100);
	if (p.random(1) < 0.5) {
		h = p.random(185, 220);
	}
	let col = p.color(h, s, b);
	return col;
}
}