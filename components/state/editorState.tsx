"use client"

import React, { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react"
import { FootSwitch } from "components/canvas/footswitch"
import { Enclosure, Point, Row, Stompbox, ViewMode } from "./types"

const getEqualDistancePoints = (count: number, margin: number): Point[] => {
  const start = 0 + margin
  const end = defaultStompbox.enclosure.width - margin
  const step = count > 1 ? (end - start) / (count - 1) : 0
  return Array.from({ length: count }, (_, i) => ({
    x: start + step * i,
    part: { name: "knob1", color: "antiquewhite" },
  }))
}

const getCenterPoint = () => {
  return [
    {
      x: defaultStompbox.enclosure.width / 2,
      y: defaultStompbox.enclosure.height / 2,
      part: { component: FootSwitch, color: "" },
    },
  ]
}

type Selection = "enclosure" | { row: Row } | { row: Row; point: Point } | undefined
type EditorStateContextType = {
  selection: Selection
  setSelection: (selection: Selection) => void
  rows: Row[]
  enclosure: Enclosure
  viewMode: ViewMode
  updateSelectionColor: (color: string) => void
  updateEnclosureSize: (width: number, height: number) => void
  updatePointPart: (part: Point["part"]) => void
  addRow: (y: number, itemCount: number) => void
  addPointToRow: (row: Row, x: number) => void
  updateRowY: (row: Row, y: number) => void
  deleteRow: (row: Row) => void
  updateViewMode: (viewMode: ViewMode) => void
}

const EditorStateContext = createContext<EditorStateContextType>({
  selection: undefined,
  setSelection: () => void 0,
  rows: [],
  enclosure: { width: 0, height: 0, color: "" },
  viewMode: "normal",
  updateSelectionColor: () => void 0,
  updateEnclosureSize: () => void 0,
  updatePointPart: () => void 0,
  addRow: () => void 0,
  addPointToRow: () => void 0,
  updateRowY: () => void 0,
  deleteRow: () => void 0,
  updateViewMode: () => void 0,
})

const defaultStompbox: Stompbox = { enclosure: { width: 130, height: 240, color: "antiquewhite" }, rows: [] }

const loadStompboxFromLocalStorage: () => Stompbox = () => {
  try {
    const savedStompbox = localStorage.getItem("stompbox")
    if (!savedStompbox) {
      console.info("No saved stompbox found in localStorage")
      return defaultStompbox
    }
    const obj = JSON.parse(savedStompbox)
    return Stompbox.parse(obj)
  } catch (e) {
    console.error("Error loading state from localStorage", e)
  }
  return defaultStompbox
}

const saveStompboxToLocalStorage = (stompbox: Stompbox) => {
  try {
    localStorage.setItem("stompbox", JSON.stringify(stompbox))
  } catch (e) {
    console.error("Error saving state to localStorage", e)
  }
}

export const EditorStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selection, setSelection] = useState<Selection>(undefined)
  const [stompbox, setStompbox] = useState<Stompbox>(defaultStompbox)
  const [viewMode, setViewMode] = useState<ViewMode>("drill")

  useEffect(() => {
    setStompbox(loadStompboxFromLocalStorage())
  }, [])

  useEffect(() => {
    saveStompboxToLocalStorage(stompbox)
  }, [stompbox])

  const updateSelectionColor = (color: string) => {
    if (selection && (selection === "enclosure" || "point" in selection)) {
      if (selection === "enclosure") {
        setStompbox((prev) => ({ ...prev, enclosure: { ...prev.enclosure, color } }))
      } else if (selection.point.part) {
        setStompbox((prev) => {
          const newRows = [...prev.rows]
          const rowIndex = newRows.findIndex((row) => row === selection.row)

          const pointIndex = newRows[rowIndex]?.points?.findIndex((point) => point === selection.point)

          if (pointIndex !== -1) {
            const point = newRows[rowIndex]?.points[pointIndex ?? 0]
            if (point && point.part) {
              point.part.color = color
            }
          }

          return { ...prev, rows: newRows }
        })
      }
    }
  }

  const updateEnclosureSize = (width: number, height: number) => {
    setStompbox((prev) => ({ ...prev, enclosure: { ...prev.enclosure, width, height } }))
  }

  const updatePointPart = (part: Point["part"]) => {
    if (!selection || selection === "enclosure" || !("point" in selection)) return
    setStompbox((prev) => {
      const newRows = [...prev.rows]
      const rowIndex = newRows.findIndex((row) => row === selection.row)
      const newRow = newRows[rowIndex]
      if (!newRow) return prev
      const pointIndex = newRow.points?.findIndex((point) => point === selection.point)
      if (pointIndex === -1) return prev
      const newPoint = newRow.points[pointIndex]
      if (!newPoint) return prev
      newPoint.part = part
      return { ...prev, rows: newRows }
    })
  }

  const addRow = (y: number, itemCount: number) => {
    const newRow = { y, points: getEqualDistancePoints(itemCount, 40) }
    setStompbox((prev) => ({ ...prev, rows: [...prev.rows, newRow] }))
    setSelection({ row: newRow })
  }

  const updateRowY = (row: Row, y: number) => {
    setStompbox((prev) => {
      const newRows = [...prev.rows]
      const rowIndex = newRows.findIndex((r) => r === row)
      if (rowIndex === -1) return prev
      const newRow = newRows[rowIndex]
      if (!newRow) return prev
      newRow.y = y
      return { ...prev, rows: newRows }
    })
  }

  const addPointToRow = (row: Row, x: number) => {
    setStompbox((prev) => {
      const newRows = [...prev.rows]
      const rowIndex = newRows.findIndex((r) => r === row)
      const newRow = newRows[rowIndex]
      if (!newRow) return prev
      newRow.points.push({ x, part: { name: "knob1", color: "antiquewhite" } })
      return { ...prev, rows: newRows }
    })
  }

  const deleteRow = (row: Row) => {
    setStompbox((prev) => {
      const newRows = [...prev.rows]
      const rowIndex = newRows.findIndex((r) => r === row)
      newRows.splice(rowIndex, 1)
      return { ...prev, rows: newRows }
    })
    setSelection(undefined)
  }

  const updateViewMode = (viewMode: ViewMode) => {
    setSelection(undefined)
    setViewMode(viewMode)
  }

  const value = useMemo(
    () => ({
      selection,
      rows: stompbox.rows,
      enclosure: stompbox.enclosure,
      viewMode,
      setSelection,
      updateSelectionColor,
      updateEnclosureSize,
      updatePointPart,
      addRow,
      addPointToRow,
      updateRowY,
      deleteRow,
      updateViewMode,
    }),
    [selection, stompbox, viewMode]
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
