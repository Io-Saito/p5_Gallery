import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let color_list =[ "#86ABD3", "#8ECBD5", "#E7D66D","#E78089","#EBB8C4"];
	let chara = ["△", "×", "○", "□","●","▲","■"];
	let pg;
	let canvas

    p.setup=()=>{
p.angleMode(p.DEGREES);
    canvas=p.createCanvas(600, 600);
    p.noLoop()
	p.blendMode(p.BURN)
	p.background("#F6F6F6");
	pg=p.createGraphics(600,600);
	  	for (let i = 0; i < 400; i++) {
		pg.rotate(p.random(p.HALF_PI))
		pg.textSize(p.randomGaussian(12, 5))
		pg.fill("#CDCFCF");
		pg.text(p.random(chara), p.randomGaussian(p.width / 2, p.width * 0.3), p.randomGaussian(p.height / 2, p.height * 0.3));
	}
	pg.blendMode(p.LIGHTEST)
}

    p.draw=()=>{

		let cells = 5;//格子の数
  let offset=10
  let w = (p.width-offset*2) / cells;
  let h = (p.height - offset * 2) / cells;
for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
		let shape_1;
		for (let k = 0; k < 3; k++){
      let x = offset+i * w;
      let y = offset+j * h;
      let cx = x + w / 2;//格子の中心座標
      let cy = y + h / 2;
      let stroke_num = 1.5;//図形の線の太さ
      let d = w;//d = w - stroke_num
      let rotate_num = p.int(p.random(5));
      rotate_num = rotate_num * 90;
      let shape_num = p.int(p.random(5));
	  if(k>0){ do{
		  shape_num = p.int(p.random(5));
	  }while(shape_1 ==shape_num)
	}


    p.push();
    p.translate(cx, cy);
    p.rotate(rotate_num);

    switch(shape_num){
        case 0: {
            Lemon(0, 0, d,0,360);
            break;
        }
        case 1: {
            Lemon(0, -d/2, d, 0, 180);
            Lemon(0, d/2, d,  180, 360);
            break;
        }
        case 2: {
            // Lemon(-d / 2, -d / 2, d * p.sqrt(2), 0, 90);
            // Lemon(d / 2, d / 2, d * p.sqrt(2),180, 270);
            break;
        }
        case 3: {
            Lemon(-d/2,-d/2,2*d,0,90);
            break;
        }
        case 4: {
            Lemon(0, -d/2, d, 0, 180);
            break;
        }
        case 5:{
            break
        }
    }
      p.pop();
	  shape_1=shape_num
    }
}
  }
 

	p.image(pg,0,0)
    }

	function Lemon(x,y,r,angle_start,angle_end){

	let x_ = [];
	let y_ = [];
	// p.stroke(p.random(colors))
    p.noStroke()
	let l2=p.drawingContext as CanvasRenderingContext2D;
	let c1=p.random(color_list)
	l2.shadowColor =c1;
	l2.shadowOffsetX = 8;
	l2.shadowOffsetY = 8;
	l2.shadowBlur = 8;
	p.beginShape();
	p.push()
	p.vertex(x,y)
    for (let t = angle_start; t <= angle_end;  t += 1) {
	
    x_[t]=x+  r/2 * p.cos(t)
    y_[t]= y+ r/2 * p.sin(t)
	let c2=p.random(color_list) 
	c1==c2 ? c2 : c2=p.random(color_list) 
    let l=p.drawingContext as CanvasRenderingContext2D;
		let grad = l.createLinearGradient(x, y, x_[t], y_[t]);
		grad.addColorStop(0, c1);
		grad.addColorStop(1, c2);
		l.fillStyle = grad;
		p.vertex(x_[t], y_[t]);
		
  }
	p.endShape();

	p.pop();
        
    }

	        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}

}


