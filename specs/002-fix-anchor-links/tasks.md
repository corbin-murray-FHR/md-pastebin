---
description: "Task list for Fix Anchor Links feature"
---

# Tasks: Fix Anchor Links in Preview

**Input**: Design documents from `/specs/002-fix-anchor-links/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Manual testing as per `quickstart.md` (no automated tests requested).

**Organization**: Tasks are grouped by user story to enable independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: User Story ID (US1, US2)
- **[ID]**: Sequential task ID

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install necessary dependencies.

- [ ] T001 Install `rehype-slug` dependency in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure.

_No specific foundational tasks required beyond setup._

---

## Phase 3: User Story 1 - Navigate Internal Anchor Links (Priority: P1) 🎯 MVP

**Goal**: Clicking anchor links scrolls to the relevant section within the preview.

**Independent Test**: Create a markdown doc with TOC and headers. Click TOC link -> scrolls to header.

### Implementation for User Story 1

- [ ] T002 [US1] Import `rehype-slug` and add to `rehypePlugins` in `src/components/MarkdownPreview.tsx`
- [ ] T003 [US1] Implement custom `a` component with internal link interception and scrolling in `src/components/MarkdownPreview.tsx`

**Checkpoint**: Internal links should work.

---

## Phase 4: User Story 2 - Navigate External Links (Priority: P1)

**Goal**: External links open in new tab.

**Independent Test**: Click external link -> opens in new tab.

### Implementation for User Story 2

- [ ] T004 [US2] Update custom `a` component to handle external links (target="\_blank" AND rel="noopener noreferrer") in `src/components/MarkdownPreview.tsx`

**Checkpoint**: External links should work safely.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verification and cleanup.

- [ ] T005 Run manual validation steps from `specs/002-fix-anchor-links/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Blocks all stories.
- **User Story 1 (Phase 3)**: Depends on Setup.
- **User Story 2 (Phase 4)**: Depends on Setup. Can be done after US1 or in parallel (though they edit the same file).

### User Story Dependencies

- **User Story 1 (P1)**: Independent.
- **User Story 2 (P1)**: Independent.

### Parallel Opportunities

- T002, T003, and T004 edit the same file `src/components/MarkdownPreview.tsx`, so parallel execution is limited to avoid merge conflicts. Sequential execution is recommended.

---

## Implementation Strategy

### MVP First (User Story 1)

1. Install `rehype-slug`.
2. Implement internal anchor scrolling.
3. Validate.

### Incremental Delivery

1. Add external link handling (US2).
2. Validate.
