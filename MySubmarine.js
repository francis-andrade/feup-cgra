/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var BASECYLINDER_HEIGHT=4.08; //MANDATORY

var SEMISHPERE_DEPTH=0.46;    //MANDATORY
var SEMISPHERE_WIDTH=0.73;    //MANDATORY
var SEMISPHERE_HEIGHT=1.2173; //SCALE

var TOWER_HEIGHT=1.0;
var TOWER_LENGTH=0.88;         //MANDATORY
var TOWER_WIDTH=0.55;          //SCALE
var TOWER_START=1.1655;        //SCALE
var TOWERTOP_HEIGHT=0.57;      //MANDATORY

var PERISCOPE_HEIGHT=0.5712;   //SCALE
var PERISCOPE_LENGTH=0.0714; //SCALE
var PERISCOPE_WIDTH=0.05;    //SCALE
var PERISCOPE_START=1.2852; //SCALE

var VISOR_WIDTH=PERISCOPE_WIDTH; //MANDATORY
var  VISORTOP_HEIGHT=0.05355; //	SCALE
var VISOR_HEIGHT=VISORTOP_HEIGHT+PERISCOPE_LENGTH;
var VISOR_LENGTH=0.03927;//SCALE

var FINTOWER_WIDTHFRONT=1.42; //MANDATORY
var FINTOWER_WIDTHBACK=1.0;
var FINTOWER_HEIGHT=0.06783; //SCALE
var FINTOWER_LENGTH=0.2856; //SCALE
var FINTOWER_START=TOWER_START+TOWER_LENGTH/2-FINTOWER_LENGTH/2;
var FINTOWER_STARTZ=1.4637;//SCALE

var FINBACKVER_HEIGHTFRONT=1.64; //MANDATORY
var FINBACKVER_HEIGHTBACK=2.34; //MANDATORY
var FINBACKVER_LENGTH=0.2499; //SCALE
var FINBACKVER_WIDTH=0.075; //SCALE

var FINBACKHOR_WIDTHFRONT=1.45; //SCALE
var FINBACKHOR_WIDTHBACK=2.1;   //SCALE
var FINBACKHOR_HEIGHT=0.1; //SCALE
var FINBACKHOR_LENGTH=0.2499; //SCALE
var FINBACKHOR_STARTZ=SEMISPHERE_HEIGHT/2-FINBACKHOR_HEIGHT/2;

var PROPELLERCYLINDER_LENGTH=0.1785; //SCALE
var PROPELLERCYLINDER_WIDTH=0.4; //MANDATORY
var PROPELLERCYLINDER_HEIGHT=PROPELLERCYLINDER_WIDTH; //MANDATORY
var PROPELLERCYLINDER_STARTZ= 0.1428; //SCALE
var PROPELLERCYLINDER_STARTX=0.535;

var PROPELLERCUBE_WIDTH=0.06;   //SCALE
var PROPELLERCUBE_LENGTH=Math.sqrt(PROPELLERCYLINDER_WIDTH*PROPELLERCYLINDER_WIDTH-PROPELLERCUBE_WIDTH*PROPELLERCUBE_WIDTH);
var PROPELLERCUBE_DEPTH=0.1;
var PROPELLERCUBE_ANG=45;

var PROPELLERSEMISHERE_RADIUS=PROPELLERCUBE_WIDTH/2;
var PROPELLERSEMISHERE_HEIGHT=0.06;


function MySubmarine(scene) {
	CGFobject.call(this,scene);
	this.x=0;
	this.z=0;
	this.triangle=new MyTriangle(this.scene);
	this.basecylinder=new MyCylinder(this.scene, 80, 1);
	this.backsemisphere=new MyLamp(this.scene, 80, 80);
	this.frontsemisphere=new MyLamp(this.scene, 80, 80);
	this.towercylinder=new MyCylinder(this.scene, 80, 1);
	this.towertop=new MyCircle(this.scene, 80);
	this.periscope=new MyCylinder(this.scene, 80, 1);
	this.visor=new MyCylinder(this.scene, 80, 1);
	this.fintower=new MyTrapezium(this.scene, FINTOWER_WIDTHFRONT/FINTOWER_WIDTHBACK);
	this.finbackver=new MyTrapezium(this.scene, FINBACKVER_HEIGHTFRONT/FINBACKVER_HEIGHTBACK);
	this.finbackhor=new MyTrapezium(this.scene, FINBACKHOR_WIDTHFRONT/FINBACKHOR_WIDTHBACK);
	this.propellerleft=new MyCylinder(this.scene, 80, 1);
	this.propellerright=new MyCylinder(this.scene, 80, 1);
	this.propellercube=new MyUnitCubeQuad(this.scene);
	this.propellersemishere=new MyLamp(this.scene, 80, 80);

	this.degree=0*degToRad;
	this.orientation=0;
};


MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;


MySubmarine.prototype.display = function (){
	//Base cylinder
	this.scene.pushMatrix();
 		this.scene.translate(this.x,0,this.z);
 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(SEMISPHERE_WIDTH/2,SEMISPHERE_HEIGHT/2,BASECYLINDER_HEIGHT);
 	//this.scene.axis.display();
 	//this.triangle.display();
 	this.basecylinder.display();
 	this.scene.popMatrix();

 	//Back semisphere
 	this.scene.pushMatrix();
 	this.scene.translate(this.x,0,this.z);
 	this.scene.rotate(180*degToRad,0,1,0);
 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(SEMISPHERE_WIDTH/2,SEMISPHERE_HEIGHT/2,SEMISHPERE_DEPTH);
 	this.backsemisphere.display();
 	this.scene.popMatrix();

 	//Front semisphere
 	this.scene.pushMatrix();

	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-BASECYLINDER_HEIGHT);
	else
	this.scene.translate(this.x-BASECYLINDER_HEIGHT,0,this.z);

 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(SEMISPHERE_WIDTH/2,SEMISPHERE_HEIGHT/2,SEMISHPERE_DEPTH);
 	this.backsemisphere.display();
 	this.scene.popMatrix();
 	
 	//Tower Cylinder
 	this.scene.pushMatrix();
	
	this.scene.translate(0,SEMISPHERE_HEIGHT/2+TOWERTOP_HEIGHT-TOWER_HEIGHT,0);
	
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2));
	else
	this.scene.translate(this.x-(+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2),0,this.z);
	
 	this.scene.rotate(270*degToRad,1,0,0);
 	this.scene.rotate(this.degree,0,0,1);
 	this.scene.scale(TOWER_WIDTH/2,TOWER_LENGTH/2,TOWER_HEIGHT);
 	//this.scene.axis.display();
	this.towercylinder.display();
 	this.scene.popMatrix();

 	//TOWER TOP
 	this.scene.pushMatrix();
	
	this.scene.translate(0,SEMISPHERE_HEIGHT/2+TOWERTOP_HEIGHT,0);
	
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2));
	else
	this.scene.translate(this.x-(+BASECYLINDER_HEIGHT-TOWER_START-TOWER_LENGTH/2),0,this.z);

 	this.scene.rotate(270*degToRad,1,0,0);
 	this.scene.rotate(this.degree,0,0,1);
 	this.scene.scale(TOWER_WIDTH/2,TOWER_LENGTH/2,TOWER_HEIGHT);
 	//this.scene.axis.display();
	this.towertop.display();
 	this.scene.popMatrix();

 	//PERISCOPE EXTERIOR
 	this.scene.pushMatrix();
	
	this.scene.translate(0,SEMISPHERE_HEIGHT/2+TOWERTOP_HEIGHT,0);
	
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2));
	else
	this.scene.translate(this.x-(+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2),0,this.z);

 	this.scene.rotate(270*degToRad,1,0,0);
 	this.scene.rotate(this.degree,0,0,1);
 	this.scene.scale(PERISCOPE_WIDTH/2,PERISCOPE_LENGTH/2,PERISCOPE_HEIGHT);
 	//this.scene.axis.display();
	this.periscope.display();
 	this.scene.popMatrix();

 	//PERISCOPE INTERIOR
 	this.scene.pushMatrix();
	
	this.scene.translate(0,SEMISPHERE_HEIGHT/2+TOWERTOP_HEIGHT+PERISCOPE_HEIGHT,0);
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2));
	else
	this.scene.translate(this.x-(+BASECYLINDER_HEIGHT-PERISCOPE_START-PERISCOPE_LENGTH/2),0,this.z);

 	this.scene.rotate(270*degToRad,1,0,0);
 	this.scene.rotate(this.degree,0,0,1);
 	this.scene.scale(PERISCOPE_WIDTH/2,PERISCOPE_LENGTH/2,PERISCOPE_HEIGHT);
 	this.scene.scale(-1,-1,-1);
 	//this.scene.axis.display();
	this.periscope.display();
 	this.scene.popMatrix();

	//VISOR EXTERIOR
	this.scene.pushMatrix();
 	this.scene.translate(0,SEMISPHERE_HEIGHT/2+TOWERTOP_HEIGHT+PERISCOPE_HEIGHT-VISOR_LENGTH/2,0);
 	
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT));
	else
	this.scene.translate(this.x-(BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT),0,this.z);

 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(VISOR_WIDTH/2,VISOR_LENGTH/2,VISOR_HEIGHT);
 	//this.scene.axis.display();
 	this.visor.display();
 	this.scene.popMatrix();

 	//VISOR INTERIOR
 	this.scene.pushMatrix();
 	this.scene.translate(0,SEMISPHERE_HEIGHT/2+TOWERTOP_HEIGHT+PERISCOPE_HEIGHT-VISOR_LENGTH/2,0);
 	
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT+VISOR_HEIGHT);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT+VISOR_HEIGHT,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT+VISOR_HEIGHT));
	else
	this.scene.translate(this.x-(BASECYLINDER_HEIGHT-PERISCOPE_START+VISORTOP_HEIGHT-VISOR_HEIGHT+VISOR_HEIGHT),0,this.z);

 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(VISOR_WIDTH/2,VISOR_LENGTH/2,VISOR_HEIGHT);
 	this.scene.scale(-1,-1,-1);
 	//this.scene.axis.display();
 	this.visor.display();
 	this.scene.popMatrix();


 	//FINTOWER
 	this.scene.pushMatrix();
 	this.scene.translate(0,FINTOWER_STARTZ-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z+BASECYLINDER_HEIGHT-FINTOWER_START-FINTOWER_LENGTH);
	else if(this.orientation==1)
	this.scene.translate(this.x+BASECYLINDER_HEIGHT-FINTOWER_START-FINTOWER_LENGTH,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(BASECYLINDER_HEIGHT-FINTOWER_START-FINTOWER_LENGTH));
	else
	this.scene.translate(this.x-(BASECYLINDER_HEIGHT-FINTOWER_START-FINTOWER_LENGTH),0,this.z);

 	this.scene.rotate(270*degToRad,1,0,0);
 	this.scene.rotate(180*degToRad,0,0,1);
 	this.scene.rotate(this.degree,0,0,1);
 	//this.scene.axis.display();
 	this.scene.scale(FINTOWER_WIDTHBACK, FINTOWER_LENGTH, FINTOWER_HEIGHT);
	this.fintower.display();
	//this.scene.axis.display();
 	this.scene.popMatrix();

	//FINBACKVER
	this.scene.pushMatrix();
	if(this.orientation==0)
	this.scene.translate(this.x-FINBACKVER_WIDTH/2,0,this.z-FINBACKVER_LENGTH);
	else if(this.orientation==1)
	this.scene.translate(this.x-FINBACKVER_LENGTH,0,this.z+FINBACKVER_WIDTH/2);
	else if(this.orientation==2)
	this.scene.translate(this.x+FINBACKVER_WIDTH/2,0,this.z-(-FINBACKVER_LENGTH));
	else
	this.scene.translate(this.x-(-FINBACKVER_LENGTH),0,this.z-FINBACKVER_WIDTH/2);

	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.rotate(this.degree,1,0,0);
 	this.scene.scale(FINBACKVER_HEIGHTBACK, FINBACKVER_LENGTH, FINBACKVER_WIDTH);
	this.finbackver.display();
	//this.scene.axis.display();
 	this.scene.popMatrix();

 	//FINBACKHOR
	this.scene.pushMatrix();
	this.scene.translate(0,FINBACKHOR_STARTZ-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x,0,this.z-FINBACKHOR_LENGTH);
	else if(this.orientation==1)
	this.scene.translate(this.x-FINBACKHOR_LENGTH,0,this.z);
	else if(this.orientation==2)
	this.scene.translate(this.x,0,this.z-(-FINBACKHOR_LENGTH));
	else
	this.scene.translate(this.x-(-FINBACKHOR_LENGTH),0,this.z);

 	this.scene.rotate(270*degToRad,1,0,0);
 	this.scene.rotate(180*degToRad,0,0,1);
 	this.scene.rotate(this.degree,0,0,1);
 	//this.scene.axis.display();
 	this.scene.scale(FINBACKHOR_WIDTHBACK, FINBACKHOR_LENGTH, FINBACKHOR_HEIGHT);
	this.finbackhor.display();
	//this.scene.axis.display();
 	this.scene.popMatrix();

 	//PROPELLER RIGHT EXTERIOR
	this.scene.pushMatrix();
	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z);
	else if(this.orientation==1)
	this.scene.translate(this.x,0,this.z+PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z);
	else
	this.scene.translate(this.x,0,this.z-PROPELLERCYLINDER_STARTX);
 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(PROPELLERCYLINDER_WIDTH/2,PROPELLERCYLINDER_HEIGHT/2,PROPELLERCYLINDER_LENGTH);
 	this.propellerright.display();
 	//this.scene.axis.display();
 	//this.scene.axis.display();
 	//this.triangle.display();
 	this.scene.popMatrix();
	
	//PROPELLER RIGHT INTERIOR
 	this.scene.pushMatrix();
 	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z+PROPELLERCYLINDER_LENGTH);
	else if(this.orientation==1)
	this.scene.translate(this.x+PROPELLERCYLINDER_LENGTH,0,this.z+PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z-(PROPELLERCYLINDER_LENGTH));
	else
	this.scene.translate(this.x-(PROPELLERCYLINDER_LENGTH),0,this.z-PROPELLERCYLINDER_STARTX);
 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(PROPELLERCYLINDER_WIDTH/2,PROPELLERCYLINDER_HEIGHT/2,PROPELLERCYLINDER_LENGTH);
 	//this.scene.axis.display();
 	this.scene.scale(-1, -1, -1);
 	//this.scene.axis.display();
 	//this.triangle.display();
 	this.propellerright.display();
 	this.scene.popMatrix();

 	//PROPELLER LEFT EXTERIOR
	this.scene.pushMatrix();
	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z);
	else if(this.orientation==1)
	this.scene.translate(this.x,0,this.z-PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z);
	else
	this.scene.translate(this.x,0,this.z+PROPELLERCYLINDER_STARTX);
 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(PROPELLERCYLINDER_WIDTH/2,PROPELLERCYLINDER_HEIGHT/2,PROPELLERCYLINDER_LENGTH);
 	this.propellerleft.display();
 	//this.scene.axis.display();
 	//this.scene.axis.display();
 	//this.triangle.display();
 	this.scene.popMatrix();
	
	//PROPELLER LEFT INTERIOR
 	this.scene.pushMatrix();
 	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z+PROPELLERCYLINDER_LENGTH);
	else if(this.orientation==1)
	this.scene.translate(this.x+PROPELLERCYLINDER_LENGTH,0,this.z-PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z-(PROPELLERCYLINDER_LENGTH));
	else
	this.scene.translate(this.x-(PROPELLERCYLINDER_LENGTH),0,this.z+PROPELLERCYLINDER_STARTX);
 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(PROPELLERCYLINDER_WIDTH/2,PROPELLERCYLINDER_HEIGHT/2,PROPELLERCYLINDER_LENGTH);
 	//this.scene.axis.display();
 	this.scene.scale(-1, -1, -1);
 	//this.scene.axis.display();
 	//this.triangle.display();
 	this.propellerleft.display();
 	this.scene.popMatrix();

 	//PROPELLER CUBE RIGHT
 	this.scene.pushMatrix();
 	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z+PROPELLERCYLINDER_LENGTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+PROPELLERCYLINDER_LENGTH/2,0,this.z+PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z-PROPELLERCYLINDER_LENGTH/2);
	else
	this.scene.translate(this.x-PROPELLERCYLINDER_LENGTH/2,0,this.z-PROPELLERCYLINDER_STARTX);
	this.scene.rotate(this.degree,0,1,0);
 	this.scene.rotate(PROPELLERCUBE_ANG*degToRad, 0,0,1);
 	this.scene.scale(PROPELLERCUBE_WIDTH, PROPELLERCUBE_LENGTH, PROPELLERCUBE_DEPTH);
 	//this.scene.axis.display();
	this.propellercube.display();
 	this.scene.popMatrix();

 	//PROPELLER CUBE LEFT
 	this.scene.pushMatrix();
 	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z+PROPELLERCYLINDER_LENGTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+PROPELLERCYLINDER_LENGTH/2,0,this.z-PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z-PROPELLERCYLINDER_LENGTH/2);
	else
	this.scene.translate(this.x-PROPELLERCYLINDER_LENGTH/2,0,this.z+PROPELLERCYLINDER_STARTX);
	this.scene.rotate(this.degree,0,1,0);
 	this.scene.rotate(PROPELLERCUBE_ANG*degToRad, 0,0,1);
 	this.scene.scale(PROPELLERCUBE_WIDTH, PROPELLERCUBE_LENGTH, PROPELLERCUBE_DEPTH);
 	//this.scene.axis.display();
	this.propellercube.display();
 	this.scene.popMatrix();

 	//PROPELLER SEMISHERE RIGHT
 	this.scene.pushMatrix();

	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);

 	//this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z+PROPELLERCYLINDER_LENGTH/2+PROPELLERCUBE_DEPTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+PROPELLERCYLINDER_LENGTH/2+PROPELLERCUBE_DEPTH/2,0,this.z+PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z-PROPELLERCYLINDER_LENGTH/2-PROPELLERCUBE_DEPTH/2);
	else
	this.scene.translate(this.x-PROPELLERCYLINDER_LENGTH/2-PROPELLERCUBE_DEPTH/2,0,this.z-PROPELLERCYLINDER_STARTX);

 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(PROPELLERSEMISHERE_RADIUS,PROPELLERSEMISHERE_RADIUS, PROPELLERSEMISHERE_HEIGHT);
 	this.propellersemishere.display();
 	this.scene.popMatrix();

 	//PROPELLER SEMISHERE LEFT
 	this.scene.pushMatrix();

	this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);

 	//this.scene.translate(0,PROPELLERCYLINDER_STARTZ+PROPELLERCYLINDER_HEIGHT/2-SEMISPHERE_HEIGHT/2,0);
 	if(this.orientation==0)
	this.scene.translate(this.x+PROPELLERCYLINDER_STARTX,0,this.z+PROPELLERCYLINDER_LENGTH/2+PROPELLERCUBE_DEPTH/2);
	else if(this.orientation==1)
	this.scene.translate(this.x+PROPELLERCYLINDER_LENGTH/2+PROPELLERCUBE_DEPTH/2,0,this.z-PROPELLERCYLINDER_STARTX);
	else if(this.orientation==2)
	this.scene.translate(this.x-PROPELLERCYLINDER_STARTX,0,this.z-PROPELLERCYLINDER_LENGTH/2-PROPELLERCUBE_DEPTH/2);
	else
	this.scene.translate(this.x-PROPELLERCYLINDER_LENGTH/2-PROPELLERCUBE_DEPTH/2,0,this.z+PROPELLERCYLINDER_STARTX);

 	this.scene.rotate(this.degree,0,1,0);
 	this.scene.scale(PROPELLERSEMISHERE_RADIUS,PROPELLERSEMISHERE_RADIUS, PROPELLERSEMISHERE_HEIGHT);
 	this.propellersemishere.display();
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


