"use client"

import { useEffect, useState } from "react"
import { EvaluateSummary, TestSuiteConfig } from "promptfoo"

import { makeGetCall } from "@/lib/makeGetCall"
import { ExperimentSelect } from "@/components/experiment-select"
import { Stats } from "@/components/experiment/stats"
import { Table } from "@/components/experiment/table"

type ExperimentFiles = {
  data: string[]
}
type ExperimentResult = {
  data: {
    config: TestSuiteConfig
    results: EvaluateSummary
  }
}

export default function IndexPage() {
  const [experimentFiles, setExperimentFiles] =
    useState<ExperimentFiles | null>(null)
  const [experimentResult, setExperimentResult] =
    useState<ExperimentResult | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await makeGetCall<ExperimentFiles>("/api/experiments")
      const defaultValue = res?.data[0]
      setExperimentFiles(res)

      if (defaultValue) {
        loadExperiment(defaultValue)
      }
    })()
  }, [])

  const loadExperiment = async (experiment: string) => {
    const res = await makeGetCall<ExperimentResult>(
      `/api/experiments/${experiment}`
    )
    setExperimentResult(res)
  }
  return (
    <>
      <section className="container grid items-center py-4">
        {experimentFiles && (
          <ExperimentSelect
            experiments={experimentFiles.data}
            onSelect={loadExperiment}
          />
        )}
      </section>
      {experimentResult?.data && (
        <>
          <section className="container grid items-center py-4">
            <Stats {...experimentResult.data.results} />
          </section>
          <section className="container grid items-center py-4">
            <Table {...experimentResult.data.results.table} />
          </section>
        </>
      )}
    </>
  )
}
