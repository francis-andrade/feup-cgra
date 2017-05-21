/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MyTrapezium2D(scene, top,minS=0, maxS=1, minT=0, maxT=1) {
	CGFobject.call(this,scene);
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.top=top;
	this.initBuffers();
};


MyTrapezium2D.prototype = Object.create(CGFobject.prototype);
MyTrapezium2D.prototype.constructor=MyTrapezium2D;

MyTrapezium2D.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0, 0,
            -0.5, 0, 0,
            -this.top/2, 1, 0,
            this.top/2, 1, 0,
			];

	this.indices = [
            0, 2, 1, 
			0, 3, 2,
        ];
		
	
		this.normals = [
		0,0,1,//4
		0,0,1,//5
		0,0,1,//6
		0,0,1,//7
		


		];
	

	
 this.texCoords = [
        this.maxS, this.maxT,
		this.minS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT,

	];
	

       
	this.initGLBuffers();
};
