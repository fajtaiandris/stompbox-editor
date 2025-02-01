import React from "react"

import { useEditorState } from "components/editorState"
import { Slider } from "components/ui/Slider/slider"
import { MenuItem } from "./menuItem"

export const UpdateRowYMenu: React.FC = () => {
  const { updateRowY, selection, enclosure } = useEditorState()
  const isRowSelected = !selection || selection === "enclosure" || "point" in selection

  const handleSlide = (value: number) => {
    if (isRowSelected) {
      return
    }
    updateRowY(selection.row, value)
  }

  const currentY = isRowSelected ? 0 : selection.row.y

  return (
    <MenuItem title="Position">
      <Slider onValueChange={(value) => handleSlide(value)} value={currentY} min={0} max={enclosure.height} step={1} />
    </MenuItem>
  )
}
