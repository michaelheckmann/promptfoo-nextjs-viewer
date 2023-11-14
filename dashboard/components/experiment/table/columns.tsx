"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EvaluateTable, EvaluateTableOutput } from "promptfoo"

import { makeGetCall } from "@/lib/makeGetCall"
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
    makeGetCall(`/api/evaluate/${type}`)
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

export const getPromptsColumns = (
  prompts: EvaluateTable["head"]["prompts"]
) => {
  return prompts.map((p) => ({
    header: p.raw,
    accessorKey: p.id,
    cell: ({ getValue }: { getValue: () => EvaluateTableOutput }) => {
      return (
        <div>
          <div>{getValue().text}</div>
          <div className="flex justify-end gap-3">
            <ScoreButton type="thumbsUp" pass={getValue().pass} />
            <ScoreButton type="thumbsDown" pass={getValue().pass} />
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
