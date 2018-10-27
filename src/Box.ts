export enum BoxSpace {
  Free,
  Filled
}

export class Box {
  width: number;
  height: number;
  depth: number;

  boxSpace: Array<Array<Array<BoxSpace>>>;

  spaceLeft: number;

  constructor(boxX: number, boxY: number, boxZ: number) {
    this.width = boxX;
    this.height = boxY;
    this.depth = boxZ;
    this.boxSpace = this.createBoxSpace();
    this.spaceLeft = boxX * boxY * boxZ;
  }

  public cubeCanFit(cubeSide: number): boolean {
    if (this.width >= cubeSide && this.height >= cubeSide && this.depth >= cubeSide) {
      return true;
    }
    return false;
  }

  public insertCube(size: number) {
    let availableSpace = 0;
    for (let depthIndex = 0; depthIndex < this.boxSpace.length; depthIndex++) {
      const depthUnit = this.boxSpace[depthIndex];
      for (let heightIndex = 0; heightIndex < depthUnit.length; heightIndex++) {
        const heightUnit = depthUnit[heightIndex];
        for (let widthIndex = 0; widthIndex < heightUnit.length; widthIndex++) {
          const cubeSpaceInBox = this.getCubeSpaceInBox(depthIndex, heightIndex, widthIndex, size);
          if (cubeSpaceInBox !== null) {
            this.fill(cubeSpaceInBox);
            return cubeSpaceInBox.length;
          }
        }
      }
    }
    return -1;
  }

  private fill(boxSpaceCoordinates: [number, number, number][]) {
    for (const [depthIndex, heightIndex, widthIndex] of boxSpaceCoordinates) {
      this.boxSpace[depthIndex][heightIndex][widthIndex] = BoxSpace.Filled;
    }
  }

  private getCubeSpaceInBox(
    depthStartIndex: number,
    heightStartIndex: number,
    widthStartIndex: number,
    size: number
  ): [number, number, number][] | null {
    const cubeSpaceInBox: [number, number, number][] = [];
    const depthNeeded = depthStartIndex + size;
    const heightNeeded = heightStartIndex + size;
    const widthNeeded = widthStartIndex + size;
    if (depthNeeded > this.depth || heightNeeded > this.height || widthNeeded > this.width) {
      return null;
    }

    for (let depthIndex = depthStartIndex; depthIndex < depthNeeded; depthIndex++) {
      for (let heightIndex = depthStartIndex; heightIndex < heightNeeded; heightIndex++) {
        for (let widthIndex = depthStartIndex; widthIndex < widthNeeded; widthIndex++) {
          if (this.boxSpace[depthIndex][heightIndex][widthIndex] === BoxSpace.Filled) {
            return null;
          }
          cubeSpaceInBox.push([depthIndex, heightIndex, widthIndex]);
        }
      }
    }
    return cubeSpaceInBox;
  }

  private createBoxSpace() {
    const firstDimension = Array<BoxSpace>(this.width).fill(BoxSpace.Free);
    const secondDimension = Array<Array<BoxSpace>>(this.height).fill(firstDimension.slice());
    const thirdDimension = Array<Array<Array<BoxSpace>>>(this.depth).fill(secondDimension.slice());
    return thirdDimension;
  }
}
