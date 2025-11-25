# Tasks: URL Compression Optimization

**Input**: Design documents from `/specs/007-url-compression/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (N/A for this feature)

**Purpose**: No setup required - this is a modification to existing files only.

**Skipped**: No new project initialization or dependencies needed.

---

## Phase 2: Foundational - Compression Service Enhancement

**Purpose**: Core compression service changes that MUST be complete before UI updates

**⚠️ CRITICAL**: No UI changes can begin until this phase is complete

- [ ] T001 Update compress() method to use compressToEncodedURIComponent in src/lib/compression.ts
- [ ] T002 Update decompress() method with dual-format support (try new first, fallback to Base64) in src/lib/compression.ts
- [ ] T003 Verify round-trip compression works for both new and legacy formats via browser console

**Checkpoint**: Compression service ready - UI integration can now begin in parallel

---

## Phase 3: User Story 1 - Share Larger Documents (Priority: P1) 🎯 MVP

**Goal**: Enable users to share documents up to 10,000 characters without warnings or broken links

**Independent Test**: Create 10,000-character markdown document → Click Share → Open in incognito → Content displays correctly

### Implementation for User Story 1

- [ ] T004 [US1] Update MAX_SAFE_LENGTH constant from 7,000 to 10,000 in src/pages/Editor.tsx (covers US3 warning threshold)
- [ ] T005 [US1] Remove encodeURIComponent wrapper from share URL generation in src/pages/Editor.tsx
- [ ] T006 [US1] Update warning message text to reflect new 10,000 character capacity in src/pages/Editor.tsx
- [ ] T007 [US1] Verify share flow works with 10,000 character document (manual test)

**Checkpoint**: User Story 1 complete - users can share larger documents

---

## Phase 4: User Story 2 - Backward Compatibility (Priority: P1)

**Goal**: Ensure all existing Base64-encoded share links continue to work without any changes

**Independent Test**: Open 5 existing share links created before this update → All display content correctly

### Implementation for User Story 2

- [ ] T008 [US2] Simplify Viewer decompression to use service-level format detection in src/pages/Viewer.tsx
- [ ] T009 [US2] Remove redundant decodeURIComponent if present (service handles this) in src/pages/Viewer.tsx
- [ ] T010 [US2] Verify existing Base64 links still decompress correctly (manual test with saved link)
- [ ] T011 [US2] Verify new URI-encoded links decompress correctly (manual test)

**Checkpoint**: User Story 2 complete - backward compatibility confirmed

---

## Phase 5: User Story 3 - Clearer Capacity Feedback (Priority: P2)

**Goal**: Provide users with better feedback about remaining capacity and clear warnings

**Independent Test**: Incrementally add content → Observe warning appears at correct threshold

### Implementation for User Story 3

- [ ] T012 [US3] Verify no warning appears for 8,500 character document (manual test)
- [ ] T013 [US3] Verify warning appears for 11,000 character document (manual test)

**Checkpoint**: User Story 3 complete - capacity feedback reflects new limits

---

## Phase 6: Polish & Verification

**Purpose**: Final build verification and comprehensive testing

- [ ] T014 Run pnpm build and verify no TypeScript or build errors
- [ ] T015 Test corrupted/truncated link displays user-friendly error message
- [ ] T016 Test round-trip with Unicode content (emojis, special characters)
- [ ] T017 Commit changes with descriptive message following Git Hygiene principles

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies - start immediately
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion (compression service must be ready)
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion (decompression with fallback must be ready)
- **User Story 3 (Phase 5)**: Can run in parallel with US1/US2 (independent constant update)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on T001-T003 (compression service changes)
- **User Story 2 (P1)**: Depends on T002 (decompress with fallback)
- **User Story 3 (P2)**: Independent of other stories (only threshold constant)

### Parallel Opportunities

```text
After Phase 2 completes:
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ User Story 1 (P1)   │ User Story 2 (P1)   │ User Story 3 (P2)   │
│ T004, T005, T006    │ T008, T009          │ T012                │
│ (Editor.tsx)        │ (Viewer.tsx)        │ (Editor.tsx - diff) │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

**Note**: T004-T006 and T012 all touch Editor.tsx but modify different sections. If working solo, do T004-T006 first, then T012. If parallelizing, merge carefully.

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 2: Foundational (compression service)
2. Complete Phase 3: User Story 1 (larger documents)
3. Complete Phase 4: User Story 2 (backward compatibility)
4. **STOP and VALIDATE**: Test both stories independently
5. If MVP is stable, optionally skip US3 for faster delivery

### Full Implementation

1. Phase 2: Compression service changes
2. Phase 3+4: User Stories 1 & 2 (can be parallel on different files)
3. Phase 5: User Story 3 (capacity feedback)
4. Phase 6: Polish and verification

---

## Summary

| Phase | Tasks     | Files          | Description                  |
| ----- | --------- | -------------- | ---------------------------- |
| 2     | T001-T003 | compression.ts | Core compression changes     |
| 3     | T004-T007 | Editor.tsx     | Share larger documents (US1) |
| 4     | T008-T011 | Viewer.tsx     | Backward compatibility (US2) |
| 5     | T012-T013 | Editor.tsx     | Capacity feedback (US3)      |
| 6     | T014-T017 | -              | Build verification           |

**Total Tasks**: 17  
**User Stories**: 3 (2× P1, 1× P2)  
**Files Modified**: 3 (compression.ts, Editor.tsx, Viewer.tsx)
