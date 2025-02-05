import { JSX } from "react"
import { PartName } from "components/state/types"
import { FootSwitch } from "./footswitch"
import { Knob1 } from "./knob1"

export const partsMap: Record<PartName, (isSelected: boolean, color: string) => JSX.Element> = {
  knob1: Knob1,
  footswitch: FootSwitch,
}
