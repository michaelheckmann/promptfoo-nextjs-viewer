import { readFileSync } from "fs"
import path from "path"
import { NextResponse } from "next/server"

import { getProjectPath } from "@/lib/getProjectPath"

export async function GET(
  request: Request,
  { params }: { params: { experiment: string } }
) {
  try {
    const experimentPath = path.join(
      getProjectPath(),
      "..",
      "experiments",
      "results",
      `${params.experiment}.json`
    )
    const experiment = readFileSync(experimentPath, "utf-8")
    if (!experiment) {
      return NextResponse.json(
        { error: "Experiment not found" },
        {
          status: 404,
        }
      )
    }
    return NextResponse.json(
      {
        data: JSON.parse(experiment),
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    )
  }
}
