# Contracts: Fix Markdown Table Rendering Bug

**Feature**: 006-table-rendering-bug  
**Date**: November 25, 2025

## Overview

This bug fix does not introduce new APIs or contracts. The fix is purely internal to the `MarkdownPreview` component.

## Component Interface (Unchanged)

The `MarkdownPreview` component interface remains unchanged:

```typescript
interface MarkdownPreviewProps {
  content: string;
  className?: string;
}
```

## Plugin Integration

The only contract change is internal - adding `remark-gfm` to the remark plugin pipeline:

```typescript
// Before
<Markdown rehypePlugins={[rehypeSlug]} components={components}>

// After
<Markdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeSlug]}
  components={components}
>
```

## Behavioral Contracts

### Input Contract

- **Valid GFM table markdown** → Renders as HTML table element
- **Invalid/malformed table** → Renders as plain text (graceful degradation)

### Output Contract

Tables render with:

- `<table>` element with proper `<thead>` and `<tbody>` sections
- `<th>` elements for header cells with `align` attribute when specified
- `<td>` elements for body cells with `align` attribute when specified
- Links inside cells remain functional (existing behavior preserved)

## Dependencies

### New Dependency

```json
{
  "remark-gfm": "^4.0.0"
}
```

### Peer Dependency Compatibility

`remark-gfm` v4.x is compatible with:

- `react-markdown` v9.x and v10.x
- Node.js 16+
