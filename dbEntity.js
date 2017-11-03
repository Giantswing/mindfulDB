//entity class
function Entity(_entity_name,_x,_y){
  this.visualX = _x;
  this.visualY = _y;
  this.entity_name = prompt("Entity name?","default");
  this.selected = false;
  this.cursorOver = false;
  this.visualWidth = textWidth(this.entity_name) + 35;
  this.visualHeight = 50;



  this.drag = function(){
    if(this.cursorOver == true && holdingMouseTimer > dragThreshold && movingCanvasDebuff<=0){
      this.visualX = mouseX - mainCameraX;
      this.visualY = mouseY - mainCameraY;
    }
  }

  this.show = function(){
    //set white background and black borders
    fill(255);

    if(this.selected == false){
      stroke(0);
      strokeWeight(1*zoom);
    }
    else{
      stroke(100,0,255);
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