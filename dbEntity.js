//entity class
function Entity(_entity_name,_x,_y){
  this.visualX = _x;
  this.visualY = _y;
  this.entity_name = prompt("Entity name?","default");
  this.selected = false;
  this.cursorOver = false;
  this.visualWidth = textWidth(this.entity_name) + 35;
  this.visualHeight = 35;

  this.myAttributes = [];


  this.debuf;
  this.drag = function(){
    if(this.cursorOver == true && holdingMouseTimer > dragThreshold && movingCanvasDebuff<=0){
      this.visualX = mouseX - mainCameraX;
      this.visualY = mouseY - mainCameraY;
    }
  }

  this.specific = function(){
    if(this.selected){
    fill(80,80,255,50);
    rectMode(CORNER);
    noStroke();
    this.roundness=10;
    this.horSize = width/3;
    this.xx = width - this.horSize*1.025*this.debuff;
    this.yy = (height/toolbarHeight)*2.5;
    rect(this.xx , this.yy,this.horSize,height - height/80,10);


    ///ELEMENTS
    textSize(width/60);
    textAlign(LEFT,CENTER);
    fill(0);
    text("Nombre: ",this.xx + width/80,this.yy + height/30);
    textAlign(RIGHT,CENTER);
    //fill(255,102,0);

    fill(35);
    if(CheckIfWithinRange(mouseX,mouseY,width - width/80 - this.namesize,width - width/80,this.yy +height/30-height/45,this.yy + height/30+height/45,1))
      fill(255,102,0);

    text(this.entity_name,width - width/50,this.yy + height/30);

    //CHANGE NAME
    this.namesize = textWidth(this.entity_name);
    //rect(width - width/80 - this.namesize,this.yy +height/30-20,30,30);
    }
  }

  this.show = function(){
    if(this.selected == false)
      this.debuff = 0;


    this.debuff += (1-this.debuff) * 0.4;
    //set white background and black borders
    fill(255);

    if(this.selected == false){
      stroke(0);
      strokeWeight(1*zoom);
    }
    else{
      stroke(40,40,255);
        strokeWeight(3*zoom);
    }
    if(this.cursorOver)
      fill(200);

    rectMode(CENTER); //draw the rectangle in the center of its position
    if(this.entity_name == "default")
      this.visualWidth = 75;
    rect(tp(this.visualX,0), tp(this.visualY,1), this.visualWidth, this.visualHeight,10,10,10,10);

    //setting up the text
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0);
    textSize(20);
    text(this.entity_name,tp(this.visualX,0),tp(this.visualY,1));

  }
}
