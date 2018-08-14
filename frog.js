var wx = 800;
var hy = 600;
var ny = 0.0;

function setup() {
  createCanvas(wx,hy);
  background(159, 183, 221);
  noStroke();
}

function draw(){
  background(208, 218, 229);
  waterMovement(100,230);
  lily(wx/2,hy/2 + 150);
}

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
  ellipse(cx, cy, 500,150);
  waterMovement(cy,cy + 150);
}
