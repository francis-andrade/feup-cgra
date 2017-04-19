/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyPrism;

 MyLamp.prototype.initBuffers = function() {
 
	var teta=2*Math.PI/this.slices;
 	this.vertices = [
 	
 	];
 	this.normals=[];
	var teta=2*Math.PI/this.slices;
 	for(var j=0;j<=this.stacks;j++){
 		for(var i=0;i<this.slices;i++){
 		    var k=Math.sqrt(1-Math.pow(j/this.stacks,2));
 			this.vertices.push(k*Math.cos(i*teta));
 			this.vertices.push(k*Math.sin(i*teta));
 			this.vertices.push(Math.sqrt(1-k*k));
 			this.normals.push(k*Math.cos(i*teta));
 			this.normals.push(k*Math.sin(i*teta));
 			this.normals.push(Math.sqrt(1-k*k));
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

 	
	console.log(this.vertices);
	console.log(this.normals);
	console.log(this.indices);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
