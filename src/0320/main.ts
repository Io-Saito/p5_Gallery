import * as p5 from 'p5';

export const sketch = (p: p5) => {
let count = 3;
let color=[["#fcde35","#feffdc","#ffea72"],
            ["#fcac06","#fdffde","#fec432"],
            ["#a1d567","#FEFFDB","#a1d567"],
            ["#ffdf32","#fdffde","#f79d91"]]

let c;
let bg;

p.setup=()=> {
    p.angleMode(p.DEGREES);
    c=p.createCanvas(750, 750);
    p.noLoop()
    p.textFont("Sawarabi Mincho");
    p.textAlign(p.CENTER, p.CENTER);
    p.blendMode(p.BURN)
    bg=p.createGraphics(p.width,p.height)
    bg.blendMode(p.SCREEN)
// p=p.createGraphics(p.width, p.height) //背景
//     pg2=p.createGraphics(p.width-10, p.height-10) //文字
    }
p.draw=()=>{
p.background("#dddddd")
  let cells = 5;//格子の数
  let offset=10
  let w = (p.width-offset*2) / cells;
  let h = (p.height - offset * 2) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset+i * w;
      let y = offset+j * h;
      let cx = x + w / 2;//格子の中心座標
      let cy = y + h / 2;
      let stroke_num = 1.5;//図形の線の太さ
      let d = w;//d = w - stroke_num
      let rotate_num = p.int(p.random(5));
      rotate_num = rotate_num * 90;
      let shape_num = p.int(p.random(6));
      let isLemon=p.int(p.random(100))
      let color_list=p.random(color)

    p.push();
    p.translate(cx, cy);
    p.rotate(rotate_num);
    
    switch(shape_num){
        case 0: {
            Lemon(0, 0, d,0,360,color_list,isLemon);
            break;
        }
        case 1: {
            Lemon(0, -d/2, d, 0, 180,color_list,isLemon);
            Lemon(0, d/2, d,  180, 360,color_list,isLemon);
            break;
        }
        case 2: {
            // Lemon(-d / 2, -d / 2, d * p.sqrt(2), 0, 90,color_list);
            // Lemon(d / 2, d / 2, d * p.sqrt(2),180, 270,color_list);
            break;
        }
        case 3: {
            Lemon(-d/2,-d/2,2*d,0,90,color_list,isLemon);
            break;
        }
        case 4: {
            Lemon(0, -d/2, d, 0, 180,color_list,isLemon);
            break;
        }
        case 5:{
            break
        }
    }
      p.pop();
    }
  }
 p.image(bg,0,0)

}
    function Kawa(x,y,r,angle_start,angle_end,c_list,isLemon){
        
    if (isLemon%3!=0){
    p.noStroke()
    p.fill(c_list[0])
    p.arc(x,y,r,r,angle_start,angle_end)
    p.erase()
    p.arc(x,y,r*0.85,r*0.85,angle_start,angle_end)
    p.noErase()
    p.fill("#dddddd")
    p.arc(x,y,r*0.85,r*0.85,angle_start,angle_end)
    }else{
        p.noStroke()
        p.fill(c_list[2])
        p.arc(x,y,r,r,angle_start,angle_end)
        // p.fill(c_list[0])
        // p.arc(x,y,r,r,angle_start,angle_end)
        }
}

    function UsuKawa(x,y,r,angle_start,angle_end,c_list,isLemon){
    p.noStroke()
    p.fill(c_list[1])
    if (isLemon%3!=0){
    p.arc(x,y,r*0.85,r*0.85,angle_start,angle_end)
    p.erase()
    p.arc(x,y,r*0.75,r*0.75,angle_start,angle_end)
    p.noErase()
    p.fill("#dddddd")
    p.arc(x,y,r*0.75,r*0.75,angle_start,angle_end)
    }
}

function Nakami(x,y,r,angle_start,angle_end,c_list,isLemon){
    p.noStroke()
    p.fill(c_list[2])
    if (isLemon%3!=0){
    p.arc(x,y,r*0.75,r*0.75,angle_start,angle_end)
    }

}
    function Lemon(x,y,r,angle_start,angle_end,c_list,isLemon){
        // 
    
    let l2=p.drawingContext as CanvasRenderingContext2D;
	l2.shadowColor =c_list[2];
	l2.shadowOffsetX = 8;
	l2.shadowOffsetY = 8;
	l2.shadowBlur = 2;
    Kawa(x,y,r,angle_start,angle_end,c_list,isLemon)
    let l3=p.drawingContext as CanvasRenderingContext2D;
	l3.shadowOffsetX = 0;
	l3.shadowOffsetY = 0;
	l3.shadowBlur = 0;
    UsuKawa(x,y,r,angle_start,angle_end,c_list,isLemon)
    Nakami(x,y,r,angle_start,angle_end,c_list,isLemon)
    }


// p.keyPressed=()=> {

//       console.log("pressed")
//       p.saveCanvas(c, 'myCanvas', 'jpg');
// }

}