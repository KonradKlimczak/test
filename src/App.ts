import { Box } from "./Box";

interface IBox {
  x: number;
  y: number;
  z: number;
}

function cubeFitsInBox(box: IBox, cubeSide: number): boolean {
  if (box.x >= cubeSide && box.y >= cubeSide && box.z >= cubeSide) {
    return true;
  }
  return false;
}

export function App(
  boxX: number,
  boxY: number,
  boxZ: number,
  ...cubes: number[]
) {
  const box = new Box(boxX, boxY, boxZ);

  cubes.forEach((numberOfCubes: number, rawCubeSize: number) => {
    const cubeSize = rawCubeSize + 1;
    console.log("cubeSize", cubeSize, "numberOfCubes", numberOfCubes);
    console.log("cubeFitsInBox", box.cubeCanFit(cubeSize));
  });

  return 3;
}
