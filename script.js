var x1;
var x2;
var t;
var overpass;
var y = 0;
var canvas,fundo_rosas;
var blur_slider,nome,frase,textop,fraselen,fundo,enable_blur,enable_lines;
var frasex = 425.5
var frasey = 155
var moveX=0
var moveY=0
var arrastando = false;

texto= "É muito fácil valorizar as pétalas de uma rosa mas eu prefiro fazê-la até mesmo se orgulhar de seus espinhos";
function preload() {
  overpass = loadFont('fontes/overpass.otf');
}
function muda_texto(){
texto = resize(textop.value());
}
function resize(str){
  var tamanho = textWidth(str)*25;
  var str_len= str.length;
  var i;
  if(tamanho > width){
    var editado = str.substring(((str_len/2)-(str_len*0.2)),(str_len/2)+(str_len*0.2));
    for(i=0; i<5;i++){
        if( int(random(1,10))>6){
          editado = editado.replace(" ", "\n");
          if(textWidth(editado)> width)
          {
           resize(str);
          }
        }else {
            editado = editado.replace(" ", " ");
        }
    }
    str = str.substring(0,(str_len/2)-(str_len*0.2))+editado+str.substring((str_len/2)+(str_len*0.2)),str_len;
  }
  return str;
}

function mousePressed() {
  if(mouseX > frasex  && mouseX < frasex + w){
    arrastando = true
  }
}

function setup() {

  fundo_rosas = loadImage("imagens/rosas.jpeg");
  canvas = createCanvas(851, 310);
  canvas.parent("capa");

  t = 10;
  x1 = 0;
  x2 = 0;

blur_slider = select("#blur");
faixa_slider = select("#linhas");
texto_desfoque = "Desfoque";
nome = select('#nome');
botao = select('#salvar');
botao.mousePressed(changeBG);
fraselen = select('#fraselen');
frase = select('#atualizar');
frase.mousePressed(muda_texto);
textop = select('#frase');
texto= "Digite a frase";
muda_texto(texto);
enable_blur = select('#enable_blur');
enable_lines = select('#enable_lines');
fundo = createFileInput(trocaFundo);
fundo.position(600, 85);
fundo.class('form-control-file');
}
function trocaFundo(file){
  if (file.type === 'image') {
  fundo_rosas = loadImage(file.data);
  fundo_rosas.resize(851,310)
  background(fundo_rosas);
}
}
function changeBG(){

  saveCanvas(canvas,'capamaker','png');
  texto_desfoque= "Desfoque";
}

function draw() {
  var borrao = blur_slider.value();
  var faixa = faixa_slider.value()/10;
  var valor_frase = fraselen.value();


  background(fundo_rosas);
    if(enable_lines.checked()){
  for (var i = 0; i < 280; i++) {
    strokeWeight(2);
    stroke(30);
    line(x1, 0, x2 + t, height);
    x1 += 8*faixa;
    x2 += 5*faixa;
  }
  if (x2 > width || x1 > width) {
    x1 = 0;
    x2 = 0;
  }
}
  if(enable_blur.checked())
  filter(BLUR, borrao);
  noStroke();

  fill(255, 255, 255);
  textFont(overpass);

  textAlign(CENTER, CENTER);

  if(arrastando){
    fill(50)
    frasex = mouseX + moveX
    frasey = mouseY + moveY
  }

  textSize(valor_frase);
  text(texto, frasex, frasey);

  textSize(10);
  text(nome.value(), textWidth(nome.value())*0.63, textWidth(nome.value)+298)
}
