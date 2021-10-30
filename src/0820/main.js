"use strict";
exports.__esModule = true;
var p5 = require("p5");
var sketch = function (p) {
    var flock;
    var ripples = [];
    var img;
    p.preload = function () {
        img = p.loadImage('assets/japanese-paper.jpg');
    };
    p.setup = function () {
        p.createCanvas(600, 600);
        flock = new Flock();
        for (var i = 0; i < 20; i++) {
            var b = new Boid(p.width, p.height);
            flock.addBoid(b);
        }
        p.background("#FFFFFF");
    };
    p.draw = function () {
        p.tint(255, 255, 255, 80);
        p.image(img, 0, 0);
        flock.run();
        if (p.frameCount % 100 == 0) {
            ripples.push(new Ripple(p.random(0, p.width), p.random(0, p.height), 1));
        }
        for (var i = ripples.length; i-- > 0;) {
            if (ripples[i].t > 100) {
                ripples.splice(i, 1);
                continue;
            }
            ripples[i].move();
            ripples[i].draw();
            for (var _i = 0, _a = ripples[i].reflect(); _i < _a.length; _i++) {
                var r = _a[_i];
                ripples.push(r);
            }
        }
    };
    function Flock() {
        this.boids = [];
    }
    Flock.prototype.run = function () {
        for (var i = 0; i < this.boids.length; i++) {
            this.boids[i].run(this.boids);
        }
    };
    Flock.prototype.addBoid = function (b) {
        this.boids.push(b);
    };
    function Boid(x, y) {
        this.acceleration = p.createVector(0, 0);
        this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.position = p.createVector(x, y);
        this.r = 4.0;
        this.maxspeed = 2;
        this.maxforce = 0.07;
        this.color = p.random(0, 1);
    }
    Boid.prototype.run = function (boids) {
        this.flock(boids);
        this.update();
        this.borders();
        this.render();
    };
    Boid.prototype.applyForce = function (force) {
        this.acceleration.add(force);
    };
    Boid.prototype.flock = function (boids) {
        var sep = this.separate(boids);
        var ali = this.align(boids);
        var coh = this.cohesion(boids);
        sep.mult(1.5);
        ali.mult(0.5);
        coh.mult(0.5);
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
    };
    Boid.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };
    Boid.prototype.seek = function (target) {
        var desired = p5.Vector.sub(target, this.position);
        desired.normalize();
        desired.mult(this.maxspeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        return steer;
    };
    Boid.prototype.render = function () {
        var theta = this.velocity.heading() + p.radians(90);
        if (this.color > 0.3) {
            p.fill("rgba(247,36,15,0.7)");
        }
        else {
            p.fill("rgba(0,0,0,0.7)");
        }
        p.noStroke();
        p.push();
        p.translate(this.position.x, this.position.y);
        p.rotate(theta - p.PI / 4);
        p.beginShape();
        p.arc(0, 0, this.r * 8, this.r * 8, 0, p.PI / 2, p.OPEN);
        p.translate(this.r * 4, this.r * 4);
        p.rotate(p.PI);
        p.arc(0, 0, this.r * 8, this.r * 8, 0, p.PI / 2, p.OPEN);
        p.rotate(-p.PI);
        p.translate(-this.r * 4, 0);
        p.rotate(p.PI / 4);
        p.vertex(0, 0);
        p.vertex(-this.r * p.sqrt(2), this.r * 3);
        p.vertex(this.r * p.sqrt(2), this.r * 3);
        p.endShape(p.CLOSE);
        p.pop();
    };
    Boid.prototype.borders = function () {
        if (this.position.x < -this.r)
            this.position.x = p.width + this.r;
        if (this.position.y < -this.r)
            this.position.y = p.height + this.r;
        if (this.position.x > p.width + this.r)
            this.position.x = -this.r;
        if (this.position.y > p.height + this.r)
            this.position.y = -this.r;
    };
    Boid.prototype.separate = function (boids) {
        var desiredseparation = 25.0;
        var steer = p.createVector(0, 0);
        var count = 0;
        for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < desiredseparation)) {
                var diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d);
                steer.add(diff);
                count++;
            }
        }
        if (count > 0) {
            steer.div(count);
        }
        if (steer.mag() > 0) {
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    };
    Boid.prototype.align = function (boids) {
        var neighbordist = 50;
        var sum = p.createVector(0, 0);
        var count = 0;
        for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        }
        else {
            return p.createVector(0, 0);
        }
    };
    // Cohesion
    // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
    Boid.prototype.cohesion = function (boids) {
        var neighbordist = 50;
        var sum = p.createVector(0, 0); // Start with empty vector to accumulate all locations
        var count = 0;
        for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].position);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum);
        }
        else {
            return p.createVector(0, 0);
        }
    };
    var Ripple = /** @class */ (function () {
        function Ripple(x, y, v, r, t) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (v === void 0) { v = 1; }
            if (r === void 0) { r = 0; }
            if (t === void 0) { t = 0; }
            this.x = x;
            this.y = y;
            this.v = v;
            this.r = r;
            this.t = t;
        }
        Ripple.prototype.move = function () {
            this.r += this.v;
            this.t++;
        };
        Ripple.prototype.draw = function () {
            p.stroke("rgba(0,250,250, 0.5)");
            p.strokeWeight(1);
            p.noFill();
            p.ellipse(this.x, this.y, 2 * this.r);
        };
        Ripple.prototype.reflect = function () {
            var ripples = [];
            if (p.abs(this.x - this.r) < this.v)
                ripples.push(new Ripple(-this.r, this.y, this.v, this.r, this.t));
            if (p.abs(this.x + this.r - p.width) < this.v)
                ripples.push(new Ripple(p.width + this.r, this.y, this.v, this.r, this.t));
            if (p.abs(this.y - this.r) < this.v)
                ripples.push(new Ripple(this.x, -this.r, this.v, this.r, this.t));
            if (p.abs(this.y + this.r - p.height) < this.v)
                ripples.push(new Ripple(this.x, p.height + this.r, this.v, this.r, this.t));
            return ripples;
        };
        return Ripple;
    }());
};
var sketchP = new p5(sketch);
