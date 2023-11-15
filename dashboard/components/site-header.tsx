"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-10 justify-between items-center">
        <Button variant="secondary" size="xs">
          Select experiment
        </Button>
        <p className="text-xs font-mono text-muted-foreground">
          experiment: smoke
        </p>
        <Tabs defaultValue="view">
          <TabsList size="xs">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="score">Score</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  )
}
