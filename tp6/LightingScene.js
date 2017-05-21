var degToRad = Math.PI / 180.0;
var UPDATE_SCENE=0.05;
var PLANE_DIV=200;


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

	this.gl.clearColor(0.0, 0.6, 255.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements

	this.floor = new Plane(this,PLANE_DIV,0,12,0,12);

	//this.floor=new MyQuad(this, 0,5, 0,5);

	this.column =new MyCylinder(this,90,10);

	this.clock=new MyClock(this, 12 ,1);

	this.submarine= new MySubmarine(this);

	this.targets=[new MyTarget(this,0,4,0,1,1), new MyTarget(this,-3,5,-3,0.5,1), new MyTarget(this,1, 8,1,0.2,1), new MyTarget(this, -2, 4, 2, 0.5,1)];

	
	this.torpedo=new MyTorpedo(this, this.submarine, this.targets);


	this.particle=new MyParticle(this, 1, 2, 45*degToRad, 5*degToRad, 4);
	// Materials
	this.materialDefault = new CGFappearance(this);
	this.old_speed=0;


	//Textures


	this.floorAppearance=new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/fundo.jpg");



	this.graniteAppearance=new CGFappearance(this);
	this.graniteAppearance.loadTexture("../resources/images/granite.jpg");

	this.woodAppearance=new CGFappearance(this);
	this.woodAppearance.loadTexture("../resources/images/wood.png");
	
	this.goldAppearance=new CGFappearance(this);
	this.goldAppearance.loadTexture("../resources/images/gold.jpg");

	this.bronzeAppearance=new CGFappearance(this);
	this.bronzeAppearance.loadTexture("../resources/images/bronze.jpg");

	this.silverAppearance=new CGFappearance(this);
	this.silverAppearance.loadTexture("../resources/images/silver.jpg");

	this.steelAppearance=new CGFappearance(this);
	this.steelAppearance.loadTexture("../resources/images/steel.jpg");

	this.explosionAppearance=new CGFappearance(this);
	this.explosionAppearance.loadTexture("../resources/images/explosion.jpg");


	//options
	this.option1=true;
	this.option2=false;
	this.speed=0;
	this.Luz_1 = true;
	this.Luz_2 = true;
	this.Luz_3 = true;
	this.Luz_4 = true;
	this.clock_on=true;

	//GUI Textures
	this.submarineAppearances=[this.materialDefault, this.steelAppearance, this.graniteAppearance, this.woodAppearance, this.goldAppearance,this.silverAppearance, this.bronzeAppearance];
	this.submarineAppearanceList={};

	this.submarineAppearanceList["default"]=0;
	this.submarineAppearanceList["steel"]=1;
	this.submarineAppearanceList["granite"]=2;
	this.submarineAppearanceList["wood"]=3;
	this.submarineAppearanceList["gold"]=4;
	this.submarineAppearanceList["silver"]=5;
	this.submarineAppearanceList["bronze"]=6;
	
	this.Texture=0;

	this.setUpdatePeriod(UPDATE_SCENE*1000);



};

LightingScene.prototype.doSomething     = function(){
	console.log("Doing something...");
};

LightingScene.prototype.Options     = function(){
	console.log("Options...");
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

	// Floor Plane
	this.pushMatrix();
		this.translate(-PLANE_DIV/2, 0, -PLANE_DIV/2);
		this.rotate(-90 * degToRad, 1, 0, 0);
		//this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();
	this.pushMatrix();
	this.translate(-PLANE_DIV/2, 0, PLANE_DIV/2);
		this.rotate(90 * degToRad, 1, 0, 0);
		//this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();

	this.popMatrix();

	//Floor Quad
	/*this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();*/







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

	if(this.Texture==1){
		this.steelAppearance.apply();
	}
	else if(this.Texture==2){
		this.graniteAppearance.apply();
	}
	else if(this.Texture==3){
		this.woodAppearance.apply();
	}
	else if(this.Texture==4){
		this.goldAppearance.apply();
	}
	else if(this.Texture==5){
		this.silverAppearance.apply();
	}
	else if(this.Texture==6){
		this.bronzeAppearance.apply();
	}
	else{
		this.materialDefault.apply();
	}
	
	//this.translate(8,0,8);
	//this.rotate(180*degToRad,0,1,0);
	this.submarine.display();
	this.popMatrix();
	//Torpedo
	this.pushMatrix();
	this.torpedo.display();
	this.popMatrix();
	this.materialDefault.apply();

	//TARGETS
	this.steelAppearance.apply();
	this.pushMatrix();
	this.targets[0].display();
	this.popMatrix();
	this.pushMatrix();
	this.steelAppearance.apply();
	this.targets[1].display();
	this.popMatrix();
	this.pushMatrix();
	this.steelAppearance.apply();
	this.targets[2].display();
	this.popMatrix();
	this.pushMatrix();
	this.steelAppearance.apply();
	this.targets[3].display();
	this.popMatrix();
	this.materialDefault.apply();
	
	




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

	this.submarine.update(currTime);
	this.torpedo.update(currTime);
	for(var i=0;i<this.targets.length;i++){
		this.targets[i].update(currTime);
	}
	if(this.speed<this.submarine.velocity){
		for(var i=0; i<(this.submarine.velocity-this.speed);i++){
			this.submarine.move();
		}
		
	}
	if(this.speed>this.submarine.velocity ){
		for(var i=0; i<(this.speed-this.submarine.velocity);i++){
			this.submarine.moveForward();
		}
		
	}

};
