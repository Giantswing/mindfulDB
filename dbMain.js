var entities = [];
var zoom=1;
var holdingMouse = false;
var holdingMouseTimer = 0;
var dragThreshold = 2;
var longClickThreshold = 20;
var waitUntilMouseReleased = false;
var isSomethingSelected=false;
var movingCanvas = false;
var movingCanvasDebuff = 0;
var dragging = 0;

var mainCameraX=0;
var mainCameraY=0;
var globalMouseX=0;
var globalMouseY=0;

var textpop;

var toolbarHeight=30; //the higher the value the smaller the toolbar will be
function setup(){
  textpop = new textPopup(0,0,"");
  textpop.active = false;
  var canvas = createCanvas(windowWidth-30,windowHeight-30);
  rectMode(CENTER);
  canvas.parent('myCanvas');
}

function windowResized() {
  resizeCanvas(windowWidth-30, windowHeight-30);
}

function draw(){
  background(240);

  MoveCanvas();
  globalMouseX = mouseX + mainCameraX;
  globalMouseY = mouseY + mainCameraY;
  //translate(mainCameraX,mainCameraY);

  scale(zoom);
  isSomethingSelected = false;
  for(var i = 0; i < entities.length; i++){
    entities[i].show();
    entities[i].drag();
    entities[i].specific();
    if(entities[i].selected)
      isSomethingSelected = true;
  }

  //LOGIC PART
  if(holdingMouse)
    holdingMouseTimer++;
  else
    holdingMouseTimer = 0;

  if(movingCanvasDebuff > 0){
    movingCanvasDebuff--;
    movingCanvas = false;
    dragging = 0;
  }

  if(holdingMouseTimer > longClickThreshold && waitUntilMouseReleased==false){
    longClick();
  }
  DrawGrid(20);
  DrawToolbar();
  mouseInfo();
}
function DrawGrid(size){
  stroke(0,25);
  strokeWeight(1);
  if(isSomethingSelected && holdingMouse)
  strokeWeight(2);
  for(var hor=mainCameraX%size; hor < height; hor+=size){
      line(0,hor,width,hor);
  }
  for(var vert=mainCameraY%size; vert < width; vert+=size){
    line(vert,0,vert,height);
  }

}


function DrawToolbar(){
  rectMode(CENTER);
  fill(50);
  noStroke();
  rect(width/2,height/toolbarHeight,width,height/(toolbarHeight/2));
  textAlign(RIGHT,CENTER);
  fill(255);
  textSize(height/15);
  text("mindfulDB",width-5,height/toolbarHeight);
  fill(0);
  textAlign(LEFT,CENTER);
  textSize(height/38);
  text("hold left click to open radial menu",width/200,height - height/50);
}


function mouseWheel(event){

  //DISABLED UNTIL WORKING PROPERLY
   //zoom += event.delta/200;

   zoom = constrain(zoom,0.5,2.5);
}

function mouseInfo(){
  for(var i=0; i<entities.length; i++){
  if(CheckIfWithinRange(mouseX,mouseY,entities[i].visualX-entities[i].visualWidth/2,entities[i].visualX+entities[i].visualWidth/2,
  entities[i].visualY - entities[i].visualHeight/2,entities[i].visualY + entities[i].visualHeight/2,0)){
    entities[i].cursorOver = true;
    break;
    }
    else {
      entities[i].cursorOver = false;
    }
  }
}

function mousePressed(){
  if(isSomethingSelected == false || mouseX < width - width/5){
    DeselectAll();
    holdingMouse = true;

    for(var i=0; i<entities.length;i++){
      if(entities[i].cursorOver)
        entities[i].selected = true;
    }
  }
}

function mouseReleased(){
  if(isSomethingSelected == false || mouseX < width - width/5){
  if(holdingMouseTimer < dragThreshold){
    var clickedSomething = false;
    //CODE FOR SELECTING ENTITIES
    for(var i=0; i<entities.length; i++){
      if(entities[i].cursorOver){
        DeselectAll();
        entities[i].selected = true;
        clickedSomething = true;
      }
    }
  }

    holdingMouse = false;
    waitUntilMouseReleased = false;
    movingCanvas = false;
  }
}

function longClick(){
  if(isSomethingSelected == false && movingCanvas == false){
    dragging = 0;
    movingCanvasDebuff = 5;
    waitUntilMouseReleased = true;
    entities.push(new Entity("default",mouseX - mainCameraX,mouseY - mainCameraY));
    holdingMouse = false;
    waitUntilMouseReleased = false;
    movingCanvas = false;
  }
}

function MoveCanvas(){
  dragging = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
  //first check that nothing is selected at the moment
  if(isSomethingSelected == false && holdingMouseTimer > dragThreshold && movingCanvasDebuff<=0){



    if(dragging > 2){
      //print(dragging);
      movingCanvas = true;
      mainCameraX += mouseX - pmouseX;
      mainCameraY += mouseY - pmouseY;
    }
  }
}

function CheckIfWithinRange(xCheck,yCheck,boxLeft,boxRight,boxUp,boxDown,mode){
  if(mode==0){
    if((xCheck > tp(boxLeft,0)) && (xCheck < tp(boxRight,0)) && (yCheck > tp(boxUp,1)) && (yCheck < tp(boxDown,1)))
      return true;
    else
      return false;
  }

  if(mode==1){
    if((xCheck > boxLeft) && (xCheck < boxRight) && (yCheck > boxUp) && (yCheck < boxDown))
      return true;
    else
      return false;
  }
}

function DeselectAll(){
  for(var i=0; i<entities.length; i++){
    entities[i].selected = false;
  }
}

function tp(_value,type){
  if(type == 0)
    return (_value + mainCameraX);
  else
    return (_value + mainCameraY);
}
