function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5,-0.5,0.5,
            0.5,-0.5,0.5,
           0.5,0.5,0.5,
           -0.5,0.5,0.5

			];

	this.indices = [
           6,5,2,
           1,2,5,
           6,2,3,
           3,7,6,
           6,4,5,
           6,7,4,
           1,0,2,
           2,0,3,
           5,0,1,
           0,5,4,
           3,4,7,
           3,0,4
        ];
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};