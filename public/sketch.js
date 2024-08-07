let x, y;
function setup() {
  createCanvas(500,500);
  x = width/2;
  y = height/2;	
}

function draw() {
  background(250, 200, 0);

  noFill();
  circle(x, y, 100);

  x = x - random(-2, 2);
  y = y - random(-2, 2);
}
