import { CommitIcon, TrashIcon } from "@radix-ui/react-icons"
import { useEditorState } from "components/state/editorState"
import { IconButton } from "components/ui/IconButton/IconButton"
import { IconButtonRow } from "components/ui/IconButtonRow/IconButtonRow"
import { MenuItem } from "./menuItem"

export const RowActionsMenu: React.FC = () => {
  const { deleteRow, addPointToRow, selection } = useEditorState()
  const selectedRow = !!selection && selection !== "enclosure" && "row" in selection ? selection.row : undefined
  const maxX = selectedRow ? selectedRow.points.reduce((acc, point) => (point.x > acc ? point.x : acc), 0) : 0

  return (
    <MenuItem title="Row">
      <IconButtonRow>
        <IconButton onClick={selectedRow ? () => deleteRow(selectedRow) : undefined}>
          <TrashIcon />
        </IconButton>
        <IconButton onClick={selectedRow ? () => addPointToRow(selectedRow, maxX + 50) : undefined}>
          <CommitIcon />
        </IconButton>
      </IconButtonRow>
    </MenuItem>
  )
}
