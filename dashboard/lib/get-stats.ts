import { Experiment } from "@/types/experiment"
import { ManualScore } from "@/types/score"

export type Stats = {
  totalTests: number
  passed: number
  mixed: number
  failed: number
  totalTokens: number
  cached: number
  prompt: number
  completion: number
}

export const getStats = (
  experiment: Experiment,
  manualScores: ManualScore[] | null
): Stats => {
  const out: Stats = {
    totalTests: 0,
    passed: 0,
    mixed: 0,
    failed: 0,
    totalTokens: 0,
    cached: 0,
    prompt: 0,
    completion: 0,
  }

  return out
}
