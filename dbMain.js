var entities = [];
var zoom=1;
var holdingMouse = false;
var holdingMouseTimer = 0;
var dragThreshold = 10;
var longClickThreshold = 30;
var waitUntilMouseReleased = false;
var isSomethingSelected=false;
var movingCanvas = false;
var movingCanvasDebuff = 0;
var dragging = 0;

var mainCameraX=0;
var mainCameraY=0;
var globalMouseX=0;
var globalMouseY=0;


function setup(){
  var canvas = createCanvas(800,500);
  rectMode(CENTER);
  canvas.parent('myCanvas');
}

function draw(){
  background(200);
  MoveCanvas();
  globalMouseX = mouseX + mainCameraX;
  globalMouseY = mouseY + mainCameraY;
  //translate(mainCameraX,mainCameraY);

  scale(zoom);
  isSomethingSelected = false;
  for(var i = 0; i < entities.length; i++){
    entities[i].show();
    entities[i].drag();
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

}

function mouseWheel(event){

  //DISABLED UNTIL WORKING PROPERLY
   //zoom += event.delta/200;

   zoom = constrain(zoom,0.5,2.5);
}

function mousePressed(){
  DeselectAll();
  holdingMouse = true;

  for(var i=0; i<entities.length;i++){
    if(CheckIfWithinRange(mouseX,mouseY,entities[i].visualX-entities[i].visualWidth/2,entities[i].visualX+entities[i].visualWidth/2,
    entities[i].visualY - entities[i].visualHeight/2,entities[i].visualY + entities[i].visualHeight/2)){
      DeselectAll();
      entities[i].selected = true;
    }
  }

}

function mouseReleased(){
  if(holdingMouseTimer < dragThreshold){
    var clickedSomething = false;
    //CODE FOR SELECTING ENTITIES
    for(var i=0; i<entities.length;i++){
      if(CheckIfWithinRange(mouseX,mouseY,entities[i].visualX-entities[i].visualWidth/2,entities[i].visualX+entities[i].visualWidth/2,
      entities[i].visualY - entities[i].visualHeight/2,entities[i].visualY + entities[i].visualHeight/2)){
        DeselectAll();
        entities[i].selected = true;
        clickedSomething = true;
      }
    }
    /*
    if(clickedSomething == false )
      entities.push(new Entity("default",globalMouseX,globalMouseY));
    */
    }

    holdingMouse = false;
    waitUntilMouseReleased = false;
    movingCanvas = false;
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
  //first check that nothing is selected at the moment
  if(isSomethingSelected == false && holdingMouseTimer > dragThreshold && movingCanvasDebuff<=0){
    dragging = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
    print(dragging);

    if(dragging > 2){
      movingCanvas = true;
      mainCameraX += mouseX - pmouseX;
      mainCameraY += mouseY - pmouseY;
    }
  }
}

function CheckIfWithinRange(xCheck,yCheck,boxLeft,boxRight,boxUp,boxDown){
  if((xCheck > tp(boxLeft,0)) && (xCheck,0 < tp(boxRight,0)) && (yCheck > tp(boxUp,1)) && (yCheck < tp(boxDown,1)))
    return true;
  else
    return false;

/*
    if((tp(xCheck,0) > tp(boxLeft,0)) && (tp(xCheck,0) < tp(boxRight,0)) && (tp(yCheck,1) > tp(boxUp,1)) && (tp(yCheck,1) < tp(boxDown,1)))
      return true;
    else
      return false;
*/
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
