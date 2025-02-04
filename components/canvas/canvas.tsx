import * as d3 from "d3"
import React, { useEffect, useRef, useState } from "react"

import type { Point, Row } from "components/editorState"
import { useEditorState } from "components/editorState"
import { Defs } from "./defs"
import { DrillPoint } from "./drillPoint"
import { defaultEnclosureOrigo, Enclosure } from "./enclosure"
import { partsMap } from "./partsMap"
import { Ruler } from "./ruler"

export const Canvas: React.FC = () => {
  const { selection, setSelection, rows } = useEditorState()
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
        <Enclosure />
        <Ruler />
        {rows.map((row, i) => (
          <g key={i}>
            {row.points.map((point, j) => (
              <g
                key={j}
                transform={`translate(${point.x + defaultEnclosureOrigo.x}, ${row.y + defaultEnclosureOrigo.y})`}
                onClick={() => handleClick(row, point)}
              >
                {DrillPoint()}
                {point.plate && point.plate()}
                {point.part &&
                  partsMap[point.part.name](
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
