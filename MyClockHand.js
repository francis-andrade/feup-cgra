

function MyClockHand(scene, length, angle) {
 	CGFobject.call(this,scene);

    this.angle = angle;
	this.length = length;

 	this.initBuffers();
 };
 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.initBuffers = function(){
this.vertices = [];
 	this.indices = [];
	this.normals = [];

	this.vertices.push(0,this.length,0);
	this.vertices.push(0.02,0,0);
	this.vertices.push(-0.02,0,0);

	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);

	this.indices.push(0,2,1);
		
  	this.primitiveType=this.scene.gl.TRIANGLES;
   	this.initGLBuffers();

 };
 MyClockHand.prototype.setAngle = function(ang){
    this.angle = ang;
};
