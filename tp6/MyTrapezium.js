/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MyTrapezium(scene, top,minS=0, maxS=1, minT=0, maxT=1) {
	CGFobject.call(this,scene);
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.top=top;
	this.initBuffers();
};


MyTrapezium.prototype = Object.create(CGFobject.prototype);
MyTrapezium.prototype.constructor=MyTrapezium;

MyTrapezium.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0, 0,
            -0.5, 0, 0,
            -this.top/2, 1, 0,
            this.top/2, 1, 0,
             0.5, 0, 1,
            -0.5, 0, 1,
            -this.top/2, 1, 1,
            this.top/2, 1, 1,
            //------------------
             0.5, 0, 0,
            -0.5, 0, 0,
            -this.top/2, 1, 0,
            this.top/2, 1, 0,
             0.5, 0, 1,
            -0.5, 0, 1,
            -this.top/2, 1, 1,
            this.top/2, 1, 1,
            //-----------------------
             0.5, 0, 0,
            -0.5, 0, 0,
            -this.top/2, 1, 0,
            this.top/2, 1, 0,
             0.5, 0, 1,
            -0.5, 0, 1,
            -this.top/2, 1, 1,
            this.top/2, 1, 1,
			];

	this.indices = [
            0, 1, 2, 
			0, 2, 3,
			4, 6, 5,
			4, 7, 6,
			//----------------------
			8, 11, 15,
			8, 15, 12,
			10, 9, 13,
			10, 13, 14, 
			//--------------
			19, 18, 22,
			19, 22, 23, 
			17, 16, 20,
			17, 20, 21,

        ];
		
		this.normals = [
		0,0,-1,//0
		0,0,-1,//1
		0,0,-1,//2
		0,0,-1,//3
		
		0,0,1,//4
		0,0,1,//5
		0,0,1,//6
		0,0,1,//7
		//------------------------------------------------------
		1, (0.5-this.top/2), 0,//8
		-1, (0.5-this.top/2), 0,//9
		-1, (0.5-this.top/2), 0,//10
		1, (0.5-this.top/2), 0,//11
		1, (0.5-this.top/2), 0,//12
		-1, (0.5-this.top/2), 0,//13
		-1, (0.5-this.top/2), 0,//14
		1, (0.5-this.top/2), 0,//15

		
		
		//------------------------------------------------------------
		0, -1, 0,//16
		0, -1, 0,//17
		0, 1, 0,//18
		0, 1, 0,//19
		0, -1, 0,//20
		0, -1, 0,//21
		0, 1, 0,//22
		0, 1, 0,//23


		];
	

	console.log(this.vertices);
	console.log(this.normals);
	console.log(this.indices);
	this.primitiveType=this.scene.gl.TRIANGLES;
	

       
	this.initGLBuffers();
};
