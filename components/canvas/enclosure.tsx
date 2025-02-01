import { useEditorState } from "components/editorState"
import { strokeColor } from "components/utils"

export const defaultEnclosureOrigo = { x: 610, y: 100 }

export const Enclosure = () => {
  const { selection, setSelection, enclosure } = useEditorState()
  return (
    <g onClick={() => setSelection("enclosure")}>
      <rect
        {...defaultEnclosureOrigo}
        width={enclosure.width}
        height={enclosure.height}
        fill={enclosure.color}
        stroke={strokeColor(selection === "enclosure")}
        rx="4"
        ry="4"
      />
      <rect
        {...defaultEnclosureOrigo}
        width={enclosure.width}
        height={enclosure.height}
        rx="4"
        ry="4"
        filter="url(#inner-shadow)"
      />
    </g>
  )
}
