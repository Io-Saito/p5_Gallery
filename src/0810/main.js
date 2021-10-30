import * as p5 from 'p5';
var sketch = function (p) {
    var particles = [];
    p.setup = function () {
        p.createCanvas(600, 600);
        for (var i = 0; i < p.width / 10; i++) {
            particles.push(new Particle());
        }
        p.colorMode("hsb", 360, 100, 100, 0.4);
    };
    p.draw = function () {
        p.background('#ffffff');
        for (var i = 0; i < particles.length; i++) {
            particles[i].createParticle();
            particles[i].moveParticle();
            particles[i].joinParticles(particles.slice(i));
        }
    };
    p.mouseClicked = function () {
        for (var i = 0; i < 10; i++) {
            particles.push(new Particle());
        }
    };
    // this class describes the properties of a single particle.
    var Particle = /** @class */ (function () {
        function Particle() {
            this.x = p.random(0, p.width);
            this.y = p.random(0, p.height);
            this.r = p.random(1, 8);
            this.xSpeed = p.random(-2, 2);
            this.ySpeed = p.random(-1, 1.5);
            this.color = p.random(0, 360);
        }
        // creation of a particle.
        Particle.prototype.createParticle = function () {
            p.fill(this.color, 100, 100, 0.4);
            p.noStroke();
            p.push();
            p.translate(this.x, this.y);
            p.rotate(p.PI / p.random(3, 6));
            p.beginShape();
            p.vertex(0, -this.r * (p.random(8, 15) / 10));
            p.vertex(-this.r * (p.random(8, 15) / 10), this.r * (p.random(8, 15) / 10));
            p.vertex(this.r * (p.random(8, 15) / 10), this.r * (p.random(8, 15) / 10));
            p.endShape(p.CLOSE);
            p.pop();
        };
        // setting the particle in motion.
        Particle.prototype.moveParticle = function () {
            if (this.x < 0 || this.x > p.width)
                this.xSpeed *= -1;
            if (this.y < 0 || this.y > p.height)
                this.ySpeed *= -1;
            this.x += this.xSpeed;
            this.y += this.ySpeed;
        };
        // this function creates the connections(lines)
        // between particles which are less than a certain distance apart
        Particle.prototype.joinParticles = function (particles) {
            var _this = this;
            particles.forEach(function (element) {
                var dis = p.dist(_this.x, _this.y, element.x, element.y);
                if (dis < 85) {
                    p.stroke(_this.color, 70, 100, 0.1);
                    p.line(_this.x, _this.y, element.x, element.y);
                }
            });
        };
        return Particle;
    }());
    // an array to add multiple particles
};
var sketchP = new p5(sketch);
//# sourceMappingURL=main.js.map