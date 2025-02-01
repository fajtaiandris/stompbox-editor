import * as SliderPrimitive from "@radix-ui/react-slider"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import React from "react"

const sliderVariants = cva("relative flex touch-none select-none items-center justify-center border border-black", {
  variants: {
    orientation: {
      vertical: ["w-[4px] h-full"],
      horizontal: ["h-[4px] w-full"],
    },
  },
})

const trackVariants = cva("relative rounded-full bg-[lightgray]", {
  variants: {
    orientation: {
      vertical: ["w-[3px]", "h-full"],
      horizontal: ["h-[3px]", "w-full"],
    },
  },
})

const rangeVariants = cva("absolute bg-white rounded-full", {
  variants: {
    orientation: {
      vertical: ["w-full"],
      horizontal: ["h-full"],
    },
  },
})

type SliderProps = {
  onValueChange: (value: number) => void
  value: number
  min: number
  max: number
  step: number
} & VariantProps<typeof sliderVariants>

export const Slider: React.FC<SliderProps> = ({ onValueChange, orientation = "horizontal", value, max, min, step }) => {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(e) => {
        onValueChange(e?.[0] ?? 0)
      }}
      className={sliderVariants({ orientation })}
      orientation={orientation ?? "horizontal"}
    >
      <SliderPrimitive.Track className={trackVariants({ orientation })}>
        <SliderPrimitive.Range className={rangeVariants({ orientation })} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-[8px] w-[8px] rounded-full border border-black bg-white focus-visible:outline-none" />
    </SliderPrimitive.Root>
  )
}
