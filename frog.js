var wx = 900;
var hy = 600;
var ny = 0.0;
var rx, ry, rfb, rfc;
var circle = [], square = [], morph = [];
var state = false;
var flies = [];

var x = [], y = [], angle = [];
var segLength = 3;
var targetX, targetY;
var numSegments = 106;

for (var i = 0; i < numSegments; i++) {
  x[i] = y[i] = angle[i] = 0;
}

function setup() {
  createCanvas(wx,hy);
  rx = random(0,wx);
  ry = random(200,hy/2);
  rfb = random(190,290);
  rfc = random(90,160);
  morphSetup();
  for(var i = 0; i < 5; i++){ flies[i] = new fly();}
  //tongue placement
  x[x.length-1] = width/2; // Set base x-coordinate
  y[x.length-1] = height/2 - 75;  // Set base y-coordinate
}

function draw(){
  background(210, 226, 247);
  noStroke();
  soil();
  waterMovement(100,200);
  randomLilies(rx,ry);
  lily(wx/2,hy/2 + 150);
  for(var i = 0; i < 5; i++){ flies[i].display();}
  moveEm(flies);
  tongue();

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

//based on Noise wave example: https://p5js.org/examples/math-noise-wave.html
function waterMovement(h1,h2){
  fill(159, 183, 221);
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

function lily(cx,cy){
  fill(127, 160, 115);
  ellipse(cx, cy, 600,150);
  waterMovement(cy, cy + 100);
  frog(cx,cy);
}

function frog(cx,cy){
  //back legs
  fill(89, rfc - 20, 39);
  ellipse(cx + rfb/2 - 10,cy - 120, rfb/2, 170);   //right leg
  ellipse(cx + rfb/2 - 5,cy - 50, rfb/2 + 30, 40); //right foot

  ellipse(cx - rfb/2 + 10,cy - 120, rfb/2, 170);   //left leg
  ellipse(cx - rfb/2 + 5,cy - 50, rfb/2 + 30, 40); //left foot

  //front legs
  fill(89, rfc - 10, 39);
  ellipse(cx + rfb/2 - 10,cy - 120, rfb/3, 170);   //right leg
  ellipse(cx + rfb/2,cy - 30, rfb/3, 30); //right foot

  ellipse(cx - rfb/2 + 10,cy - 120, rfb/3, 170);   //left leg
  ellipse(cx - rfb/2,cy - 30, rfb/3, 30); //left foot

  //belly
  fill(89, rfc, 39);
  ellipse(cx, cy - 120, rfb, 220);      //outer
  fill(135, 178, 78);
  ellipse(cx, cy - 110, rfb - 40, 180); //inner

  //head
  fill(89, rfc, 39);
  ellipse(cx, cy - 220, rfb - 50, 100);

  //left eye
  fill(89, rfc, 39);
  ellipse(cx - rfb/5, cy - 260, 60, 55); //lid
  fill(ry, ry, ry - 100);
  ellipse(cx - rfb/4, cy - 260, 60, 55); //ball
  fill(0);
  ellipse(cx - rfb/4 - 10, cy - 260, rfb/8, rfb/6); //pupil

  //right eye
  fill(89, rfc, 39);
  ellipse(cx + rfb/5, cy - 260, 60, 55); //lid
  fill(ry, ry, ry - 100);
  ellipse(cx + rfb/4, cy - 260, 60, 55); //ball
  fill(0);
  ellipse(cx + rfb/4 + 10, cy - 260, rfb/8, rfb/6); //pupil

  //nostrils
  stroke(69, rfc - 50, 19);
  strokeWeight(2);
  line(cx - rfb/20, cy - 255, cx - rfb/15, cy - 250);
  line(cx + rfb/20, cy - 255, cx + rfb/15, cy - 250);

  morphDraw(cx,cy - 120);
  tongue();
}

function randomLilies(rx,ry){
  var ry2 = ry - 220;
  fill(127, 170, 115);
  ellipse(rx, ry, ry2 + 350,ry2 + 10);
  fill(117, 160, 105);
  ellipse(2*rx, ry + 30, ry2 + 300,ry2);
  fill(107, 150, 95);
  ellipse(rx - 300, ry + 50, ry2 + 400,ry2 + 5);
  fill(97, 140, 85);
  ellipse(rx - 600, ry + 60, ry2 + 450,ry2);
}

// using code from p5 morph example: https://p5js.org/examples/motion-morph.html
function morphSetup(){
  // Create a circle using vectors pointing from center
  for (var angle = 0; angle < 360; angle += 9) {
    var v = p5.Vector.fromAngle(radians(angle - 135));
    v.mult(100);
    circle.push(v);
    // fill out morph ArrayList with blank PVectors
    morph.push(createVector());
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
  // We will keep how far the vertices are from their target
  var totalDistance = 0;

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

function moveEm(flies){
  for(var i = 0; i < 5; i++){
  flies[i].move();
  }
}
// fly class
function fly() {
  this.x = random(10,wx);
  this.y = random(10,hy);
  this.diameter = random(20, 40);

  this.move = function() {
    var speed = random(-4,4);
    this.x += speed;
    this.y += speed;
  };

  this.display = function() {
    fill(0);
    ellipse(this.x, this.y + 10, this.diameter - 10, this.diameter - 17);
    fill(40,67);
    ellipse(this.x, this.y, this.diameter, this.diameter - 5);
    ellipse(this.x - 5, this.y, this.diameter, this.diameter - 5);

  };
}

//borrows code from reach example: https://p5js.org/examples/interaction-reach-2.html
function tongue(){
  stroke(255,182,193);
  strokeWeight(10);
  reachSegment(0, mouseX, mouseY);
  for(var i=1; i<numSegments; i++) {
    reachSegment(i, targetX, targetY);
  }
  for(var j=x.length-1; j>=1; j--) {
    positionSegment(j, j-1);
  }
  for(var k=0; k<x.length; k++) {
    segment(x[k], y[k], angle[k]);
  }
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
  translate(x, y);
  line(0, 0, segLength, 0);
  pop();
}
