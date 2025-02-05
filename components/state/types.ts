import { z } from "zod"

export const Enclosure = z.object({
  width: z.number(),
  height: z.number(),
  color: z.string(),
})
export type Enclosure = z.infer<typeof Enclosure>

export const PartName = z.enum(["knob1", "footswitch"])
export type PartName = z.infer<typeof PartName>

const JSXElement = z.custom<React.JSX.Element>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e) => (e as any)?.$$typeof === Symbol.for("react.element"),
  "value must be a React Element"
)

export const Point = z.object({
  x: z.number(),
  plate: z.optional(JSXElement),
  part: z.optional(
    z.object({
      name: PartName,
      color: z.string(),
    })
  ),
})
export type Point = z.infer<typeof Point>

export const Row = z.object({
  y: z.number(),
  points: z.array(Point),
})
export type Row = z.infer<typeof Row>

export const Stompbox = z.object({
  enclosure: Enclosure,
  rows: z.array(Row),
})
export type Stompbox = z.infer<typeof Stompbox>
