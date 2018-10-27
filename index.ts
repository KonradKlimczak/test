import { App } from "./src/App";

function printHelp() {
  console.log("Use:");
  console.log("\t help - to display this.");
  console.log("\t <arguments> (e.g 2 2 2 44) - to execute program.");
}

function Main() {
  if (process.argv[2] === "help") {
    printHelp();
  } else {
    const appArgs: number[] = process.argv.slice(2).map(num => Number(num));
    if (appArgs.length > 3) {
      const result = App(appArgs[0], appArgs[1], appArgs[2], ...appArgs.slice(3));
      console.info(`Box:`);
      console.info(`Width:  ${appArgs[0]}`);
      console.info(`Height: ${appArgs[1]}`);
      console.info(`Depth:  ${appArgs[2]}`);
      console.info(`Cubes: ${appArgs.slice(3).join(", ")}`);
      console.info(`Result: ${result}`);
    } else {
      console.error("Too little arguments!");
    }
  }
}
Main();
