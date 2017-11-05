function RadialMenu(){
this.xx = 0;
this.yy = 0;
this.size = 0;
this.sizeTo = (displayWidth * displayHeight) / 12000;
this.active = false;
this.options=2;
this.thickness = this.sizeTo/2;
this.xDist;
this.yDist;
this.xSize;
this.ySize;
this.optionSelected=0;
this.startAngle = 0;
this.angleTo = 0;
this.description = "";

this.selectOption = function(){
  if(mouseX > this.xx){
    this.optionSelected = 0;
    this.angleTo = 270;
    this.description = "Crear entidad";
  }
  else {
    this.optionSelected = 1;
    this.angleTo = 90;
    this.description = "Crear relación";
  }
}


this.show = function(){
if(this.active){
  this.selectOption();
  this.startAngle += (this.angleTo - this.startAngle)*0.2;
  this.size += (this.sizeTo - this.size) * 0.25;
  noFill();


  this.xDist = abs(this.xx - mouseX);
  this.yDist = abs(this.yy - mouseY);
  this.xSize = this.size + this.xDist * 0.1;
  this.ySize = this.size + this.yDist * 0.1;
  strokeWeight(this.thickness*0.1);
  stroke(255, 153, 51,255);
  arc(this.xx,this.yy,this.xSize*1.5,this.ySize*1.5,radians(this.startAngle),radians(this.startAngle+180));

  strokeWeight(this.thickness);
  stroke(50,150);
  ellipse(this.xx,this.yy,this.xSize,this.ySize);

  strokeWeight(this.thickness*0.95);
  stroke(255,100);
  ellipse(this.xx,this.yy,this.xSize,this.ySize);

  strokeWeight(2);
  stroke(255,100);
  line(this.xx,this.yy-this.size/2+this.thickness/2,this.xx,this.yy-this.size/2-this.thickness/2);
  line(this.xx,this.yy+this.size/2-this.thickness/2,this.xx,this.yy+this.size/2+this.thickness/2);

  //draw entity symbol
  fill(255,200);
  noStroke();
  rectMode(CENTER);
  rect(this.xx + this.xSize/2,this.yy,this.xSize/5,this.ySize/10,4,4,4,4);


  fill(0,200);
  stroke(255,200);
  strokeWeight(4);
  textSize(this.size/5);
  textAlign(CENTER,CENTER);
  text(this.description,this.xx,this.yy+this.ySize)
}
}

this.begin = function(_x,_y){
this.xx = _x;
this.yy = _y;
this.active = true;
this.size = 0;
}
}
