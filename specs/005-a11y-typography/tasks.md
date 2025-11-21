# Tasks: Accessibility & Typography Improvements

**Feature Branch**: `005-a11y-typography`
**Status**: In Progress

## Phase 1: Setup

> **Goal**: Prepare the environment for layout and typography updates.

- [ ] T001 Verify current layout and typography settings in `src/components/Layout.tsx` and `src/components/MarkdownPreview.tsx`

## Phase 2: Foundational

> **Goal**: Establish baseline for improvements.

- [ ] T002 Audit current contrast ratios and font sizes against research findings

## Phase 3: User Story 1 - Readable Layout on Large Screens (P1)

> **Goal**: Constrain text width to ~70 characters and center it on large screens.
> **Independent Test**: Open app on >1200px screen, verify content width is ~700px and centered.

- [ ] T003 [US1] Update `src/components/Layout.tsx` to apply `max-w-[70ch]` (or similar) to the main content container
- [ ] T004 [US1] Ensure content container is centered using `mx-auto` in `src/components/Layout.tsx`
- [ ] T005 [US1] Verify and adjust padding for mobile responsiveness in `src/components/Layout.tsx`

## Phase 4: User Story 2 - Optimal Typography for Reading (P2)

> **Goal**: Optimize font size, line height, and spacing for legibility.
> **Independent Test**: Inspect CSS, verify `font-size: 1rem`, `line-height: 1.5`, and paragraph spacing.

- [ ] T006 [US2] Update `src/components/MarkdownPreview.tsx` to enforce base font size of `1rem` (16px) using Tailwind classes
- [ ] T007 [US2] Update `src/components/MarkdownPreview.tsx` to set body line-height to `1.5` (`leading-relaxed`)
- [ ] T008 [US2] Update `src/components/MarkdownPreview.tsx` to set heading line-heights to `1.2`-`1.3` (`leading-tight`)
- [ ] T009 [US2] Ensure proper vertical spacing between paragraphs and headings in `src/components/MarkdownPreview.tsx`

## Phase 5: User Story 3 - Accessibility Compliance (P3)

> **Goal**: Ensure WCAG AA compliance for contrast and scaling.
> **Independent Test**: Pass Lighthouse accessibility audit with 100 score.

- [ ] T010 [US3] Audit text colors in `src/index.css` (or theme config) and adjust for 4.5:1 contrast ratio if needed
- [ ] T011 [US3] Verify layout behavior at 200% browser zoom and fix any horizontal scrolling issues

## Phase 6: Polish & Cross-Cutting Concerns

> **Goal**: Final verification and cleanup.

- [ ] T012 Run final Lighthouse accessibility audit and address any remaining warnings
- [ ] T013 Verify code block scrolling behavior (ensure no page scroll)

## Dependencies

1. **US1 (Layout)** must be completed first as it defines the container for typography.
2. **US2 (Typography)** builds within the layout from US1.
3. **US3 (Accessibility)** refines the colors and scaling of US1 and US2.

## Parallel Execution Strategy

- **US2 (Typography)** tasks (T006-T009) can be started in parallel with **US1 (Layout)** tasks (T003-T005) as they touch different CSS properties/components, though sequential is safer for visual verification.
- **US3 (Accessibility)** tasks (T010) can be done at any time.

## Implementation Strategy

1. **MVP (US1)**: Fix the "too wide" issue immediately.
2. **Enhancement (US2)**: Improve reading comfort.
3. **Compliance (US3)**: Ensure inclusivity.
