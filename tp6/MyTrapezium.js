/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MyTrapezium(scene, top,minS=0, maxS=1, minT=0, maxT=1) {
	CGFobject.call(this,scene);
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.top=top;
	this.trapezium2d=new MyTrapezium2D(this.scene, this.top, this.minS, this.maxS,this.minT, this.maxT);
	this.quad=new MyQuad(this.scene, this.minS, this.maxS, this.minT, this.maxT);
	this.trapezium2d.initBuffers();
	this.quad.initBuffers();
};


MyTrapezium.prototype = Object.create(CGFobject.prototype);
MyTrapezium.prototype.constructor=MyTrapezium;

MyTrapezium.prototype.display = function (){

   //Front Trapezium
   this.scene.pushMatrix();
   this.scene.translate(0,0,1);
   this.trapezium2d.display();
   this.scene.popMatrix();


   //Back Trapezium
   this.scene.pushMatrix();
   this.scene.rotate(180*degToRad,0,1,0);
   this.trapezium2d.display();
   this.scene.popMatrix();

	//BackRectangle
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.5);
	this.scene.rotate(90*degToRad,1,0,0);
	this.quad.display();
	this.scene.popMatrix();

	//Top Rectangle
	this.scene.pushMatrix();
	this.scene.translate(0,1,0.5);
	this.scene.rotate(270*degToRad,1,0,0);
	this.scene.scale(this.top, 1, 1);
	this.quad.display();
	this.scene.popMatrix();
	
	var l=Math.sqrt(1+(this.top/2-0.5)*(this.top/2-0.5));
	var d=(1+this.top)/4;
	var ang=Math.acos(1/l);
	//Right Rectangle
	this.scene.pushMatrix();
	this.scene.translate(-d,0.5,0.5);
	this.scene.rotate(270*degToRad,0,1,0);
	if(this.top>1){
		this.scene.rotate(ang,1,0,0);
	}
	else{
		this.scene.rotate(-ang,1,0,0);
	}
	this.scene.scale(1,l,1);
	this.quad.display();
	this.scene.popMatrix();

	//Left Rectangle
	this.scene.pushMatrix();
	this.scene.translate(d,0.5,0.5);
	this.scene.rotate(90*degToRad,0,1,0);
	if(this.top>1){
		this.scene.rotate(ang,1,0,0);
	}
	else{
		this.scene.rotate(-ang,1,0,0);
	}
	this.scene.scale(1,l,1);
	this.quad.display();
	this.scene.popMatrix();

}