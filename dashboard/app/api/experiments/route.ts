import { lstatSync, readdirSync } from "fs"
import path from "path"

import { getProjectPath } from "@/lib/get-project-path"
import { sendResponse } from "@/lib/send-response"

export async function GET() {
  try {
    const experimentsFolder = path.join(
      getProjectPath(),
      "..",
      "experiments",
      "results"
    )
    const experiments = readdirSync(experimentsFolder)
      .map((experiment) => {
        // Check if it's a directory and if it is, read its contents
        const experimentPath = path.join(experimentsFolder, experiment)
        const isScored = experiment.includes("scored")
        const isDirectory = lstatSync(experimentPath).isDirectory()
        if (isScored) {
          return null
        }
        if (isDirectory) {
          return readdirSync(experimentPath).map((file) =>
            path.join(experiment, file)
          )
        } else {
          return experiment
        }
      })
      .filter(Boolean)
      .flat()
      .map((e) => (e as string).replace(".json", ""))

    return sendResponse(200, experiments)
  } catch (error) {
    return sendResponse(500, error)
  }
}
