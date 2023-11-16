import React from "react"
import { Row } from "@tanstack/react-table"

const getAdjacentCells = (
  rows: HTMLCollection,
  currentRow: HTMLElement,
  currentColumn: Element
) => {
  const currentRowIndex = Array.from(rows).indexOf(currentRow)
  const nextRow = rows[currentRowIndex + 1]
  const previousRow = rows[currentRowIndex - 1]

  const currentColumnIndex = Array.from(currentRow.children).indexOf(
    currentColumn
  )
  const cellAbove = previousRow?.children[currentColumnIndex]
  const cellBelow = nextRow?.children[currentColumnIndex]
  const cellLeft = currentRow.children[currentColumnIndex - 1]
  const cellRight = currentRow.children[currentColumnIndex + 1]

  return {
    cellAbove,
    cellBelow,
    cellLeft,
    cellRight,
  }
}

export const useHandleKeyDown = () => {
  const tbodyRef = React.useRef<HTMLTableSectionElement>(null)

  const handleKeyDown = <TData>(
    event: React.KeyboardEvent,
    row: Row<TData>
  ) => {
    event.stopPropagation()
    const rows = tbodyRef.current?.children
    if (!rows) return

    const currentRow = event.currentTarget.parentElement!
    const currentColumn = event.currentTarget

    const { cellAbove, cellBelow, cellLeft, cellRight } = getAdjacentCells(
      rows,
      currentRow,
      currentColumn
    )

    switch (event.key) {
      case "ArrowUp":
        cellAbove && (cellAbove as HTMLElement).focus()
        break
      case "ArrowDown":
        cellBelow && (cellBelow as HTMLElement).focus()
        break
      case "ArrowLeft":
        cellLeft && (cellLeft as HTMLElement).focus()
        break
      case "ArrowRight":
        cellRight && (cellRight as HTMLElement).focus()
        break
      case "Enter":
        console.log("select")
        break
      case "Escape":
        ;(event.currentTarget as HTMLElement).blur()
        break
      default:
        break
    }
  }

  return { tbodyRef, handleKeyDown }
}
