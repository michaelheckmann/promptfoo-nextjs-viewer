import { existsSync, mkdirSync } from "fs";
import path from "path";
import { getProjectPath } from "./get-project-path";

export const getOutPath = (name: string) => {
  const resultsPath = path.join(getProjectPath(), "results");

  const pathSegments = name.split("/");
  const directory = pathSegments.length > 1 ? pathSegments[0] : undefined;
  const fileName = pathSegments.length > 1 ? pathSegments[1] : pathSegments[0];

  let outputPath = path.join(resultsPath, `${fileName}.json`);

  if (directory) {
    if (!existsSync(path.join(resultsPath, directory))) {
      mkdirSync(path.join(resultsPath, directory));
    }
    outputPath = path.join(resultsPath, directory, `${fileName}.json`);
  }

  return outputPath;
};
