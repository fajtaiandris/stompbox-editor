"use client"

import { Canvas } from "components/canvas/canvas"
import { EditorStateProvider } from "components/editorState"
import { Menu } from "components/menu/menu"

export default function Web() {
  return (
    <EditorStateProvider>
      <div className="h-full">
        <Menu />
        <Canvas />
      </div>
    </EditorStateProvider>
  )
}
