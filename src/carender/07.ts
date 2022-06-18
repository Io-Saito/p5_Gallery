import * as p5 from 'p5';

export const sketch = (p: p5) => {
let flowers = [];
let canvas;
let BG;
let BG2;
let colors = ["#1a3042","#1e2a41","#21243f","#2c2543","#362647","#4b284f","#50233e","#551e2d"];
    let c;
    

    p.setup=()=>{
        c=p.createCanvas(1074,1074);
        p.angleMode("radians");
        p.blendMode(p.BURN);
        
        p.noLoop();
        BG=p.createGraphics(1074,1074)
        BG.blendMode(p.BURN);

        for (let i = 0; i < 1000; i++) {
            let rad=p.random(0,p.TWO_PI)
            let xx = p.width/2+p.cos(rad)*p.width*1.1/2+p.random(-40,40)
				let yy = p.height/2+p.sin(rad)*p.width*1.1/2+p.random(-40,40)
				let ww = p.random(60,200); 
				let overlapping = false
				for(let i=0; i<flowers.length; i++){
					let other=flowers[i]
					let d=p.dist(xx,yy,other.position.x,other.position.y)
					if (d<(ww*1.6)+(other.size*1.6)){
						overlapping=true
						break
					}
				}
				if(!overlapping){
                    flowers.push(new flower({x:xx,y:yy},ww));
		p.noStroke()
                
	
		}
            
        
}

    }
    p.draw=()=>{
        p.background('#F3F2EE');
        for(let i = 0;i<flowers.length;i++) {
        flowers[i].makeflower();
    }
    p.image(BG,0,0)


    }
    interface Place{
        x:number;
        y:number;
    }

    class flower{
        color:any;
        position:Place;
        size:number
        alpha:number;

        constructor(x:Place,dia:number){
            this.color=p.color(colors[p.int(p.random(0,colors.length-1))])
            this.alpha=300
            this.position=x
            this.size=dia

        }

        makeflower=()=>{
            this.color.setAlpha(this.alpha)
            BG.translate(this.position.x, this.position.y)
            BG.noStroke()
            BG.rotate(p.atan(this.position.y/this.position.x))
            BG.fill(this.color)
            hana(this.size)
            BG.rotate(-p.atan(this.position.y/this.position.x))
            BG.translate(-this.position.x, -this.position.y)

            
        }

    }

    function noiseCircle(x, y, r) {
        let x_=[]
        let y_=[]
	BG.push();
	BG.translate(x, y);
    // p.stroke(p.random(colors))
    	BG.rotate(p.random(360));
		let rBase = r; //半径
		let xInit = x;
		let yInit = y
		let rDiv = p.width * 0.02;
		//curveTightness(t);
		BG.beginShape();
		for (let j = 0, points = 36, radian=0; j < points + 3; radian = j++/points) {
			let pN = 100 * p.noise((1 + p.cos(p.TWO_PI * radian)), 100 * (1 + p.sin(p.TWO_PI * radian)))
			let pR = (rBase) + rDiv * p.noise(pN);
			x_[j] = xInit + pR * p.cos(p.TWO_PI * radian);
			y_[j] = yInit + pR * p.sin(p.TWO_PI * radian); 
            console.log(x_[j])
            let l=BG.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(xInit, yInit, x_[j], y_[j]);
        let c1=p.random(colors);
        let c2;
        do{
            c2=p.random(colors)
        }while(c1==c2)
		grad.addColorStop(0, c1);
		grad.addColorStop(1, c2);
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
        BG.curveVertex(x_[j], y_[j]);
		}
		BG.endShape(p.CLOSE);
	

	BG.pop();

}

     
    const hana=(size)=>{
        noiseCircle(0,0,size)
        nakami(size)


    }
   
    const nakami=(size)=>{
        BG.strokeWeight(1)
        let x_1,y_1
        for(let i=1; i<=5; i++){
        let k=p.TWO_PI/5
        x_1=p.cos(k*(i))*size
        y_1=p.sin(k*(i))*size
        let rad=p.atan(y_1/x_1)
        BG.erase()
            // let x=size*p.cos(p.PI/5)
            // let y=size*p.sin(p.PI/5)
            // p.line(0,0,x,y)
        // p.ellipse(x_1,y_1,5,5)
        BG.arc(x_1,y_1,size*2, size*2,k*i-0.08+p.PI,k*i+0.08+p.PI)
        BG.noErase()
        }
        
    }

        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '07', 'png');
}
}