import { EvaluateSummary } from "promptfoo"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const Stats = (results: EvaluateSummary) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Stats</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              <span>{results.stats.successes + results.stats.failures} </span>
              <span className="ml-1 text-gray-500">Total tests</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="text-green-500 ">
              <span className="font-bold">{results.stats.successes}</span>{" "}
              passed
            </div>
            <div className="mt-1 text-red-500">
              <span className="font-bold">{results.stats.failures}</span> failed
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              <span>{results.stats.tokenUsage.total} </span>
              <span className="ml-1 text-gray-500">Total token usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div>
              <span className="font-bold">
                {results.stats.tokenUsage.cached}
              </span>{" "}
              cached
            </div>
            <div className="mt-1">
              <span className="font-bold">
                {results.stats.tokenUsage.completion}
              </span>{" "}
              for completion
            </div>
            <div className="mt-1">
              <span className="font-bold">
                {results.stats.tokenUsage.prompt}
              </span>{" "}
              for the prompt
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
