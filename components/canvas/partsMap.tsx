import { JSX } from "react"
import { FootSwitch } from "./footswitch"
import { Knob1 } from "./knob1"

export type PartName = "knob1" | "footswitch"
export const partsMap: Record<PartName, (isSelected: boolean, color: string) => JSX.Element> = {
  knob1: Knob1,
  footswitch: FootSwitch,
}
