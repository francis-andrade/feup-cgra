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