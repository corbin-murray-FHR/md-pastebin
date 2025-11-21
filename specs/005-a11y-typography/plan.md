# Implementation Plan: Accessibility & Typography Improvements

**Branch**: `005-a11y-typography` | **Date**: 2025-11-21 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-a11y-typography/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement typography and layout improvements to enhance readability and accessibility on large screens. This involves constraining the content width to ~70 characters, enforcing relative units (rem) for font sizes, optimizing line height, and ensuring WCAG AA contrast compliance.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, Tailwind CSS 4.1, shadcn/ui
**Storage**: LocalStorage (existing)
**Testing**: Vitest (to be added/verified if needed, currently relying on manual verification for CSS)
**Target Platform**: Web (Modern Browsers)
**Project Type**: Web application (Vite + React)
**Performance Goals**: N/A (Client-side rendering)
**Constraints**: Corporate network compliance (Zscaler)
**Scale/Scope**: Single page application

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Security & Robustness**: N/A (CSS/Layout changes).
- **II. Test-Friendly**: Changes are visual; automated testing via visual regression would be ideal but manual verification is acceptable for this scope.
- **III. Technology Stack**: Adheres to React + TypeScript + Vite + Tailwind CSS.
- **IV. Component Strategy**: Using standard HTML/CSS within existing components.
- **V. Corporate Network Compliance**: Compliant.
- **VI. Git Hygiene**: Will follow.
- **VII. Verification Standards**: Will verify build and manual tests.

## Project Structure

### Documentation (this feature)

```text
specs/005-a11y-typography/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A for this feature)
├── quickstart.md        # Phase 1 output (Updated)
├── contracts/           # Phase 1 output (N/A for this feature)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Layout.tsx       # Update max-width and centering
│   └── MarkdownPreview.tsx # Update typography styles
├── index.css            # Update global base styles if needed
```

**Structure Decision**: Modifying existing components `Layout.tsx` and `MarkdownPreview.tsx` to implement the layout and typography changes.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
