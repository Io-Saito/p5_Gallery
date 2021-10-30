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

        for (let i = 0; i < p.width * p.height * 0.005; i++) {
            let x = p.random(p.width);
            let y = p.random(p.height);
            let dia = p.noise(x * 0.01, y * 0.01) * 80; 
            // if (flowers.every((c)=>p.dist(x,y,c.position.x,c.position.y)>(dia + c.size)*0.3)) {
            flowers.push(new flower({x:x,y:y},dia));
    // }
            
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
            this.alpha=200
            this.position=x
            this.size=dia

        }

        makeflower=()=>{
            this.color.setAlpha(this.alpha)
            p.translate(this.position.x, this.position.y)
            p.noStroke()
            p.rotate(p.atan(this.position.y/this.position.x))
            p.fill(this.color)
            hana(this.size,p.int(p.random(3,7)),this.color)
            p.rotate(-p.atan(this.position.y/this.position.x))
            p.translate(-this.position.x, -this.position.y)

            
        }

    }
    const hana=(size,n,color)=>{
        for (let i=0; i<=n; i++){
            petal(size,n)
            nakami(size,n,color)
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
    const nakami=(size,n,color)=>{
        p.strokeWeight(2)
        p.stroke(color)
            let x=size*p.cos(p.PI/n)
            let y=size*p.sin(p.PI/n)
            p.line(0,0,x,y)
    }
}


