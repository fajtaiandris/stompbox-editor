"use client"

import { Canvas } from "components/canvas/canvas"
import { Menu } from "components/menu/menu"
import { EditorStateProvider } from "components/state/editorState"

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
