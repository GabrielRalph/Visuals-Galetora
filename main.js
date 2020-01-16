var logo, mic, fft, sig1, sig2, sig3, rad, rad2, rainbow, rainBeat, rainBeat2
var h = window.innerHeight;
var w = window.innerWidth;
function preload(){
  logo = loadImage('Assets/logo.png')
}
function initialize(){
  rainBeat = new Rainbow(7)
  rainBeat2 = new Rainbow(12)
  rainbow = new Rainbow(25, w)

  sig1 = new Signal(9);
  sig2 = new Signal(9);
  sig3 = new Signal(9);

  rad = new Ball(width/2, height/2, 200, 0, -2.5);
  rad2 = new Radius(width/2, height/2, 200, -3);
  rad.xVel = 5;
}
function setup(){
  createCanvas(w,h);
  background(0);
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0.8, 256);
  fft.setInput(mic);
  initialize();
}



let xPos = 0;
let beat = 0;
let lastBeat = 0;
let col = 255;
let start = false;
var fx = 50;
var bass = 0;
function draw(){


  background(col)
  if(start&&(col == 0)){
    xPos = (xPos + 1)%width
    colx = xPos
    let spectrum = fft.analyze()
    bass = mic.getLevel()*fx;

    fill(100, 0, 100);
    stroke(100, 0, 0);
    text(fx, 50, 50);

    sig1.add(bass);
    sig2.add(bass);
    sig3.add(bass);
    strokeWeight(5)
    rainbow.inc();
    rainbow.set();
    line(xPos, height, xPos, height - bass*fx);
    // line(xPos+5, height, xPos+5, height - sig2.median()*fx/5);
    // line(xPos+10, height, xPos+10, height - sig2.dif()*sig2.median()*fx/25);
    // line(xPos, 0, xPos, sig1.mean()*fx/5);
    // line(xPos+5, 0, xPos+5, sig1.median()*fx/5);
    // line(xPos+10, 0, xPos+10, sig1.dif()*sig1.median()*fx/10);

    beat = sig2.dif()*10
    if(bass > 10){

      if(bass - lastBeat > 5){
        rainBeat.inc();
        rainBeat2.inc();
        rad.changeVel(0, 30)
        rad2.r = rad2.size + bass*5;
      }

     }
     lastBeat = bass;
     fill(100, 0, 100);
     stroke(100, 0, 0);
     text(fx, 50, 50);
    rainBeat.set('f');
    rainBeat.set('s', (x, d) => {return Math.round(x + d/2)%d});
    rad2.render();
    rainBeat2.set('f', (x, d) => {return Math.round(x + d/2)%d});
    rainBeat2.set('s');

    rad.render();
  }else{
    image(logo, width/2, height/2);
    imageMode(CENTER);
    tint(255, col);
    if(start){
      col -= 5;
    }
  }

}


function keyPressed(){
  if(key == 'f'){
    var on = fullscreen();
    if(!on) {
      resizeCanvas(displayWidth, displayHeight)
      initialize()
    }
    fullscreen(!on)
  }else if(key == 'a'){
    fx = 2/bass/fx;
  }else if(key == 'ArrowUp'){
    fx += 5;
  }else if(key == 'ArrowDown'){
    fx -= 5;
  }
}
function mousePressed(){
  start = true;
  if(getAudioContext().state !== 'running'){
    getAudioContext().resume();
  }
}
var lastY = 0;
function touchMoved(event){
  if(event.touches){
    fx += (lastY - event.touches[0].pageY)*event.touches[0].force;
  }else{
    fx -= event.movementY;
  }
  lastY = event.touches[0].pageY;
  console.log(event)
}

function touchStarted(){
  start = true;

  if(getAudioContext().state !== 'running'){
    getAudioContext().resume();
  }
}
