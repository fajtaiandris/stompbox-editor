import { ToggleGroup } from "radix-ui"
import { useEditorState } from "components/state/editorState"
import { ViewMode } from "components/state/types"
import { cn } from "components/utils"

export const BottomNavigation = () => {
  const { updateViewMode, viewMode } = useEditorState()
  return (
    <div className="absolute right-[10px] bottom-[10px]">
      <ToggleGroup.Root
        type="single"
        value={viewMode}
        onValueChange={(value) => {
          if (value) updateViewMode(ViewMode.parse(value))
        }}
        className="inline-flex rounded-md border shadow-lg"
      >
        <ToggleGroup.Item
          value="normal"
          className={cn(
            "flex h-9 w-9 cursor-pointer items-center justify-center bg-white first:rounded-l-md last:rounded-r-md",
            viewMode === "normal" && "bg-[lightgray]"
          )}
          data-state={viewMode === "normal" ? "on" : undefined}
        >
          A
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="drill"
          className={cn(
            "flex h-9 w-9 cursor-pointer items-center justify-center bg-white first:rounded-l-md last:rounded-r-md",
            viewMode === "drill" && "bg-[lightgray]"
          )}
          data-state={viewMode === "drill" ? "on" : undefined}
        >
          B
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  )
}
