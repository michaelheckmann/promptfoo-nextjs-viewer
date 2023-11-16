"use client"

import { useExperiment } from "@/lib/experiment-context"
import { Stats } from "@/components/stats"
import { Table } from "@/components/table"

export default function IndexPage() {
  const { experiment } = useExperiment()

  if (!experiment) {
    return null
  }

  console.log(experiment)
  return (
    <div className="container flex flex-col gap-4 py-4">
      <Stats {...experiment.results.stats} />
      <Table {...experiment.results.table} />
    </div>
  )
}
