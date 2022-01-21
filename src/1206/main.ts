import * as p5 from 'p5';

export const sketch = (p: p5) => {


let li=[];


p.setup=()=> {
  p.createCanvas(600, 600);
  
  p.noLoop();
  p.stroke(50);
  p.angleMode("radians");
  p.colorMode("hsb")
  let r=40;
  let c=0;
  for (let j=-200; j<=200; j+=(r*1.5)){
      for (let i=-200; i<=200; i+=(r*p.sqrt(3))){
        if (c%2==0){
            li.push(new Hxagon(i,j))
        }else{
          li.push(new Hxagon(i+(r*p.sqrt(3)/2),j))
        }
      }
      c+=1;
  }
  
}

p.draw=()=> {
  p.translate(300,300);
  p.background("#ffffff");
  p.noStroke();

  li.map(x=>{
    x.create();
  });
  p.translate(-300,-300);
}


class Hxagon{
  x:number;
  y:number;
  stroke:Array<boolean>;
  fill:Array<boolean>;
  c:Array<any>;

  constructor(x_,y_){
    this.x=x_;
    this.y=y_;
    this.stroke=new Array(3).fill(0).map(x=>{
      if (p.random(0,1)>0.8){
        return true
      }
    })
    this.fill=new Array(3).fill(0).map((x,_)=>{
            if (this.stroke[_]){
        return false
      }else if (p.random(0,1)>0.8){
        return true
      }

    })
    this.c=new Array(3).fill(0).map(_ => p.color(p.random(0,360),360,100,0.5))

  }
  create(){
    for (var _ =0; _<=2; _++){
      this.wrap(_)
       
    switch (_){
      case 0: this.left()
      case 1: this.right()
      case 2: this.top()
    }
       
    p.noStroke();
    p.noFill();
    }
    
  }
  wrap(num){
    if (this.stroke[num]){
      p.stroke(this.c[num])
    }
    if (this.fill[num]){
      p.fill(this.c[num])
    }

  }

  left(){
    p.beginShape();
    p.vertex(this.x-(20*p.sqrt(3)),this.y-20);
    p.vertex(this.x-(20*p.sqrt(3)),this.y+20);
    p.vertex(this.x,this.y+40);
    p.vertex(this.x,this.y)
    p.endShape(); 
  }
  right(){
    p.beginShape();
    p.vertex(this.x+(20*p.sqrt(3)),this.y-20);
    p.vertex(this.x+(20*p.sqrt(3)),this.y+20);
    p.vertex(this.x,this.y+40);
    p.vertex(this.x,this.y)
    p.endShape(); 
  }
  top(){
    p.beginShape();
    p.vertex(this.x,this.y-40);
    p.vertex(this.x+(20*p.sqrt(3)),this.y-20);
    p.vertex(this.x,this.y)
    p.vertex(this.x-(20*p.sqrt(3)),this.y-20);
    p.endShape(); 
  }

  changeColor(){
    this.c.map(_ => p.color(p.random(0,360),360,100,0.6))
    this.stroke.map(x=>{
      if (p.random(0,1)>0.8){
        return true
      }
    });
    this.fill.map((x,_)=>{
            if (this.stroke[_]){
        return false
      }else if (p.random(0,1)>0.8){
        return true
      }
  })
}



}
}

