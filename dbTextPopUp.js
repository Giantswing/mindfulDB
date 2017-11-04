function textPopup(){
  this.popX = 0;
  this.popY = 0;
  this.question = "";
  this.active = false;
  this.popWidth = 100;
  this.answer = "";
  this.showcursor = -1;
  this.target;

  this.start = function(_x,_y,_question,_target){
    this.active = true;
    this.popX = _x;
    this.popY = _y;
    this.question = _question;
    this.answer = "";
    this.showcursor = 0;
    this.target = _target;
    print(this.target.obj_name);
    print(this.target);
  }

  this.deActivate = function(){
    this.active = false;
    this.answer = "";
  }

  this.accept = function(){
    if(this.target == -1){
      return this.answer;
    }
    else if(this.target){
      if(this.answer != ""){
        this.target.changeName(this.answer);
        //this.target.obj_name = this.answer;
      }
    }
    this.deActivate();
  }

  this.show = function(){
    if(this.active){
      if(this.showcursor >= 0){
        this.showcursor += 0.1;
      }

      if(this.popX + this.popWidth/2 > width)
        this.popX -= 10;
      if(this.popX - this.popWidth/2 < 0)
        this.popX += 10;

      this.popWidth = max((textWidth(this.answer))*1.08+(width/25),textWidth(this.question),width/10);
      noStroke();
      rectMode(CENTER);
      fill(0,40);
      rect(this.popX+width/80,this.popY+height/60,this.popWidth,height/10,height/45,height/145,height/45,height/155);
      fill(240);
      rect(this.popX,this.popY,this.popWidth,height/10,height/45,height/145,height/45,height/155);
      noStroke();
      textSize((width*height)/80000);
      textAlign(LEFT,CENTER);
      fill(100);
      text(this.question,this.popX-this.popWidth/2+width/90,this.popY-height/70);
      fill(0);
      textSize((width*height)/50000);
      if(sin(this.showcursor) > 0)
        text(this.answer,this.popX-this.popWidth/2+width/90,this.popY+height/70);
      else {
        text(this.answer + "|",this.popX-this.popWidth/2+width/90,this.popY+height/70);
      }

      /*
      if(textWidth(this.answer)>1){
        fill(40,180,40);
        rectMode(CENTER);
        rect(this.popX + this.popWidth/2 + width/40,this.popY,width/35,height/25);
      }
      */
    }
  }

}
