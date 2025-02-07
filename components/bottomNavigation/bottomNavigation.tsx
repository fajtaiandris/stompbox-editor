import { Crosshair2Icon, Pencil2Icon } from "@radix-ui/react-icons"
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
        className="inline-flex rounded-[3px] border shadow-lg"
      >
        <ToggleGroup.Item
          value="normal"
          className={cn(
            "flex h-[25px] w-[25px] cursor-pointer items-center justify-center bg-white first:rounded-l-[3px] last:rounded-r-[3px]",
            viewMode === "normal" && "bg-[lightgray]"
          )}
          data-state={viewMode === "normal" ? "on" : undefined}
        >
          <Pencil2Icon />
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="drill"
          className={cn(
            "flex h-[25px] w-[25px] cursor-pointer items-center justify-center bg-white first:rounded-l-[3px] last:rounded-r-[3px]",
            viewMode === "drill" && "bg-[lightgray]"
          )}
          data-state={viewMode === "drill" ? "on" : undefined}
        >
          <Crosshair2Icon />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  )
}
