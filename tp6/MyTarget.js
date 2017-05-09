function MyTarget(scene, x, y, z, size) {
	CGFobject.call(this,scene);
	this.sphere=new MyLamp(this.scene, 80, 80);
	this.cylinder=new MyCylinder(this.scene, 80, 1);
	this.x=x;
	this.y=y;
	this.z=z;
	this.size=size;
	this.destroyed=0;
	this.sphere.initBuffers();
	this.cylinder.initBuffers();
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

var SPINE_LENGTH=0.7;
var SPINE_START=0.9;
var SPINE_RADIUS=0.1;

MyTarget.prototype.display = function (){
	if(this.destroyed==0){
	this.scene.translate(this.x, this.y, this.z);
	this.scene.scale(this.size, this.size, this.size);
	//SHERE
	this.scene.pushMatrix();
	this.sphere.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.rotate(180*degToRad, 0, 1, 0);
	this.sphere.display();
	this.scene.popMatrix();
	
	//POSTIVE ZZ SPINE
	this.scene.pushMatrix();
	this.scene.translate(0,0,SPINE_START);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_LENGTH);
	this.cylinder.display();
	this.scene.popMatrix();

	
	this.scene.pushMatrix();
	this.scene.translate(0,0,SPINE_START+SPINE_LENGTH);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_RADIUS);
	this.sphere.display();
	this.scene.popMatrix();

	//NEGATIVE ZZ SPINE
	this.scene.pushMatrix();
	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.translate(0,0,SPINE_START);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_LENGTH);
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.translate(0,0,SPINE_START+SPINE_LENGTH);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_RADIUS);
	this.sphere.display();
	this.scene.popMatrix();

	//POSITIVE XX SPINE
	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.translate(0,0,SPINE_START);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_LENGTH);
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.translate(0,0,SPINE_START+SPINE_LENGTH);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_RADIUS);
	this.sphere.display();
	this.scene.popMatrix();

	//NEGATIVE XX SPINE
	this.scene.pushMatrix();
	this.scene.rotate(270*degToRad,0,1,0);
	this.scene.translate(0,0,SPINE_START);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_LENGTH);
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(270*degToRad,0,1,0);
	this.scene.translate(0,0,SPINE_START+SPINE_LENGTH);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_RADIUS);
	this.sphere.display();
	this.scene.popMatrix();

	//NEGATIVE YY SPINE
	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.translate(0,0,SPINE_START);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_LENGTH);
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.translate(0,0,SPINE_START+SPINE_LENGTH);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_RADIUS);
	this.sphere.display();
	this.scene.popMatrix();

	//POSITIVE YY SPINE
	this.scene.pushMatrix();
	this.scene.rotate(270*degToRad,1,0,0);
	this.scene.translate(0,0,SPINE_START);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_LENGTH);
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(270*degToRad,1,0,0);
	this.scene.translate(0,0,SPINE_START+SPINE_LENGTH);
	this.scene.scale(SPINE_RADIUS, SPINE_RADIUS, SPINE_RADIUS);
	this.sphere.display();
	this.scene.popMatrix();
	}


}