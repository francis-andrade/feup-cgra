function MyParticle(scene, ) {
	CGFobject.call(this,scene);
	this.sphere=new MyLamp(this.scene, 80, 80);
};

MyParticle.prototype = Object.create(CGFobject.prototype);
MyParticle.prototype.constructor=MyParticle;



MyParticle.prototype.display = function (){
     	this.scene.pushMatrix();
     	this.scene.explosionAppearance.apply();
	 	this.sphere.display();
	 	this.scene.rotate(180*degToRad, 0, 1, 0);
	 	this.sphere.display();
	 	this.scene.materialDefault.apply();
     	this.scene.popMatrix();

}




