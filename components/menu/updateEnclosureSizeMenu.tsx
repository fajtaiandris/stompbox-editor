import React from "react"

import { useEditorState } from "components/state/editorState"
import { cn } from "components/utils"
import { MenuItem } from "./menuItem"

const enclosures = [
  { width: 130, height: 240 },
  { width: 240, height: 240 },
  { width: 80, height: 240 },
]

export const UpdateEnclosureSizeMenu: React.FC = () => {
  const { updateEnclosureSize, enclosure } = useEditorState()

  return (
    <MenuItem title="Size">
      <div className="flex flex-col gap-y-[8px]">
        {enclosures.map((e, i) => (
          <button
            key={i}
            type="button"
            onClick={() => updateEnclosureSize(e.width, e.height)}
            className={cn(
              "rounded-[3px] bg-[lightgray] text-black",
              enclosure.width === e.width && enclosure.height === e.height && "ring"
            )}
          >
            {e.width} x {e.height}
          </button>
        ))}
      </div>
    </MenuItem>
  )
}
