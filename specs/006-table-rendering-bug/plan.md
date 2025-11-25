# Implementation Plan: Fix Markdown Table Rendering Bug

**Branch**: `006-table-rendering-bug` | **Date**: November 25, 2025 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/006-table-rendering-bug/spec.md`

## Summary

Fix the bug where GitHub Flavored Markdown (GFM) tables fail to render in the preview panel. The root cause is that `react-markdown` requires the `remark-gfm` plugin to support GFM features like tables. The fix involves adding the `remark-gfm` dependency and configuring it in the `MarkdownPreview` component.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19.2  
**Primary Dependencies**: react-markdown v10.1.0, remark-gfm v4.x (new)  
**Storage**: N/A (client-side rendering only)  
**Testing**: Manual testing (no test framework currently configured)  
**Target Platform**: Web browser (Vite build)  
**Project Type**: Single-page web application  
**Performance Goals**: Table rendering < 1 second for 100+ row tables  
**Constraints**: Must work within existing prose typography system  
**Scale/Scope**: Single component modification

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                   | Status  | Notes                                                     |
| --------------------------- | ------- | --------------------------------------------------------- |
| I. Security & Robustness    | ✅ PASS | No security implications; remark-gfm handles input safely |
| II. Test-Friendly           | ✅ PASS | Component remains isolated and testable                   |
| III. Technology Stack       | ✅ PASS | Using approved stack (React + TypeScript + Vite)          |
| IV. Component Strategy      | ✅ PASS | Not adding UI components; using existing prose styles     |
| V. Corporate Network        | ✅ PASS | Standard npm dependency; proxy setup documented           |
| VI. Git Hygiene             | ✅ PASS | Single atomic commit for bug fix                          |
| VII. Verification Standards | ✅ PASS | Manual verification steps documented in quickstart        |

**Gate Status**: PASSED - No violations

## Project Structure

### Documentation (this feature)

```text
specs/006-table-rendering-bug/
├── plan.md              # This file
├── research.md          # Root cause analysis and decisions
├── data-model.md        # No data changes (reference only)
├── quickstart.md        # Implementation steps
├── contracts/           # Component interface (unchanged)
│   └── README.md
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── MarkdownPreview.tsx  # Modified: add remark-gfm plugin
├── pages/
│   ├── Editor.tsx           # No changes
│   └── Viewer.tsx           # No changes
└── lib/
    └── utils.ts             # No changes

package.json                  # Modified: add remark-gfm dependency
```

**Structure Decision**: This is a minimal bug fix affecting only the `MarkdownPreview` component. No structural changes required.

## Complexity Tracking

> No violations - table is empty as expected for a simple bug fix.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| -         | -          | -                                    |

## Implementation Overview

### Phase 1: Add Dependency

1. Add `remark-gfm` package via pnpm

### Phase 2: Update Component

1. Import `remarkGfm` in `MarkdownPreview.tsx`
2. Add to `remarkPlugins` prop of `Markdown` component
3. Add table wrapper component for horizontal scroll on wide tables

### Phase 3: Verify

1. Test basic table rendering
2. Test complex table with links (user-reported case)
3. Test column alignment syntax
4. Verify existing functionality (headings, code blocks, links) not affected

## Related Documents

- [Research](./research.md) - Root cause analysis and technical decisions
- [Data Model](./data-model.md) - No data changes
- [Contracts](./contracts/README.md) - Component interface (unchanged)
- [Quickstart](./quickstart.md) - Step-by-step implementation guide
