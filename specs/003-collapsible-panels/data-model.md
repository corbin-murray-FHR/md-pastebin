# Data Model: Collapsible Panels

**Feature**: Collapsible Panels
**Status**: Draft

## Client-Side State

### LayoutMode

Represents the current visibility state of the editor and viewer panels.

```typescript
type LayoutMode = "split" | "editor" | "viewer";
```

- **split**: Both Editor and Viewer are visible (default).
- **editor**: Only Editor is visible, taking full width.
- **viewer**: Only Viewer is visible, taking full width.

## Persistence

- **Storage**: None required by spec (session-based).
- **Future Consideration**: Could persist to `localStorage` if user preference should be remembered.
