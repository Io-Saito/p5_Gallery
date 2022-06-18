import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let i=0;
    let period=60;
    let fcount=0;
    let shapes_1=[]
    let shapes_2=[]
    let dots=[]
    let dis
    let colors=["#82e1df","#ea96df","#ff65b3","#fcd72c","#ffdd63"].map(x=>p.color(x))
    let c;

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
        let size
		size=p.min([p.windowHeight,p.windowWidth])*0.9
		c=p.createCanvas(size,size)
        dis=size/600
        p.rectMode(p.CENTER)
        p.ellipseMode(p.CENTER)
        colors.forEach(x=>x.setAlpha(180))
        p.angleMode("degrees")
        shapes_1.push(new stretchingArc(450,10,60,{x:-p.width/2,y:-p.height/2},6,2))
        shapes_1.push(new RotatingSquare({x:-p.width/2+1*p.cos(70)*225,y:-p.height/2+p.sin(70)*225}))
        shapes_1.push(new stretchingArc(550,30,120,{x:-p.width/2,y:-p.height/2},3,0))
        shapes_1.push(new stretchingArc(565,30,120,{x:-p.width/2,y:-p.height/2},3,0))
        shapes_1.push(new RotatingCross({x:-p.width/2+1*p.cos(20)*280,y:-p.height/2+p.sin(20)*280}))
        shapes_1.push(new stretchingArc(200,10,90,{x:-p.width/2,y:-p.height/2},20,0))
        shapes_1.push(new stretchingArrow(380,270,340,{x:-p.width/2,y:-p.height/2},4))

        shapes_2.push(new stretchingArc(250,0,80,{x:-p.width/2,y:-p.height/2},10,2))
        shapes_2.push(new stretchingArc(450,20,120,{x:-p.width/2,y:-p.height/2},3,0))
        shapes_2.push(new stretchingArc(465,20,120,{x:-p.width/2,y:-p.height/2},5,0))
        shapes_2.push(new RotatingCross({x:-p.width/2+1*p.cos(10)*230,y:-p.height/2+p.sin(10)*230}))
        shapes_2.push(new stretchingArc(485,20,120,{x:-p.width/2,y:-p.height/2},7,0))
        shapes_2.push(new stretchingArrow(350,270,340,{x:-p.width/2,y:-p.height/2},4))
        shapes_2.push(new RotatingSquare({x:-p.width/2+1*p.cos(70)*500,y:-p.height/2+p.sin(70)*500}))
        shapes_2.push(new stretchingArc(1000,10,60,{x:-p.width/2,y:-p.height/2},20,0))

        for (let i=0; i<60; i++){
            dots.push({x:p.random(-p.width/2,p.width/2),y:p.random(-p.height/2,p.height/2)})
        }
    }
    
    p.draw=()=>{
        p.background("#001d3d")
        p.translate(p.width/2, p.height/2)
        for (let i = 0; i<shapes_1.length; i++){
        shapes_1[i].create()
        shapes_1[i].move()
        }
        p.rotate(180)
        for (let i = 0; i<shapes_2.length; i++){
        shapes_2[i].create()
        shapes_2[i].move()
        }
        let c=p.color("#FFFFFF")
        c.setAlpha(50)
        for (let i=0; i<dots.length; i++){
            p.noStroke()
            p.fill(c)
            p.ellipse(dots[i].x,dots[i].y,5,5)
        }
        p.rotate(-180)
        i+=1
        fcount=i%60


    }

    interface Place{
        x:number;
        y:number;
    }


        class RotatingCross{
        place: Place;
        c: p5.Color;
        weight:number;
        theta:number;

        constructor(place){
            this.place = place;
            this.weight =5
            this.c=p.random(colors)
            this.theta=0;
        }

        create(){
            p.translate(this.place.x,this.place.y)
            p.rotate(45)
            p.stroke(this.c)
            p.fill(this.c)
            p.strokeWeight(this.weight)
            p.noStroke()
            p.rotate(this.theta)
            p.rect(0,0,30,10)
            p.rect(0,0,10,30)
            p.rotate(-this.theta)
            p.rotate(-45)
            p.translate(-this.place.x,-this.place.y)
        }

        move(){
            this.theta+=1*easeOutCubic(fcount/20)
        }
    }

    class RotatingSquare{
        place: Place;
        c: p5.Color;
        weight:number;
        theta:number;

        constructor(place){
            this.place = place;
            this.weight =5
            this.c=p.random(colors)
            this.theta=0;
        }

        create(){
            p.translate(this.place.x,this.place.y)
            p.rotate(45)
            p.stroke(this.c)
            p.strokeWeight(this.weight)
            let x=p.drawingContext as CanvasRenderingContext2D;
            x.setLineDash([1, 1]); 
            p.noFill()
            p.rotate(this.theta)
            p.rect(0,0,20,20)
            p.rotate(-this.theta)
            p.rotate(-45)
            p.translate(-this.place.x,-this.place.y)
        }

        move(){
            this.theta+=1*easeOutCubic(fcount/20)
        }
    }

    class stretchingArrow{
        r: number;
        theta_s: number;
        theta_e: number;
        place: Place;
        c: p5.Color;
        weight:number;
        lineType:number;
        theta_f: number
        theta_b:number

        constructor(r, s, e,p_,w){
            this.r=r;
            this.theta_s=s;
            this.theta_e=e;
            this.place=p_;
            this.c=p.random(colors)
            this.weight=w
            this.theta_f=this.theta_s
            this.theta_b=this.theta_s
            this.lineType=p.random(1)
        }

        arrows(b,f){
            for (let i=b; i<=f; i+=10){
                p.rotate(i)
                let v_1={x:0,y:this.r}
                let v_2={x:10,y:this.r-10}
                let v_3={x:10,y:this.r+10}
                p.fill(this.c)
                p.triangle(v_1.x,v_1.y,v_2.x,v_2.y,v_3.x,v_3.y)
                p.rotate(-i)
            }

        }
        create(){
            p.translate(this.place.x,this.place.y)
            p.stroke(this.c)
            p.strokeWeight(this.weight)
            let x=p.drawingContext as CanvasRenderingContext2D;
            x.setLineDash([1, 1]); 
            this.arrows(this.theta_b,this.theta_f)
            
            
            p.translate(-this.place.x,-this.place.y)
        }

        move(){ if (this.theta_f<this.theta_e){
            this.theta_f += 1
            }else if(this.theta_b<(this.theta_e)){
                    this.theta_f=this.theta_e
                    this.theta_b += 1
                }
               else{
                    this.theta_f=this.theta_s
                    this.theta_b=this.theta_s
                }
            
        }
    }

    class stretchingArc{
        r: number;
        theta_s: number;
        theta_e: number;
        place: Place;
        theta_f: number
        theta_b:number
        c: p5.Color;
        weight:number;
        lineType:number;

        constructor(r, s, e,p_,w,l){
            this.r=r;
            this.theta_s=s;
            this.theta_e=e;
            this.place=p_;
            this.c=p.random(colors)
            this.theta_f=this.theta_s
            this.theta_b=this.theta_s
            this.weight=w
            this.lineType=l
        }

        create(){
            p.translate(this.place.x,this.place.y)
            p.stroke(this.c)
            p.strokeWeight(this.weight)
            p.noFill()
            let x=p.drawingContext as CanvasRenderingContext2D;
            if(this.lineType>1){
            p.strokeCap(p.ROUND);
            x.setLineDash([1, 15]);
            }else{
            p.strokeCap(p.PROJECT);
            x.setLineDash([1, 1]); 
            }
            p.arc(0,0,this.r,this.r,this.theta_b,this.theta_f)
            
            p.translate(-this.place.x,-this.place.y)
        }

        move(){
           if (this.theta_f<this.theta_e){
            this.theta_f += 1
            }else if(this.theta_b<(this.theta_e)){
                    this.theta_f=this.theta_e
                    this.theta_b += 1
                }
               else{
                    this.theta_f=this.theta_s
                    this.theta_b=this.theta_s
                }
            
        }
    }

}