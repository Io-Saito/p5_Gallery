import * as p5 from 'p5';


export const sketch=(p: p5)=>{
  let c;

    let particles = [];
    p.setup = () => {
        c=p.createCanvas(600, 600);
        for(let i = 0;i<p.width/10;i++){
            particles.push(new Particle());
        }
        p.colorMode("hsb",360,100,100,0.4 )
    };

    p.draw=()=> {
        p.background('#ffffff');

    for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }

};

p.mouseClicked=()=>{
    for(let i = 0;i<10;i++){
            particles.push(new Particle());
        }
}


// this class describes the properties of a single particle.
class Particle {
    x:number;
    y:number;
    r:number;
    color:number;
    xSpeed:number;
    ySpeed:number;
  constructor(){
    this.x = p.random(0,p.width);
    this.y = p.random(0,p.height);
    this.r = p.random(1,8);
    this.xSpeed = p.random(-2,2);
    this.ySpeed = p.random(-1,1.5);
    this.color=p.random(0,360)
  }

// creation of a particle.
  createParticle() {

  p.fill(this.color,100,100,0.4);
  
  p.noStroke();
  p.push();
  p.translate(this.x, this.y);
  p.rotate(p.PI/p.random(3,6));
  p.beginShape();
  p.vertex(0, -this.r*(p.random(8,15)/10) );
  p.vertex(-this.r*(p.random(8,15)/10), this.r*(p.random(8,15)/10) );
  p.vertex(this.r*(p.random(8,15)/10), this.r*(p.random(8,15)/10));
  p.endShape(p.CLOSE);
  p.pop();
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
        p.stroke(this.color,70,100,0.1);
        p.line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

p.keyPressed=()=> {

      console.log("pressed")
      p.saveCanvas(c, 'myCanvas', 'jpg');
}

// an array to add multiple particles
}



