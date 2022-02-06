import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors= ["#1199d5",  "#45b9c0", "#fbc83a"];
    let tCount = 200;
    let trangX = [];
    let trangY = [];
    let c;
    let fish=[];



function setPlaceAndSize(_num,_w){
  let circles = [];
  
//   for (let i = 0; i < _num; i++) {
for (let t=0; t<p.TWO_PI; t+=0.2){
    let x =_w*p.cos(t)-(_w*(p.sin(t)**2))/p.sqrt(2)
    let y_lim = _w*p.cos(t)*p.sin(t)
    for (let y_=0; y_<(y_lim/(_w*2))*20; y_++){
    let y=p.random(-1,1)*y_lim
    let z = p.random(3, 8); // z軸の値を円の大きさとして使用
    console.log(x,y,z)
    // if (circles.every((c) => p.dist(x, y, c.x, c.y) > (z + c.z) * 0.5)) {
    circles.push({X:x, Y:y, R:z});
    circles.push({X:x,T:y_lim,R:z})
    //  }
    }
    }
//   }
  console.log(circles);
  return circles;
}

    p.setup=()=>{
        c=p.createCanvas(750,750);
        p.colorMode("rgb")
        p.angleMode("radians");
        p.blendMode(p.DARKEST)
        p.noLoop();

        for (let t = 0; t<=p.int(p.random(3,6)); t++){
        let flowers=[];
        let P=setPlaceAndSize(50,80)
        for (let i=0; i<P.length; i++){
        flowers.push(new flower({x:P[i].X,y:P[i].Y},P[i].R))
        }
        fish.push(flowers)
    }

	for (let i = 0; i < tCount; i++) {
		trangX[i] = p.random(-200, p.width + 200);
		trangY[i] = p.random(-200, p.height + 200);
	}
    }
    p.draw=()=>{
        p.background(255,255,255);

for (let i = 0; i < tCount - 3; i++) {
		let c = p.color(p.random(colors));
		c.setAlpha(3);
		p.noStroke();
		p.fill(c);
		p.triangle(trangX[i], trangX[i + 1], trangX[i + 2], trangY[i], trangY[i + 1], trangY[i + 2]);
	}
    for(let i = 0;i<fish.length;i++) {
        let x =p.random(0,p.width);
        let y =p.random(0,p.height);
        p.translate(x,y)
        fish[i].forEach(x=>x.makeflower());
        p.translate(-x,-y)
    }


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
            this.color=p.color(colors[p.int(p.random(0,3))])
            this.alpha=350
            this.position=x
            this.size=dia
        }

        makeflower=()=>{
            this.color.setAlpha(this.alpha)
            p.stroke(this.color)
            p.translate(this.position.x, this.position.y)
            // p.noStroke()
            if(p.int(p.random(0,100))%3==0){
                p.fill(this.color)
            tenten(this.size,p.int(p.random(15,40)));
            }else if(p.int(p.random(0,100))%3==1){
            doushinen(this.size,p.int(p.random(15,40)))
            }else{
                uni(this.size,p.int(p.random(15,40)))
            };
            p.translate(-this.position.x, -this.position.y)
        }

    }

    const uni=(size,num)=>{
        p.strokeWeight(1)
        for (let i=0; i<num; i++){
            let x=size*p.cos(2*p.PI*i/num)*1.5
            let y=size*p.sin(2*p.PI*i/num)*1.5
            p.line(0,0,x,y)
        }

    }

    const doushinen=(size,num)=>{
        p.strokeWeight(1)
        p.noFill()
        for (let i=0; i<num; i++){
            if (i%3==1){
            p.ellipse(0,0,size*3.5*i/num)
            }
        }

    }

    const tenten=(size,num)=>{
        for (let i=0; i<num; i++){
            p.rotate(2*p.PI*i/num)
            p.ellipse(size,size,size*1/20,size*1/10)
            p.rotate(-2*p.PI*i/num)
    }
    }

//     p.keyPressed=()=> {

//       console.log("pressed")
//       p.saveCanvas(c, 'myCanvas', 'jpg');
// }
}


