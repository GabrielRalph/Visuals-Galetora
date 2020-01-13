var logo, mic, fft, sig1, sig2, sig3, rad, rad2
var h = window.innerHeight;
var w = window.innerWidth;

function preload(){
  logo = loadImage('Assets/logo.png')
  }
function setup(){
  createCanvas(w,h);
  background(0);
  mic = new p5.AudioIn();


  fft = new p5.FFT(0.8, 256);


  sig1 = new Signal(9);
  sig2 = new Signal(9);
  sig3 = new Signal(9);

  rad = new Ball(width/2, height/2, 200, 0, -3);
  rad2 = new Radius(width/2, height/2, 200, -3);
  mic.start();
}



let xPos = 0;
let beat = 0;
let lastBeat = 0;
let col = 255;
let start = false;
function draw(){

  background(col)
  if(start&&(col == 0)){
    xPos = (xPos + 1)%width

    let spectrum = fft.analyze()
    let bass = fft.getEnergy(50, 80)

    sig1.add(bass);
    sig2.add(bass);
    sig3.add(bass);
    strokeWeight(5)
    stroke(255, 0, 0);
    line(xPos, height, xPos, height - sig2.mean());

    stroke(255, 255, 0);
    line(xPos+5, height, xPos+5, height - sig2.median());

    stroke(0, 255, 0);
    line(xPos+10, height, xPos+10, height - sig2.dif()*sig2.median()/10);

    stroke(255, 0, 0);
    line(xPos, 0, xPos, sig1.mean());

    stroke(255, 255, 0);
    line(xPos+5, 0, xPos+5, sig1.median());

    stroke(0, 255, 0);
    line(xPos+10, 0, xPos+10, sig1.dif()*sig1.median()/10);

    beat = sig2.dif()*10
    if(beat > 30){
       rad.changeVel(0.2, 10)
       rad2.r = rad2.size + sig1.dif()*30;
     }

    stroke(200, 255, 50);
    fill(spectrum[0], spectrum[1]*0.5, spectrum[3]);
    rad2.render();

    stroke(255, 25, 55);
    fill(spectrum[2]*0.5, spectrum[1]*2, spectrum[0]);
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
  var on = fullscreen();
  fullscreen(!on)
}
function mousePressed(){
  fft.setInput(mic);
  start = true;
}
function touchStarted(){
  fft.setInput(mic);
  start = true;
}
