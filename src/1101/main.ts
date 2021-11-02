//reference: uila(@muilavalium)'s formula and code  https://twitter.com/muilavalium/status/1407907000575565825
import * as p5 from 'p5';

export const sketch = (p: p5) => {
let a, d, x, y, h, s;
let num;
let t = 0.0;
let vel = 0.012;
let text="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゐゆゑよわをん".split("")
let color_list=["0081a7-00afb9-fed9b7-f07167-fdfcdc","faf0ca-f4d35e-ee964b-f95738-0d3b66","da2c38-226f54-87c38f-43291f-f4f0bb","f8f7c1-f46902-da506a-fae402-92accc"]
p.setup = ()=> {
	p.createCanvas(600, 600);
	p.noStroke();
	num = p.random(10)
	p.noLoop()
	p.textFont("Sawarabi Mincho")
	p.textAlign(p.CENTER,p.CENTER)
}

const textdraw=(x,y)=>{
	p.textSize(p.abs(y)*2)
	p.text(p.random(text),x,y)
}
p.draw = () => {
	
	var c =color_list[p.int(p.random(0,1)*4)]
	let colors=c.split("-").map(a => "#" + a);
	p.background(colors[4]);
	for (let j = 100; j < p.height - 100; j += 160) {
		p.push();
		p.translate(0, j)
		let a = p.PI / 12;
		p.rotate(-a / 2);
		p.push();
		x = 120;
		y = x * p.tan(a / 2);
		h = p.sqrt(p.sq(x) + p.sq(y));
		s = (h + y) / (h - y);

		while (x < p.width - 120) {
			let cc = p.color(p.random(colors))
			p.fill(cc);
			if (p.int(p.random(100))%3==0){
				textdraw(x,y)
			}else{
				p.ellipse(x, y, (2 * y));
			}

			p.push();
			p.translate(p.width - 13, 158)
			if (p.int(p.random(100))%3==0){
				textdraw(-x,-y)
			}else{
				p.ellipse(-x, -y, (2 * y));
			}
			p.pop();
			x = x * s;
			y = y * s;
		}
		p.pop();

		p.pop();
	}

	t += vel;
}
}