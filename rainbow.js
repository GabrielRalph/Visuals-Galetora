
class Rainbow {
  constructor(divisions, width){
    if(!width){
      width = divisions
    }
    this.divisions = divisions;
    this.colorDivider = Math.round(width/divisions);
    this.counter = 0;
    this.colorx = 0;

  }
  inc(){
    this.counter++;
    this.colorx += this.counter%this.colorDivider==0?1:0;
    this.colorx *= this.colorx == this.divisions+1?0:1;
  }
  set(opt, ...funcs){
    colorMode(HSB, this.divisions);
    if(opt){
      for(var i in opt){
        if(funcs.length == 0) funcs.push((x, y) => {return x});
        if(opt[i] == 'f')fill(funcs.pop()(this.colorx, this.divisions), this.divisions, this.divisions);
        if(opt[i] == 's')stroke(funcs.pop()(this.colorx, this.divisions), this.divisions, this.divisions);
      }
    }else{
      fill(this.colorx, this.divisions, this.divisions);
    }
  }
}
