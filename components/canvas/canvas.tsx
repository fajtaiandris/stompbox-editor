import React from "react"

import type { Point, Row } from "components/editorState"
import { useEditorState } from "components/editorState"
import { Defs } from "./defs"
import { defaultEnclosureOrigo, Enclosure } from "./enclosure"
import { partsMap } from "./partsMap"
import { Ruler } from "./ruler"

export const Canvas: React.FC = () => {
  const { selection, setSelection, rows } = useEditorState()

  const handleClick = (row: Row, point: Point) => {
    if (selection !== "enclosure" && selection?.row === row) {
      setSelection({ row, point })
      return
    }
    if (selection === undefined) {
      setSelection({ row })
      return
    }
    setSelection(undefined)
  }

  return (
    <svg className="h-full w-full bg-white">
      <Defs />
      <Enclosure />
      <Ruler />
      {rows.map((row, i) => (
        <g key={i}>
          {/* Drill points */}
          {row.points.map((point, j) => (
            <circle
              key={j}
              cx={point.x + defaultEnclosureOrigo.x}
              cy={row.y + defaultEnclosureOrigo.y}
              r="4"
              fill="white"
            />
          ))}
          {/* Plates */}
          {row.points.map(
            (point, j) =>
              point.plate && (
                <g
                  key={j}
                  transform={`translate(${point.x + defaultEnclosureOrigo.x}, ${row.y + defaultEnclosureOrigo.y})`}
                >
                  {point.plate()}
                </g>
              )
          )}
          {/* Parts */}
          {row.points.map(
            (point, j) =>
              point.part && (
                <g
                  key={j}
                  transform={`translate(${point.x + defaultEnclosureOrigo.x}, ${row.y + defaultEnclosureOrigo.y})`}
                  onClick={() => handleClick(row, point)}
                >
                  {partsMap[point.part.name](
                    (selection !== "enclosure" && selection?.row === row && !("point" in selection)) ||
                      (!!selection &&
                        selection !== "enclosure" &&
                        "point" in selection &&
                        selection.row === row &&
                        selection.point === point),
                    point.part.color
                  )}
                </g>
              )
          )}
        </g>
      ))}
    </svg>
  )
}
