import { EvaluateTable } from "promptfoo"

import {
  getColumns,
  getPromptsColumns,
  getVarsColumns,
} from "./data-table/columns"
import { DataTable } from "./data-table/data-table"

export const Table = (results: EvaluateTable) => {
  const columns = getColumns(results.head)
  const data = getData(results)

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Results</h2>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

const getData = (table: EvaluateTable) => {
  const { head, body } = table
  const varColumns = getVarsColumns(head.vars)
  const promptColumns = getPromptsColumns(head.prompts)

  return body.map((row) => {
    const { vars, outputs } = row
    const out: Record<string, unknown> = {}
    vars.forEach((v, i) => {
      const key = varColumns[i].accessorKey
      out[key] = v
    })
    outputs.forEach((o, i) => {
      const key = promptColumns[i].accessorKey || ""
      out[key] = o
    })
    return out
  })
}
