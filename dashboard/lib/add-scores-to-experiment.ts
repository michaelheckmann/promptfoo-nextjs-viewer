import { GradingResult } from "promptfoo"

import {
  EvaluateResultWithManualGrading,
  EvaluateTableBodyWithManualGrading,
  Experiment,
  StatsWithMixedResults,
} from "@/types/experiment"
import { ManualGrading, ManualScore } from "@/types/score"

import { createExperimentSignature } from "./create-experiment-signature"

const createManualScoresDict = (manualScores: ManualScore[] | null) => {
  if (!manualScores) {
    return {}
  }

  const out: Record<string, ManualGrading[]> = {}
  manualScores.forEach((manualScore) => {
    manualScore.data.forEach((result) => {
      const signature = createExperimentSignature(result)
      if (!out[signature]) {
        out[signature] = []
      }

      out[signature].push(result.manualGrading)
    })
  })

  return out
}

const combinePasses = (
  gradingResult: GradingResult | undefined,
  manualGrading: ManualGrading[]
) => {
  return [gradingResult?.pass, ...manualGrading.map((m) => m.pass)].filter(
    (x) => x !== undefined && x !== null
  )
}
export const addScoresToExperiment = (
  experiment: Experiment | null,
  manualScores: ManualScore[] | null
): Experiment | null => {
  if (!experiment) {
    return null
  }

  const manualScoresDict = createManualScoresDict(manualScores)

  const evaluateResults: EvaluateResultWithManualGrading[] = []
  const evaluateTableBody: EvaluateTableBodyWithManualGrading = []
  const stats: StatsWithMixedResults = {
    successes: 0,
    failures: 0,
    mixed: 0,
    tokenUsage: experiment.results.stats.tokenUsage,
  }

  experiment.results.results.forEach((result) => {
    const signature = createExperimentSignature({
      text: result.response?.output?.toString() || "",
      prompt: result.prompt.raw,
      provider: result.provider.id || "",
      vars: Object.values(result.vars).filter(
        (v) => typeof v === "string"
      ) as string[],
    })
    const manualGradings = manualScoresDict[signature] ?? []

    const passes = combinePasses(result.gradingResult, manualGradings)
    if (passes.every((p) => p)) {
      stats.successes++
    } else if (passes.every((p) => !p)) {
      stats.failures++
    } else {
      stats.mixed++
    }

    evaluateResults.push({
      ...result,
      manualGradings,
    })
  })

  experiment.results.table.body.forEach((row) => {
    const outputs = row.outputs.map((output) => {
      const signature = createExperimentSignature({
        text: output.text,
        prompt: output.prompt,
        provider: output.provider || "",
        vars: row.vars,
      })
      const manualGradings = manualScoresDict[signature] ?? []

      return {
        ...output,
        manualGradings,
      }
    })

    evaluateTableBody.push({
      outputs,
      vars: row.vars,
    })
  })

  return {
    ...experiment,
    results: {
      ...experiment.results,
      results: evaluateResults,
      table: {
        ...experiment.results.table,
        body: evaluateTableBody,
      },
      stats,
    },
  }
}
