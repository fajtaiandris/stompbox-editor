import { PlusIcon } from "@radix-ui/react-icons"
import { useEditorState } from "components/state/editorState"
import { IconButton } from "components/ui/IconButton/IconButton"
import { IconButtonRow } from "components/ui/IconButtonRow/IconButtonRow"
import { MenuItem } from "./menuItem"

export const EnclosureActionsMenu: React.FC = () => {
  const { addRow, rows } = useEditorState()
  const maxY = rows.reduce((acc, row) => (row.y > acc ? row.y : acc), 0)

  return (
    <MenuItem title="Enclosure">
      <IconButtonRow>
        <IconButton onClick={() => addRow(maxY + 50, 1)}>
          <PlusIcon />
        </IconButton>
      </IconButtonRow>
    </MenuItem>
  )
}
