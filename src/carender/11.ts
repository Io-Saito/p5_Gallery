import p5 from "p5";

export const sketch = (p: p5) => {
    let c;
    let leaf=[]
let colors = ["#6e2200","#782600","#832900","#993000","#aa3500","#ba3a00","#c53e01","#d64908","#e15413"];
let leafs= ["#0a5c36","#0f5132","#14452f"];
    p.setup=()=> {
	c=p.createCanvas(1074, 1074);
	p.noLoop();
	p.background("#F3F2EE");
    // for (let n=0; n<5; n++){
    //     wave.push(new Wave({x:p.random(0,150),y:p.random(0,150)}))
    // }

	

    p.blendMode(p.BURN);
    
}

p.draw=()=> {
    let p_=new Parts({x:200,y:200})
    p_.draw()
    for (let i=p.PI/2; i<p.PI; i+=0.05){
        let x=p.width+p.width*p.cos(i)+p.random(-50,50)
        let y=p.height-p.height*p.sin(i)+p.random(-50,50)

        // p.ellipse(x,y,10,10)
        console.log(x,y)
        if (i<p.PI*2/3 || i>p.PI*5/6){
            let prob=p.random(0,1)
            if (prob<0.25){
                let l=new Leave({x:x,y:y},i,p.color(p.random(colors)),p.random(60,100))
                l.draw()
            }else if(prob>0.5){
                let f=new flower({x:x,y:y},p.random(20,40))
                f.draw()
            }
        }
    }

}


class Parts{
    center:Place;
    l:Array<Leave>
    f:Array<flower>

    constructor(Place){
        this.center=Place
        this.f=[]
        this.l=[]
        for (let i = 0; i < 100; i++){
        let x=this.center.x+p.random(-100,100)
        let y=this.center.y+p.random(-100,100)
        let ww=p.random(20,30)
        		p.noStroke()
        let overlapping = false
				for(let i=0; i<this.f.length; i++){
					let other=this.f[i]
					let d=p.dist(x,y,other.center.x,other.center.y)
					if (d<other.size+ww){
						overlapping=true
						break
					}
				}
				if(!overlapping){
                    this.f.push(new flower({x:x,y:y},ww))

		}
        }
        for (let j=0; j<p.random(2,4); j++){
let theta=p.random(0,p.TWO_PI)
        let x=this.center.x+(p.random(180,200))*p.cos(theta)
        let y=this.center.y+(p.random(180,200))*p.sin(theta)
        let ww=p.random(40,60)
        this.l.push(new Leave({x:x,y:y},theta+p.PI/2,p.color(p.random(colors)),ww))
        }
    }

    draw(){
        for (let j=0; j<this.l.length; j++){
            this.l[j].draw()
        }
        for (let i=0; i<this.f.length; i++){
            this.f[i].draw()
        }
    }
}

interface Place{
    x:number; 
    y:number;
}

class flower{
    center :Place;
    size:number;
    constructor(Place,size){
        this.center=Place
        this.size=size
    }
    draw(){
        p.noStroke()
        let x_=[]
        let y_=[]
        p.beginShape();
          for (let i = 0; i <360; i++){

      x_[i]=this.center.x+this.size*p.sin(2*p.radians(i))*p.cos(p.radians(i))
      y_[i]=this.center.y+this.size*p.sin(2*p.radians(i))*p.sin(p.radians(i))
      let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(0, 0, x_[i], y_[i]);
		grad.addColorStop(0, p.random(colors));
		grad.addColorStop(1, p.random(colors));
		l.fillStyle = grad;
        p.vertex(x_[i], y_[i]);
}
p.endShape()
    }

}

class Leave {
    center: Place;
    direction:number;
    color:p5.Color
    size:number;
    begin:Place
    end:Place;
    f:number;
    d:number
    m:{left:number,right:number,center:number,up:number,bottom:number}

  constructor(center, direction, col, size) {
    this.center = center;
    this.direction = direction;
    this.color = col;
    this.size = size;

    this.begin = {x:0, y: this.size};
    this.end = {x: 0, y: -this.size};
    this.d = p.random(-0.75*this.size, 0.75*this.size);
    this.m = {left: -1.5*this.size + 0.2*this.d,
              right: 1.5*this.size + 0.2*this.d,
              center: this.d,
              up: p.random(-0.5*this.size,-this.size),
              bottom:p.random(0.5*this.size, this.size)};
  }

  draw() {
    p.push();
p.translate(this.center.x, this.center.y);
    p.rotate(this.direction);
    p.noStroke()
    // outline

    let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(this.m.right, this.m.up, this.end.x, this.end.y);
        let c1=p.random(leafs);
        let c2;
        do{
            c2=p.random(leafs)
        }while(c1==c2)
		grad.addColorStop(0, c1);
		grad.addColorStop(1, c2);
		l.fillStyle = grad;
    p.beginShape();
    
    p.vertex(this.begin.x, this.begin.y);
    p.bezierVertex(this.m.right, this.m.bottom,
                 this.m.center, this.m.up,
                 this.end.x, this.end.y);
    p.bezierVertex(this.m.center, this.m.up,
                 this.m.left, this.m.bottom,
                 this.begin.x, this.begin.y);
    p.endShape();

    // petiole
    p.strokeWeight(0.05*this.size);
    p.line(this.begin.x, this.begin.y, this.begin.x-0.1*this.d, this.begin.y+0.2*this.size);

    // ribs
    // this.ribs("right", 10);
    // this.ribs("left", 10);


        p.rotate(-this.direction);
    p.translate(-this.center.x, -this.center.y);
    p.pop();
 
  }
}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '11', 'png');
}
}