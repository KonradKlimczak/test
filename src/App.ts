import { Box } from "./Box";
import { BoxKeeper } from "./BoxKeeper";
import { Cube } from "./Cube";

export function App(boxX: number, boxY: number, boxZ: number, ...cubes: number[]) {
  const box = new Box(boxX, boxY, boxZ);
  const mrBob = new BoxKeeper(
    box,
    cubes.map((amount: number, rawCubeSize: number): Cube => ({ amount, size: rawCubeSize + 1 }))
  );

  return mrBob.putCubesIntoTheBox();
}
