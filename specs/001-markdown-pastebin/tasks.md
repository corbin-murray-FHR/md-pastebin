# Tasks: Markdown Pastebin Sharing

**Feature Branch**: `001-markdown-pastebin`
**Status**: Pending

## Phase 1: Setup

**Goal**: Initialize the project with the required tech stack and structure.

- [ ] T001 Initialize Vite project with React + TypeScript in `.`
- [ ] T002 Install dependencies (react-router-dom, lz-string, motion, clsx, tailwind-merge, lucide-react, react-markdown) in `package.json`
- [ ] T003 [P] Initialize shadcn/ui following official Vite guide (https://ui.shadcn.com/docs/installation/vite) with Tailwind v4.1 and violet theme
- [ ] T004 [P] Create project directory structure (components, lib, pages, styles) in `src/`
- [ ] T005 [P] Setup GitHub Pages deployment workflow in `.github/workflows/deploy.yml`

## Phase 2: Foundational

**Goal**: Implement core services and routing infrastructure.
**Blocking**: Must complete Phase 1.

- [ ] T006 [P] Implement `ICompressionService` using lz-string in `src/lib/compression.ts`
- [ ] T007 [P] Implement `IStorageService` for drafts and theme in `src/lib/storage.ts`
- [ ] T008 [P] Implement `utils.ts` for shadcn (cn helper) in `src/lib/utils.ts`
- [ ] T009 Setup HashRouter and basic routes in `src/App.tsx`
- [ ] T010 Create main Layout component (Header, Main, Footer) in `src/components/Layout.tsx`

## Phase 3: User Story 1 - Generate Shareable Markdown View

**Goal**: Users can paste markdown, preview it, and generate a share link.
**Priority**: P1
**Independent Test**: Open app, type markdown, click share, verify link is copied.

- [ ] T011 [US1] Create `ThemeToggle` component using shadcn `Button` and `DropdownMenu` in `src/components/ThemeToggle.tsx`
- [ ] T012 [US1] Create `Editor` page component structure in `src/pages/Editor.tsx`
- [ ] T013 [US1] Implement markdown input using shadcn `Textarea` with auto-resize in `src/pages/Editor.tsx`
- [ ] T014 [US1] Implement live markdown preview using `react-markdown` in `src/components/MarkdownPreview.tsx`
- [ ] T015 [US1] Implement "Share" button logic using shadcn `Button` in `src/pages/Editor.tsx`
- [ ] T016 [US1] Implement "Copy to Clipboard" toast notification using shadcn `Sonner` or `Toast` in `src/pages/Editor.tsx`
- [ ] T017 [US1] Integrate `StorageService` to save draft on change in `src/pages/Editor.tsx`

## Phase 4: User Story 2 - Read Shared Markdown

**Goal**: Recipients can view rendered markdown from a link.
**Priority**: P2
**Independent Test**: Open shared link, verify content renders correctly.

- [ ] T018 [US2] Create `Viewer` page component structure in `src/pages/Viewer.tsx`
- [ ] T019 [US2] Implement URL hash parsing and decompression in `src/pages/Viewer.tsx`
- [ ] T020 [US2] Render decompressed content using `MarkdownPreview` in `src/pages/Viewer.tsx`
- [ ] T021 [US2] Implement Error State component using shadcn `Alert` in `src/components/ErrorState.tsx`
- [ ] T022 [US2] Implement "Copy Raw Markdown" button using shadcn `Button` in `src/pages/Viewer.tsx`

## Phase 5: User Story 3 - Remix Shared Markdown

**Goal**: Collaborators can edit shared content and create new links.
**Priority**: P3
**Independent Test**: Click "Remix" on shared view, verify editor opens with content.

- [ ] T023 [US3] Implement "Remix" button using shadcn `Button` in `src/pages/Viewer.tsx`
- [ ] T024 [US3] Handle navigation to Editor with pre-filled content in `src/pages/Editor.tsx`
- [ ] T025 [US3] Ensure Remix action doesn't overwrite existing local draft without warning in `src/pages/Editor.tsx`

## Phase 6: Polish & Cross-Cutting

**Goal**: Enhance UX with animations and responsive design.

- [ ] T026 [P] Add Motion animations for page transitions in `src/App.tsx`
- [ ] T027 [P] Add Motion animations for button interactions in `src/components/ui/button.tsx`
- [ ] T028 Implement content length warning (if > 7k chars) in `src/pages/Editor.tsx`
- [ ] T029 Final responsive design check and adjustments in `src/styles/globals.css`

## Dependencies

1. **Setup** (T001-T005) -> **Foundational** (T006-T010)
2. **Foundational** -> **US1** (T011-T017)
3. **Foundational** -> **US2** (T018-T022)
4. **US1** & **US2** -> **US3** (T023-T025)
5. **All Phases** -> **Polish** (T026-T029)

## Parallel Execution Examples

- **Team A**: Implement `ICompressionService` (T006) while **Team B** implements `IStorageService` (T007).
- **Team A**: Build `Editor` UI (T012, T013) while **Team B** builds `Viewer` UI (T018, T020).
- **Team A**: Add Animations (T026) while **Team B** implements Length Warning (T028).

## Implementation Strategy

1. **MVP (US1)**: Focus on getting the Editor working and generating links. This proves the core value proposition.
2. **Viewer (US2)**: Once links are generated, build the Viewer to consume them.
3. **Remix (US3)**: Connect the loop by allowing Viewer -> Editor transition.
4. **Polish**: Apply animations and final styling touches.
