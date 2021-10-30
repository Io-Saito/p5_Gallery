import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let flowers=[];
    let colors= ["#1199d5", "#aaddeb", "#cbd964", "#45b9c0", "#fbc83a"];
    let tCount = 200;
    let trangX = [];
    let trangY = [];

    p.setup=()=>{
        p.createCanvas(600,600);
        p.colorMode("rgb")
        p.angleMode("radians");
        p.blendMode(p.DARKEST)
        p.noLoop();

        for (let i = 0; i < 50; i++) {
            let x = p.random(0,600)
            let y = p.sin(p.PI*x/p.width*5)*40+100*p.random(1.5,3.5)+p.noise(x*0.5)*100
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
		c.setAlpha(3);
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
            this.alpha=350
            this.position=x
            this.size=dia

        }

        makeflower=()=>{
            this.color.setAlpha(this.alpha)
            p.stroke(this.color)
            p.translate(this.position.x, this.position.y)
            // p.noStroke()
            if(p.int(p.random(0,100))%3==0){
                p.fill(this.color)
            tenten(this.size,p.int(p.random(15,40)));
            }else if(p.int(p.random(0,100))%3==1){
            doushinen(this.size,p.int(p.random(15,40)))
            }else{
                uni(this.size,p.int(p.random(15,40)))
            };
            p.translate(-this.position.x, -this.position.y)
        }

    }

    const uni=(size,num)=>{
        p.strokeWeight(1)
        for (let i=0; i<num; i++){
            let x=size*p.cos(2*p.PI*i/num)*1.5
            let y=size*p.sin(2*p.PI*i/num)*1.5
            p.line(0,0,x,y)
        }

    }

    const doushinen=(size,num)=>{
        p.strokeWeight(1)
        p.noFill()
        for (let i=0; i<num; i++){
            if (i%3==1){
            p.ellipse(0,0,size*3.5*i/num)
            }
        }

    }

    const tenten=(size,num)=>{
        for (let i=0; i<num; i++){
            p.rotate(2*p.PI*i/num)
            p.ellipse(size,size,size*1/20,size*1/10)
            p.rotate(-2*p.PI*i/num)
    }
    }
}


