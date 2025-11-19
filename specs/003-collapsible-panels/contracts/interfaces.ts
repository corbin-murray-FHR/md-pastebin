export type LayoutMode = "split" | "editor" | "viewer";

export interface LayoutState {
  mode: LayoutMode;
  isMobile: boolean; // To handle responsive behavior if needed
}
