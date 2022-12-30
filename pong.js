//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 13;
let raio = diametroBolinha / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 0;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let yRaqueteBase = yRaquete - 90;

//variaveis do oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//chance de errar
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete(); 
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNoMeio();
}
function mostraRaquete(x,y) {
  rect(x, y,raqueteComprimento,raqueteAltura);
}

function movimentaRaqueteOponente() {
  // velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  // yRaqueteOponente += velocidadeYOponente + chanceDeErrar 
  // calcularChanceDeErrar()
  if(keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }  
  if(keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
  if(yRaqueteOponente < 0) {
     yRaqueteOponente -= -10; 
     }
  if(yRaqueteOponente > 310) {
     yRaqueteOponente -= 10; 
     }
}

// function calcularChanceDeErrar() {
//   if (pontosDoOponente >= meusPontos) {
//     chanceDeErrar += 0.5
//   if (chanceDeErrar >= 39) {
//     chanceDeErrar = 40 }
//   }  else {
//     chanceDeErrar -= 1
//     if (chanceDeErrar <= 35) {
//       chanceDeErrar =35
//     }
//   }
// }
function movimentaMinhaRaquete() {
  if(keyIsDown(87)) {
    yRaquete -= 10;
  }  
  if(keyIsDown(83)) {
    yRaquete += 10;
  }
  if(yRaquete < 0) {
     yRaquete -= -10; 
     }
  if(yRaquete > 310) {
     yRaquete -= 10; 
     }
  }  

function verificaColisaoRaquete() {
  if(xBolinha - raio < xRaquete + raqueteComprimento && 
     yBolinha - raio < yRaquete + raqueteAltura && 
     yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function mostraBolinha() {
  circle(xBolinha,yBolinha,diametroBolinha);
}

function movimentaBolinha() {
  xBolinha = xBolinha += velocidadeXBolinha;
  yBolinha = yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio< 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(color(255,140,0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255,140,0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 450, 26);
  
}

function marcaPonto() {
  if(xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
   if(xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
   }
}

function preload () {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function bolinhaNoMeio() {
  if(xBolinha > 590 || xBolinha < 10) {
    xBolinha = 300;
    yBolinha = 200;
    xBolinha *= 0.9;
  }
}
