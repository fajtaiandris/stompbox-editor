import type { JSX, PropsWithChildren } from "react"
import React, { createContext, useMemo, useState } from "react"

import { FootSwitch } from "./canvas/footswitch"
import type { PartName } from "./canvas/partsMap"

export type Enclosure = {
  width: number
  height: number
  color: string
}

export type Row = {
  y: number
  points: Point[]
}

export type Point = {
  x: number
  plate?: () => JSX.Element
  part?: {
    name: PartName
    color: string
  }
}

const getEqualDistancePoints = (count: number, margin: number): Point[] => {
  const start = 0 + margin
  const end = defaultEnclosure.width - margin
  const step = count > 1 ? (end - start) / (count - 1) : 0
  return Array.from({ length: count }, (_, i) => ({
    x: start + step * i,
    part: { name: "knob1", color: "antiquewhite" },
  }))
}

const getCenterPoint = () => {
  return [{ x: defaultEnclosure.width / 2, y: defaultEnclosure.height / 2, part: { component: FootSwitch, color: "" } }]
}

type Selection = "enclosure" | { row: Row } | { row: Row; point: Point } | undefined
type EditorStateContextType = {
  selection: Selection
  setSelection: (selection: Selection) => void
  rows: Row[]
  enclosure: Enclosure
  updateSelectionColor: (color: string) => void
  updateEnclosureSize: (width: number, height: number) => void
  updatePointPart: (part: Point["part"]) => void
  addRow: (y: number, itemCount: number) => void
  addPointToRow: (row: Row, x: number) => void
  updateRowY: (row: Row, y: number) => void
  deleteRow: (row: Row) => void
}

const EditorStateContext = createContext<EditorStateContextType>({
  selection: undefined,
  setSelection: () => void 0,
  rows: [],
  enclosure: { width: 0, height: 0, color: "" },
  updateSelectionColor: () => void 0,
  updateEnclosureSize: () => void 0,
  updatePointPart: () => void 0,
  addRow: () => void 0,
  addPointToRow: () => void 0,
  updateRowY: () => void 0,
  deleteRow: () => void 0,
})

const defaultEnclosure: Enclosure = { width: 130, height: 240, color: "antiquewhite" }
const defaultRows: Row[] = []

export const EditorStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selection, setSelection] = useState<Selection>("enclosure")
  const [enclosure, setEnclosure] = useState<Enclosure>(defaultEnclosure)
  const [rows, setRows] = useState<Row[]>(defaultRows)

  const updateSelectionColor = (color: string) => {
    if (selection && (selection === "enclosure" || "point" in selection)) {
      if (selection === "enclosure") {
        setEnclosure((prev) => ({ ...prev, color }))
      } else if (selection.point.part) {
        setRows((prev) => {
          const newRows = [...prev]
          const rowIndex = newRows.findIndex((row) => row === selection.row)

          const pointIndex = newRows[rowIndex]?.points?.findIndex((point) => point === selection.point)

          if (pointIndex !== -1) {
            const point = newRows[rowIndex]?.points[pointIndex ?? 0]
            if (point && point.part) {
              point.part.color = color
            }
          }

          return newRows
        })
      }
    }
  }

  const updateEnclosureSize = (width: number, height: number) => {
    setEnclosure((prev) => ({ ...prev, width, height }))
  }

  const updatePointPart = (part: Point["part"]) => {
    if (!selection || selection === "enclosure" || !("point" in selection)) return
    setRows((prev) => {
      const newRows = [...prev]
      const rowIndex = newRows.findIndex((row) => row === selection.row)
      const newRow = newRows[rowIndex]
      if (!newRow) return prev
      const pointIndex = newRow.points?.findIndex((point) => point === selection.point)
      if (pointIndex === -1) return prev
      const newPoint = newRow.points[pointIndex]
      if (!newPoint) return prev
      newPoint.part = part
      return newRows
    })
  }

  const addRow = (y: number, itemCount: number) => {
    const newRow = { y, points: getEqualDistancePoints(itemCount, 40) }
    setRows((prev) => [...prev, newRow])
    setSelection({ row: newRow })
  }

  const updateRowY = (row: Row, y: number) => {
    setRows((prev) => {
      const newRows = [...prev]
      const rowIndex = newRows.findIndex((r) => r === row)
      if (rowIndex === -1) return prev
      const newRow = newRows[rowIndex]
      if (!newRow) return prev
      newRow.y = y
      return newRows
    })
  }

  const addPointToRow = (row: Row, x: number) => {
    setRows((prev) => {
      const newRows = [...prev]
      const rowIndex = newRows.findIndex((r) => r === row)
      const newRow = newRows[rowIndex]
      if (!newRow) return prev
      newRow.points.push({ x, part: { name: "knob1", color: "antiquewhite" } })
      return newRows
    })
  }

  const deleteRow = (row: Row) => {
    setRows((prev) => {
      const newRows = [...prev]
      const rowIndex = newRows.findIndex((r) => r === row)
      newRows.splice(rowIndex, 1)
      return newRows
    })
    setSelection(undefined)
  }

  const value = useMemo(
    () => ({
      selection,
      setSelection,
      rows,
      enclosure,
      updateSelectionColor,
      updateEnclosureSize,
      updatePointPart,
      addRow,
      addPointToRow,
      updateRowY,
      deleteRow,
    }),
    [enclosure, selection, enclosure, rows]
  )
  return <EditorStateContext.Provider value={value}>{children}</EditorStateContext.Provider>
}

export const useEditorState = () => {
  const context = React.useContext(EditorStateContext)
  if (context === undefined) {
    throw new Error("useEditorState must be used within a SelectionProvider")
  }
  return context
}
