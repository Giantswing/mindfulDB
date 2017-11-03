var entities = [];

function setup(){
  var canvas = createCanvas(800,500);
  canvas.parent('myCanvas');
}

function draw(){
  background(200);
  for(var i = 0; i < entities.length; i++){
    entities[i].show();
  }
}

function mousePressed(){
  entities.push(new Entity("default",mouseX,mouseY));
}

//entity class
function Entity(_entity_name,_x,_y){
  this.visualX = _x;
  this.visualY = _y;
  this.entity_name = prompt("Entity name?","default");
  this.selected = false;
  this.visualWidth = textWidth(this.entity_name) + 35;
  this.visualHeight = 50;


  this.show = function(){
    //set white background and black borders
    fill(255);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER); //draw the rectangle in the center of its position
    if(this.entity_name == "default")
      this.visualWidth = 75;
    rect(this.visualX, this.visualY, this.visualWidth, this.visualHeight);

    //setting up the text
    textAlign(CENTER,CENTER);
    noStroke();
    fill(0);
    textSize(20);
    text(this.entity_name,this.visualX,this.visualY);

  }
}
