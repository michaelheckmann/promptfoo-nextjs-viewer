import path from "path"

import { getProjectPath } from "./get-project-path"

export const getExperimentPath = (name: string) => {
  const resultsPath = path.join(
    getProjectPath(),
    "..",
    "experiments",
    "results"
  )

  const pathSegments = decodeURIComponent(name).split("/")
  const directory = pathSegments.length > 1 ? pathSegments[0] : undefined
  const fileName = pathSegments.length > 1 ? pathSegments[1] : pathSegments[0]

  let experimentPath = path.join(resultsPath, `${fileName}.json`)

  if (directory) {
    experimentPath = path.join(resultsPath, directory, `${fileName}.json`)
  }

  return experimentPath
}
