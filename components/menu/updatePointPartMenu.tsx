import React from "react"

import { DrillPoint } from "components/canvas/parts/drillPoint"
import { partsMap } from "components/canvas/parts/partsMap"
import { useEditorState } from "components/state/editorState"
import { PartName } from "components/state/types"
import { cn } from "components/utils"
import { MenuItem } from "./menuItem"

export const UpdatePointPartMenu: React.FC = () => {
  const { selection, updatePointPart } = useEditorState()
  const getCurrentPart = () => {
    if (!selection || selection === "enclosure") return undefined
    if ("point" in selection) {
      return selection.point.part
    }
    return undefined
  }

  const currentPart = getCurrentPart()

  return (
    <MenuItem title="Part">
      <div className="flex flex-wrap gap-[8px]">
        <svg
          className={cn(
            "h-[40px] w-[40px] cursor-pointer rounded-[3px] bg-[gainsboro]",
            currentPart === undefined && "ring"
          )}
          viewBox="0 0 80 80"
          onClick={() => updatePointPart(undefined)}
        >
          <g transform="translate(40,40)">
            <DrillPoint viewMode={"normal"} isSelected={false} color="" />
          </g>
        </svg>
        {Object.keys(partsMap).map((part) => {
          const Part = partsMap[PartName.parse(part)]
          return (
            <svg
              key={part}
              className={cn(
                "h-[40px] w-[40px] cursor-pointer rounded-[3px] bg-[gainsboro]",
                currentPart?.name === part && "ring"
              )}
              viewBox="0 0 80 80"
              onClick={() => updatePointPart({ name: PartName.parse(part), color: currentPart?.color ?? "red" })}
            >
              <g transform="translate(40,40)">
                <Part viewMode={"normal"} isSelected={false} color={currentPart?.color ?? "red"} />
              </g>
            </svg>
          )
        })}
      </div>
    </MenuItem>
  )
}
