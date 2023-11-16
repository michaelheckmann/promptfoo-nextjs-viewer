"use client"

import { useExperiment } from "@/lib/experiment-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ExperimentSheet } from "./experiment-sheet"
import { SheetTrigger } from "./ui/sheet"

export function SiteHeader() {
  const { experiment, experiments } = useExperiment()
  return (
    <ExperimentSheet>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-10 justify-between items-center">
          <Button
            variant="secondary"
            size="xs"
            asChild
            disabled={!experiments.length}
          >
            <SheetTrigger>Select experiment</SheetTrigger>
          </Button>
          <p className="text-xs font-mono text-muted-foreground">
            {experiment?.name ? experiment.name : "no-experiment-selected"}
          </p>
          <Tabs defaultValue="view">
            <TabsList size="xs">
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="score">Score</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
    </ExperimentSheet>
  )
}
