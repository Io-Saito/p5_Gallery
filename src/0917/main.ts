import * as p5 from 'p5';


export const sketch = (p: p5) => {
	let colors= ["#91b2dd", "#91d3ee", "#f4c0cd", "#f78fa2", "#f1e076"];
    let shapes =[];
p.setup=()=> {
	p.createCanvas(800, 800);
	p.imageMode(p.CENTER);
	p.colorMode(p.RGB);
    p.noLoop()
    for (let i = 0; i <100; i++) {
            let x = p.random(p.width);
            let y = p.random(p.height);
            let dia = p.noise(x * 0.01, y * 0.01) * 80+15; 
            // if (flowers.every((c)=>p.dist(x,y,c.position.x,c.position.y)>(dia + c.size)*0.3)) {
            shapes.push(new Shape_({x:x,y:y},dia));
    // }
}
};

p.draw=()=>{
    for(let i = 0;i<shapes.length;i++) {
        shapes[i].create(shapes[i].size,shapes[i].color,shapes[i].shapetype,shapes[i].fill,shapes[i].place);
    }

}

interface Place{
    x: number;
    y:number;
}


class Shape_{
    place:Place;
    color:string;
    size:number;
    shapetype:number;
    fill:number;

    constructor(Place:Place,Size:number){
        this.place=Place;
        this.size=Size;
        this.color=p.random(colors);
        this.shapetype=p.int(p.random(0,4.5))
        this.fill=p.int(p.random(0,4.5))
    }

    create (size,color,shapetype,fill,place){
        p.push();
	    p.translate(p.width/2, p.height/2);
        let g = p.createGraphics(p.width /1.5, p.height /1.5);
        g.background("#FFFFFF");
		g.noStroke();
		g.fill(color);
        switch(fill){
            case 0:stripeTexture(g.width, g);
            case 1:noTexture(g.width, g);
            case 2:dotsTexture(g.width, g);
            default:stripeTexture(g.width, g);
        };
        g.erase();
		g.beginShape();
		g.vertex(0, 0);
		g.vertex(g.width, 0);
		g.vertex(g.width, g.height);
		g.vertex(0, g.height);
        switch(shapetype){
            case 0:TriangleMask(size, g);
            case 1:CircleMask(size, g);
            case 2:CircleMask(size, g);
            default :SquairMask(size, g);
        };
                g.endShape();
		// g.translate(-g.width/2,-g.height/2)
		// 
		g.translate(p.random(0,g.width),p.random(0,g.height))
		p.image(g, place.x, place.y);
        p.pop();
    }
}


const SquairMask=(s,g)=>{

    g.beginContour();
    	g.vertex(0,0 );
		g.vertex(0,s);
		g.vertex(s, s);
		g.vertex(s,0);
		g.vertex(0, 0);
        g.endContour();


}

const TriangleMask=(s,g)=>{
    g.beginContour();
    g.vertex(0,0);
    g.vertex(0,s);
    g.vertex(s/2, s*p.sqrt(3)/2);
    g.vertex(0, 0);
    g.endContour();

}

const CircleMask=(s,g)=>{
    g.beginContour();
    for (let a = 0; a < p.TAU; a += p.TAU / 360) {
	g.vertex(s/2 * p.cos(a)+g.width/2, s/2 * p.sin(a)+g.height/2);
		}
    g.endContour();

}
const stripeTexture=(s, g)=> {
	let seg = p.int(p.random(20, 200));
	let ss = s / seg;
	let rnd = p.random();
	for (let i = 0; i < seg; i++) {
		for (let j = 0; j < seg; j++) {
			let x = i * ss;
			let y = j * ss;
			let toggle = i % 2;
			if (rnd < 0.5) toggle = j % 2;
			if (toggle == 0) {
				g.rect(x, y, ss, ss);
			}
		}
	}
}

const dotsTexture=(s, g) =>{
	let seg = p.int(p.random(60, 120));
	let ss = s / seg;
	for (let i = 0; i < seg; i++) {
		for (let j = 0; j < seg; j++) {
			let x = i * ss;
			let y = j * ss;
			if ((i + j) % 2 == 0) {
				g.circle(x, y, ss * 0.9);
			}
		}
	}
}

const noTexture=(s,g)=>{
	g.rect(0,0,s,s)
}


}