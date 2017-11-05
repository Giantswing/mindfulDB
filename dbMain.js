var entities = [];
var zoom=1;
var holdingMouse = false;
var holdingMouseTimer = 0;
var dragThreshold = 2;
var longClickThreshold = 10;
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

var radMenu;

function setup(){
  textpop = new textPopup();
  radMenu = new RadialMenu();
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
    if(entities[i].selected)
      isSomethingSelected = true;
  }

  for(var i= 0; i< entities.length; i++){
    entities[i].specific();
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
  textpop.show();
  radMenu.show();

  DrawToolbar();
  //DrawRoundBorders();
  mouseInfo();

  //
  //

  deleting();
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
    //strokeWeight(2);
    stroke(0,25);
    line(vert,0,vert,height);

    /*
    stroke(0,100);
    strokeWeight(2);
    line(vert/2,hor,-vert,height);
    */
  }

}

function DrawToolbar(){
  rectMode(CENTER);
  fill(0);
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

function DrawRoundBorders(){
  noFill();
  stroke(0,0,0);
  strokeWeight(12);
  arc(width/90,height-height/45,(width/6)*0.2,(height/3)*0.2,HALF_PI, PI);
  strokeWeight(2);
}

function keyTyped(){
  if(textpop.active){
    //if(textSize(textpop.answer)<1000)
      textpop.answer += key;
    }
}

function keyPressed(){
  if(textpop.active){
  if(keyCode == 8  || keyCode == 46)
  textpop.answer = textpop.answer.substring(0,textpop.answer.length-1);
  if(keyCode == 13){
    textpop.accept();
  }
  }
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
  if(CheckIfWithinRange(mouseX,mouseY,textpop.popX-textpop.popWidth/2,textpop.popX+textpop.popWidth/2,textpop.popY - (height/10)/2,textpop.popY + (height/10)/2,1) == false){
    //print("aa");
    textpop.deActivate();
  }

  if(radMenu.active){
    if(dist(radMenu.xx,radMenu.yy,mouseX,mouseY) > radMenu.size*1.05){
      radMenu.active = false;
    }
    else{
      if(radMenu.optionSelected == 0){
        entities.push(new Entity("default",mouseX - mainCameraX,mouseY - mainCameraY));
        radMenu.active = false;
      }
    }
  }

  if(isSomethingSelected == false || mouseX < width - width/3){
    DeselectAll();
    holdingMouse = true;

    for(var i=0; i<entities.length;i++){
      if(entities[i].cursorOver){
        entities[i].selected = true;
        entities[i].hide = false;
      }
    }
  }
}

function mouseReleased(){
  if(isSomethingSelected == false || mouseX < width - width/5){
  if(holdingMouseTimer < dragThreshold){
    var clickedSomething = false;
    //CODE FOR SELECTING ENTITIES
    for(var i=0; i<entities.length; i++){
      if(entities[i].cursorOver && entities[i].selected == false){
        DeselectAll();
        entities[i].selected = true;
        clickedSomething = true;
      }
    }
  }
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

    //entities.push(new Entity("default",mouseX - mainCameraX,mouseY - mainCameraY));
    radMenu.begin(mouseX,mouseY);


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
    if(entities[i].selected)
      entities[i].hide = true;

  }
}

function tp(_value,type){
  if(type == 0)
    return (_value + mainCameraX);
  else
    return (_value + mainCameraY);
}

function deleting(){
        for(var i=0; i<entities.length;i++){
          if(entities[i].destroy && entities[i].debuff < 0.1)
            entities.splice(i,1);
        }
}
