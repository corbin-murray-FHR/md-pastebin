# Quickstart: Collapsible Panels

## Overview

The Collapsible Panels feature allows users to toggle between Split View, Full Editor, and Full Viewer modes.

## Usage

1. **Open the Editor**: Navigate to the main page.
2. **Collapse Editor**: Click the "Collapse" icon (PanelLeftClose) on the top-right of the Editor panel.
   - The Viewer will expand to full width.
   - A "Show Editor" button will appear (or the collapse button toggles state).
3. **Collapse Viewer**: Click the "Collapse" icon (PanelRightClose) on the top-right of the Viewer panel.
   - The Editor will expand to full width.
4. **Restore Split View**: Click the "Expand" icon on the collapsed side to restore the split view.

## Development

The state is managed locally in `Editor.tsx`.

```typescript
const [layoutMode, setLayoutMode] = useState<LayoutMode>("split");
```

Modify `src/pages/Editor.tsx` to implement the logic.
