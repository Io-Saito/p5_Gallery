import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors = ["#005f73","#0a9396","#4361ee","#4895ef","#4cc9f0","#002962","#362647","#4b284f"];
    let rain=[]
    let Cloud,Cloud2
    let no
    let c;
    p.setup=()=>{
        c=p.createCanvas(1074,1074)
        p.noLoop();
	    p.background("#F3F2EE");
        let z=p.int(p.random(0,2))
        let x=-150
        let y=50
        Cloud=new cloud({x:x,y:y},5,4,z)
        let z2=p.int(p.random(0,2))
        let x2=980
        let y2=300
        Cloud2=new cloud({x:x2,y:y2},5,4,z2)
        for(let j =0; j<=5+z; j++){
             for (let i =0; i<p.random(3,8); i++){
                rain.push(new Rain({x:(x-z*100)+j*80,y:i*100+y+40*6}))
            }
            }
        for(let j =0; j<=5+z2; j++){
             for (let i =0; i<p.random(3,8); i++){
                rain.push(new Rain({x:(x2-z2*100)+j*80,y:i*100+y2+40*6}))
            }
            }
	no = p.createGraphics(p.width, p.height);
    no.background("#F3F2EE")
	p.blendMode(p.BURN);

    }

    p.draw=()=>{
    
    for (let i=0; i<rain.length; i++){
        rain[i].makedrop()
    }
    Cloud.makecloud()
    Cloud2.makecloud()
    p.image(no, 0, 0);
    }

    interface Place{
        x:number;
        y:number;
    }

    class Rain{
        pos:Place;

        constructor(pos:Place){
            this.pos=pos
        }
    makedrop=()=>{
	p.push();
	p.translate(this.pos.x, this.pos.y);
    p.rotate(p.radians(-90))

	let x = [];
	let y = [];
	// p.stroke(p.random(colors))
    p.noStroke()
	p.beginShape();
    let R = 30;
    let A = 5;
    for (let t = 0; t < p.TWO_PI; t += 0.1) {
    let r = 1 / (A * p.sin(t/2)+1);
    x[t]=R * r * p.cos(t)
    y[t]=R * r * p.sin(t)
    let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(0, 0, x[t], y[t]);
		grad.addColorStop(0, p.random(colors));
		grad.addColorStop(1, p.random(colors));
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
		p.vertex(x[t], y[t]);

  }
	p.endShape();
        p.rotate(90)
    p.translate(-this.pos.x, -this.pos.y);

	p.pop();
}
}
    class cloud{
        position:Place
        col:number
        row:number
        z:number

        constructor(pos:Place,col:number,row:number,z){
            this.position=pos
            this.col=col
            this.row=row
            this.z=z

        }

        makecloud=()=>{
            //各カラムの場所を決める
            // p.fill("#FFFFFF")
            let s=80
            let harf=p.int(this.row/2)
            for (let r=harf; 0<=r; r--){
                for (let c=0; c<=(this.col-r); c++){
                    let x_=this.position.x-(s/2*r)
                    let y_=this.position.y
                    let x=x_+((this.col-c)*s)
                    let y=y_+((harf-r)*s/2)
                    if (r!=harf && r!=0){
                        this.doushinen(x,y,s,true)
                    }
                    if (r==harf && p.random(0,1)>0.5){
                        this.doushinen(x,y,s,true)
                    }
                    if (r==0){
                        this.guru(x,y,s,true)
                    }
                }
            }
            for (let r=this.row; harf<=r; r--){
                for (let c=this.z; c<=(this.col+this.z-(r-harf)); c++){
                    let x_=this.position.x-(s/2*r)
                    let y_=this.position.y
                    let x=x_+(this.col-c+1/2)*s
                    let y=y_+r*s/2
                    if (r!=this.row && r!=harf){
                    this.doushinen(x,y,s,false)
                    }
                    if (r==this.row&& p.random(0,1)>0.5){
                    this.doushinen(x,y,s,true)
                    }
                    if (r==harf){
                        this.guru(x,y,s,false)
                    }
                }
            }
        }


        guru=(x,y,s,b:boolean)=>{
            //ぐるぐる
            no.fill("#FFFFFF")
            no.stroke("#353652")
            p.strokeWeight(2)
            if(b==true){
            no.arc(x, y, s, s, p.PI, p.TWO_PI);
            }else{
                no.arc(x, y, s, s, 0, p.PI);
            }
            no.noFill()
            no.strokeWeight(2)
            for (let i=10; i<s+10; i+=10){
            if(b==true){
            no.arc(x, y, i, i, p.PI, p.TWO_PI);
            }else{
                no.arc(x, y, i, i, 0, p.PI);
            }
        }
        }

        doushinen=(x,y,s,b:boolean)=>{
            //ぐるぐる
            no.fill("#FFFFFF")
            if(b==true){
            no.ellipse(x, y, s, s);
            }else{
            no.ellipse(x, y, s, s);
            }
            no.stroke("#353652")
            no.noFill()
            no.strokeWeight(2)
            // p.translate(x,y)
            // p.rotate(p.PI*5/3)
            for (let i=10; i<s+10; i+=10){
            if(b==true){
            no.ellipse(x, y, i, i);
            }else{
                no.ellipse(x, y, i, i);
            }

        }
    }
    }
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '06', 'png');
}
}