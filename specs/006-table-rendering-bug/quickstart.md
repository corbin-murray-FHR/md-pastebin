# Quickstart: Fix Markdown Table Rendering Bug

**Feature**: 006-table-rendering-bug  
**Date**: November 25, 2025

## Prerequisites

- Node.js 18+
- pnpm package manager
- Corporate proxy configured (if applicable)

## Quick Setup

```powershell
# 1. Switch to feature branch
git checkout 006-table-rendering-bug

# 2. Install new dependency
pnpm add remark-gfm

# 3. Start development server
pnpm dev
```

## Implementation Steps

### Step 1: Add remark-gfm dependency

```powershell
pnpm add remark-gfm
```

### Step 2: Update MarkdownPreview component

Edit `src/components/MarkdownPreview.tsx`:

```typescript
// Add import
import remarkGfm from "remark-gfm";

// Update Markdown component
<Markdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeSlug]}
  components={components}
>
  {content}
</Markdown>;
```

### Step 3: Add table wrapper for responsive scrolling

Wrap the Markdown component output to enable horizontal scrolling on wide tables:

```typescript
// Wrap table elements with overflow container
const components = useMemo(
  () => ({
    // ... existing components
    table: ({ node, ...props }: any) => (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    ),
  }),
  [handleAnchorClick]
);
```

## Verification

### Test Basic Table

Paste this markdown and verify it renders as a formatted table:

```markdown
| Name  | Age |
| ----- | --- |
| Alice | 30  |
| Bob   | 25  |
```

### Test Table with Links

Paste a table containing markdown links and verify links are clickable:

```markdown
| Project | Link                                        |
| ------- | ------------------------------------------- |
| React   | [GitHub](https://github.com/facebook/react) |
```

### Test Column Alignment

Verify alignment syntax works:

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| L    |   C    |     R |
```

## Files Modified

1. `package.json` - Added `remark-gfm` dependency
2. `src/components/MarkdownPreview.tsx` - Added plugin and table wrapper
