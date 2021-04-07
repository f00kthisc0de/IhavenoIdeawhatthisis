var mic, pos, tar, das;
var txtfont;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    mic = new p5.AudioIn();
    mic.start();
    pos = createVector((height / 2), (width / 2));
    das = createVector(width/2, height/2);
    tar = createVector(0, 0);
}

function draw() {
    background(50);

    // So machst du einfach einen Halbkreis!
    //fill(255);
    //stroke(255);
    //halbKreis(100, 100, 20, false);

    //Gesicht
    //[Platzhalter]
    fill(200, 100, 0);
    stroke(0);
    ellipse(width/2, height/2+50, 300, 300);

    var sound = mic.getLevel();
    //console.log(vol);
    var zoom = 3;
    var vol;
    if (sound >= 0.01) {
        vol = sound;
    } else {
        vol = 0;
    }

    //Mund

    if (vol == 0) {
        //fill(255, 0, 0);
        //ellipse(pos.x, pos.y, 80 / zoom * 2, 45 / zoom * 2);
        //fill(0, 0, 0)
        //ellipse(pos.x, pos.y, 60 / zoom * 2, 25 / zoom * 2);
        strokeWeight(5);
        stroke(0);
        line(width/2 - 40, height/2+40, width/2 + 40, height/2+40);
    } else {
        strokeWeight(2);
        fill(255, 0, 0);
        ellipse(width/2 , height/2+40, map(vol, 0, 1, 0, 350 / zoom) * 2, map(vol, 0, 1, 0, 115 / zoom) * 2);
        fill(0);
        ellipse(width/2 , height/2+40, map(vol, 0, 1, 0, 300 / zoom) * 2, map(vol, 0, 1, 0, 90 / zoom) * 2);

    }
    strokeWeight(1);
    //Auge
    //ellipseMode(RADIUS);
    fill(255);
    ellipse(width / 2 - 50, height / 2 - 25, 25 * 2, 25 * 2);
    ellipse(width / 2 + 50, height / 2 - 25, 25 * 2, 25 * 2);

    //Brille
    //fill(180);
    noFill();
    halbKreis(width / 2 - 50, height / 2 - 25, 35, false);
    halbKreis(width / 2 + 50, height / 2 - 25, 35, false);
    stroke(0);
    strokeWeight(3);
    line(width / 2 + 15, height / 2 - 25, width / 2 - 15, height / 2 - 25);


    //Iris
    //ellipseMode(CENTER)
    if (frameCount % 180 == 0) {
        tar = createVector(width / 2 + random(-15, 15), height / 2 + random(-15, 15));
    }
    if (((das.x != tar.x || das.y != tar.y) || (das.x != tar.x && das.y != tar.y)) && (tar.x != 0 && tar.y != 0)) {
        das = linearInterpolation(das, tar, 0.1);
    }
    strokeWeight(4);
    stroke(0, 0, 255);
    fill(0);
    ellipse(das.x - 50, das.y - 25, 10, 10);
    ellipse(das.x + 50, das.y - 25, 10, 10);
    strokeWeight(1);
    stroke(0);

    //Augenbrauen
    fill(255, 100, 0);
    rect(width / 2 - 75, height / 2 - 60, 50, 12);
    rect(width / 2 + 25, height / 2 - 60, 50, 12);
    textSize(50);
    fill(0, 0, 255);

    //Augenlieder
    if (vol > 0.5) {
        //fill(0);



    }


    text("Bored_Dragon", pos.x - 150, pos.y + 190);
}

function halbKreis(px, py, r, upsidedown) {
    beginShape();
    var begin = 0,
        end = 0;
    if (upsidedown == false) {
        begin = 0;
        end = PI;
    } else {
        begin = PI;
        end = TWO_PI;
    }
    for (var a = begin; a < end; a += PI / 100) {
        let tx = px + r * cos(a);
        let ty = py + r * sin(a);
        vertex(tx, ty);
    }

    endShape(CLOSE);
}

function linearInterpolation(point1, point2, val) {
    var rangMin = 0.1;
    if (val < 0 || val > 1) {
        return createVector(point1.x, point1.y);
    }
    var xPoint = 0,
        yPoint = 0;
    if (point1.x > point2.x) {
        var range = point1.x - point2.x;
        var part = range * val;
        xPoint = (range >= rangMin) ? point1.x - part : point2.x;
    } else if (point1.x < point2.x) {
        var range = point2.x - point1.x;
        var part = range * val;
        xPoint = (range >= rangMin) ? point1.x + part : point2.x;
    } else {
        xPoint = point1.x;
    }
    if (point1.y > point2.y) {
        var range = point1.y - point2.y;
        var part = range * val;
        yPoint = (range >= rangMin) ? point1.y - part : point2.y;
    } else if (point1.y < point2.y) {
        var range = point2.y - point1.y;
        var part = range * val;
        yPoint = (range >= rangMin) ? point1.y + part : point2.y;
    } else {
        yPoint = point1.y;
    }
    return createVector(xPoint, yPoint);
}