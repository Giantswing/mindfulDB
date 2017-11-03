//entity class
function Entity(_entity_name,_x,_y){
  this.visualX = _x;
  this.visualY = _y;
  this.entity_name = prompt("Entity name?","default");
  this.selected = false;
  this.visualWidth = textWidth(this.entity_name) + 35;
  this.visualHeight = 50;


  this.drag = function(){
    if(this.selected == true && holdingMouseTimer > dragThreshold){
      this.visualX = mouseX - mainCameraX;
      this.visualY = mouseY - mainCameraY;
    }
  }

  this.show = function(){
    //set white background and black borders
    fill(255);

    if(this.selected == false){
      stroke(0);
      strokeWeight(2*zoom);
    }
    else{
      stroke(100,0,255);
        strokeWeight(4*zoom);
    }

    rectMode(CENTER); //draw the rectangle in the center of its position
    if(this.entity_name == "default")
      this.visualWidth = 75;
    rect(tp(this.visualX,0), tp(this.visualY,1), this.visualWidth, this.visualHeight);

    //setting up the text
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0);
    textSize(20);
    text(this.entity_name,tp(this.visualX,0),tp(this.visualY,1));

  }
}
