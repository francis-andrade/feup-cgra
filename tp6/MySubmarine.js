/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var SPEED_INC=1;
var ANGULARVEL_INC=1;
var DEGREE_INC=5;
var HEIGHT_INC=0.2;
var LEME_HOR=30;
var LEME_VER=25;
var PERISCOPE_INC=0.1;

function MySubmarine(scene) {
	CGFobject.call(this,scene);
	this.x=8;
	this.z=8;
this.body= new MySubmarineBody(this.scene);

	this.degree=180*degToRad;
	this.vertical_degree=0*degToRad;
	this.orientation=0;
	this.velocity=0;
	this.high=0;

};


MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;


MySubmarine.prototype.display = function (){
	this.scene.pushMatrix();   
  
   
	this.scene.translate(this.x,this.high,this.z);
	 this.scene.translate(0, 0, 3.2);
	this.scene.rotate(this.degree,0,1,0);
	this.scene.rotate(this.vertical_degree,1,0,0);
	 this.scene.translate(0, 0, -3.2);
	this.body.display();
	this.scene.popMatrix();
	

};
MySubmarine.prototype.rotateLeft = function ()
{
	this.degree += DEGREE_INC*degToRad;
this.body.direction_leme=360 -LEME_VER;

};

MySubmarine.prototype.rotateRight = function ()
{
this.degree -= DEGREE_INC*degToRad;
this.body.direction_leme=LEME_VER;
};

MySubmarine.prototype.moveForward = function ()
{
	if(this.velocity<=5){
	this.velocity+=SPEED_INC;
	this.scene.speed+=SPEED_INC;
	this.body.increment+=ANGULARVEL_INC*360*UPDATE_SCENE;
	}


};

MySubmarine.prototype.moveBack = function ()
{
	if(this.velocity>=-5){
	this.velocity-=SPEED_INC;
	this.scene.speed-=SPEED_INC;
	this.body.increment-=ANGULARVEL_INC*360*UPDATE_SCENE;
	}

};

MySubmarine.prototype.moveUp = function ()
{
	
if(this.vertical_degree>=(-(Math.PI/4))){
this.vertical_degree-= DEGREE_INC*degToRad;
this.body.high_leme=LEME_HOR;
	}
};
MySubmarine.prototype.moveDown = function ()
{
	if(this.vertical_degree<=(Math.PI/4)){
this.vertical_degree+= DEGREE_INC*degToRad;
	
this.body.high_leme=360-LEME_HOR;
	}
};

MySubmarine.prototype.resetdirectionLeme =function ()
{
	this.body.direction_leme=0;;
};

MySubmarine.prototype.resethighLeme =function ()
{
	this.body.high_leme=0;;
};	

MySubmarine.prototype.periscopeUp=function(){
	if(this.body.periscope_height<0.5){
		this.body.periscope_height+=PERISCOPE_INC;
	}
};

MySubmarine.prototype.periscopeDown=function(){
	if(this.body.periscope_height>-0.3){
		this.body.periscope_height-=PERISCOPE_INC;
	}
};


MySubmarine.prototype.update= function (currTime)
{

	

	this.x+=this.velocity*Math.sin(this.degree)*UPDATE_SCENE;
	this.z+=this.velocity*Math.cos(this.degree)*UPDATE_SCENE;
	this.high+=this.velocity*Math.tan(-this.vertical_degree)*UPDATE_SCENE;
	 	
	this.body.update();	

	

};
