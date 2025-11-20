# Tasks: Syntax Highlighting

**Feature Branch**: `004-syntax-highlighting`
**Spec**: [specs/004-syntax-highlighting/spec.md](../004-syntax-highlighting/spec.md)

## Phase 1: Setup

- [ ] T001 Install `react-syntax-highlighter` and `@types/react-syntax-highlighter`
- [ ] T002 Create `src/components/CodeBlock.tsx` skeleton component

## Phase 2: Foundational (Blocking)

- [ ] T003 [P] Configure `PrismAsyncLight` in `src/components/CodeBlock.tsx` with required languages (PowerShell, JS, TS, HTML, CSS, JSON, Python, Bash, C#)

## Phase 3: User Story 1 - View Highlighted Code

**Goal**: Code blocks render with syntax highlighting.
**Independent Test**: Create a markdown note with `powershell` and `js` blocks; verify colors appear.

- [ ] T004 [US1] Implement `CodeBlock` component using `react-syntax-highlighter` in `src/components/CodeBlock.tsx`
- [ ] T005 [US1] Integrate `CodeBlock` into `src/components/MarkdownPreview.tsx` as the `code` renderer

## Phase 4: User Story 2 & 3 - Theme Adaptation & Accessibility

**Goal**: Highlighting adapts to light/dark mode and meets WCAG AA contrast.
**Independent Test**: Toggle theme; verify code block colors change and remain legible.

- [ ] T006 [US2] [US3] Implement theme detection using `useTheme` in `src/components/CodeBlock.tsx`
- [ ] T007 [US2] [US3] Apply `a11yLight` or `a11yDark` style based on current theme in `src/components/CodeBlock.tsx`
- [ ] T008 [US3] Verify contrast ratios for Light Mode (manual check)

## Phase 5: User Story 4 - Enhanced Code Interaction

**Goal**: Users can copy code and see line numbers.
**Independent Test**: Hover over block, click Copy, paste to verify. Check line numbers.

- [ ] T009 [US4] Enable `showLineNumbers` prop in `src/components/CodeBlock.tsx`
- [ ] T010 [US4] Add "Copy" button using shadcn `Button` in `src/components/CodeBlock.tsx` (verify keyboard focus/activation)
- [ ] T011 [US4] Implement clipboard copy logic in `src/components/CodeBlock.tsx`
- [ ] T012 [US4] Style Copy button (absolute position, opacity transition) in `src/components/CodeBlock.tsx`

## Phase 6: Polish & Cross-Cutting

- [ ] T013 Verify performance with large code blocks (>1000 lines)
- [ ] T014 Ensure fallback for unknown languages (render as plain text)

## Dependencies

1. Setup -> Foundational
2. Foundational -> US1
3. US1 -> US2/US3
4. US1 -> US4

## Implementation Strategy

We will first get the basic syntax highlighting working (US1) to prove the library integration. Then we will make it "correct" by adding theme support (US2/3). Finally, we will add the interactive features (US4) which are enhancements on top of the rendered block.
