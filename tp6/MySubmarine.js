/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MySubmarine(scene) {
	CGFobject.call(this,scene);
	this.x=0;
	this.z=0;
	this.triangle=new MyTriangle(this.scene);
	this.degree=0;
	this.orientation=0;
};


MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;


MySubmarine.prototype.display = function (){
	this.scene.pushMatrix();
 		this.scene.translate(this.x,0,this.z);
 	this.scene.rotate(this.degree,0,1,0);
 	this.triangle.display();
 	this.scene.popMatrix();

};
MySubmarine.prototype.rotateLeft = function ()
{
	this.degree += 90*degToRad;
	if(this.orientation==3)
	this.orientation=0;
	else 
	this.orientation++;

};

MySubmarine.prototype.rotateRight = function ()
{
this.degree -= 90*degToRad;
if(this.orientation==0)
	this.orientation=3;
	else 
	this.orientation--;
};

MySubmarine.prototype.moveForward = function ()
{
	if(this.orientation==0)
	this.z++;
	else if(this.orientation==1)
	this.x++;
	else if(this.orientation==2)
	this.z--;
	else
	this.x--;

	

};

MySubmarine.prototype.moveBack = function ()
{
	if(this.orientation==0)
	this.z--;
	else if(this.orientation==1)
	this.x--;
	else if(this.orientation==2)
	this.z++;
	else
	this.x++;
	
};


