import { PropsWithChildren } from "react"

export const IconButtonRow: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex gap-x-[8px]">{children}</div>
}
