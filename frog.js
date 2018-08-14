var wx = 800;
var hy = 600;
var ny = 0.0;
var rx;
var ry;

function setup() {
  createCanvas(wx,hy);
  noStroke();
  rx = random(0,wx);
  ry = random(200,hy/2);
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
  waterMovement(cy,cy + 150);
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
