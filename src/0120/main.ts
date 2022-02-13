import * as p5 from 'p5';

export const sketch = (p: p5) => {
    
let colors = ["#f9f9f9", "#e0fbff", "#bfdbf7"];
let trc = ["#658179", "#1E1407", "#020302", "#CAA75C"];
let pointX = Array.from({length: p.width},(d,i)=>i)
let tCount = 200;
let yCount=200;
let trangX = [];
let trangY = [];
let tr;
let noiseSeed=p.random(200);
let c;
let strings=["何が悪いことだろう","君は 水でいい、","水で死ねたんだから","それ以上の 愛で ","僕たちを 温めればいい","ただ静かに 静かに","この世は終わるから","僕たちが居ない未来の方が"," 本当の意味で","僕たちの心を持っている",
"僕たちを抱いて"," 静かに, 静かに" ,"この世の終わりの日まで"," 続くのだから"]

const trianglePG=()=> {
	let pg = p.createGraphics(p.width, p.height);
    let c=100
  pg.background("#416FA8")
   for (var i=0; i<=c; i++) {
   var col = p.lerpColor(p.color("#01497c"), p.color("#8187dc"), i/c);
   var hh = p.lerp(p.height,0 , i/c);
   pg.noStroke();
   pg.fill(col);
   pg.rect(0, 0, p.width, hh);
 }

	return pg;
}
function myCircle(cx, cy, radius) {
	let cs = ["#98C2D8", "#0A4D83", "#8FCAE6"];
	let count = radius * 2;
	let c = p.color(p.random(cs));
	for (let i = 0; i < count; i++) {
		let alpha = p.map(i, 0, count, 60, 0);
		p.noFill();
		c.setAlpha(alpha);
		p.stroke(c);
		p.ellipse(cx, cy, radius + i, radius + i);
	}
}

p.setup=()=> {
	c=p.createCanvas(720, 720);
	p.angleMode(p.DEGREES);
	p.noLoop();
    p.textFont("Sawarabi Mincho");
	tr = trianglePG();
	console.log(strings);

}

const wave2=()=>{
    let cx = p.random(p.width);
	let cy = p.random(p.height);

	let noiseSeed= p.random(500)
	let z = p.random(100);
	let alpha = p.map(z, 0, 100, 0, 250);

	let strkColor = p.color(253);
    let before=[];
	for(var o=0;o<10;o++){
		for (let i = 0; i < p.width * 1.2; i += p.random(1)) {
			let strkColor = p.color(p.random(colors));
			strkColor.setAlpha(alpha);
			p.strokeWeight(p.random(1));
			p.stroke(strkColor);
			
			let x_0 = cx + i * p.cos(p.noise(o / 200, i / 1500) * 360 * 4);
			let y_0 = cy + i * p.sin(p.noise(o / 200, i / 1500) * 360 * 2);   
            if (i!=0){ 
			p.line(before[0], before[1], x_0,y_0)

            }
			before[0] =x_0
            before[1]=y_0
            if(o==0){
                p.noStroke()
                p.fill(255,255,255)
				let xx = before[0]+p.random(-20,20)
				let yy = before[1]+p.random(-20,20)
				let ww = p.random(5)
                let prob=p.random(1)
                if(prob<0.05){
					p.ellipse(xx,yy,ww,ww)
                }
            }
		}
    }
}


p.draw=()=> {
    p.background("#416FA8")
    p.image(tr,0,0)
for(let i = 0; i < 10; i++){
		let x = p.random(p.width);
		let y = p.random(p.height);
		let size = p.random(p.width / 5, p.width / 3);
		myCircle(x, y, size);
	}
	for(let i = 0; i < p.width * p.height / 100; i++){
				let x = p.random(p.width);
		let y = p.random(p.height);
		p.stroke("#FFFFFF")
		p.point(x, y);
	}
    for(let i=0; i<p.int(p.random(5,8)); i++){
		wave2();
    }
	let str=strings.map(x=>x.split('').join('\n'))
	console.log(str)
	      for (let s=0; s<15; s++){
        let string=str[s]
        p.fill("#FFFFFF")
        let size =p.noise(s)*p.map(string.length,10,23,100,30)
        p.textSize(size);
        p.text(string, 660-(p.width-120)*s/13, p.random(80,200));
    }
}

p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, 'myCanvas', 'jpg');
}
}
