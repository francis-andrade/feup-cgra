var BASECYLINDER_HEIGHT=4.08; //MANDATORY

var SEMISHPERE_DEPTH=0.46;    //MANDATORY
var SEMISPHERE_WIDTH=0.73;    //MANDATORY
var SEMISPHERE_HEIGHT=1.2173; //SCALE

var FINBACKVER_HEIGHTFRONT=1.64; //MANDATORY
var FINBACKVER_HEIGHTBACK=2.34; //MANDATORY
var FINBACKVER_LENGTH=0.2499; //SCALE
var FINBACKVER_WIDTH=0.075; //SCALE

var FINBACKHOR_WIDTHFRONT=1.45; //SCALE
var FINBACKHOR_WIDTHBACK=2.1;   //SCALE
var FINBACKHOR_HEIGHT=0.1; //SCALE
var FINBACKHOR_LENGTH=0.2499; //SCALE
var FINBACKHOR_STARTZ=SEMISPHERE_HEIGHT/2-FINBACKHOR_HEIGHT/2;

function MyTorpedoBody(scene) {
	CGFobject.call(this,scene);
	this.triangle=new MyTriangle(this.scene);
	this.basecylinder=new MyCylinder(this.scene, 80, 1);
	this.backsemisphere=new MyLamp(this.scene, 80, 80);
	this.frontsemisphere=new MyLamp(this.scene, 80, 80);
	this.fintower=new MyTrapezium(this.scene, FINTOWER_WIDTHFRONT/FINTOWER_WIDTHBACK);
	this.finbackver=new MyTrapezium(this.scene, FINBACKVER_HEIGHTFRONT/FINBACKVER_HEIGHTBACK);
	this.finbackhor=new MyTrapezium(this.scene, FINBACKHOR_WIDTHFRONT/FINBACKHOR_WIDTHBACK);
};

MyTorpedoBody.prototype = Object.create(CGFobject.prototype);
MyTorpedoBody.prototype.constructor=MyTorpedoBody;



MyTorpedoBody.prototype.display = function (){
	//Base cylinder
	this.scene.pushMatrix();
 	this.scene.scale(SEMISPHERE_WIDTH/2,SEMISPHERE_HEIGHT/2,BASECYLINDER_HEIGHT);
 	//this.scene.axis.display();
 	//this.triangle.display();
 	this.basecylinder.display();
 	this.scene.popMatrix();

 	//Back semisphere
 	this.scene.pushMatrix();
 	this.scene.rotate(180*degToRad,0,1,0);
 	this.scene.scale(SEMISPHERE_WIDTH/2,SEMISPHERE_HEIGHT/2,SEMISHPERE_DEPTH);
 	this.backsemisphere.display();
 	this.scene.popMatrix();

 	//Front semisphere
 	this.scene.pushMatrix();
	this.scene.translate(0,0,BASECYLINDER_HEIGHT);
 	this.scene.scale(SEMISPHERE_WIDTH/2,SEMISPHERE_HEIGHT/2,SEMISHPERE_DEPTH);
 	this.backsemisphere.display();
 	this.scene.popMatrix();

 	//FINBACKVER
	this.scene.pushMatrix();
	this.scene.translate(0-FINBACKVER_WIDTH/2,0,0-FINBACKVER_LENGTH);
	
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.rotate(90*degToRad,0,1,0);
 	this.scene.scale(FINBACKVER_HEIGHTBACK, FINBACKVER_LENGTH, FINBACKVER_WIDTH);
	this.finbackver.display();
	//this.scene.axis.display();
 	this.scene.popMatrix();

 	//FINBACKHOR
	this.scene.pushMatrix();
	this.scene.translate(0,FINBACKHOR_STARTZ-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(0,0,0-FINBACKHOR_LENGTH);
	
 	this.scene.rotate(270*degToRad,1,0,0);
 	this.scene.rotate(180*degToRad,0,0,1);
 	//this.scene.axis.display();
 	this.scene.scale(FINBACKHOR_WIDTHBACK, FINBACKHOR_LENGTH, FINBACKHOR_HEIGHT);
	this.finbackhor.display();
	//this.scene.axis.display();
 	this.scene.popMatrix();

}