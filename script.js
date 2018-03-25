var x1;
var x2;
var t;
var overpass;
var y = 0;

function preload() {
  overpass = loadFont('fontes/overpass.otf');
}

function setup() {

  fundo_rosas = loadImage("imagens/rosas.jpeg");
  createCanvas(851, 310);

  t = 10;
  x1 = 0;
  x2 = 0;

}

function draw() {
  background(fundo_rosas);
  frameRate(15);
  for (var i = 0; i < 280; i++) {
    strokeWeight(2);
    stroke(30);
    line(x1, 0, x2 + t, height);
    x1 += 8;
    x2 += 5;
  }
  if (x2 > width || x1 > width) {
    x1 = 0;
    x2 = 0;
  }
  filter(BLUR, 3);
  noStroke();
  fill(255, 255, 255);
  textFont(overpass);
  textAlign(CENTER, CENTER);

  textSize(25);
  text("É muito fácil\n valorizar as pétalas de uma rosa mas eu prefiro\n fazê-la até mesmo se orgulhar\n de seus espinhos", 425.5, 155);
  textSize(10);
  text("Rafael Faustini", 5, 298, 100);
}