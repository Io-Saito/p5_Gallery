import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let colors = ["#a90001", "#444444", "#d9d9d9", "#acacac","#000000"];
    let canvas;
    let strings =["墜ちてきた月に潰された誰かのスクラップを","一瞥もせずに通り過ぎる錆びついた生命体","","",
"あるはずのない感情に突き刺ささった花びらは","アルコールで忘れた","","",
"生臭い空気の中",
"いつか墜ちる月を待つ",
"パスワードは","","",
"『ワタシハシアワセデシタ』"]
let g;
let g2;

    p.setup=()=>{
        canvas=p.createCanvas(600,600);
        g=p.createGraphics(600,600);
        g2=p.createGraphics(600,600);
        p.background("#FFFFFF")
        p.noLoop()
        p.angleMode("degrees")
        p.textFont("Sawarabi Mincho");
        g2.textFont("Sawarabi Mincho");
        g.textAlign(p.CENTER)
        g2.textFont("Sawarabi Mincho");

    }
    
    p.draw=()=>{
        p.background("#000000")
        g2.fill("#FFFFFF")
        g2.rect(0,0,p.width,p.height)
        for (let i = 0; i < 5; i++){
            wave()
        }
        console.log(strings)
        //migishita 
        g2.fill("#000000")
        g2.stroke("#000000")
        let x_r=p.random(g.width/2,g.width)
        let y_r=p.random(g.height/2,g.height)
        g2.circle(x_r,y_r,450)

        hana(x_r,y_r,1,200)
        g2.fill("#333333")
        g2.stroke("#333333")
        let x_l=p.random(0,p.width/4)
        let y_l=p.random(0,p.height/4)
        g2.circle(x_l,y_l,200)
        p.fill("#FFFFFF")
        p.circle(x_r,y_r,450)
        p.circle(x_l,y_l,200)
        hana(x_l,y_l,0.5,80)
        for (let s=0; s<=strings.length; s++){
        let string=strings[s]
        g2.erase()
        g2.textSize(15);
        let y=p.random(80,150)
        p.fill("#000000")
        // p.text(string, 530-(p.width)*s/15,y);
        g2.erase()
        g2.text(string,p.random(30,80), 30+(p.width-120)*s/13);
        g2.noErase()
        }
        p.image(g2,0,0)
    }

    const wave=()=> {
	let cx = p.random(p.width);
	let cy = p.random(p.height);
	let z = p.random(100);
	let strkColor = p.color("#a90001");
	let alpha = p.map(z, 0, 100, 0, 127);
	p.noiseSeed(p.random(100));

	for (let i = 0; i < p.width * 0.4; i += p.random(1)) {
		for (let j = 0; j < 10; j += p.random(1)) {
			strkColor.setAlpha(alpha);
			g2.strokeWeight(p.random(1));
			g2.stroke(strkColor);

			let x = cx + i * p.cos(p.noise(j / 100, i / 1000) * 360 * 4);
			let y = cy + i * p.sin(p.noise(j / 100, i / 1000) * 360 * 2);
			g2.point(x, y);
			//vertex(x, y);
		}
	}
}

    const hana=(cx, cy,scale,radius)=> {
        let count = p.random(20,40);
        for (let i = 0; i < count; i++){
            let x=p.randomGaussian(cx,120)
            let y=p.randomGaussian(cy,50)
            let a=g2.random(0,360)
            let cc=g2.color("#a90001")
            cc.setAlpha(p.random(100,300))
            g2.fill(cc)
            g2.noStroke()
            g2.arc(x,y+radius,p.random(20,40)*scale,p.random(20,40)*scale,a,a+g2.random(0,360),p.CHORD)
        }
}


        p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(canvas, 'myCanvas', 'jpg');
}
}