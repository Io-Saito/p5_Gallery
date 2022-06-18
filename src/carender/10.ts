import p5 from "p5";

export const sketch = (p: p5) => {
    let c;
    let leaf=[]
let colors = ["#6e2200","#782600","#832900","#993000","#aa3500","#ba3a00","#c53e01","#d64908","#e15413"];
    p.setup=()=> {
	c=p.createCanvas(1074, 1074);
	p.noLoop();
	p.background("#F3F2EE");
    // for (let n=0; n<5; n++){
    //     wave.push(new Wave({x:p.random(0,150),y:p.random(0,150)}))
    // }

	

    p.blendMode(p.BURN);
    for (let i=0; i<200; i++){
        let theta=p.random(p.TWO_PI*0.75,p.TWO_PI)
        let x=(p.width+p.random(0,100))*p.cos(theta)
        let y=-1*(p.width+p.random(0,100))*p.sin(theta)
        let overlapping = false
        let ww=p.random(60,80)
				for(let i=0; i<leaf.length; i++){
					let other=leaf[i]
					let d=p.dist(x,y,other.center.x,other.center.y)
					if (d<ww+other.size){
						overlapping=true
						break
					}
				}
				if(!overlapping){
                    leaf.push(new Leave({x:x,y:y},p.random(0,p.TWO_PI),p.color(p.random(colors)),ww))
		p.noStroke()
                
	
		}
        
    }
}

p.draw=()=> {
    for (let i = 0; i <leaf.length;i++){
        leaf[i].draw()
    }

}
interface Place{
    x:number; 
    y:number;
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
    p.stroke(p.random(colors))
    // outline

    let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(this.m.right, this.m.up, this.end.x, this.end.y);
        let c1=p.random(colors);
        let c2;
        do{
            c2=p.random(colors)
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
    this.ribs("right", 10);
    this.ribs("left", 10);

    p.pop();
 
  }

  ribs(side, n) {
    for (let i = 0; i < n; ++i) {
      p.strokeWeight(p.random(0, 0.01)*this.size);
      p.stroke(this.color);
      
      let t = p.random(1);
      let x = p.bezierPoint(this.begin.x, side == "left" ? this.m.left : this.m.right, this.m.center, this.end.x, t);
      let y = p.bezierPoint(this.begin.y, this.m.bottom, this.m.up, this.end.y, t);
      let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(this.begin.x, this.begin.y, x, y);
        let c1=p.random(colors);
        let c2;
        do{
            c2=p.random(colors)
        }while(c1==c2)
		grad.addColorStop(0, c1);
		grad.addColorStop(1, c2);
		l.fillStyle = grad;
      p.bezier(this.begin.x, this.begin.y,
            p.map(y, this.begin.y, this.end.y, this.begin.x, this.m.center), y,
            x, y,
            x, y);
    }
  }
}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '09', 'png');
}
}