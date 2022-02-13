import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors = ["#d3ece6", "#9bd9df", "#aad96c", "#3168b6","#e6cd7f"];
    let canvas;
    let tex
    let strings=["ひとけのない空気が","静かに腐ってゆく","","",
"美しい星と夜空はつまりそういうこと","","崩壊していく細胞を抱きしめた","指と指の間の空間が",
"文脈を解体して眺めている","","だれかの生きた気配が","宇宙に吸収されていく","","",

"世界が終わる1秒前"].map(x=>x.split("").join("\n"))

    p.setup=()=>{
        canvas=p.createCanvas(600,600);
        p.background("#151651")
        p.noLoop()
        p.blendMode(p.DODGE)
        p.filter(p.BLUR,10)
        p.textFont("Sawarabi Mincho")
        tex = p.createGraphics(p.width, p.height);
	let c = p.color("#f1f1e9");
	c.setAlpha(100);
    tex.strokeWeight(1)
    tex.stroke(c)
	for (let i = 0; i < p.width * p.height * 0.005; i++) {
		let x = p.random(p.width);
		let y = p.random(p.height);
		let size = p.noise(x * 0.01, y * 0.01)*1.5 + 0.5;
		tex.point(x, y);
	}
    }
    
    p.draw=()=>{
        p.image(tex,0,0)
        for(let i = 0; i < 10; i++){
		let x = p.random(p.width);
		let y = p.random(p.height);
		let size = p.random(p.width / 5, p.width / 3);
		myCircle(x, y, size);
	}

        for (let i = 0;i<p.random(3,5); i++){
        wave(i);
        }
        
            for (let s=0; s<15; s++){
        let string=strings[s]
        p.fill(p.random(colors))
        p.textSize(15);
        p.text(string, 530-(p.width-120)*s/15, p.random(60,100));
    }
    }

    const wave=(k)=>{
        let scale=0.02
        let l=p.drawingContext as CanvasRenderingContext2D;
            l.shadowBlur = 30;
            l.shadowColor = p.random(colors);
        p.beginShape()
        p.stroke(p.random(colors))
        p.strokeWeight(1)
        // let cc=p.color("#221743")
        // cc.setAlpha(200)
        p.noFill()
        p.vertex(-1,p.height)
        for (let i=1; i<(p.width-1); i++){
        let val=p.noise((i+k*100)/300)
        let val2=p.noise((i+k*100)/280)
        
        p.vertex(i,p.height-(val*300))
        if (i%p.int(p.random(30,50))==0){
            let c=p.color(p.random(colors))
            c.setAlpha(200)
            p.fill(c)
            p.stroke(c)
            p.line(i,p.height-(val*300),i,p.height-(val2*400))
            p.ellipse(i,p.height-(val2*400)-4,8+p.random(0,0.1),8+p.random(0,0.1))
        }
        p.noFill()
        }
        p.vertex(p.width+1,p.height)
        p.endShape()
    }

    const myCircle=(cx, cy, radius)=> {
	let cs = ["#026349", "#033933", "#80012a"];
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
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}
}