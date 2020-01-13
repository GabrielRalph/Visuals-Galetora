class MovingData {
  constructor(){
    this.K = this.n = this.Ex = this.Ex2 = 0.0;
  }
  add(x){
    if(this.n == 0) this.K = x;
    this.n ++;
    this.Ex += (x - this.K);
    this.Ex2 += (x - this.K)*(x - this.K);
  }
  remove(x){
    this.n --;
    this.Ex -= (x - this.K);
    this.Ex2 -= (x - this.K)*(x - this.K);
  }
  mean(){
    return this.K + this.Ex / this.n;
  }
  var(){
    return (this.Ex2 - (this.Ex*this.Ex)/this.n)/(this.n - 1)
  }
}

class Signal{
  constructor(buffLength){
    this.buffLength = buffLength;
    this.buffer = new Array(buffLength).fill(0);
    this.movingData = new MovingData();
    this.movingData.n = this.buffLength;
    this.lastMean = 0;
    this.lastVar = 0;
    this.lastMedian = 0;
  }
  add(value){
    this.buffer.unshift(value);
    this.movingData.add(value);
    this.movingData.remove(this.buffer.pop());
  }

  mean(){
    this.lastMean = this.movingData.mean();
    return this.lastMean
  }

  var(){
    this.lastVar = this.movingData.var();
    return this.lastVar
  }

  dif(){
    return this.mean() - this.buffer[0]
  }

  median(){
    var temp = this.buffer.slice();
    this.lastMedian = temp.sort((a,b)=>{return a-b})[Math.round((this.buffLength-1)/2)];
    return this.lastMedian
  }

  lastMean(){
    return this.lastMean
  }

  lastVar(){
    return this.lastVar
  }

  lastMedian(){
    return this.lastMedian
  }
}
