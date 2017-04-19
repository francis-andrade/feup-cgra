/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);	
	this.slices = slices;
	this.stacks = stacks;
	this.updated = -1;	

 	this.cylinder = new MyCylinder(this.scene, slices, stacks);
	this.cylinder.initBuffers();
	this.circle =new MyCircle(this.scene,slices);
	this.clockAppearance=new CGFappearance(this.scene);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	this.hourHand = new MyClockHand(this.scene, 0.4, 90);
	this.minuteHand = new MyClockHand(this.scene, 0.7, 180);
    this.secondHand = new MyClockHand(this.scene, 1, 270);
   this.material = new CGFappearance(this.scene);
	this.material.setAmbient(0,0, 0, 1);
	this.material.setDiffuse(0.5, 0.5, 0.5, 1);
	this.material.setSpecular(0.5, 0.5, 0.5, 1);
	this.material.setShininess(40);
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyPrism;

 MyClock.prototype.display = function() {
 	this.scene.pushMatrix();
 	this.cylinder.display();
 	this.scene.pushMatrix();
 	this.scene.translate(0,0,1);
 	this.clockAppearance.apply();
 	this.circle.display();
 	this.scene.popMatrix();
 	

	this.material.apply();
	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.hourHand.angle * degToRad, 0, 0, 1);
	this.hourHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.minuteHand.angle * degToRad, 0, 0, 1);
	this.minuteHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.secondHand.angle * degToRad, 0, 0, 1);
	this.secondHand.display();
	this.scene.popMatrix();
    this.scene.popMatrix();
 };

 MyClock.prototype.update = function(currTime) {
	if (this.updated == -1) {
		this.updated = currTime;
		secInc = 0.6;
	}
	else {
		var diff = currTime - this.updated;
		this.updated = currTime;
		secInc = diff * (360 / (60 * 1000));
	}

	this.secondHand.setAngle(this.secondHand.angle - secInc);
	this.minuteHand.setAngle(this.minuteHand.angle - secInc / 60);
	this.hourHand.setAngle(this.hourHand.angle - secInc / 3600);
};
