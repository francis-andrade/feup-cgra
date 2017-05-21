var PARTICLENO_MULTIPLIER=200;
var EXPLOSIONSIZE_MULTIPLIER=2;
var PARTICLE_SIZE=0.5;

function MyTarget(scene, x, y, z, size, explosion_time) {
	CGFobject.call(this,scene);
	this.sphere=new MyLamp(this.scene, 80, 80);
	this.cylinder=new MyCylinder(this.scene, 80, 1);
	this.x=x;
	this.y=y;
	this.z=z;
	this.size=size;
	this.destroyed=0;
	this.explosion=0;
	this.explosion_count=0;
	this.explosion_time=explosion_time;
	this.particle=new MyParticle(this.scene);
	this.psize=[];
	this.ptime=[];
	this.pdegree=[];
	this.pslope=[];
	this.pradius=[];
	this.pradius_count=[];
	this.pvisible=[];
	this.ptime_count=[];
	this.pstart=[];
	console.log(this.explosion_time);
	for(var i=0;i<PARTICLENO_MULTIPLIER;i++){
		this.psize.push(Math.random()*PARTICLE_SIZE);
		this.ptime.push(this.explosion_time/3);
		this.pdegree.push(Math.random()*360);
		this.pslope.push(Math.random()*360);
		this.pradius.push(this.size*EXPLOSIONSIZE_MULTIPLIER/2+Math.random()*this.size*EXPLOSIONSIZE_MULTIPLIER/2-i*(this.size*EXPLOSIONSIZE_MULTIPLIER/2)/(PARTICLENO_MULTIPLIER));
		this.pradius_count.push(0);
		this.pvisible.push(0);
		this.ptime_count.push(0);
		this.pstart.push((2*this.explosion_time/3)*i/PARTICLENO_MULTIPLIER);
	}
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
	if(this.explosion==1){
		for(var i=0;i<this.pvisible.length;i++){
			this.scene.pushMatrix();
			this.scene.translate(this.x, this.y, this.z);
			this.pdisplay(i);
			this.scene.popMatrix();
		}
	}
}

MyTarget.prototype.explode = function(){
	this.explosion=1;
	this.explosion_count=0;
}

MyTarget.prototype.update = function(){
	if(this.explosion==1){
		this.explosion_count+=UPDATE_SCENE;
		if(this.explosion_count>this.explosion_time){
			this.explosion=0;
		}
		for(var i=0;i<this.pvisible.length;i++){
			this.pupdate(i);
		}
	}

}

MyTarget.prototype.pupdate=function(i){
	if(this.pstart[i]<=this.explosion_count){
		this.pvisible[i]=1;
	}
	if(this.pvisible[i]==1){
		var inc = UPDATE_SCENE * this.pradius[i] / this.ptime[i];
		this.ptime_count[i]+=UPDATE_SCENE;
		this.pradius_count[i]+=inc;
		/*if(i==0){
			console.log("time count ",this.ptime_count[i], " ",this.ptime[i]," ",this.explosion_count, " ",this.pvisible[i]);
		}*/
		if(this.ptime_count[i]>this.ptime[i]){
			
			this.pvisible[i]=0;
			/*if(i==0){
				console.log("done ",this.pvisible[i]);
			}*/

		}
	}
}

MyTarget.prototype.pdisplay = function(i){
	if(this.pvisible[i]==1){
     	this.scene.pushMatrix();
     	this.scene.rotate(-this.pdegree[i], 0,1,0);
        this.scene.rotate(this.pslope[i],0,0,1);
        this.scene.translate(this.pradius_count[i], 0, 0);
     	this.scene.scale(this.psize[i], this.psize[i], this.psize[i]);
	 	this.particle.display();
     	this.scene.popMatrix();
	}
}


