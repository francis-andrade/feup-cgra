/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */



function MySubmarine(scene) {
	CGFobject.call(this,scene);
	this.x=0;
	this.z=0;
this.body= new MySubmarineBody(this.scene);

	this.degree=0*degToRad;
	this.orientation=0;
	this.velocity=0;
	this.high=0;
};


MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;


MySubmarine.prototype.display = function (){
	this.scene.pushMatrix();

	
	this.scene.translate(this.x,this.high,this.z);
	this.scene.rotate(this.degree,0,1,0);
	this.body.display();
	this.scene.popMatrix();
	

};
MySubmarine.prototype.rotateLeft = function ()
{
	this.degree += 5*degToRad;
this.body.direction_leme=360 -25;

};

MySubmarine.prototype.rotateRight = function ()
{
this.degree -= 5*degToRad;
this.body.direction_leme=25;
};

MySubmarine.prototype.moveForward = function ()
{
	this.velocity+=0.5;
	this.body.increment+=36;


};

MySubmarine.prototype.moveBack = function ()
{
	this.velocity-=0.5;
	this.body.increment-=36;

};

MySubmarine.prototype.moveUp = function ()
{
this.high+=0.2;
this.body.high_leme=30;
};
MySubmarine.prototype.moveDown = function ()
{
this.high-=0.2;
this.body.high_leme=360-30;
};

MySubmarine.prototype.resetdirectionLeme =function ()
{
	this.body.direction_leme=0;;
};

MySubmarine.prototype.resethighLeme =function ()
{
	this.body.high_leme=0;;
};	

MySubmarine.prototype.update= function (currTime)
{

	

	this.x+=this.velocity*Math.sin(this.degree);
	this.z+=this.velocity*Math.cos(this.degree);
	this.body.update();

	

	

};
