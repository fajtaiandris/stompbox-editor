import { useEditorState } from "components/state/editorState"
import { strokeColor } from "components/utils"

export const defaultEnclosureOrigo = { x: 610, y: 100 }

export const Enclosure = () => {
  const { selection, setSelection, enclosure, viewMode } = useEditorState()
  return (
    <g onClick={viewMode === "normal" ? () => setSelection("enclosure") : undefined}>
      <rect
        {...defaultEnclosureOrigo}
        width={enclosure.width}
        height={enclosure.height}
        fill={viewMode === "normal" ? enclosure.color : "none"}
        stroke={strokeColor(selection === "enclosure")}
        rx="4"
        ry="4"
      />
      {viewMode === "normal" && (
        <rect
          {...defaultEnclosureOrigo}
          width={enclosure.width}
          height={enclosure.height}
          rx="4"
          ry="4"
          filter="url(#inner-shadow)"
        />
      )}
    </g>
  )
}
