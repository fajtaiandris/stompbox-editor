import React from "react"

import { defaultEnclosureOrigo } from "./enclosure"
import { useEditorState } from "../editorState"

export const Ruler: React.FC = () => {
  const { selection, enclosure } = useEditorState()
  const tickLength = 15
  const margin = 10
  if (!selection || selection === "enclosure") {
    return null
  }

  return (
    <g>
      <line
        y1={defaultEnclosureOrigo.y}
        x1={defaultEnclosureOrigo.x - margin - tickLength / 2}
        y2={defaultEnclosureOrigo.y}
        x2={defaultEnclosureOrigo.x - margin + tickLength / 2}
        stroke="lightgray"
      />
      <line
        y1={defaultEnclosureOrigo.y}
        x1={defaultEnclosureOrigo.x - margin}
        y2={defaultEnclosureOrigo.y + selection.row.y}
        x2={defaultEnclosureOrigo.x - margin}
        stroke="lightgray"
      />
      <line
        y1={defaultEnclosureOrigo.y + selection.row.y}
        x1={defaultEnclosureOrigo.x - margin - tickLength / 2}
        y2={defaultEnclosureOrigo.y + selection.row.y}
        x2={defaultEnclosureOrigo.x - margin + tickLength / 2}
        stroke="lightgray"
      />

      <line
        y1={defaultEnclosureOrigo.y + selection.row.y}
        x1={defaultEnclosureOrigo.x - margin}
        y2={defaultEnclosureOrigo.y + enclosure.height}
        x2={defaultEnclosureOrigo.x - margin}
        stroke="lightgray"
      />
      <line
        y1={defaultEnclosureOrigo.y + enclosure.height}
        x1={defaultEnclosureOrigo.x - margin - tickLength / 2}
        y2={defaultEnclosureOrigo.y + enclosure.height}
        x2={defaultEnclosureOrigo.x - margin + tickLength / 2}
        stroke="lightgray"
      />

      {!("point" in selection) && (
        <>
          {selection.row.points.map((point, i) => (
            <g key={i}>
              <line
                y1={defaultEnclosureOrigo.y - margin}
                x1={
                  i === 0
                    ? defaultEnclosureOrigo.x
                    : defaultEnclosureOrigo.x + (selection.row.points ? selection.row.points[i - 1].x : 0)
                }
                y2={defaultEnclosureOrigo.y - margin}
                x2={defaultEnclosureOrigo.x + point.x}
                stroke="lightgray"
              />
              <line
                y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
                x1={i === 0 ? defaultEnclosureOrigo.x : defaultEnclosureOrigo.x + selection.row.points[i - 1].x}
                y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
                x2={i === 0 ? defaultEnclosureOrigo.x : defaultEnclosureOrigo.x + selection.row.points[i - 1].x}
                stroke="lightgray"
              />
              <line
                y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
                x1={defaultEnclosureOrigo.x + point.x}
                y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
                x2={defaultEnclosureOrigo.x + point.x}
                stroke="lightgray"
              />
            </g>
          ))}
          <line
            y1={defaultEnclosureOrigo.y - margin}
            x1={defaultEnclosureOrigo.x + selection.row.points[selection.row.points.length - 1].x}
            y2={defaultEnclosureOrigo.y - margin}
            x2={defaultEnclosureOrigo.x + enclosure.width}
            stroke="lightgray"
          />
          <line
            y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
            x1={defaultEnclosureOrigo.x + selection.row.points[selection.row.points.length - 1].x}
            y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
            x2={defaultEnclosureOrigo.x + selection.row.points[selection.row.points.length - 1].x}
            stroke="lightgray"
          />
          <line
            y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
            x1={defaultEnclosureOrigo.x + enclosure.width}
            y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
            x2={defaultEnclosureOrigo.x + enclosure.width}
            stroke="lightgray"
          />
        </>
      )}
      {"point" in selection && (
        <>
          <line
            y1={defaultEnclosureOrigo.y - margin}
            x1={defaultEnclosureOrigo.x}
            y2={defaultEnclosureOrigo.y - margin}
            x2={defaultEnclosureOrigo.x + selection.point.x}
            stroke="lightgray"
          />
          <line
            y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
            x1={defaultEnclosureOrigo.x}
            y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
            x2={defaultEnclosureOrigo.x}
            stroke="lightgray"
          />
          <line
            y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
            x1={defaultEnclosureOrigo.x + selection.point.x}
            y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
            x2={defaultEnclosureOrigo.x + selection.point.x}
            stroke="lightgray"
          />

          <line
            y1={defaultEnclosureOrigo.y - margin}
            x1={defaultEnclosureOrigo.x + selection.point.x}
            y2={defaultEnclosureOrigo.y - margin}
            x2={defaultEnclosureOrigo.x + enclosure.width}
            stroke="lightgray"
          />
          <line
            y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
            x1={defaultEnclosureOrigo.x + selection.point.x}
            y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
            x2={defaultEnclosureOrigo.x + selection.point.x}
            stroke="lightgray"
          />
          <line
            y1={defaultEnclosureOrigo.y - margin - tickLength / 2}
            x1={defaultEnclosureOrigo.x + enclosure.width}
            y2={defaultEnclosureOrigo.y - margin + tickLength / 2}
            x2={defaultEnclosureOrigo.x + enclosure.width}
            stroke="lightgray"
          />
        </>
      )}
    </g>
  )
}
