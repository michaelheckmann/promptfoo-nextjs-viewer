import { readdirSync } from "fs"
import path from "path"
import { NextResponse } from "next/server"

import { getProjectPath } from "@/lib/getProjectPath"

export async function GET() {
  try {
    const experimentsFolder = path.join(
      getProjectPath(),
      "..",
      "experiments",
      "results"
    )
    const experiments = readdirSync(experimentsFolder).map((experiment) =>
      experiment.replace(".json", "")
    )
    return NextResponse.json(
      {
        data: experiments,
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
