import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors= ["#d83721", "#df6e2b", "#e09c1d", "#f2c800", "#fbc83a","#f5d51b"];
    let tCount = 200;
    let trangX = [];
    let trangY = [];
    let c;
    let fish=[];

    p.setup=()=>{
        c=p.createCanvas(600,600);
        p.colorMode("rgb")
        p.angleMode("radians");
        // p.blendMode(p.DARKEST)
        p.noLoop();


	    for (let i = 0; i < tCount; i++) {
		trangX[i] = p.random(-200, p.width + 200);
		trangY[i] = p.random(-200, p.height + 200);
        }

        let a=100
        let b=0.1
            for (let j = 0; j < p.PI*4; j+=0.4) {
            let x=a*p.exp(b*j)*p.cos(j)
            let y = a*p.exp(b*j)*p.sin(j)
            let dx=a*p.exp(b*j)*(b*p.cos(j)-p.sin(j))
            let dy=a*p.exp(b*j)*(b*p.sin(j)+p.cos(j))
            let arc=p.atan((dy+0.001)/(dx+0.001))
            let x_scale =p.random(1.5,2.0)
            let y_scale =1
            for (let k=0; k<7; k++){
            fish.push(new Fish({x:x+p.random(0,150),y:y+p.random(0,150)},{x:x_scale,y:y_scale},arc))
            }
            }
    
    }
    p.draw=()=>{
        p.background(255,255,255);

        
        for (let i = 0; i < tCount - 3; i++) {
		    let c = p.color(p.random(colors));
		    c.setAlpha(15);
		    p.noStroke();
		    p.fill(c);
		    p.triangle(trangX[i], trangX[i + 1], trangX[i + 2], trangY[i], trangY[i + 1], trangY[i + 2]);
	    }

        let c=p.color("#FFFFFF")
        c.setAlpha(200)
        p.noFill()
        p.stroke(c)
        for (let x=0; x<p.random(15,25); x++){
            let x=p.random(0,600)
            let y=p.random(0,600)
            let r=p.random(20,50)
            p.ellipse(x,y,r,r)
        }
        

        for(let i = 0; i < p.width * p.height / 100; i++){
				let x = p.random(p.width);
		let y = p.random(p.height);
		p.stroke("#FFFFFF")
		p.point(x, y);
	}
        p.translate(p.width/2,p.height/2)
        for(let i = 0;i<fish.length;i++) {
            fish[i].makefish();
        } 
        
        p.translate(-p.width/2,-p.height/2)
    }

    p.keyPressed=()=> {
      console.log("pressed")
      p.saveCanvas(c, 'myCanvas', 'jpg');
    }

    interface Place{
        x:number;
        y:number;
    }

    class Fish{
        pos:Place;
        scale:Place;
        arc:number;
        constructor(pos:Place,scale:Place,arc){
            this.pos=pos
            this.scale=scale
            this.arc=arc
        }

        makefish=()=>{
            p.translate(this.pos.x,this.pos.y)
            p.rotate(this.arc)
            c=p.color("#FFFFFF")
            c.setAlpha(150)
            p.fill(c)
            // p.noStroke()
            p.stroke(c)
            p.beginShape();
            for (let i=0; i<p.TWO_PI; i+=0.1){
                let x=10*(p.cos(i)-p.sin(i)**2/p.sqrt(2))*this.scale.x
                let y=10*(p.cos(i)*p.sin(i))*this.scale.y
                p.vertex(x,y)
            }
            p.endShape();
            p.rotate(-this.arc)
            p.translate(-this.pos.x,-this.pos.y)
        }
    }
    p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, 'myCanvas', 'jpg');
}

}


