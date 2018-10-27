export enum BoxSpace {
  Free,
  Filled
}

export type FreeSpace = [number, number, number][];

export class Box {
  private width: number;
  private height: number;
  private depth: number;

  private boxSpace: Array<Array<Array<BoxSpace>>>;

  private spaceLeft: number;
  private firstEmpty: [number, number, number];

  constructor(boxX: number, boxY: number, boxZ: number) {
    this.width = boxX;
    this.height = boxY;
    this.depth = boxZ;
    this.boxSpace = this.createBoxSpace();
    this.spaceLeft = boxX * boxY * boxZ;
    this.firstEmpty = [1, 1, 1];
  }

  public getFreeSpace(cubeSize: number): FreeSpace | null {
    let [depthIndex, heightIndex, widthIndex] = this.firstEmpty;
    if (this.depth >= cubeSize && this.height >= cubeSize && this.width >= cubeSize) {
      for (; depthIndex <= this.depth; depthIndex++) {
        if (heightIndex > this.height) {
          heightIndex = 1;
        }
        for (; heightIndex <= this.height; heightIndex++) {
          if (widthIndex > this.width) {
            widthIndex = 1;
          }
          for (; widthIndex <= this.width; widthIndex++) {
            const cubeSpaceInBox = this.getFreeSpaceForCube(depthIndex, heightIndex, widthIndex, cubeSize);

            if (cubeSpaceInBox !== null) {
              return cubeSpaceInBox;
            }
          }
        }
      }
    }
    return null;
  }

  public insertCube(freeSpace: FreeSpace) {
    this.fill(freeSpace);
  }

  public isFull() {
    return this.spaceLeft === 0;
  }

  private getNextEmpty(): [number, number, number] {
    let [depthIndex, heightIndex, widthIndex] = this.firstEmpty;
    for (; depthIndex <= this.depth; depthIndex++) {
      if (heightIndex > this.height) {
        heightIndex = 1;
      }
      for (; heightIndex <= this.height; heightIndex++) {
        if (widthIndex > this.width) {
          widthIndex = 1;
        }
        for (; widthIndex <= this.width; widthIndex++) {
          if (this.boxSpace[depthIndex - 1][heightIndex - 1][widthIndex - 1] === BoxSpace.Free) {
            return [depthIndex, heightIndex, widthIndex];
          }
        }
      }
    }
    return [depthIndex, heightIndex, widthIndex];
  }

  private fill(freeSpace: FreeSpace) {
    for (const [depthIndex, heightIndex, widthIndex] of freeSpace) {
      this.boxSpace[depthIndex][heightIndex][widthIndex] = BoxSpace.Filled;
    }
    this.spaceLeft -= freeSpace.length;
    if (this.spaceLeft > 0) {
      this.firstEmpty = this.getNextEmpty();
    }
  }

  private getFreeSpaceForCube(
    depthStartIndex: number,
    heightStartIndex: number,
    widthStartIndex: number,
    size: number
  ): FreeSpace | null {
    const spaceNeeded = size * size * size;
    const cubeSpaceInBox: FreeSpace = [];
    const depthNeeded = depthStartIndex + size - 1;
    const heightNeeded = heightStartIndex + size - 1;
    const widthNeeded = widthStartIndex + size - 1;
    if (depthNeeded > this.depth || heightNeeded > this.height || widthNeeded > this.width) {
      return null;
    }

    for (let depthIndex = depthStartIndex - 1; depthIndex < depthNeeded; depthIndex++) {
      for (let heightIndex = heightStartIndex - 1; heightIndex < heightNeeded; heightIndex++) {
        for (let widthIndex = widthStartIndex - 1; widthIndex < widthNeeded; widthIndex++) {
          if (this.boxSpace[depthIndex][heightIndex][widthIndex] === BoxSpace.Free) {
            cubeSpaceInBox.push([depthIndex, heightIndex, widthIndex]);
            if (spaceNeeded === cubeSpaceInBox.length) {
              return cubeSpaceInBox;
            }
          }
        }
      }
    }

    return null;
  }

  private createBoxSpace() {
    const boxSpace: Array<Array<Array<BoxSpace>>> = [];
    for (let depth = 0; depth < this.depth; depth++) {
      boxSpace[depth] = [];
      for (let height = 0; height < this.height; height++) {
        boxSpace[depth][height] = [];
        for (let width = 0; width < this.width; width++) {
          boxSpace[depth][height][width] = BoxSpace.Free;
        }
      }
    }
    return boxSpace;
  }
}
