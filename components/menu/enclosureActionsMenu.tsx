import { useEditorState } from "components/editorState"
import { MenuItem } from "./menuItem"

export const EnclosureActionsMenu: React.FC = () => {
  const { addRow, rows } = useEditorState()
  const maxY = rows.reduce((acc, row) => (row.y > acc ? row.y : acc), 0)

  return (
    <MenuItem title="Enclosure">
      <div className="flex flex-col gap-y-[8px]">
        <button
          type="button"
          className="h-[30px] max-w-[30px] rounded-[3px] bg-[lightgray] text-black"
          onClick={() => addRow(maxY + 50, 1)}
        >
          +
        </button>
      </div>
    </MenuItem>
  )
}
