function MyTable(scene) {
	CGFobject.call(this,scene);
    this.cube=new MyUnitCubeQuad(this.scene);

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
    //tampo da mesa
this.scene.pushMatrix();
this.scene.wood.apply();
this.scene.translate(0, 3.5, 0);
this.scene.scale(5,0.3,3);
this.cube.display();
this.scene.popMatrix();
//pernas da mesa
this.scene.metal.apply();
this.scene.pushMatrix();
this.scene.translate(2, 3.5 / 2, 1);
this.scene.scale(0.3,3.5,0.3);
this.cube.display();
this.scene.popMatrix();

this.scene.pushMatrix();
this.scene.translate(2, 3.5 / 2, -1);
this.scene.scale(0.3,3.5,0.3);
this.cube.display();
this.scene.popMatrix();

this.scene.pushMatrix();
this.scene.translate(-2, 3.5 / 2, 1);
this.scene.scale(0.3,3.5,0.3);
this.cube.display();
this.scene.popMatrix();

this.scene.pushMatrix();
this.scene.translate(-2, 3.5 / 2, -1);
this.scene.scale(0.3,3.5,0.3);
this.cube.display();
this.scene.popMatrix();






}