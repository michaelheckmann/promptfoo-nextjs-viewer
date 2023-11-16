import dotenv from "dotenv";
import { existsSync } from "fs";
import { createInterface } from "readline";
import { getOutPath } from "./get-out-path";

export const handleExperimentName = async (experimentName: string) => {
  const outPath = getOutPath(experimentName);
  // Check if a file already exists at the outPath
  // If so, ask the user if they want to overwrite it
  if (existsSync(outPath)) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = (await new Promise((resolve) => {
      rl.question(
        `File already exists at ${outPath}. Do you want to overwrite it? (y/n)\n`,
        resolve
      );
    })) as string;
    if (answer === "y") {
      console.log("Overwriting file.");
      dotenv.populate(process.env as any, {
        EXPERIMENT_NAME: experimentName,
      });
    } else {
      console.log("Not overwriting file.");
      process.exit(0);
    }
    rl.close();
  } else {
    dotenv.populate(process.env as any, {
      EXPERIMENT_NAME: experimentName,
    });
  }
};
