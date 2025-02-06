import { ViewMode } from "components/state/types";

export type Part = React.FC<{ viewMode: ViewMode, isSelected: boolean, color: string }>