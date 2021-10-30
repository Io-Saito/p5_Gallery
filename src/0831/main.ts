import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors=["#ff7480","#ff8b94","#ffaaa5","#ffd3b6","#dcedc1","#a8e6cf","#84e3c8"]
    let colors_bg=["#e7d7c1","#e6ccb0","#f3d6b9","#f7ebde"]
    let flowers=[];
    p.setup=()=>{
        p.createCanvas(600,600)
        p.colorMode("rgb")
        p.angleMode("radians")
        p.noLoop()
        for (let i = 0; i < p.width * p.height * 0.05; i++) {
            let x = p.random(p.width);
            let y = p.randomGaussian(p.height,p.height/4);
            let dia = p.noise(x * 0.01, y * 0.01) * 60+15 
            if (flowers.every((c) => p.dist(x, y, c.position.x, c.position.y) > (dia + c.size)*0.6)){
                flowers.push(new flower({x:x,y:y},dia));
            }
        }
    }

    p.draw=()=>{
        p.background("#e6ccb0");
        p.strokeWeight(3);
        for (let i = 0; i < p.height; i+=40) {
            let c = p.color(p.random(colors_bg));
            p.stroke(c)
            p.noFill()
            p.beginShape()
            for (let y=0; y < p.height; y++){
                p.strokeWeight(2+p.noise(y*0.01));
                p.curveVertex(i+p.sin((p.noise(i*0.01)*p.PI)*y/100)*20,y)
            }
            p.endShape()
        }
        for(let i = 0;i<flowers.length;i++){
            flowers[i].makeflower();
        }
    }
    
    interface Place{
        x:number;
        y:number;
    }

    class flower{
        color:Array<string>;
        position:Place;
        size:number
        alpha:number;

        constructor(x:Place,dia:number){
            this.alpha=200
            this.position=x
            this.size=dia
        }

    makeflower=()=>{
        let a=["#f6f2f0"]
        while(a.length<4){
            let x =p.random(colors)
            if (a.includes(x)==false){
                a.push(x)
            }
        }
        this.color=a
        p.translate(this.position.x, this.position.y)
        p.rotate(p.atan(this.position.y/this.position.x))
        p.point(0,0)
        this.hana(this.size)
        p.rotate(2*p.PI-p.atan(this.position.y/this.position.x))
        p.translate(-this.position.x, -this.position.y)

    }

    hana=(size)=>{
        p.translate(-1*size,0)
        for (let i=0; i<=23; i++){
            this.shizuku(size,this.color[Math.floor(i/3)%4])
            p.translate(size,0)
            p.rotate(2*p.PI/24)
            p.translate(-size,0)
        }
    }

    shizuku=(size,c)=>{
        p.stroke("#e8e8e8")
        p.strokeWeight(1)
        p.fill(c)
        p.beginShape();
        for (let t = 0; t < p.TWO_PI; t += 0.1){
            let r = 1 / (11 * p.sin(t/2)+1);
            p.vertex( size * r * p.cos(t), size * r * p.sin(t));
        }
        p.endShape(p.CLOSE);
        }
    }
}
