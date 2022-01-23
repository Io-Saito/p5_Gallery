import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors= ["#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef","#ade8f4","#caf0f8"];
    let tCount = 400;
    let trang = [];
    let i=0;
    let c;

    p.setup=()=>{
        c=p.createCanvas(p.windowWidth,p.windowHeight);
        p.frameRate(10);
        p.colorMode("rgb")
        p.angleMode("radians");
        // p.blendMode(p.SCREEN)
        for (let i = 0; i < tCount; i++) {
            trang.push(new Triangle());
    }
    p.filter(p.BLUR, 10);
    // p.noLoop();
    }
    p.draw=()=>{
    p.removeElements();
    p.background(0,0,0);
    p.fill(3,4,95,10)
    p.rect(0,0,p.width,p.height)
    trang.forEach(x=>{
        x.maketriangle();
        x.update();
    })
    for (let r = 0; r < 10; r++) {
            trang.push(new Triangle());
    }
    i++;
    }

    interface place{
        x:number;
        y:number;
    }

    class Triangle{
        points: Array<place>
        c:p5.Color;
        b:number;

        constructor(){
            this.c=p.color(p.random(colors));
            this.points=[{x:0,y:0},{x:0,y:0},{x:0,y:0}];
            this.points.forEach(point=>{
                point.x=p.random(-200, p.width + 200)
                point.y=p.random(-200, p.height + 200)}
            )
            this.b=0
        }

        maketriangle=()=>{
        let a;
        if (this.b<20){
            a=this.b
        }else if(this.b>40){
            a=60-this.b
        }else{
            a=20
        }
        this.c.setAlpha(a);
        p.noStroke();
        p.fill(this.c);
        p.triangle(this.points[0].x,this.points[0].
            y,this.points[1].x,this.points[1].y,this.points[2].x,this.points[2].y);
        }

        update=()=>{
            // this.points.forEach(point=>{
            //     let x_=p.noise(0.1)
            //     let y_=p.noise(0.2)
            //     if(p.int(p.random(0,100))%2==0){
            //         point.x-=x_
            //         point.y-=y_
            //     }else{
            //         point.x+=x_
            //         point.y+=y_
            //     }}

            // )
            this.b+=1
        }
    }
}


