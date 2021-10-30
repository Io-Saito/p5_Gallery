import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let flowers=[];
        let colors= ["#005264", "#fe465d", "#ffab4a", "#6f0150", "#dfc7ea"];
    let tCount = 200;
    let trangX = [];
    let trangY = [];

    p.setup=()=>{
        p.createCanvas(600,600);
        p.colorMode("rgb")
        p.angleMode("radians");
        p.blendMode(p.DARKEST)
        p.noLoop();

        for (let i = 0; i < 25; i++) {
            let x = p.random(0,600)
            let y = p.sin(p.PI*x/p.width*5)*40+100*p.random(1.5,3.5)+p.noise(x*0.5)*150
            let dia = p.noise(x * 0.01, y * 0.01) * 40 
flowers.push(new flower({x:x,y:y},dia));

            
}

	for (let i = 0; i < tCount; i++) {
		trangX[i] = p.random(-200, p.width + 200);
		trangY[i] = p.random(-200, p.height + 200);
	}
    }
    p.draw=()=>{
        p.background(255,255,255);

for (let i = 0; i < tCount - 3; i++) {
		let c = p.color(p.random(colors));
		c.setAlpha(1);
		p.noStroke();
		p.fill(c);
		p.triangle(trangX[i], trangX[i + 1], trangX[i + 2], trangY[i], trangY[i + 1], trangY[i + 2]);
	}
                    for(let i = 0;i<flowers.length;i++) {
        flowers[i].makeflower();
    }


    }
    interface Place{
        x:number;
        y:number;
    }

    class flower{
        color:any;
        position:Place;
        size:number
        alpha:number;

        constructor(x:Place,dia:number){
            this.color=p.color(colors[p.int(p.random(0,5))])
            this.alpha=250
            this.position=x
            this.size=dia

        }

        makeflower=()=>{
            this.color.setAlpha(this.alpha)
            p.stroke(this.color)
            p.fill(this.color)
            p.translate(this.position.x, this.position.y)
            p.strokeWeight(5)
            p.point(0,0)
            hana(this.size,p.int(p.random(3,7)))
            p.translate(-this.position.x, -this.position.y)
        }

    }

        const hana=(size,n)=>{
        for (let i=0; i<=n-1; i++){
            petal(size,n)
            nakami(size,n)
            p.rotate(2*p.PI/n)
        }
    }
    const petal=(size,n)=>{
        p.beginShape();
        p.vertex(0,0)
        for (let i=0; i<=n-1; i++){
        let x=size*p.cos(p.PI*i/n)+p.noise(i*80)*10
        let y=size*p.sin(p.PI*i/n)+p.noise(i*0.01)*10
        p.curveVertex(x,y);
        }
        p.vertex(0,0)
        p.endShape();
    }
    const nakami=(size,n)=>{
                p.strokeWeight(2)
        for (let i=0; i<10; i++){
            let x=size*p.cos(p.PI*i/n)
            let y=size*p.sin(p.PI*i/n)
            p.line(0,0,x,y)
        }
    }

}


