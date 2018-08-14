var wx = 900;
var hy = 600;
var ny = 0.0;
var rx, ry, rfb, rfc;
var circle = [];
var square = [];
var morph = [];
var state = false;


function setup() {
  createCanvas(wx,hy);
  noStroke();
  rx = random(0,wx);
  ry = random(200,hy/2);
  rfb = random(190,290);
  rfc = random (90,160);
  morphSetup();
}

function draw(){
  background(210, 226, 247);
  soil();
  waterMovement(100,200);
  randomLilies(rx,ry);
  lily(wx/2,hy/2 + 150);
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
  //right leg
  fill(89, rfc, 39);
  ellipse(cx + rfb/2 - 10,cy - 120,rfb/3, 170);
  ellipse(cx - rfb/2 + 10,cy - 120,rfb/3, 170);
  //outer belly
  //fill(89, rfc, 39);
  ellipse(cx, cy - 120, rfb, 220);
  //inner belly
  fill(135, 178, 78);
  ellipse(cx, cy - 110, rfb - 40, 180);

  //head
  fill(89, rfc, 39);
  ellipse(cx, cy - 220, 170, 100);

  //left eye
  fill(89, rfc, 39);
  ellipse(cx - 40, cy - 260, 60, 55); //lid
  fill(232, 231, 185);
  ellipse(cx - 55, cy - 260, 60, 55); //ball

  //right eye
  fill(89, rfc, 39);
  ellipse(cx + 40, cy - 260, 60, 55); //lid
  fill(232, 231, 185);
  ellipse(cx + 55, cy - 260, 60, 55); //ball

  morphDraw(cx,cy - 120);
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
  // We will keep how far the vertices are from their target
  var totalDistance = 0;

  // Look at each vertex
  for (var i = 0; i < circle.length; i++) {
    var v1;
    // Are we lerping to the circle or square?
    if (state) { v1 = circle[i];}
    else { v1 = square[i];}
    // Get the vertex we will draw
    var v2 = morph[i];
    // Lerp to the target
    v2.lerp(v1, 0.1);
    // Check how far we are from target
    totalDistance += p5.Vector.dist(v1, v2);
  }

  // If all the vertices are close, switch shape
  if (totalDistance < 0.1) { state = !state;}
  // Draw relative to center
  translate(pX,pY);
  // Draw a polygon that makes up all the vertices
  beginShape();
  morph.forEach(v => { vertex(v.x, v.y);});
  endShape(CLOSE);
}
