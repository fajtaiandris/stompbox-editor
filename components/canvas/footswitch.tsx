import { strokeColor } from "components/utils"

export const FootSwitch = (isSelected: boolean) => {
  const sideLength = 20 // Length of a side of the hexagon
  const height = Math.sqrt(3) * sideLength // Height of the hexagon
  const points = [
    [sideLength / 2, -height / 2], // Top-right
    [sideLength, 0], // Right
    [sideLength / 2, height / 2], // Bottom-right
    [-sideLength / 2, height / 2], // Bottom-left
    [-sideLength, 0], // Left
    [-sideLength / 2, -height / 2], // Top-left
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ")

  return (
    <g>
      <circle cx={0} cy={0} r={25} fill="silver" stroke={strokeColor(isSelected)} />
      <circle cx={0} cy={0} r={25} filter="url(#inner-shadow)" />
      <polygon points={points} fill="gray" stroke={strokeColor(isSelected)} />
      <circle cx={0} cy={0} r={13} fill="gray" stroke={strokeColor(isSelected)} />
      <circle cx={0} cy={0} r={13} fill="url(#gloss)" />
    </g>
  )
}
