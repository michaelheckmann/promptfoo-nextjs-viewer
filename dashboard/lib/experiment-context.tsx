"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { Experiment, ExperimentResponse } from "@/types/experiment"
import { ManualScore } from "@/types/score"

import { addScoresToExperiment } from "./add-scores-to-experiment"
import { makeGetRequest } from "./make-get-request"

type ExperimentRequest = {
  experiment: ExperimentResponse
  manualScores: ManualScore[]
}

type ExperimentContext = {
  experiments: string[]
  experiment: Experiment | null
  setExperiment: (experimentName: string) => void
  manualScores: ManualScore[] | null
}

export const ExperimentContext = createContext<ExperimentContext | null>(null)

export const ExperimentProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [experiments, setExperiments] = useState<string[]>([])
  const [_experiment, _setExperiment] = useState<Experiment | null>(null)
  const [manualScores, setManualScores] = useState<ManualScore[] | null>(null)

  const experiment = useMemo(
    () => addScoresToExperiment(_experiment, manualScores),
    [_experiment, manualScores]
  )

  const loadExperiment = async (experimentName: string) => {
    const res = await makeGetRequest<ExperimentRequest>(
      `/api/experiments/${encodeURIComponent(experimentName)}`
    )

    if (res) {
      _setExperiment({
        name: experimentName,
        ...res.experiment,
      })
      setManualScores(res.manualScores)
    } else {
      _setExperiment(null)
      setManualScores(null)
    }
  }

  const setExperiment = (experimentName: string) => {
    loadExperiment(experimentName)
  }

  useEffect(() => {
    ;(async () => {
      const res = await makeGetRequest<string[]>("/api/experiments")
      const defaultValue = res?.[0]
      setExperiments(res ?? [])

      if (defaultValue) {
        loadExperiment(defaultValue)
      }
    })()
  }, [])

  return (
    <ExperimentContext.Provider
      value={{ experiment, experiments, setExperiment, manualScores }}
    >
      {children}
    </ExperimentContext.Provider>
  )
}

export const useExperiment = () => {
  const context = useContext(ExperimentContext)

  if (context === null) {
    throw new Error("useExperiment must be used within a ExperimentProvider")
  }

  return context
}
