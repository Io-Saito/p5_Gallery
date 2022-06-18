
import * as p5 from 'p5';

export const sketch = (p: p5) => {

// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
    x:number;
    y:number;
    r:number;
    xSpeed:number;
    ySpeed:number;
    rot:number;
    filltype:number;
  constructor(){
    this.x = p.random(0,p.width);
    this.y = p.random(0,p.height);
    this.r = p.random(8,15);
    this.xSpeed = p.random(-2,2);
    this.ySpeed = p.random(-1,1.5);
    this.rot=p.random(360)
    this.filltype=p.random(0,1)
  }

// creation of a particle.
  createParticle() {
    p.translate(this.x,this.y)
    p.rotate(this.rot)
	//stroke(random(colors));
    if(this.filltype>0.5){
        p.stroke('#dfdfdf')
        p.strokeWeight(this.r*0.1)
        p.noFill()
    }else{
        p.fill('#eeeeee')
        p.noStroke()
    }
    p.rect(0,0,this.r,this.r);
    p.rotate(-this.rot)
    p.translate(-this.x,-this.y)
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > p.width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > p.height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = p.dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        p.strokeWeight(1)
        p.stroke('#eeeeee');
        p.line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

// an array to add multiple particles
let particles = [];

p.setup=()=>{
  p.createCanvas(p.windowWidth, p.windowHeight);
  for(let i = 0;i<p.width/10;i++){
    particles.push(new Particle());
  }
}

p.draw=()=>{
  p.background('#f4f4f4');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}
}