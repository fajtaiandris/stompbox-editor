import React from "react"

import { useEditorState } from "components/state/editorState"
import { EnclosureActionsMenu } from "./enclosureActionsMenu"
import { RowActionsMenu } from "./rowActionsMenu"
import { UpdateColorMenu } from "./updateColorMenu"
import { UpdateEnclosureSizeMenu } from "./updateEnclosureSizeMenu"
import { UpdatePointPartMenu } from "./updatePointPartMenu"
import { UpdateRowYMenu } from "./updateRowYMenu"

export const Menu = () => {
  const { selection } = useEditorState()

  if (selection === undefined) {
    return undefined
  }

  const getLabel = () => {
    if (selection === undefined) {
      return undefined
    }
    if (selection === "enclosure") {
      return <EnclosureMenu />
    }
    if ("point" in selection) {
      return <PointMenu />
    }
    return <RowMenu />
  }
  return (
    <div className="absolute top-[20px] left-[20px] h-[500px] rounded-[6px] border-2 border-[lightgray] shadow-lg">
      <div className="h-full w-[200px] overflow-scroll rounded-[6px] bg-white p-[10px]">
        <div className="text-gray-400">{getLabel()}</div>
      </div>
    </div>
  )
}

const PointMenu = () => {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <UpdatePointPartMenu />
      <UpdateColorMenu />
    </div>
  )
}

const EnclosureMenu: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <EnclosureActionsMenu />
      <UpdateEnclosureSizeMenu />
      <UpdateColorMenu />
    </div>
  )
}

const RowMenu: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <RowActionsMenu />
      <UpdateRowYMenu />
    </div>
  )
}
