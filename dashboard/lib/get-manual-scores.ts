import { readFileSync, readdirSync } from "fs"

import { getExperimentPath } from "./get-experiment-path"

export const getManualScores = (experiment: string) => {
  const path = getExperimentPath(experiment)
  const parentFolder = path.split("/").slice(0, -1).join("/")
  const files = readdirSync(parentFolder)
  const scoreFileNames = files.filter(
    (file) => file.includes(".scored") && file.includes(experiment)
  )

  const scores = scoreFileNames
    .map((fileName) => {
      const scorePath = `${parentFolder}/${fileName}`
      const score = JSON.parse(readFileSync(scorePath, "utf-8"))
      return score
    })
    .flat()

  return scores
}
