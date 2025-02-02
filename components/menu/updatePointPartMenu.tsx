import React from "react"

import type { PartName } from "components/canvas/partsMap"
import { partsMap } from "components/canvas/partsMap"
import { useEditorState } from "components/editorState"
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
        {Object.keys(partsMap).map((part) => (
          <svg
            key={part}
            className={cn(
              "h-[40px] w-[40px] cursor-pointer rounded-[3px] bg-[gainsboro]",
              currentPart?.name === part && "ring"
            )}
            viewBox="0 0 80 80"
            onClick={() => updatePointPart({ name: part as PartName, color: currentPart?.color ?? "red" })}
          >
            <g transform="translate(40,40)">{partsMap[part as PartName](false, currentPart?.color ?? "red")}</g>
          </svg>
        ))}
      </div>
    </MenuItem>
  )
}
