# Research: Fix Markdown Table Rendering Bug

**Feature**: 006-table-rendering-bug  
**Date**: November 25, 2025  
**Status**: Complete

## Research Tasks

### 1. Root Cause Analysis

**Question**: Why do GFM tables not render in the current implementation?

**Finding**: The application uses `react-markdown` v10.1.0 which only supports CommonMark by default. GitHub Flavored Markdown (GFM) features like tables, strikethrough, and task lists require the `remark-gfm` plugin.

**Evidence**: Current `MarkdownPreview.tsx` only uses `rehype-slug` plugin:

```tsx
<Markdown rehypePlugins={[rehypeSlug]} components={components}>
  {content}
</Markdown>
```

**Decision**: Add `remark-gfm` plugin to enable GFM table support.

**Rationale**: This is the official, documented approach for enabling GFM in react-markdown. The plugin is maintained by the same team (remarkjs).

**Alternatives Considered**:

- Using a different markdown library (rejected: would require significant refactoring)
- Implementing custom table parsing (rejected: reinventing the wheel, maintenance burden)

---

### 2. Dependencies Required

**Question**: What dependencies need to be added?

**Finding**: Only `remark-gfm` is needed. It is a remark plugin that adds GFM support including:

- Tables (with alignment)
- Strikethrough
- Task lists
- Autolink literals
- Footnotes

**Package**: `remark-gfm` (latest version compatible with react-markdown v10)

**Decision**: Add `remark-gfm` as a runtime dependency.

**Rationale**: The package is lightweight, well-maintained, and specifically designed to work with the remark/unified ecosystem that react-markdown uses.

---

### 3. Implementation Pattern

**Question**: How should remark-gfm be integrated?

**Finding**: Pass the plugin via `remarkPlugins` prop:

```tsx
import remarkGfm from "remark-gfm";

<Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
  {content}
</Markdown>;
```

**Decision**: Add `remarkGfm` to the existing `Markdown` component configuration.

**Rationale**: Minimal code change, follows established patterns in the codebase.

---

### 4. Existing CSS Support

**Question**: Does the application already have table styling?

**Finding**: Yes, the `MarkdownPreview.tsx` component already includes Tailwind Typography prose classes for tables:

```tsx
// Tables
"prose-table:border-collapse prose-table:w-full",
"prose-th:border prose-th:p-2 prose-th:bg-muted prose-th:font-semibold",
"prose-td:border prose-td:p-2",
```

**Decision**: No CSS changes required. Existing styles will apply once tables render.

**Rationale**: The styling infrastructure is already in place, confirming the issue is purely about parsing, not rendering.

---

### 5. Wide Table Handling

**Question**: How should wide tables (many columns) be handled on narrow viewports?

**Finding**: The current prose styling uses `w-full` which will cause overflow. Tables need horizontal scrolling on narrow viewports.

**Decision**: Wrap table in a container with `overflow-x-auto` to enable horizontal scrolling.

**Rationale**: Standard responsive table pattern. Prevents layout breaking on mobile while keeping all content accessible.

**Alternatives Considered**:

- Hiding overflow (rejected: hides data)
- Collapsible columns (rejected: too complex for read-only display)

---

## Summary of Decisions

| Item          | Decision                      | Rationale                              |
| ------------- | ----------------------------- | -------------------------------------- |
| GFM Support   | Add `remark-gfm` plugin       | Official solution, minimal changes     |
| CSS Styling   | Use existing prose classes    | Already configured for tables          |
| Wide Tables   | Add `overflow-x-auto` wrapper | Standard responsive pattern            |
| Configuration | No plugin options needed      | Default options cover all requirements |

## Dependencies to Add

```json
{
  "dependencies": {
    "remark-gfm": "^4.0.0"
  }
}
```

## Files to Modify

1. `package.json` - Add remark-gfm dependency
2. `src/components/MarkdownPreview.tsx` - Import and use remark-gfm plugin, add table wrapper
