var canvas;
canvas = document.getElementById("canvasRoot");

var localSketch;
localSketch = new Processing.Sketch();

localSketch.attachFunction = function (processing) {

    var totalDots = 100;
    var dots = new Array(totalDots);

    var width = 320;
    var height = 533;
    var fillColor;
    var diameter = 10.0;

    processing.setup = function () {
        // DEFINE THE STAGE
        processing.size(width, height);
        // THE SAME FILL IS USED FOR ALL DOTS
        fillColor = processing.color(255, 0, 0);
        processing.fill(fillColor);
        processing.noStroke();
        // CREATE A COLLECTION OF DOTS
        for (var i = 0; i < totalDots; i++) {
            var d = new Dot();
            d.x = Math.random() * width;
            d.y = Math.random() * height;
            d.vx = Math.random() * 2.0 - 1.0;
            d.vy = Math.random() * 2.0 - 1.0;
            dots[i] = d;
        }
        processing.background(0);
    };

    processing.draw = function () {
        processing.fill(0, 25);
        processing.rect(0, 0, width, height);

        var r = 255;
        var g = 255;
        var b = 255;

        for (var i = 0; i < totalDots; i++) {
            r = processing.map(dots[i].x, 0, width, 0, 255);
            g = processing.map(dots[i].y, 0, height, 0, 255);
            processing.fill(r, g, b);
            dots[i].update();
            processing.ellipse(dots[i].x, dots[i].y, diameter, diameter);
        }
    };

    function Dot() {
        this.x = 0.0;
        this.y = 0.0;
        this.vx = 0.0;
        this.vy = 0.0;
    }

    Dot.prototype.update = function () {
        // update the velocity
        this.vx += Math.random() * 2.0 - 1.0;
        this.vx *= .96;
        this.vy += Math.random() * 2.0 - 1.0;
        this.vy *= .96;
        // update the position
        this.x += this.vx;
        this.y += this.vy;
        // handle boundary collision
        if (this.x > width) { this.x = width; this.vx *= -1.0; }
        if (this.x < 0) { this.x = 0; this.vx *= -1.0; }
        if (this.y > height) { this.y = height; this.vy *= -1.0; }
        if (this.y < 0) { this.y = 0; this.vy *= -1.0; }
    };

};


p = new Processing(canvas, localSketch);