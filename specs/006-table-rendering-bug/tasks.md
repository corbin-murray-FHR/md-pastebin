# Tasks: Fix Markdown Table Rendering Bug

**Input**: Design documents from `/specs/006-table-rendering-bug/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, contracts/ ✅

**Tests**: Not requested - manual verification only

**Organization**: This is a simple bug fix with minimal tasks. User stories are combined as they all require the same implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Add required dependency

- [x] T001 Add remark-gfm dependency via `pnpm add remark-gfm` in package.json

---

## Phase 2: Implementation

**Purpose**: Enable GFM table rendering in MarkdownPreview component

- [x] T002 [US1] Import remarkGfm in src/components/MarkdownPreview.tsx
- [x] T003 [US1] Add remarkGfm to remarkPlugins prop of Markdown component in src/components/MarkdownPreview.tsx
- [x] T004 [US1] [US2] Add table wrapper component for horizontal scroll on wide tables in src/components/MarkdownPreview.tsx

**Checkpoint**: Core bug fix complete - tables should now render

---

## Phase 3: Verification (Manual Testing)

**Purpose**: Validate all user stories work correctly

### User Story 1 - Basic Table Rendering (P1)

- [x] T005 [US1] Verify basic 3x3 table renders with headers and body rows
- [x] T006 [US1] Verify shared link displays table correctly in Viewer page

### User Story 2 - Complex Table with Links (P1)

- [x] T007 [US2] Verify 60+ row table from bug report renders completely
- [x] T008 [US2] Verify all links in table cells open in new tabs
- [x] T009 [US2] Verify long text wraps appropriately in cells

### User Story 3 - Column Alignment (P2)

- [x] T010 [US3] Verify `:---` left-aligns column content
- [x] T011 [US3] Verify `:---:` center-aligns column content
- [x] T012 [US3] Verify `---:` right-aligns column content

**Checkpoint**: All acceptance scenarios validated

---

## Phase 4: Polish & Regression Check

**Purpose**: Ensure no existing functionality is broken

- [x] T013 Verify existing markdown features still work (headings, code blocks, links)
- [x] T014 Verify build succeeds with `pnpm build`
- [x] T015 Run quickstart.md validation steps

### Edge Case & Responsive Verification

- [x] T016 [US2] Verify wide tables (10+ columns) show horizontal scroll on narrow viewport
- [x] T017 Verify table remains readable at 320px mobile viewport width (SC-005)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (Implementation)**: Depends on Phase 1 (T001)
- **Phase 3 (Verification)**: Depends on Phase 2 completion
- **Phase 4 (Polish)**: Depends on Phase 3 completion

### Task Dependencies

```text
T001 (add dependency)
  └─► T002 (import)
      └─► T003 (configure plugin)
          └─► T004 (table wrapper)
              └─► T005-T015 (all verification tasks)
```

### Parallel Opportunities

Within Phase 3 (Verification), all test tasks can run in parallel:

```text
T005, T006, T007, T008, T009, T010, T011, T012 - all can run concurrently
```

---

## Implementation Strategy

### Single Developer Path

1. T001 → T002 → T003 → T004 (sequential, same file)
2. T005-T012 (manual testing, any order)
3. T013 → T014 → T015 (final validation)

### Estimated Time

- Implementation (T001-T004): ~15 minutes
- Verification (T005-T017): ~20 minutes
- **Total**: ~35 minutes

---

## Notes

- This is a minimal bug fix - only 2 files modified
- No new components created - only existing component updated
- Existing prose CSS styles handle table formatting
- No tests required - manual verification sufficient for this scope

### Implicit Coverage

The following requirements are handled automatically by remark-gfm and do not require explicit verification tasks:

- **FR-006** (empty cells): remark-gfm renders empty cells correctly
- **FR-007** (inline formatting): remark-gfm preserves bold, italic, code in cells
- **FR-008** (mismatched columns): remark-gfm fills missing cells gracefully
