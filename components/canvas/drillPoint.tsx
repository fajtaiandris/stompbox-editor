import { ViewMode } from "components/state/types"
import { strokeColor } from "components/utils"

export const DrillPoint = (viewMode: ViewMode) => {
  return (
    <g>
      <circle cx={0} cy={0} r="4" fill="none" stroke={strokeColor(false)} />
      {viewMode === "drill" && (
        <g>
          <line x1="0" y1="-8" x2="0" y2="8" stroke={strokeColor(false)} />
          <line x1="-8" y1="0" x2="8" y2="0" stroke={strokeColor(false)} />
        </g>
      )}
    </g>
  )
}
