var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 255.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements

	this.floor = new MyQuad(this,0,5,0,5);

	this.column =new MyCylinder(this,90,10);

	this.clock=new MyClock(this, 12 ,1);

	this.submarine= new MySubmarine(this);

	// Materials
	this.materialDefault = new CGFappearance(this);


	//Textures


	this.floorAppearance=new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/fundo.jpg");




	this.graniteAppearance=new CGFappearance(this);
	this.graniteAppearance.loadTexture("../resources/images/granite.jpg");

	//options
	this.option1=true;
	this.option2=false;
	this.speed=true;
	this.Luz_1 = false;
	this.Luz_2 = true;
	this.Luz_3 = false;
	this.Luz_4 = true;
	this.clock_on=true;




};

LightingScene.prototype.doSomething     = function(){
	console.log("Doing something...");
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0, 1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0.5, 0.5 ,0.5, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();




	this.lights[2].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1, 1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();


	this.lights[3].setDiffuse(0.1, 0.1, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,0, 1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	this.setUpdatePeriod(1000);
	//this.setUpdatePeriod(100);
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();







//ColumnB
this.pushMatrix();
	this.graniteAppearance.apply();
	//this.rotate(90 * degToRad, 1, 0, 0);
	this.translate(8,5,0);
	this.rotate(90 * degToRad, 1, 0, 0);
	this.scale(0.625,0.625,5);
	this.column.display();
	this.popMatrix();

//Clock
this.materialDefault.apply();
this.pushMatrix();
	this.translate(8,5,0.3);
	this.scale(1,1,0.5);
	this.clock.display();
	this.popMatrix();


	//Submarine

	this.pushMatrix();
	this.translate(8,0,8);
	this.rotate(180*degToRad,0,1,0);
	this.submarine.display();
	this.popMatrix();


	// ---- END Primitive drawing section
};

LightingScene.prototype.update = function(currTime) {
	if (this.Luz_1)
	this.lights[0].enable();
if (this.Luz_2)
	this.lights[1].enable();
if (this.Luz_3)
	this.lights[2].enable();
if (this.Luz_4)
	this.lights[3].enable();

if (!this.Luz_1)
	this.lights[0].disable();
if (!this.Luz_2)
	this.lights[1].disable();
if (!this.Luz_3)
	this.lights[2].disable();
if (!this.Luz_4)
	this.lights[3].disable();


	if(this.clock_on)
		this.clock.update(currTime);


};
