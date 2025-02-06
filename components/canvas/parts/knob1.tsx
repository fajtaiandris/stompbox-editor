import { strokeColor } from "components/utils"
import { Part } from "./type"

export const Knob1: Part = ({ viewMode, isSelected, color }) => {
  if (viewMode !== "normal") return null
  return (
    <g>
      <circle cx={0} cy={0} r={20} fill={color} stroke={strokeColor(isSelected)} />
      <circle cx={0} cy={0} r={20} fill="url(#knob1Shadow)" />
      <rect x={-6} y={-20} width={12} height={40} fill={color} clipPath="url(#knob1Clip)" />
      <line
        x1={0}
        y1={-20}
        x2={0}
        y2={-4}
        stroke={strokeColor(isSelected)}
        strokeWidth={4}
        clipPath="url(#knob1Clip)"
      />
      <line x1={0} y1={-20} x2={0} y2={-5} stroke="white" clipPath="url(#knob1Clip)" />
    </g>
  )
}
