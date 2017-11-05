//relation class
function Relation(){
  this.entity1;
  this.entity2;
  this.newRelation = function(_entity1,_entity2){
    this.entity1 = _entity1;
    this.entity2 = _entity2;
  }

  this.show = function(){
    noFill();
    stroke(0);
    strokeWeight(3);
    line(_entity1.visualX,_entity1.visualY,_entity2.visualX,_entity2.visualY);
  }
}
