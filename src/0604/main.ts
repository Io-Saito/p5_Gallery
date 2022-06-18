import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let shapes=[]
    let colors=["#FFC312","#C4E538","#12CBC4","#FDA7DF","#ED4C67"].map(x=>p.color(x))
    let c;
    let num=5;

    function easeOutQuart(x: number): number {
return 1 - p.pow(1 - x, 4);
}

    function easeOutSine(x: number): number {
  return p.sin((x * p.PI) / 2);
}

function easeOutCubic(x: number): number {
return 1 - p.pow(1 - x, 3);
}

function easeOutCirc(x: number): number {
return p.sqrt(1 - p.pow(x - 1, 2));
}

    p.setup=()=>{
        p.frameRate(30)
        let size
		size=p.min([p.windowHeight,p.windowWidth])*0.9
		c=p.createCanvas(size,size)
        p.rectMode(p.CENTER)
        p.ellipseMode(p.CENTER)
        colors.forEach(x=>x.setAlpha(180))
        p.angleMode("degrees")
        for (let i=0; i<num; i++){
        shapes.push(new MovingShape(p.createVector(p.random(p.width/4,p.width*3/4),p.random(p.height,p.height+100)),p.createVector(p.random(-10,10),-60),p.int(p.random(-0.5,7))))
        console.log(shapes[i].shape)
        }

    }
    
    p.draw=()=>{
        p.background("#001d3d")
        for (let i= 0; i <shapes.length; i++){
        shapes[i].display()
        shapes[i].move()
        if(shapes[i].pos.y>p.height+110){
            shapes.splice(i,1)
        }
        if (p.random(0,1)>0.9 && shapes.length<10){
            shapes.push(new MovingShape(p.createVector(p.random(p.width/4,p.width*3/4),p.random(p.height,p.height+100)),p.createVector(p.random(-10,10),-60),p.int(p.random(-0.5,7))))
        }
        }
    }

    function cross (c){
        p.noStroke()
        p.fill(c)
        p.rect(0,0,45,15)
        p.rect(0,0,15,45)
        p.noFill()
    }

    function circle (c){
            p.noFill()
            p.stroke(c)
            p.strokeWeight(10)
            p.ellipse(0,0,30,30)
            p.noStroke()
    }

    function sqrt (c){
        p.noFill()
        p.stroke(c)
        p.strokeWeight(10)
        p.rect(0,0,30,30)
        p.noStroke()
    }

    function triangle(c){
        p.noFill()
        p.stroke(c)
        p.strokeWeight(10)
        p.beginShape()
        p.vertex(0,10*p.sqrt(3))
        p.vertex(15,-5*p.sqrt(3))
        p.vertex(-15,-5*p.sqrt(3))
        p.endShape(p.CLOSE)
        p.noStroke()
    }

        function arc(c){
        p.noFill()
        p.stroke(c)
        p.strokeWeight(10)
        p.arc(0,0,30,30,0,180)
        p.noStroke()
    }

            function line(c){
        p.fill(c)
        p.noStroke()
        p.rect(0,0,15,35)
        p.noStroke()
    }

        function pentagon(c){
        p.noFill()
        p.stroke(c)
        p.strokeWeight(10)
        p.beginShape()
        p.vertex(0,10/p.sin(36))
        p.vertex(20*p.cos(36),10/p.sin(36)-20*p.sin(36))
        p.vertex(10,-10/p.tan(36))
        p.vertex(-10,-10/p.tan(36))
        p.vertex(-20*p.cos(36),10/p.sin(36)-20*p.sin(36))
        p.endShape(p.CLOSE)
        p.noStroke()
    }


    class MovingShape{
        pos:p5.Vector
        velocity:p5.Vector
        acceleration:p5.Vector
        shape:number
        c:p5.Color
        r:number
        theta:number

        constructor(pos:p5.Vector,velocity:p5.Vector,s:number){
            this.pos=pos
            this.velocity=velocity
            this.acceleration=p.createVector(0,3)
            this.c=p.random(colors)
            this.r=5
            this.theta=0
            this.shape=s
        }

        display=()=>{
            p.translate(this.pos.x,this.pos.y)
            p.rotate(this.theta)
            // p.strokeWeight(5)
            p.noStroke()
            p.noFill()

            if(this.shape == 0){
                circle(this.c)
            }else if(this.shape == 1){
                cross(this.c)
            }else if(this.shape == 2){
                sqrt(this.c)
            }else if(this.shape == 3){
                triangle(this.c)
            }else if(this.shape == 4){
                pentagon(this.c)
            }else if(this.shape == 5){
                arc(this.c)
            }
            else if(this.shape == 6){
                line(this.c)
            }
            p.rotate(-this.theta)
            p.translate(-this.pos.x,-this.pos.y)
        }

        move=()=>{
            if(-15<this.velocity.y&& this.velocity.y<15){
                for (let i=0; i<=360; i+=60){
                p.fill(p.random(colors))
                p.ellipse(this.pos.x+this.r*p.cos(i),this.pos.y+this.r*p.sin(i),5,5)
            }
                this.r+=5
            }
            this.pos.x+=this.velocity.x
            this.pos.y+=this.velocity.y
            this.theta += (this.velocity.x * this.velocity.mag()) / 10.0;
            this.velocity.x+=this.acceleration.x
            this.velocity.y+=this.acceleration.y

            
        }

        }


    

}