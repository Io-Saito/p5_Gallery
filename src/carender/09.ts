import p5 from "p5";

export const sketch = (p: p5) => {
let colors =["#212529","#2c2b3c","#1b2432","#121420","#141204"];
let right=["#ff9a1f","#fb804b"]
let c;
let bg;
let buildings=[]


p.setup=()=> {
	c=p.createCanvas(1074, 1074);
	p.noLoop();
	p.background("#F3F2EE");
    // for (let n=0; n<5; n++){
    //     wave.push(new Wave({x:p.random(0,150),y:p.random(0,150)}))
    // }

	

    p.blendMode(p.BURN);

    for(let i=0; i<10; i++){
        buildings.push(new Building(bg,p.random(-50,1150)))
    }
}

p.draw=()=> {
    
    for (let i= 0; i<buildings.length; i++){
        buildings[i].build();
    }
    moon()
}

function moon(){
    p.noStroke()
	
	let moonPosY = p.random(300,500)
	let moonPosX = p.random(800,1100)
	let moonR=p.random(180,220)
     
let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createRadialGradient(p.width-moonPosX,moonPosY,10,p.width-moonPosX,moonPosY,moonR);
		grad.addColorStop(0, p.random(right));
		grad.addColorStop(1,p.random(right));
		l.fillStyle = grad;
	p.ellipse(p.width-moonPosX,moonPosY,moonR,moonR)
	// }
    
	p.fill("#F3F2EE")
	p.ellipse(p.width-moonPosX*0.9,moonPosY*0.9,moonR*0.9,moonR*0.9)


}

class Building{
        x:number;
        w:number;
        h:number;
        bg:p5.Graphics;

        constructor(bg,x){
            this.x=x
            this.w=p.random(3,6)
            this.h=p.random(3,8)
            this.bg=bg
        }

    build=()=>{
        
        let c=p.random(colors)
	p.push();
	p.translate(this.x,1074-this.h*30-100);
	p.noStroke()
    p.fill(c)

    p.rect(0,0,this.w*40+120,this.h*40+200)
    
    for (let i=0; i<this.w; i++){
        for (let j=0; j<this.h; j++){
            let prob=p.random(0,1)
            if (prob>0.8){
            p.erase()
            p.rect(20+i*30,20+j*30,20,20)
            p.noErase()
            p.fill("#F3F2EE")
            p.rect(20+i*30,20+j*30,20,20)
            }
        }
    }

	

    p.translate(-this.x, -(700-this.h*30-30));
	p.pop();
}
}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '10', 'png');
}

}
