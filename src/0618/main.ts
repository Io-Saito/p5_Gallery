import * as p5 from 'p5';

export const sketch = (p: p5) => {

    let x;
    let i;
p.setup=()=>{
	p.createCanvas(p.windowWidth, p.windowHeight);
	//background("#f0f0f0");
	p.background("#f4f4f4");
    p.colorMode("hsb")

    x=new Spiral({x:0,y:0})
    console.log(x)
    x.create()
    i=0

}

p.draw=()=>{
    let c=p.color("#f4f4f4")
    p.fill(c)

    p.rect(0,0,p.width,p.height)
    p.translate(p.width / 2, p.height / 2);
    x.draw();
}

interface place{
    x:number;
    y:number;
}

 class Spiral {
    center:place
    shapelist:Array<Square>
    strokelist:Array<Line>
    cntMax:number;

    constructor(cent){

        this.center=cent
        this.shapelist=[];
        this.strokelist=[];
        this.cntMax=600
    };

    create(){
	let index = 0;
    let radius = 0
	for (let i = 0; i < this.cntMax; i += 0.1) {
		radius += p.random(0.2);
        if (radius>p.height/2*0.9){
            break;
        }
		let x = p.cos(i) * radius;
		let y = p.sin(i) * radius;
        this.strokelist.push(new Line({x:x,y:y}));

        this.shapelist.push(new Square(index,{x:x, y:y},i,radius))
		if (index >= 100) {
			index = 0;
		}
		index++;
	}
    };

    draw(){
        for(let i = 0; i <this.shapelist.length; i++) {
            this.shapelist[i].update()
        }

    }

}

class Line{
    center:place;
    c:p5.Color;
    weight:number;

    constructor(place){
        this.center=place
        this.c=p.color(p.random(2.5,5.5)*60, 50, 100, 0.2);
        this.weight=p.random(0.5)
    }

    create(){
		p.strokeWeight(this.weight);
		p.stroke(this.c);
		p.line(this.center.x/3, this.center.y/3, this.center.x, this.center.y);
    }
}


class Square{
    center:place;
    vel:number;
    angle:number
    size:number
    c:p5.Color
    Filltype:number;
    radius:number;
    i:number

    constructor(index,place,i,radius){
    if (index < 40) {
		this.size=p.random(5);
	} else {
		this.size=p.random(4, 15);
	}
    this.center=place
    this.c = p.color(p.random(2.5,5.5)*60, 50, 100, 0.3);
    this.Filltype=p.random(0,1)
    this.angle=p.random(0,p.PI)
    this.radius=radius
    this.vel=p.random(p.radians(5),p.radians(20))/this.radius
    this.i=i
    }

    create(){
    p.translate(this.center.x,this.center.y)
    p.rotate(this.angle)
	//stroke(random(colors));
	shadow(this.c);
    if(this.Filltype>0.5){
        p.stroke(this.c)
        p.strokeWeight(this.size*0.2)
        p.noFill()
    }else{
        p.fill(this.c)
        p.noStroke()
    }
    p.rect(0,0,this.size,this.size);
    p.rotate(-this.angle)
    p.translate(-this.center.x,-this.center.y)
    }
    update(){
        this.i+=this.vel
        let new_X = p.cos(this.i)*this.radius
        let new_Y =p.sin(this.i)*this.radius
        this.center={x:new_X, y:new_Y}
        this.create()
    }
}


function shadow(c) {
    let d=p.drawingContext as CanvasRenderingContext2D;
	d.shadowOffsetX = 1;
	d.shadowOffsetY = 1;
	d.shadowBlur = 20;
	p.noStroke();
	d.shadowColor = c;
}

}