"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EvaluateTable } from "promptfoo"

import { EvaluateTableOutputWithManualGrading } from "@/types/experiment"
import { makeGetRequest } from "@/lib/make-get-request"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export type ExperimentColumns = Record<string, unknown>

export const getVarsColumns = (vars: EvaluateTable["head"]["vars"]) => {
  return vars.map((v) => ({
    header: v,
    accessorKey: v,
  }))
}

type Props = {
  type: "thumbsUp" | "thumbsDown"
  pass: boolean
}
const ScoreButton = ({ type, pass }: Props) => {
  const handleClick = async () => {
    makeGetRequest(`/api/evaluate/${type}`)
  }
  return (
    <button
      onClick={handleClick}
      className={cn(
        buttonVariants({
          size: "icon",
          variant: "ghost",
        }),
        "group"
      )}
    >
      {
        {
          thumbsUp: (
            <Icons.thumbsUp
              className={cn({
                "stroke-green-500": pass,
              })}
            />
          ),
          thumbsDown: (
            <Icons.thumbsDown
              className={cn({
                "stroke-red-500": !pass,
              })}
            />
          ),
        }[type]
      }
      <span className="sr-only">
        Thumbs {type === "thumbsDown" ? "down" : "up"}
      </span>
    </button>
  )
}

const countPasses = (tableOutput: EvaluateTableOutputWithManualGrading) => {
  const automated = tableOutput.gradingResult?.pass ? 1 : 0
  const manual =
    tableOutput.manualGradings?.reduce(
      (acc, curr) => acc + (curr.pass ? 1 : 0),
      0
    ) ?? 0
  return automated + manual
}

const countFailures = (tableOutput: EvaluateTableOutputWithManualGrading) => {
  const automated = tableOutput.gradingResult?.pass ? 0 : 1
  const manual =
    tableOutput.manualGradings?.reduce(
      (acc, curr) => acc + (curr.pass ? 0 : 1),
      0
    ) ?? 0
  return automated + manual
}

export const getPromptsColumns = (
  prompts: EvaluateTable["head"]["prompts"]
) => {
  return prompts.map((p) => ({
    header: p.raw,
    accessorKey: p.id,
    cell: ({
      getValue,
    }: {
      getValue: () => EvaluateTableOutputWithManualGrading
    }) => {
      const passes = countPasses(getValue())
      const failures = countFailures(getValue())
      return (
        <div>
          <div>{getValue().text}</div>
          <div className="flex justify-end gap-3">
            <div
              className={cn("flex gap-0.5", {
                "stroke-green-500 text-green-500": passes,
                "text-gray-300": !passes,
              })}
            >
              {passes}
              <Icons.thumbsUp
                className={cn("stroke-gray-300", {
                  "stroke-green-500": passes,
                })}
              />
            </div>
            <div
              className={cn("flex gap-0.5 ", {
                "stroke-red-500 text-red-500": failures,
                "text-gray-300": !failures,
              })}
            >
              {failures}
              <Icons.thumbsDown
                className={cn("stroke-gray-300", {
                  "stroke-red-500": failures,
                })}
              />
            </div>
          </div>
        </div>
      )
    },
  }))
}

export const getColumns = (
  head: EvaluateTable["head"]
): ColumnDef<ExperimentColumns>[] => {
  const { prompts, vars } = head

  return [
    {
      header: "Variables",
      columns: getVarsColumns(vars),
    },
    {
      header: "Prompts",
      columns: getPromptsColumns(prompts),
    },
  ]
}
