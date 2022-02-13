import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors = ["#005f73","#0a9396","#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226"];
    let rain=[]
    let Cloud
    let no
    let c;
    p.setup=()=>{
        c=p.createCanvas(600,600)
        p.noLoop();
	    p.background("#EEEEEE");
        let z=p.int(p.random(0,2))
        let x=100+(z*50)
        let y=100
        Cloud=new cloud({x:x,y:y},5,4,z)
        for(let j =0; j<=5+z; j++){
             for (let i =0; i<p.random(3,8); i++){
                rain.push(new Rain({x:(x-z*50)+j*50,y:i*50+y+25*6}))
            }
            }
    // for (let n=0; n<5; n++){
    //     wave.push(new Wave({x:p.random(0,150),y:p.random(0,150)}))
    // }

	no = p.createGraphics(p.width, p.height);
    no.background("#EEEEEE")
	// no.noStroke();
	// let col = p.color("#EEEEEE");
	// col.setAlpha(100);
	// no.fill(col);
	p.blendMode(p.BURN);

    }

    p.draw=()=>{
    
    for (let i=0; i<rain.length; i++){
        rain[i].makedrop()
    }
    Cloud.makecloud()
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
    let R = 20;
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
            let s=50
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
            if(b==true){
            no.arc(x, y, s, s, p.PI, p.TWO_PI);
            }else{
                no.arc(x, y, s, s, 0, p.PI);
            }
            no.noFill()
            no.strokeWeight(1)
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
            no.strokeWeight(1)
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
      p.saveCanvas(c, 'myCanvas', 'jpg');
}
}