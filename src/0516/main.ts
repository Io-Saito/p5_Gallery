export const sketch = (p: p5) => {
let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];
let c;
let fish=[];
let flowers = [];
let img;


p.preload=()=>{
  img = p.loadImage("assets/14.svg");    //画像の読み込み
}

p.setup=()=> {
	c=p.createCanvas(1074, 1074);
	p.noLoop();
	p.background("#F3F2EE");
for (let j = 0; j < 40; j+=1) {
            
            let x = p.random(0,1074)
            let y = p.sin(p.PI*x/p.width*3)*40+500
            let dy=p.cos(p.PI*x/p.width*3)* 100
            console.log(p.atan(dy/x))
		let w = p.random(4, 7.5);
            let x_scale =w
            let y_scale = 3
            fish.push(new Fish({x:x,y:y+150*p.random(1.5,3.5)+p.noise(x*0.5)*100},{x:x_scale,y:y_scale},p.atan(dy/x)))
            
            }
    for (let i = 0; i < 10; i++) {
            let x = p.random(0,1074)
            let y = p.random(0,1074)
            let dia = p.noise(x * 0.01, y * 0.01) * 80 
flowers.push(new flower({x:x,y:y},dia));

            
}
    // for (let n=0; n<5; n++){
    //     wave.push(new Wave({x:p.random(0,150),y:p.random(0,150)}))
    // }

	
	p.blendMode(p.BURN);
}

p.draw=()=> {
    for(let i = 0;i<fish.length;i++) {
            fish[i].makefish();
        } 
    for(let i = 0;i<flowers.length;i++) {
            flowers[i].makeflower();
        } 
    p.image(img,p.width/2-1074*0.8*0.5,p.height/2-1827*1074/7428*0.8*0.5-100,1074*0.8,1827*1074/7428*0.8)
}

    class flower{
        color:any;
        position:Place;
        size:number
        alpha:number;

        constructor(x:Place,dia:number){
            this.color=p.color(p.random(colors))
            this.alpha=350
            this.position=x
            this.size=dia

        }

        makeflower=()=>{
            this.color.setAlpha(this.alpha)
            p.translate(this.position.x, this.position.y)
            p.noStroke()
            p.fill(this.color)
            tenten(this.size,p.int(p.random(15,40)));
            
            p.translate(-this.position.x, -this.position.y)
        }

    }

    const tenten=(size,num)=>{
        for (let i=0; i<num; i++){
            p.rotate(2*p.PI*i/num)
            p.ellipse(size,size,size*1/10,size*1/5)
            p.rotate(-2*p.PI*i/num)
    }
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
	p.push();
	p.translate(this.pos.x, this.pos.y);
    p.rotate(this.arc)

	let x = [];
	let y = [];
	// p.stroke(p.random(colors))
    p.noStroke()
	p.beginShape();
	for (let i=0; i<p.TWO_PI; i+=0.1) {

		x[i] = 10*(p.cos(i)-p.sin(i)**2/p.sqrt(2))*this.scale.x
		y[i] = 10*(p.cos(i)*p.sin(i))*this.scale.y
        let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(0, 0, x[i], y[i]);
		grad.addColorStop(0, p.random(colors));
		grad.addColorStop(1, p.random(colors));
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
		p.vertex(x[i], y[i]);
	}
	p.endShape();
        p.rotate(-this.arc)
    p.translate(-this.pos.x, -this.pos.y);

	p.pop();
}
}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '08', 'png');
}
}
