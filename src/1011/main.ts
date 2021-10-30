import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let i=0;
    let shapes=[]
    let dis
    let colors=["#ff794e","#ff9394","#ffdb8d","#a2ffc9","#07c5ce","#5973fe"]
    p.setup=()=>{
        let size
		size=p.min([p.windowHeight,p.windowWidth])*0.9
			p.createCanvas(size,size)
        dis=size/600
        p.rectMode(p.CENTER)
        p.ellipseMode(p.CENTER)
        // shapes.push(new  RotatingTri(150))
        p.angleMode("degrees")
        for (let i=0; i<3; i++){
            let low_s=[]
            for(let r=0; r<3; r++){
            switch(i*3+r){
                case 0:low_s.push(new RotatingTri_(100*dis))
                case 1:low_s.push(new MovingCirc_(50*dis))
                case 2:low_s.push(new ExpandingArc_(120*dis))
                case 3:low_s.push(new RotatingLine_(60*dis))
                case 4:low_s.push(new SinCurve_(100*dis))
                case 5:low_s.push(new ExplodingTri(40*dis))
                case 6:low_s.push(new RotatingBar_(40*dis))
                case 7:low_s.push(new PointsSquair(150*dis))
                case 8:low_s.push(new ExpandingSquair_(50*dis))
            }
            }
            shapes.push(low_s)
        }
    }
    
    p.draw=()=>{
        p.background("#2A3D52")
        p.translate(p.width/2, p.height/2)
        for (let i=0; i<3; i++){
            for(let r=0; r<3; r++){
                shapes[i][r].create()
                shapes[i][r].move()
            }
        }
        // p.square(0,0,100)
        i+=1
    //     for(let i = 0;i<shapes.length;i++) {
    //     shapes[i].create();
    //     shapes[i].move();
    // }
    }

    class RotatingTri_{
        parts:Array<RotatingTri>
        constructor(size){
            let x=[]
            for (i=0; i<6; i++){
                x.push(new RotatingTri(size,(i+1)/2,colors[i]))
            }
            this.parts=x
            
        }
        create(){
            this.parts.forEach(x=>{x.create()})
        }

        move(){
            this.parts.forEach(x=>{x.move()})
        }
    }

    class RotatingTri{
        size:number;
        angle:number;
        speed:number;
        place:{l:number,c:number}
        c:p5.Color

        constructor(size,speed,c){
            this.size=size
            this.angle=0
            this.speed=speed
            this.place={l:-200*dis,c:-200*dis}
            this.c=c
        }

        create(){
            p.translate(this.place.l,this.place.c)
            p.noFill()
            p.rotate(this.angle)
            p.stroke(this.c);
            p.beginShape()
            p.vertex(0,-this.size/p.sqrt(3))
            p.vertex(this.size/2,this.size/(2*p.sqrt(3)))
            p.vertex(-this.size/2,this.size/(2*p.sqrt(3)))
            p.vertex(0,-this.size/p.sqrt(3))
            p.endShape()
            p.rotate(-this.angle)
            p.translate(-this.place.l,-this.place.c)
        }

        move(){
            this.angle+=this.speed
        }
    }
            class MovingCirc_{
        parts:Array<MovingCirc_>
        constructor(size){
            let x=[]
            for (i=0; i<6; i++){
                x.push(new MovingCirc(size,1+i/6,colors[i]))
            }
            this.parts=x
            
        }
        create(){
            this.parts.forEach(x=>{x.create()})
        }

        move(){
            this.parts.forEach(x=>{x.move()})
        }
    }


    class MovingCirc{
        size:number;
        angle:number;
        speed:number
        place:{l:number,c:number}
        c:p5.Color

        constructor(size,speed,c){
            this.size=size
            this.angle=0
            this.place={l:-200*dis,c:0}
            this.speed=speed
            this.c=c
        }

        create(){
            p.translate(this.place.l,this.place.c)
            p.noFill()
            p.rotate(this.angle)
            p.stroke(this.c);
            p.fill(this.c)
            p.circle(this.size,this.size,this.size/5)
            p.rotate(-this.angle)
            p.translate(-this.place.l,this.place.c)
        }

        move(){
            this.angle+=p.sin(i/3)*this.speed
        }
    }

    

    class ExpandingArc_{
        parts:Array<ExpandingArc>
        constructor(size){
            let x=[]
            for (i=0; i<6; i++){
                x.push(new ExpandingArc(size*(1-(i/6)),colors[i],(6-i)*30))
            }
            this.parts=x
            
        }
        create(){
            this.parts.forEach(x=>{
                x.create()
            })
        }

        move(){
            this.parts.forEach(x=>{x.move()})
        }

    }
    class ExpandingArc{
        size:number;
        angle:number;
        place:{l:number,c:number}
        c:p5.Color
        constructor(size,c,angle){
            this.size=size
            this.angle=angle
            this.place={l:-200*dis,c:200*dis}
            this.c=c
        }

        create(){
            p.translate(this.place.l,this.place.c)
            p.beginShape()
            p.fill(this.c)
            p.stroke(this.c);
            p.arc(0,0,this.size,this.size,this.angle,this.angle+180)
            p.endShape()
            p.translate(-this.place.l,-this.place.c)
        }

        move(){
            this.angle+=1
        }
    }

    class RotatingLine_{
        parts:Array<RotatingLine_>
        constructor(size){
            let x=[]
            for (i=0; i<6; i++){
                x.push(new RotatingLine(size,30+(i*20),30+(i*10),colors[i]))
            }
            this.parts=x
            
        }
        create(){
            this.parts.forEach(x=>{
                x.create()
            })
        }

        move(){
            this.parts.forEach(x=>{x.move()})
        }

    }

    class RotatingLine{
        size:number;
        angle1:number;
        angle2:number;
        place:{l:number,c:number}
        c:p5.Color
        constructor(size,angle1,angle2,c){
            this.size=size
            this.angle1=angle1
            this.angle2=angle2
            this.place={l:0,c:-200*dis}
            this.c=c
            
        }

        create(){
            p.translate(this.place.l,this.place.c)
            p.noFill()
            p.stroke(this.c);
            let inner_x=this.size/2*p.cos(this.angle1)
            let inner_y=this.size/2*p.sin(this.angle1)
            let outer_x=this.size*p.cos(this.angle2)
            let outer_y=this.size*p.sin(this.angle2)
            p.line(inner_x,inner_y,outer_x,outer_y)
            p.translate(-this.place.l,-this.place.c)
        }

        move(){
            this.angle1+=1
            this.angle2-=1
        }
    }
            class SinCurve_{
        parts:Array<SinCurve>
        constructor(size){
            let x=[]
            for (i=0; i<6; i++){
                x.push(new SinCurve(size,i/6,colors[i]))
            }
            this.parts=x
            
        }
        create(){
            this.parts.forEach(x=>{x.create()})
        }

        move(){
            this.parts.forEach(x=>{x.move()})
        }
    }
    class SinCurve{
        size:number;
        angle:number;
        speed:number;
        place:{l:number,c:number}
        c:p5.Color
        constructor(size,speed,c){
            this.size=0
            this.place={l:0,c:0}
            this.speed=speed
            this.c=c
        }

        create(){
            p.translate(this.place.l,this.place.c)
            for(let i= -100 ;i<100;i++){
                let x=i
                let y=p.sin(i*2)*this.size
                p.stroke(this.c)
                p.point(x,y)
            }
            p.translate(-this.place.l,-this.place.c)
        }
        move(){
            this.size+=p.cos(i)*this.speed
        }
    }

    class ExplodingTri{
        size:number;
        place:{l:number,c:number}
        angle:number
        constructor(size){
            this.size=0
            this.place={l:0,c:200*dis}
            this.angle=0
        }

        create(){
            p.translate(this.place.l,this.place.c)
            p.rotate(this.angle)
            for(let k=0;k<=5;k++){
                p.fill(colors[k])
                p.stroke(colors[k])
                p.triangle(this.size,this.size,this.size+10*p.sqrt(3),this.size+10,this.size+10*p.sqrt(3),this.size-10)
                p.rotate(60)
            }
            p.rotate(-this.angle)
            p.translate(-this.place.l,-this.place.c)
        }
        move(){
            this.size+=p.sin(i)/2
            if(i%360==0){
                this.angle+=60
            }
        }
    }

        class RotatingBar_{
        parts:Array<RotatingBar>
        constructor(size){
            let x=[]
            for (i=0; i<6; i++){
                x.push(new RotatingBar(size,(i+1)/2,colors[i]))
            }
            this.parts=x
            
        }
        create(){
            this.parts.forEach(x=>{x.create()})
        }

        move(){
            this.parts.forEach(x=>{x.move()})
        }
    }

    class RotatingBar{
        size:number;
        angle:number;
        place:{l:number,c:number}
        speed:number
        c:p5.Color
        constructor(size,speed,c){
            this.size=size
            this.angle=0
            this.place={l:200*dis,c:-200*dis}
            this.speed=speed
            this.c=c
        }
        create(){
            p.translate(this.place.l,this.place.c)
            p.rotate(this.angle)
            p.noFill()
            p.stroke(this.c)
            p.rect(0,0,this.size/2,this.size)
            p.rotate(-this.angle)
            p.translate(-this.place.l,-this.place.c)
        }

        move(){
            this.angle+=this.speed
            this.size+=p.sin(i)*this.speed/6
        }

    }

    class PointsSquair{
        size:number;
        k:number;
        place:{l:number,c:number}
    constructor(size){
        this.size=size
        this.k=0
        this.place={l:200*dis,c:0}
    }

    create(){
        p.translate(this.place.l,this.place.c)
        for (let i=this.k;i<=this.k+4; i++){
            let r;
            if(i==6){
                r=6
            }else if(i>6) {
                r=12-i
            }else{
                r=i
            }
            let start=(1-r)*this.size/10
            let y=(i-6)*this.size/10
            for(let l=1; l<=r; l++){
                let x=start+(l-1)*this.size/5
                p.fill(colors[r-1])
                p.stroke(colors[r-1])
                p.circle(x,y,10)
            }
        }
        p.translate(-this.place.l,-this.place.c)
    }

    move(){
        if(i%10==0){
        this.k+=1
        if(this.k>=12){
            this.k=0
        }
    }
    }
    }

    class ExpandingSquair_{
        parts:Array<ExpandingSquair>
        constructor(size){
            let x=[]
            for (i=0; i<6; i++){
                x.push(new ExpandingSquair(size,i*10-90,colors[i]))
            }
            this.parts=x
            
        }
        create(){
            this.parts.forEach(x=>{x.create()})
        }

        move(){
            this.parts.forEach(x=>{x.move()})
        }
    }

    class ExpandingSquair{
        size:number;
        angle:number
        place:{l:number,c:number}
        c:p5.Color
        constructor(size,angle,c){
            this.size=size
            this.angle=angle
            this.place={l:200*dis,c:200*dis}
            this.c=c
        }
        create(){
            
            p.translate(this.place.l,this.place.c)
            p.point(0,0)
            let y=this.angle
            let x= this.angle
            let len=p.sin(this.angle)*this.size/2
         p.fill(this.c)
            p.stroke(this.c)
            p.square(x,y,len)
            p.translate(-this.place.l,-this.place.c)
            
        }
        move(){
            this.angle+=p.sin(i)
        }
    }
}