//entity class
function Entity(_entity_name,_x,_y){
  this.visualX = _x;
  this.visualY = _y;
  this.obj_name = "entidad #" + (entities.length+1);
  textpop.start(mouseX,mouseY+height/12,"Nombre: ",this);
  this.auxString = "";

  this.selected = false;
  this.cursorOver = false;
  this.visualHeight = 35;
  this.hide = false;
  this.destroy = false;
  this.myAttributes = [];

  this.debuff=0;

  this.drag = function(){
    if(this.cursorOver == true && holdingMouseTimer > dragThreshold && movingCanvasDebuff<=0 && dragging > 1){
      this.visualX = mouseX - mainCameraX;
      this.visualY = mouseY - mainCameraY;
    }
  }

  this.specific = function(){
    if(this.selected){
    fill(254, 230, 154,180);
    rectMode(CORNER);
    stroke(0,55);

    this.roundness=10;
    this.horSize = width/3;
    this.xx = width - this.horSize*1.025*this.debuff;
    this.yy = (height/toolbarHeight)*2.5;
    rect(this.xx , this.yy,this.horSize,height - height/80,10);
    noStroke();
    ///ELEMENTS
    textSize(width/60);
    textAlign(LEFT,CENTER);
    fill(0);
    text("Nombre: ",this.xx + width/80,this.yy + height/30);
    textAlign(RIGHT,CENTER);
    //fill(255,102,0);

    fill(35);
      //CHANGE NAME
      this.namesize = textWidth(this.obj_name);
    if(CheckIfWithinRange(mouseX,mouseY,width - width/80 - this.namesize,width - width/80,this.yy +height/30-height/45,this.yy + height/30+height/45,1)){
      fill(255,102,0);
      if(mouseIsPressed && textpop.active == false){
        //textpop.start(width - width/80 - this.namesize, this.yy + height/30,"");
        textpop.start(mouseX,mouseY+height/12,"Cambiar nombre: ",this);
      }
    }

    text(this.obj_name,width - width/50,this.yy + height/30);

    ////////
    fill(0);
    textAlign(LEFT,CENTER);
    text("Arguments:",this.xx + width/80,this.yy+height/12);

    //DELETE BUTTON
    noStroke();
    fill(250,50,50);
    if(CheckIfWithinRange(mouseX,mouseY,width - width/8 * this.debuff, width, height- height/15,height-height/80,1)){
      if(mouseIsPressed){
        this.destroy = true;
        this.hide = true;
      }

      fill(255,90,30);
      stroke(255);
    }

    rectMode(CORNER);
    rect(width - width/8 * this.debuff,height - height/15,width/6,height/20,100,1,1,100);

    noStroke();
    fill(250);
    textAlign(LEFT, CENTER);
    text("ELIMINAR",width - width/12 * this.debuff,height - height/25);
    //rect(width - width/80 - this.namesize,this.yy +height/30-20,30,30);
    }
  }

  this.changeName = function(_newname){
    this.obj_name = _newname;
  }

  this.show = function(){
    this.visualWidth = textWidth(this.obj_name) + 35;
    //this.visualWidth = 100;
    //this.visualWidth = this.obj_name.length * 20;

    if(this.selected == true){
      if(this.hide == false){
        this.debuff += (1-this.debuff) * 0.4;
      }
      else {
        this.debuff += -this.debuff * 0.4;
        if(this.debuff <= 0.1){
          this.selected = false;
        }
      }
    }

    rectMode(CENTER); //draw the rectangle in the center of its position
    noStroke();

    fill(0,40);
    rect(tp(this.visualX*1.01,0), tp(this.visualY*1.015,1), this.visualWidth, this.visualHeight,5,5,5,5);
    fill(255);
    if(this.selected == false){
      stroke(0,200);
      strokeWeight(1*zoom);
    }
    else{
      stroke(40,40,255);
        strokeWeight(3*zoom);
    }
    if(this.cursorOver)
      fill(200);


    rect(tp(this.visualX,0), tp(this.visualY,1), this.visualWidth, this.visualHeight,5,5,5,5);

    //setting up the text
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0);
    textSize(20);
    text(this.obj_name,tp(this.visualX,0),tp(this.visualY,1));

  }
}
