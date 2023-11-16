import { StatsWithMixedResults } from "@/types/experiment"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const Stats = ({
  successes,
  mixed,
  failures,
  tokenUsage,
}: StatsWithMixedResults) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Stats</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              <span>{successes + failures + mixed} </span>
              <span className="ml-1 text-gray-500">total tests</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="text-green-500 ">
              <span className="font-bold">{successes}</span> passed
            </div>
            <div className="mt-1 text-yellow-500">
              <span className="font-bold">{mixed}</span> mixed
            </div>
            <div className="mt-1 text-red-500">
              <span className="font-bold">{failures}</span> failed
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              <span>{tokenUsage.total} </span>
              <span className="ml-1 text-gray-500">total tokens used</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div>
              <span className="font-bold">{tokenUsage.cached}</span> cached
            </div>
            <div className="mt-1">
              <span className="font-bold">{tokenUsage.prompt}</span> for the
              prompt
            </div>
            <div className="mt-1">
              <span className="font-bold">{tokenUsage.completion}</span> for
              completion
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
