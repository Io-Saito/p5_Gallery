import * as p5 from 'p5';

export const sketch = (p: p5) => {
let flowers = [];
let canvas;
let BG;
let layers=[]
let  colors = ["#ee9b00","#ca6702", "#bb3e03", "#ae2012", "#9b2226","#800E12"];
let shadBColor = ["#433e34", "#1e2125", "#2d2719"];
let shadColor = ["#54A6C7", "#A2CeC7", "#3C4F66", "#fdfdfd", "#EDC05C"];
//#DB5724,#ECC898,#EDC05C,
//#CEE3D7,#A2CEC7,#83af9b,
//#375128,#CBDBE3,#54A6C7,
//#3C4F66,#E9C6C2,#C2C6D5,
//#B7BEE4,#F3F2EE,#fc9d9a,#c8c8a9

    p.setup=()=>{
        canvas=p.createCanvas(600, 600);
        p.background("#F3F2EE");
        p.angleMode(p.DEGREES)
        p.noLoop();
        p.blendMode(p.BURN)
       BG=p.createGraphics(600,600);
       BG.blendMode(p.BURN)

			
}

    p.draw=()=>{
		tree()
        for(let i=0; i<layers.length; i++){
        p.image(layers[i],0,0)
        }

    }

    function tree(){
        // p.translate(0,p.height/2)
        
    //     p.strokeWeight(30)
    //         shadow(shadBColor)
    //     for(let j=0; j<3; j++){
    //         p.beginShape()
    //            let tan=p.random(-0.1,0.1)
    //            let start=p.random(-30,30)
    //            p.stroke(p.random(shadBColor))
    //     for (let i=-p.height/2; i<p.height/2; i++){
    //         let x=450+start+i*tan+p.noise(i*0.01)*10
    //         p.vertex(x,i)
    //     }
    //      p.endShape()
    // }
            rose(300,300,15)
            // rose(480,p.randomGaussian(-40,100),6)
            // rose(460,p.randomGaussian(-20,100),6)

    }

    function rose(x, y, size) {

	p.push();

	// p.rotate(p.random(360));

	let num = p.int(p.random(4, 11));
	let angle = 360 / num;
	for (let count = 5; count >= 0; count--) {
        let layer=p.createGraphics(p.width,p.height)
        layer.translate(x, y);
		num = p.int(p.random(6, 11));
		angle = 360 / num;
		for (let i = 0; i < num; i++) {
			layer.rotate(angle);
            let col=p.color(p.random(colors))
            col.setAlpha(count*50)
			layer.fill(col);
			shadow(layer,col);
            layer.noStroke()
			//stroke(random(shadBColor));
            layer.erase()
			layer.circle(0, -size / 2 * (count), size * count);
            layer.noErase()
            layer.circle(0, -size / 2 * (count), size * count);
		}
        layers.push(layer)
	}
    let layer=p.createGraphics(p.width,p.height)
    layer.translate(x, y);
    layer.noStroke()
	layer.fill(p.random(colors));
	layer.circle(0, 0, size);
    layers.push(layer)

	p.pop();
}



function shadow(layer,col) {
    let l=layer.drawingContext as CanvasRenderingContext2D;
	l.shadowOffsetX = p.random(-5, 5);
	l.shadowOffsetY = p.random(-5, 5);
	l.shadowBlur = p.random(10);
	p.noStroke();
	l.shadowColor = p.random([col]);
}

//         p.keyPressed=()=> {

//       console.log("pressed")
//       p.saveCanvas(canvas, 'myCanvas', 'jpg');
// }

}
