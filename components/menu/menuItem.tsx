import type { PropsWithChildren } from "react"
import React from "react"

export const MenuItem: React.FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <div className="mt-[8px] flex flex-col gap-y-[8px]">
      <h1 className="text-[12px] text-black">{title}</h1>
      {children}
    </div>
  )
}
