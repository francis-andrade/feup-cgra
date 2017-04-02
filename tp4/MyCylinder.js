/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyPrism;

 MyCylinder.prototype.initBuffers = function() {
 
	var teta=2*Math.PI/this.slices;
 	this.vertices = [
 	
 	];
 	this.normals=[];
	var teta=2*Math.PI/this.slices;
 	for(var j=0;j<=this.stacks;j++){
 		for(var i=0;i<this.slices;i++){
 			this.vertices.push(Math.cos(i*teta));
 			this.vertices.push(Math.sin(i*teta));
 			this.vertices.push(j*1.0/this.stacks);
 			this.normals.push(Math.cos(i*teta));
			this.normals.push(Math.sin(i*teta));
			this.normals.push(0);
 		}
 	}
 	

 this.indices=[];

 	for(var j=0;j<this.stacks;j++){
 		for(var i=0;i<this.slices;i++){
 			this.indices.push((j+1)*this.slices+(i+1)%this.slices);
 			this.indices.push(j*this.slices+i);//+0.5
			this.indices.push(j*this.slices+(i+1)%this.slices);
			this.indices.push((j+1)*this.slices+i);//+0.5
 			this.indices.push(j*this.slices+i);//+0.5
 			this.indices.push((j+1)*this.slices+(i+1)%this.slices);
 		}
 	}

 	this.texCoords = [	];

     var s = 0;
	var t = 0;
	var s_inc = 1/this.slices;
	var t_inc = 1/this.stacks;
	for (var i = 0; i <= this.stacks; i++) {
		for (var j = 0; j < this.slices; j++) {
			this.texCoords.push(s, t);
			s += s_inc;
		}
		s = 0;
		t += t_inc;
	}
 	
	console.log(this.vertices);
	console.log(this.normals);
	console.log(this.indices);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
