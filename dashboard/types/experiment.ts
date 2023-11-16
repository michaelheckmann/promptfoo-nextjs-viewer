import {
  EvaluateResult,
  EvaluateStats,
  EvaluateTable,
  EvaluateTableOutput,
  TestSuiteConfig,
} from "promptfoo"

import { ManualGrading } from "./score"

export type StatsWithMixedResults = EvaluateStats & {
  mixed: number
}

export type EvaluateResultWithManualGrading = EvaluateResult & {
  manualGradings?: ManualGrading[]
}

export type EvaluateTableOutputWithManualGrading = EvaluateTableOutput & {
  manualGradings?: ManualGrading[]
}

export type EvaluateTableBodyWithManualGrading = {
  outputs: EvaluateTableOutputWithManualGrading[]
  vars: EvaluateTable["body"][0]["vars"]
}[]

export type Experiment = {
  name: string
  config: TestSuiteConfig
  results: {
    version: number
    stats: StatsWithMixedResults
    table: {
      head: EvaluateTable["head"]
      body: EvaluateTableBodyWithManualGrading
    }
    results: EvaluateResultWithManualGrading[]
  }
}

export type ExperimentResponse = Omit<Experiment, "name">
