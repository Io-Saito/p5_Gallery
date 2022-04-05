import * as p5 from 'p5';

export const sketch = (p: p5) => {
let count = 3;
let color=[["#fcde35","#feffdc","#ffea72"],
            ["#fcac06","#fdffde","#fec432"],
            ["#a1d567","#FEFFDB","#d9ed7c"],
            ["#ffdf32","#fdffde","#FFA478"]]

let strings=["一輪の",
"わたしの身体から","すこしずつ消えていった",
"一つ一つのレモンは",
"わたしの体を支える柱のように",
"空の上を漂う",
"それらが私の心に",
"運んでくる","静かで優しい","レモンの香り"]
let c;

p.setup=()=> {
    p.angleMode(p.DEGREES);
    c=p.createCanvas(750, 750);
    p.noLoop()
    p.textFont("Sawarabi Mincho");
    p.textAlign(p.CENTER, p.CENTER);
// p=p.createGraphics(p.width, p.height) //背景
//     pg2=p.createGraphics(p.width-10, p.height-10) //文字
    }
p.draw=()=>{
p.background("#D2F4D0")
for(let i = 0; i < 10; i++){
		let x = p.random(p.width);
		let y = p.random(p.height);
		let size = p.random(p.width / 5, p.width / 3);
		myCircle(x, y, size);
	}
	for(let i = 0; i < p.width * p.height / 100; i++){
		let x = p.random(p.width);
		let y = p.random(p.height);
		p.stroke("#FFFFFF")
		p.point(x, y);
	}
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
      let shape_num = p.int(p.random(7));
      let color_list=p.random(color)

    p.push();
    p.translate(cx, cy);
    p.rotate(rotate_num);
    p.fill("#F5E64E");
    p.strokeWeight(1.5);
    p.stroke("#F5E64E");

    switch(shape_num){
        case 0: {
            Lemon(0, 0, d,0,360,color_list);
            break;
        }
        case 1: {
            Lemon(0, -d/2, d, 0, 180,color_list);
            Lemon(0, d/2, d,  180, 360,color_list);
            break;
        }
        case 2: {
            // Lemon(-d / 2, -d / 2, d * p.sqrt(2), 0, 90,color_list);
            // Lemon(d / 2, d / 2, d * p.sqrt(2),180, 270,color_list);
            break;
        }
        case 3: {
            Lemon(-d/2,-d/2,2*d,0,90,color_list);
            break;
        }
        case 4: {
            Lemon(0, -d/2, d, 0, 180,color_list);
            break;
        }
        case 5:{
            break
        }
    }
      p.pop();
    }
  }

      for (let s=0; s<12; s++){
        let string=strings[s]
        p.fill("#FFFFFF")
        p.textSize(30);
        p.text(string, p.random(100,p.width-100),p.random(0,80)+p.height*s/12+80);
    }
}
    function Lemon(x,y,r,angle_start,angle_end,c_list){
        let isLemon=p.int(p.random(100))
        if (isLemon%3==0){
    p.noStroke()
    p.fill(c_list[0])
    p.arc(x,y,r,r,angle_start,angle_end)
    p.fill(c_list[1])
    p.arc(x,y,r*0.85,r*0.85,angle_start,angle_end)
    p.fill(c_list[2])
    p.arc(x,y,r*0.75,r*0.75,angle_start,angle_end)
    p.stroke(c_list[1])
        let len=r*0.4
        for (var i=angle_start; i<=angle_end; i+=30){
        p.line(x,y,x+len*p.cos(i),y+len*p.sin(i))
        }}else{
        p.noStroke()
        p.fill(c_list[2])
        p.arc(x,y,r,r,angle_start,angle_end)
        }
    }
function myCircle(cx, cy, radius) {
	let cs = ["#D0F7D3", "#B8ECA5", "#F7F6D9"];
	let count = radius * 2;
	let c = p.color(p.random(cs));
	for (let i = 0; i < count; i++) {
		let alpha = p.map(i, 0, count, 60, 0);
		p.noFill();
		c.setAlpha(alpha);
		p.stroke(c);
		p.ellipse(cx, cy, radius + i, radius + i);
	}
}

p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, 'myCanvas', 'jpg');
}

}