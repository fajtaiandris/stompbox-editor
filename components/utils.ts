import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const strokeColor = (isSelected: boolean) => (isSelected ? "red" : "black")

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
