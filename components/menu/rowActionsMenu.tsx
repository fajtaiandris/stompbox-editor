import { useEditorState } from "components/state/editorState"
import { MenuItem } from "./menuItem"

export const RowActionsMenu: React.FC = () => {
  const { deleteRow, addPointToRow, selection } = useEditorState()
  const selectedRow = !!selection && selection !== "enclosure" && "row" in selection ? selection.row : undefined
  const maxX = selectedRow ? selectedRow.points.reduce((acc, point) => (point.x > acc ? point.x : acc), 0) : 0

  return (
    <MenuItem title="Row">
      <div className="flex gap-x-[8px]">
        <button
          type="button"
          className="h-[30px] min-w-[30px] rounded-[3px] bg-[lightgray] text-black"
          onClick={selectedRow ? () => deleteRow(selectedRow) : undefined}
        >
          -
        </button>
        <button
          type="button"
          className="h-[30px] min-w-[30px] rounded-[3px] bg-[lightgray] text-black"
          onClick={selectedRow ? () => addPointToRow(selectedRow, maxX + 50) : undefined}
        >
          +
        </button>
      </div>
    </MenuItem>
  )
}
