var circle = [], square = [], morph = [], flies = [], x = [], y = [], angle = [], powerEn = [];
var rx, ry, rfc, rtl, targetX, targetY, numSegments, batEn;
var wx = 900;
var hy = 600;
var ny = 0.0;
var ln = 100;
var segLength = 3;
var state = false;
var open = true;
var numFlies = 8;

for(var i = 0; i < 8; i++){ powerEn[i] = i * 10; }

function setup() {
  createCanvas(wx,hy);
  rx = random(0,wx);
  ry = random(200,hy/2);
  rfc = random(90,160);
  rtl = random(40,110);
  batEn = random(powerEn);

  morphSetup();
  for(var i = 0; i < numFlies; i++){ flies[i] = new fly();}
  numSegments = rtl;
  for (var i = 0; i < numSegments; i++) { x[i] = y[i] = angle[i] = 0;}
}

function draw(){
  background(210, 226, 247);
  noStroke(0);
  soil();
  waterMovement(100,200, 159, 171, 181);
  waterMovement(300,200, 159, 175, 201);
  randomLilies(rx,ry);
  waterMovement(300,400, 159, 179, 221);
  lily(wx/2,hy/2 + 150);
  for(var i = 0; i < numFlies; i++){ flies[i].display();}
  moveEm(flies);
  cam();
}

function cam(){
  textSize(22);
  fill(255);
  text('REC', 50, 70);

  fill(255);
  rect(30,30,10,100);
  rect(40,30,100,10);

  rect(wx - 40,30,10,100);
  rect(wx - 130,30,100,10);

  rect(wx - 40, hy - 120,10,100);
  rect(wx - 130,hy - 30,100,10);

  rect(30, hy - 120,10,100);
  rect(40, hy - 30,100,10);

  fill(244,0,0);
  ellipse(115,62,20,20);

  //battery
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(wx - 125,60,80,20);
  rect(wx - 130,65,5,10);

  //power
  fill(255);
  rect(wx - 125 + batEn,60,80 - batEn,20);

  stroke(255, 70);
  ln = ln - 1;
  if (ln < 0) { ln = height + 100;}
  line(0, ln, width, ln);
  line(random(0, width), ln - 10, width, ln - 10);
  line(0, ln - 100, random(0,width), ln - 100);
  line(random(0, width), ln - 50, width, ln - 50);

//  noStroke();
}

//based on Noise wave example: https://p5js.org/examples/math-noise-wave.html
function soil(){
  fill(173, 122, 100);
  beginShape();
  var nx = 100; //1D Noise
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
    // Calculate a y value according to 1D noise
    var y = map(noise(nx), 0, 1, 80,120);
    vertex(x, y); // Set the vertex
    nx += 0.05; // Increment x dimension for noise
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function waterMovement(h1,h2, r, g, b){
  fill(r,g,b);
  beginShape();
  var nx = 0;
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
    // Calculate a y value according to 2D noise
    var y = map(noise(nx, ny), 0, 1, h1, h2);
    vertex(x, y);         // Set the vertex
    nx += 0.04;           // Increment x dimension for noise
  }
  ny += 0.001;            // increment y dimension for noise
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function frog(cx,cy){
  //back legs
  fill(89, rfc - 20, 39);
  ellipse(cx + ry/2 - 10,cy - 120, ry/2, 170);   //right leg
  ellipse(cx + ry/2 - 5,cy - 50, ry/2 + 30, 40); //right foot

  ellipse(cx - ry/2 + 10,cy - 120, ry/2, 170);   //left leg
  ellipse(cx - ry/2 + 5,cy - 50, ry/2 + 30, 40); //left foot

  //front legs
  fill(89, rfc - 10, 39);
  ellipse(cx + ry/2 - 10,cy - 120, ry/3, 170);   //right leg
  ellipse(cx + ry/2,cy - 30, ry/3, 30); //right foot

  ellipse(cx - ry/2 + 10,cy - 120, ry/3, 170);   //left leg
  ellipse(cx - ry/2,cy - 30, ry/3, 30); //left foot

  //belly
  fill(89, rfc, 39);
  ellipse(cx, cy - 120, ry, 220);      //outer
  fill(135, 178, 78);
  ellipse(cx, cy - 110, ry - 40, 180); //inner

  //head
  fill(89, rfc, 39);
  ellipse(cx, cy - 220, ry - 50, 100);

  //mouth
  noFill();
  stroke(0);
  if(mouseIsPressed) strokeWeight(6);
  arc(cx, cy - 255, ry - 90, 70, 0, PI);  // upper half of circle
  noStroke();

  //left eye
  fill(89, rfc, 39);
  ellipse(cx - ry/5, cy - 260, 60, 55); //lid
  fill(ry, ry, ry - 100);
  ellipse(cx - ry/4, cy - 258, 60, 55); //ball
  fill(0);
  ellipse(cx - ry/4 - 10, cy - 260, ry/8, ry/6); //pupil

  //right eye
  fill(89, rfc, 39);
  ellipse(cx + ry/5, cy - 260, 60, 55); //lid
  fill(ry, ry, ry - 100);
  ellipse(cx + ry/4, cy - 258, 60, 55); //ball
  fill(0);
  ellipse(cx + ry/4 + 10, cy - 260, ry/8, ry/6); //pupil

  //nostrils
  stroke(69, rfc - 50, 19);
  strokeWeight(2);
  line(cx - ry/20, cy - 255, cx - ry/15, cy - 250);
  line(cx + ry/20, cy - 255, cx + ry/15, cy - 250);

  morphDraw(cx,cy - 120);

 if(mouseIsPressed){
   //right blink
   if(dist(cx + ry/4, cy - 260, mouseX, mouseY) < 55){
     fill(89, rfc, 39);
     ellipse(cx + ry/4, cy - 260, 60, 55); //ball
   }
   //left blink
   if(dist(cx - ry/4, cy - 260, mouseX, mouseY) < 55){
     fill(89, rfc, 39);
     ellipse(cx - ry/4, cy - 260, 60, 55); //ball
   }
   tongue();
  }
}

function lily(cx,cy){
  fill(127, 160, 115);
  ellipse(cx, cy, 600,150);
  waterMovement(cy, cy + 100, 159, 183, 231);
  frog(cx,cy);
}

function randomLilies(rx,ry){
  var ry2 = ry - 220;
  fill(127, 170, 115);
  arc(rx, ry, ry2 + 350,ry2 + 10, PI, 3);
  fill(117, 160, 105);
  arc(2*rx, ry + 30, ry2 + 300,ry2, -PI, 3);
  fill(107, 150, 95);
  arc(rx - 300, ry + 50, ry2 + 400,ry2 + 5, -PI, 3);
  fill(97, 140, 85);
  arc(rx - 600, ry + 60, ry2 + 450,ry2, -PI, 3);

}

// borrows code from p5 morph example: https://p5js.org/examples/motion-morph.html
function morphSetup(){
  // Create a circle using vectors pointing from center
  for (var angle = 0; angle < 360; angle += 9) {
    var v = p5.Vector.fromAngle(radians(angle - 135));
    v.mult(100);
    circle.push(v);
    morph.push(createVector());  // fill out morph ArrayList with blank PVectors
  }
  // Top of square
  for (var x = -50; x < 50; x += 10) { square.push(createVector(x, -50));}
  // Right side
  for (var y = -50; y < 50; y += 10) { square.push(createVector(50, y));}
  // Bottom
  for (var x = 50; x > -50; x -= 10) { square.push(createVector(x, 50));}
  // Left side
  for (var y = 50; y > -50; y -= 10) { square.push(createVector(-50, y));}
}

function morphDraw(pX,pY){
  fill(135, 178, 78);
  noStroke();
  var totalDistance = 0;   //keep how far the vertices are from their target
  // Look at each vertex
  for (var i = 0; i < circle.length; i++) {
    var v1;
    // check if lerping to the circle or square
    if (state) { v1 = circle[i];}
    else { v1 = square[i];}
    var v2 = morph[i];                           // Get the vertex we will draw
    v2.lerp(v1, 0.1);                            // Lerp to the target
    totalDistance += p5.Vector.dist(v1, v2);     // Check how far we are from target
  }

  if (totalDistance < 0.1) { state = !state;}    // If all the vertices are close, switch shape
  translate(pX,pY);                              // Draw relative to center
  beginShape();                                  // Draw a polygon that makes up all the vertices

  morph.forEach(v => { vertex(v.x, v.y);} );
  endShape(CLOSE);
  translate(-pX,-pY);
}

// fly class
function fly() {
  this.x = random(10,wx);
  this.y = random(10,hy);
  this.diameter = random(20, 35);

  this.move = function() {
    var speed = random(-4,4);
    this.x += speed;
    this.y += speed;
  };

  this.display = function() {
    //body
    fill(0);
    ellipse(this.x, this.y + 7, this.diameter - 10, this.diameter - 15);

    //wings
    fill(40,67);
    ellipse(this.x, this.y, this.diameter, this.diameter - 5);
    ellipse(this.x - 5, this.y, this.diameter, this.diameter - 5);
  };
}
function moveEm(flies){
  for(var i = 0; i < numFlies; i++){
    flies[i].move();
  }
}

//borrows code from reach example: https://p5js.org/examples/interaction-reach-2.html
function tongue(){
  stroke(ry,160,ry - 10);
  strokeWeight(10);
  reachSegment(0, mouseX - wx/2, mouseY - hy/2 + 70);
  for(var i=1; i<numSegments; i++) { reachSegment(i, targetX, targetY);}
  for(var j=x.length-1; j>=1; j--) { positionSegment(j, j-1);}
  for(var k=0; k<x.length; k++) { segment(x[k], y[k], angle[k]);}
  noStroke();
}

function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}

function reachSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength;
  targetY = yin - sin(angle[i]) * segLength;
}

function segment(x, y, a) {
  push();
  translate(x + wx/2, y + hy/2 - 70);
  line(0, 0, segLength, 0);
  pop();
}
