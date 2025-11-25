# Tasks: Word Wrap Toggle

**Input**: Design documents from `/specs/008-word-wrap-toggle/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not requested in specification - implementation tasks only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: No project setup required - integrating into existing codebase

> This feature integrates into an existing React application. No setup phase needed.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Storage service extension that all user stories depend on

**⚠️ CRITICAL**: User story 2 (persistence) depends on this phase. User story 1 can technically work without it but will not persist.

- [x] T001 Add WORD_WRAP key to STORAGE_KEYS constant in src/lib/storage.ts
- [x] T002 Add getWordWrap() method to StorageService class in src/lib/storage.ts
- [x] T003 Add setWordWrap(enabled: boolean) method to StorageService class in src/lib/storage.ts
- [x] T004 Add getWordWrap/setWordWrap to IStorageService interface in src/lib/storage.ts

**Checkpoint**: Storage service now supports word wrap preference persistence ✅

---

## Phase 3: User Story 1 - Toggle Word Wrap While Editing (Priority: P1) 🎯 MVP

**Goal**: Add a toggle button that switches word wrap on/off with immediate visual feedback

**Independent Test**: Enter text longer than editor width, click toggle, observe text wrapping/unwrapping immediately

### Implementation for User Story 1

- [x] T005 [US1] Import WrapText icon from lucide-react in src/pages/Editor.tsx
- [x] T006 [US1] Add wordWrap state (default true) initialized from storageService.getWordWrap() ?? true in src/pages/Editor.tsx
- [x] T007 [US1] Add handleWordWrapToggle callback that toggles state and calls storageService.setWordWrap() in src/pages/Editor.tsx
- [x] T008 [US1] Add word wrap toggle Button in editor section header toolbar (before layout toggles) in src/pages/Editor.tsx
- [x] T009 [US1] Apply conditional CSS class to Textarea: whitespace-pre-wrap (on) vs whitespace-pre overflow-x-auto (off) in src/pages/Editor.tsx

**Checkpoint**: Word wrap toggle is functional - clicking button changes text wrapping behavior immediately ✅

---

## Phase 4: User Story 2 - Persist Word Wrap Preference (Priority: P2)

**Goal**: User's word wrap preference persists across browser sessions

**Independent Test**: Set preference to off, refresh browser, verify preference is still off

### Implementation for User Story 2

> Implementation is already complete from Phase 2 (storage methods) and Phase 3 (state initialization from storage).

- [x] T010 [US2] Verify persistence works: toggle preference, refresh page, confirm state restored in src/pages/Editor.tsx

**Checkpoint**: Word wrap preference now persists across sessions ✅

---

## Phase 5: User Story 3 - Visual Feedback for Toggle State (Priority: P3)

**Goal**: Toggle button clearly indicates current word wrap state

**Independent Test**: Look at button in both states, verify visual difference and tooltip clarity

### Implementation for User Story 3

- [x] T011 [US3] Add conditional styling to toggle button: active state when wordWrap is true (e.g., bg-accent) in src/pages/Editor.tsx
- [x] T012 [US3] Add dynamic title attribute to toggle button: "Disable word wrap" when on, "Enable word wrap" when off in src/pages/Editor.tsx
- [x] T013 [US3] Add sr-only span for accessibility with current state description in src/pages/Editor.tsx

**Checkpoint**: Toggle button state is visually distinguishable at a glance ✅

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verification and edge case handling

- [x] T014 Verify word wrap works in all layout modes (split, editor-only, viewer-only) in src/pages/Editor.tsx
- [x] T015 Run quickstart.md validation steps to confirm feature complete
- [x] T016 Build project and verify no TypeScript errors: pnpm build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Skipped - not needed
- **Phase 2 (Foundational)**: No dependencies - start here
- **Phase 3 (US1)**: Depends on Phase 2 completion
- **Phase 4 (US2)**: Depends on Phase 2 + Phase 3 (verification only)
- **Phase 5 (US3)**: Depends on Phase 3 completion
- **Phase 6 (Polish)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational (Phase 2) - Core toggle functionality
- **User Story 2 (P2)**: Depends on US1 - Verification that persistence works
- **User Story 3 (P3)**: Depends on US1 - Visual polish for toggle button

### Parallel Opportunities

- T002, T003, T004 can potentially be done together (same file, but different sections)
- T011, T012, T013 can be done in one logical change (same component, same feature)

---

## Parallel Example: Foundational Phase

```text
# These tasks modify the same file but are logically grouped:
T001 → T002 → T003 → T004 (sequential in src/lib/storage.ts)
```

## Parallel Example: User Story 3

```text
# These tasks are one logical change:
T011 + T012 + T013 (all styling/accessibility in same button JSX)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (T001-T004)
2. Complete Phase 3: User Story 1 (T005-T009)
3. **STOP and VALIDATE**: Toggle works, text wraps/unwraps
4. Can ship MVP at this point

### Incremental Delivery

1. Foundational → Storage ready
2. Add User Story 1 → Toggle works → MVP ready!
3. Add User Story 2 → Persistence works → Better UX
4. Add User Story 3 → Visual feedback → Polished feature
5. Polish → Edge cases verified → Feature complete

---

## Notes

- All tasks in Phase 2 modify src/lib/storage.ts - do sequentially
- User Story 1 is the MVP - delivers core value
- User Story 2 is mostly verification (storage already implemented in foundational)
- User Story 3 is visual polish - can be shipped later
- Total: 16 tasks across 6 phases
- Estimated effort: Small feature (1-2 hours implementation)
