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
};


MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;


MySubmarine.prototype.display = function (){
	this.scene.pushMatrix();

	
	this.scene.translate(this.x,0,this.z);
	this.scene.rotate(this.degree,0,1,0);
	this.body.display();
	this.scene.popMatrix();
	

};
MySubmarine.prototype.rotateLeft = function ()
{
	this.degree += 5*degToRad;


};

MySubmarine.prototype.rotateRight = function ()
{
this.degree -= 5*degToRad;
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

MySubmarine.prototype.update= function (currTime)
{

	

	this.x+=this.velocity*Math.sin(this.degree);
	this.z+=this.velocity*Math.cos(this.degree);
	this.body.update();

	

	

};
