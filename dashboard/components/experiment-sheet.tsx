"use client"

import { useState } from "react"

import { useExperiment } from "@/lib/experiment-context"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

type Props = {
  children: React.ReactNode
}

export const ExperimentSheet = ({ children }: Props) => {
  const [open, setOpen] = useState(false)

  const { experiments, setExperiment } = useExperiment()

  const handleExperimentClick = (group: string, experimentName: string) => {
    const path =
      group === "root" ? experimentName : `${group}/${experimentName}`
    setExperiment(path)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {children}
      <SheetContent side="left" className="h-screen pl-0 pr-2.5">
        <SheetHeader className="pl-4 pr-1.5">
          <SheetTitle>Experiments</SheetTitle>
          <SheetDescription>
            Select an experiment to view and score.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full w-full pl-4">
          <div className="flex flex-col gap-6 py-4">
            {groupExperimentNames(experiments).map(({ group, names }) => (
              <div key={group} className="text-sm">
                <p className="text-muted-foreground mb-1">{group}</p>
                <div className="flex flex-col gap-0.5">
                  {names.map((name) => (
                    <div key={group + name} className="flex pl-1">
                      <Button
                        key={name}
                        className="text-left text-sm p-0 m-0 h-auto"
                        variant="link"
                        onClick={() => handleExperimentClick(group, name)}
                      >
                        {name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

const groupExperimentNames = (experiments: string[]) => {
  const groups: Record<string, string[]> = {
    root: [],
  }
  experiments.forEach((e) => {
    if (!e.includes("/")) {
      groups.root.push(e)
      return
    }
    const [group, name] = e.split("/")
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(name)
  })

  return Object.entries(groups).map(([group, names]) => ({
    group,
    names,
  }))
}
