import { readFileSync } from "fs"

import { getExperimentPath } from "@/lib/get-experiment-path"
import { getManualScores } from "@/lib/get-manual-scores"
import { sendResponse } from "@/lib/send-response"

type Params = {
  experiment: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const experimentPath = getExperimentPath(params.experiment)
    const experiment = readFileSync(experimentPath, "utf-8")
    const manualScores = getManualScores(params.experiment)
    if (!experiment) {
      return sendResponse(404, "Experiment not found")
    }
    return sendResponse(200, {
      experiment: JSON.parse(experiment),
      manualScores,
    })
  } catch (error) {
    return sendResponse(500, error)
  }
}
