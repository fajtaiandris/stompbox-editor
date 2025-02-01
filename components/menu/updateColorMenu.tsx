import React from "react"

import { useEditorState } from "components/editorState"
import { cn } from "components/utils"
import { MenuItem } from "./menuItem"

const cssColors = [
  "antiquewhite",
  "lightgray",
  "mediumseagreen",
  "goldenrod",
  "orchid",
  "tomato",
  "slategray",
  "darkkhaki",
  "indianred",
  "mediumslateblue",
  "peru",
  "teal",
  "plum",
  "rosybrown",
  "dodgerblue",
  "peachpuff",
  "limegreen",
]

export const UpdateColorMenu: React.FC = () => {
  const { updateSelectionColor, selection, enclosure } = useEditorState()
  const getCurrentColor = () => {
    if (!selection) return undefined
    if (selection === "enclosure") {
      return enclosure.color
    }
    if ("point" in selection) {
      return selection.point.part?.color
    }
    return undefined
  }

  const currentColor = getCurrentColor()

  return (
    <MenuItem title="Color">
      <div className="flex flex-wrap gap-[8px]">
        {cssColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => updateSelectionColor(color)}
            style={{ backgroundColor: color }}
            className={cn("min-h-[15px] min-w-[15px] rounded-[3px] text-black", color === currentColor && "ring")}
          />
        ))}
      </div>
    </MenuItem>
  )
}
