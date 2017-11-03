function textPopup(_x,_y,_question){
  this.popX = _x;
  this.popY = _y;
  this.question = _question;
  this.active = false;
  this.popWidth = 100;

  this.show = function(){
    noStroke();
    fill(240);
    rectMode(CENTER);
    rect(this.popX,this.popY,this.popWidth,40);

    
  }
}
