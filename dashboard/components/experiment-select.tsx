"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  experiments: string[]
  onSelect: (experiment: string) => void
}

export const ExperimentSelect = ({ experiments, onSelect }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(experiments[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? experiments.find((e) => e === value)
            : "Select an experiment..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search experiment..." />
          <CommandEmpty>No experiment found.</CommandEmpty>
          <CommandGroup>
            {experiments.map((e) => (
              <CommandItem
                key={e}
                value={e}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  onSelect(currentValue)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === e ? "opacity-100" : "opacity-0"
                  )}
                />
                {e}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
