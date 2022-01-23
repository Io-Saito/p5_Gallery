import * as p5 from 'p5';

export const sketch = (p: p5) => {

const col_buil=["#0e190c","#260f01","#000814","#0a1326"]
const col_right=["#ffff3f","#eae2b7","#f4a261","#fefae0","#bfd200"]
let tr;
let c

p.setup=()=> {
	c=p.createCanvas(720, 720, p.WEBGL);
	p.colorMode(p.HSB, 360, 100, 100, 100);
	p.angleMode(p.DEGREES);
	p.noLoop()
	p.ortho(-p.width / 2, p.width / 2, -p.height / 2, p.height / 2, -5000, 5000);

}

let palette;
/** OPC START **/
let seed= Math.floor(Math.random() * 2000)
let color_scheme=0
let light_hue=20
let stroke_bool= 0
let view_rotateX=10
let view_rotateY=20
let view_rotateZ=0
let building_scale=Math.floor(Math.random() * 5)
/** OPC END **/

p.draw=()=>{

	p.randomSeed(seed);
	p.background("#031d30");
	p.translate(-p.width/2,-p.height/2)
	for(var o=0;o<p.height/2;o+=10*p.random()){
		p.stroke(255, 255, 255,60)
		p.strokeWeight(p.random(1))
		
		for(var i=0;i<p.width;i+=10*p.random()){
			let rr =p.random()
			p.point(i,o*rr*rr)
		}
	}
		let px=0,py=0,xx=0,yy=0
	for(var i=0;i<200;i++){
		let rr = p.random(4)
		p.fill(173, 239, 207,p.random(255))
		if (p.random()<0.3){
			
			p.fill(251, 143, 137,p.random(255))
			rr=p.random(5)
		}
		xx=p.random(p.width)
		yy=p.random(p.height/2)
		p.ellipse(xx,yy,rr,rr)
		if ( p.dist(xx,yy,px,py)<70){
				p.stroke(255,p.random(150))
				p.line(xx,yy,px,py)
		}
		px=xx
		py=yy
}
		
	p.translate(p.width/2,p.height/2)
	p.translate(0, p.height / 3, 0);
	// orbitControl();
	p.ambientLight(10, 10, 10);
	p.directionalLight(p.color(light_hue, 50, 80), 1, 0, -1);
	p.directionalLight(p.color(light_hue, 50, 30), -1, 0, -1);
	p.directionalLight(p.color(light_hue, 50, 50), 0, 1, 0);

	if (stroke_bool == 1) {
		p.stroke(0, 0, 10);
	} else {
		p.noStroke();
	}
	p.push();
	p.rotateX(-view_rotateX);
	p.rotateY(view_rotateY);
	p.rotateZ(-view_rotateZ);
	let sd = p.map(building_scale, 0, 5, 1, 5);
	let d = p.max(p.width, p.height) * 3;
	let minD = (p.width, p.height) / sd;

	separateGrid(-d/2, 0, -d / 2, d, minD);
	p.pop();

}

function separateGrid(x, y, z, d, minD) {
	let sep = 4;
	let w = d / sep;
	for (let j = 0; j < sep; j++) {
		for (let i = 0; i < sep; i++) {
			let nx = x + i * w;
			let nz = z + j * w;
			if (p.random(100) < 95 && w > minD || d == p.max(p.width, p.height) * 2.5) {
				separateGrid(nx, 0, nz, w, minD);
			} else {
				let h = p.random(minD / 4, d/1.5)*0.6;
				let ny = -h / 2;
				p.push();
				p.translate(nx + w / 2, ny+100, nz + w / 2);
				if (p.random() > 0.25) {
					drawBuilding(w * 0.9, h, w * 0.9);
				}
				p.pop();

			}
		}
	}
}

function drawBuilding(w, h, d) {
	let colors = p.shuffle(col_buil);

	let bc = colors[0];
	colors.splice(0, 1);

	// rotateY((int(random(4)) * 360) / 4);
	p.fill(bc);
	p.box(w, h, d);
	let col_ri=col_right.concat(new Array<string>(30).fill(bc))

	let w_num = p.int(p.random(2, 5));

	let w_offset = w / 10;
	let w_margin = w_offset / 5;
	let nw = (w - w_offset * 2 - w_margin * (w_num - 1)) / w_num;

	let h_offset = h / 10;
	let h_margin = w_offset / 5;
	let h_num = p.int((w_num * h) / w);
	let nh = (h - h_offset * 2 - h_margin * (h_num - 1)) / h_num;

	// if (p.min(nw, nh) > p.max(p.width, p.height) / 50 || p.random(100) > 70) {
		p.push();
		p.translate(-w / 2, -h / 2, d / 2 + 1);
		for (let j = 0; j < h_num; j++) {
			for (let i = 0; i < w_num; i++) {
				let nx = w_offset + i * (w_margin + nw);
				let ny = h_offset + j * (h_margin + nh);
				p.fill(p.random(col_ri));
				p.rect(nx, ny, nw*0.8, nh*0.8);
				
			}
		}
		p.pop();

		p.push();
		p.translate(-w / 2 - 1, -h / 2, -d / 2);
		p.rotateY(-90);
		for (let j = 0; j < h_num; j++) {
			for (let i = 0; i < w_num; i++) {
				let nx = w_offset + i * (w_margin + nw);
				let ny = h_offset + j * (h_margin + nh);
				p.fill(p.random(col_ri));
				p.rect(nx, ny, nw*0.8, nh*0.8);
			}
		}
		p.pop();
	// }

}
p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, 'myCanvas', 'jpg');
}
}

