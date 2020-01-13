class Radius{
  constructor(cx, cy, size, ddr){
    this.size = size;
    this.dr = 0;
    this.ddr = ddr;
    this.r = this.size;
    this.cx = cx;
    this.cy = cy;
  }

  grow(value){
    this.dr += value;
  }

  render(){
    this.dr += this.ddr;
    this.r += this.dr;
    if(this.r < this.size){
      this.r = this.size
      this.dr *= -0.5;
    }
    loveHeart(this.cx, this.cy, this.r)
  }
}

function loveHeart(cx, cy, r){
  r = Math.abs(r)
  beginShape();
  cy -= r/6;
  r /= 14.3;
  for(var t = 0; t < 2*PI; t += 0.2/r){
    var x = cx + r*16*Math.pow(Math.sin(t), 3);
    var y = cy - r*(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t))
    vertex(x,y)
  }
  endShape()
}
class Ball {
  constructor(x, y, r, xAcc, yAcc){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xVel = 0;
    this.yVel = 0;
    this.xAcc = xAcc;
    this.yAcc = yAcc;
  }

  changeVel(dxVel, dyVel){
    this.xVel += dxVel;
    this.yVel += dyVel;
  }

  setVel(xVel, yVel){
    this.xVel = xVel;
    this.yVel = yVel;
  }


  render(){
    this.xVel += this.xAcc;
    this.x += this.xVel;
    if(this.x > width - this.r/2){
      this.x = width - this.r/2;
      this.xVel *= -1;
    }else if(this.x < this.r/2){
      this.x = this.r/2;
      this.xVel *= -1;
    }

    this.yVel += this.yAcc;
    this.y += this.yVel;
    if(this.y > height - this.r/2){
      this.y = height - this.r/2;
      this.yVel *= -0.7;
    }else if(this.y < this.r/2){
      this.y = this.r/2;
      this.yVel *= -0.7;
    }


    ellipse(this.x, height - this.y, this.r);

  }
}
