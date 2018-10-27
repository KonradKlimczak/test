import { Box } from "./Box";
import { Cube } from "./Cube";

export enum BoxSpace {
  Free,
  Filled
}

export class BoxKeeper {
  box: Box;
  cubesInside: number;
  cubes: Cube[];

  constructor(box: Box, cubes: Cube[]) {
    this.box = box;
    this.cubesInside = 0;
    this.cubes = cubes;
  }

  public putCubesIntoTheBox() {
    for (let cubeIndex = this.cubes.length - 1; cubeIndex >= 0; cubeIndex--) {
      const cube = this.cubes[cubeIndex];
      for (let cubeUnit = 0; cubeUnit < cube.amount; cubeUnit++) {
        const freeSpaceForCube = this.box.getFreeSpace(cube.size);
        if (freeSpaceForCube) {
          console.log("Mr Bob: ", `I have cube with size: ${cube.size}. I put it into box.`);
          this.box.insertCube(freeSpaceForCube);
          this.cubesInside += 1;
          console.log("Mr Bob: ", `There are ${this.cubesInside} cubes inside the box.`);
          if (this.box.isFull()) {
            console.log("Mr Bob: ", `Box is full!`);
            return this.cubesInside;
          }
        } else {
          break;
        }
      }
    }
    console.log("Mr Bob: ", `I don't know how to fill this box!`);
    return -1;
  }
}
