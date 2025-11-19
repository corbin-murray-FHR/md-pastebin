# Research: Collapsible Panels

**Feature**: Collapsible Panels
**Status**: Complete

## Unknowns & Clarifications

### Testing Framework

- **Issue**: No test runner (Vitest/Jest) is currently installed in `package.json`.
- **Decision**: Proceed without adding a test runner for this feature to avoid scope creep. Ensure components are structured to be testable in the future.
- **Rationale**: The feature is primarily UI state management. Adding a test infrastructure is a separate infrastructure task.

### Icons for Toggle Controls

- **Issue**: Need intuitive icons for collapsing/expanding panels.
- **Options**:
  - `ChevronLeft` / `ChevronRight`: Simple, but direction depends on state.
  - `Maximize2` / `Minimize2`: Good for "Full Screen" concept.
  - `PanelLeftClose` / `PanelRightClose`: Most semantic for panels.
- **Decision**: Use `PanelLeftClose` / `PanelRightClose` (or `PanelLeft` / `PanelRight` variants) from `lucide-react` if available. Fallback to `Maximize2` (Expand) / `Minimize2` (Restore) if panel icons are not clear.
- **Refinement**: `lucide-react` has `PanelLeftOpen`, `PanelLeftClose`, `PanelRightOpen`, `PanelRightClose`.
  - Collapse Editor (Left panel): `PanelLeftClose`
  - Expand Editor (Left panel): `PanelLeftOpen`
  - Collapse Viewer (Right panel): `PanelRightClose`
  - Expand Viewer (Right panel): `PanelRightOpen`

## Technology Decisions

### State Management

- **Decision**: Use local React state in `Editor.tsx`.
- **Rationale**: The layout state is specific to the Editor page and doesn't need to be shared globally or persisted across sessions (though persistence could be a nice-to-have, it's not a requirement).
- **Type**: `type LayoutMode = 'split' | 'editor' | 'viewer'`

### CSS / Layout

- **Decision**: Use Tailwind CSS grid and conditional classes.
- **Implementation**:
  - Default: `grid grid-cols-2`
  - Editor Only: `grid grid-cols-1` (hide viewer)
  - Viewer Only: `grid grid-cols-1` (hide editor)
  - Actually, better to use `flex` or just conditional rendering of the columns.
  - If I use `grid-cols-2`, hiding one column automatically makes the other take up space if I change it to `grid-cols-1`.
  - **Refined Approach**:
    - Container: `grid gap-4 h-full`
    - Classes based on state:
      - Split: `lg:grid-cols-2`
      - Full: `grid-cols-1`
    - Conditional rendering of the `div`s for Editor/Viewer based on state.

## Best Practices

- **Accessibility**: Ensure toggle buttons have `aria-label` and `aria-expanded` attributes.
- **Responsive**: On mobile, the "Split" view might naturally stack. The "Collapse" feature might be less relevant or behave differently (e.g., tabs).
  - **Decision**: On mobile (`< lg`), the layout is already stacked (`lg:grid-cols-2`). The collapse buttons should probably be hidden or adapted.
  - **Plan**: Only show collapse controls on desktop (`lg` breakpoint) for now, as mobile naturally shows one after another (scrolling). Or, allow toggling visibility to avoid scrolling.
  - **Refinement**: The user story implies "full width", which on desktop means taking over the other column. On mobile, they are already full width. So this is primarily a desktop feature. I will hide the toggle buttons on mobile or ensure they make sense (e.g., "Show Preview" / "Show Editor" toggle).
  - **Simplification**: For MVP, hide toggle buttons on mobile (`hidden lg:block`).
