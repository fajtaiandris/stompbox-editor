import { PartName } from "components/state/types"
import { FootSwitch } from "./footswitch"
import { Knob1 } from "./knob1"
import { Part } from "./type"

export const partsMap: Record<PartName, Part> = {
  knob1: Knob1,
  footswitch: FootSwitch,
}
