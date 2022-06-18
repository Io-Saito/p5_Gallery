import * as p5 from 'p5';

export const sketch = (p: p5) => {
let colors = ["#c9184a","#ff4d6d","#ff758f","#ff8fa3","#d0253c"];
let c;

p.setup=()=>{
	c=p.createCanvas(1074, 1074);
    p.background("#F3F2EE");
    p.angleMode(p.DEGREES)
    p.blendMode(p.BURN)
    p.noLoop()
    circlePacking();
}

p.draw=()=>{
    	
}

function circlePacking() {
    let cx = p.width / 2;
    let cy = p.height / 2;
    let points = [];
    let count = p.int(p.random(10,50));
    // for (let t = 0; t < 90; t += 0.5) {
    //     let x= p.width*p.cos(t)
    //    let y=p.height-p.height*p.sin(t)
    //     let s = p.random(40, 80);
    //     let add = true;
    //     for (let j = 0; j < points.length; j++) {
    //         let p_ = points[j];
    //         if (p.dist(x, y, p_.x, p_.y) < (s + p_.z) * 0.5) {
    //             add = false;
    //             break;
    //         }
    //     }
    //     if (add) points.push(p.createVector(x, y, s));
    
    // }
    for (let t = 0; t < 360; t += 0.5) {
        let x= p.width*0.6/2+16*p.pow(p.sin(t),3)*p.width*0.03+150
       let y=p.height*0.6/2+-1*(13*p.cos(t)-5*p.cos(2*t)-2*p.cos(3*t)-p.cos(4*t))*p.height*0.03+100
        let s = p.random(40, 100);
        let add = true;
        for (let j = 0; j < points.length; j++) {
            let p_ = points[j];
            if (p.dist(x, y, p_.x, p_.y) < (s + p_.z) * 0.5) {
                add = false;
                break;
            }
        }
        if (add) points.push(p.createVector(x, y, s));
    
    }
    for (let i = 0; i < points.length; i++) {
		let p_ = points[i];
		p.shuffle(colors, true);
		// circle(p.x, p.y, p.z);
		p.push();
		// translate();
		p.noStroke();
		
		myCircle(p_.x, p_.y, p_.z , p_.z);
		

		
		p.pop();
    }


function distort(x, y) {
    let p_ = p.createVector(x, y);
    let scl = 0.002;
    let ang = p.noise(p_.x * scl, p_.y * scl) * 60;
    let off = p.noise(p_.x * scl, p_.y * scl) * 140;
    p_.x += p.cos(ang) * off;
    p_.y += p.sin(ang) * off;
	return p_;
}

function myCircle(x, y, w, h) {
    let x_=[]
    let y_=[]

    p.beginShape();
    let c1=p.random(colors)
    let c2=p.random(colors)
    for (let t = 0; t < 360; t += 1) {
        x_[t]=x+16*p.pow(p.sin(t),3)*w*0.03
        y_[t]=y+-1*(13*p.cos(t)-5*p.cos(2*t)-2*p.cos(3*t)-p.cos(4*t))*h*0.03
        let p_ = distort(x_[t], y_[t]);

        let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createRadialGradient(x, y, 10,x_[t], y_[t],100);
		grad.addColorStop(0, c1);
		grad.addColorStop(1,c2);
		l.shadowColor = p.random(colors);
		l.fillStyle = grad;
        p.curveVertex(p_.x, p_.y);
    }

    p.endShape();
}

}
        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, '02', 'png');
}
}