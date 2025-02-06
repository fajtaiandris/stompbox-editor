"use client"

import * as d3 from "d3"
import React, { useEffect, useRef, useState } from "react"

import { useEditorState } from "components/state/editorState"
import { Point, Row } from "components/state/types"
import { Defs } from "./defs"
import { DrillPoint } from "./drillPoint"
import { defaultEnclosureOrigo, Enclosure } from "./enclosure"
import { partsMap } from "./partsMap"
import { Ruler } from "./ruler"

export const Canvas: React.FC = () => {
  const { selection, setSelection, rows, viewMode } = useEditorState()
  const svgRef = useRef<SVGSVGElement>(null)
  const gRef = useRef<SVGGElement>(null)
  const [_, setTransform] = useState(d3.zoomIdentity)

  useEffect(() => {
    if (!svgRef.current || !gRef.current) return

    const svg = d3.select(svgRef.current)
    const g = d3.select(gRef.current)

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5]) // Set min and max zoom levels
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
        setTransform(event.transform)
      })

    svg.call(zoom)

    return () => {
      svg.on(".zoom", null) // Cleanup zoom handler on unmount
    }
  }, [])

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
    <svg ref={svgRef} className="h-full w-full bg-white">
      <Defs />
      <g ref={gRef}>
        <rect width="1000%" height="1000%" fill="url(#dots)" transform="translate(-5000, -5000)" />

        <Enclosure />
        <Ruler />
        {rows.map((row, i) => (
          <g key={i}>
            {row.points.map((point, j) => (
              <g
                key={j}
                transform={`translate(${point.x + defaultEnclosureOrigo.x}, ${row.y + defaultEnclosureOrigo.y})`}
                onClick={viewMode === "normal" ? () => handleClick(row, point) : undefined}
              >
                {DrillPoint(viewMode)}
                {point.plate && viewMode === "normal" && point.plate}
                {point.part &&
                  viewMode === "normal" &&
                  partsMap[point.part.name as keyof typeof partsMap](
                    (selection !== "enclosure" && selection?.row === row && !("point" in selection)) ||
                      (!!selection &&
                        selection !== "enclosure" &&
                        "point" in selection &&
                        selection.row === row &&
                        selection.point === point),
                    point.part.color
                  )}
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  )
}
