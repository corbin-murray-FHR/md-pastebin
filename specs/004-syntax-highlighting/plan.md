# Implementation Plan: Syntax Highlighting

**Branch**: `004-syntax-highlighting` | **Date**: 2025-11-20 | **Spec**: [specs/004-syntax-highlighting/spec.md](../004-syntax-highlighting/spec.md)
**Input**: Feature specification from `/specs/004-syntax-highlighting/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add syntax highlighting, line numbers, and a copy button to markdown code blocks.
**Approach**: Integrate a syntax highlighting library (likely `react-syntax-highlighter`) into the existing `MarkdownPreview` component by customizing the `code` renderer of `react-markdown`.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0
**Primary Dependencies**: `react-markdown` (~10.1.0), `tailwindcss` (~4.1.17), `shadcn/ui` components
**Storage**: N/A (Client-side rendering)
**Testing**: Manual verification (as per current project state), potentially unit tests if testing framework exists (none visible in package.json scripts besides lint/build).
**Target Platform**: Web (Vite)
**Project Type**: Web application
**Performance Goals**: No significant degradation for large code blocks.
**Constraints**: Must support Light/Dark mode with WCAG AA contrast. Must work within `react-markdown` architecture.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Security**: [PASS] No new data ingestion. Input is already sanitized by `react-markdown`.
- **II. Test-Friendly**: [PASS] New `CodeBlock` component will be isolated.
- **III. Technology Stack**: [PASS] React + TypeScript.
- **IV. Component Strategy**: [PASS] Will use shadcn `Button` for the copy feature.
- **V. Corporate Network**: [PASS] Standard npm packages.
- **VI. Git Hygiene**: [PASS] Will follow commit standards.
- **Technical Constraints**: [WARNING] Adding a new library (`react-syntax-highlighter` or equivalent) requires justification.
  - _Justification_: Syntax highlighting is a complex domain best handled by established libraries rather than implementing a parser from scratch. This aligns with "Robustness" and "Simplicity".

## Project Structure

### Documentation (this feature)

```text
specs/004-syntax-highlighting/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (likely empty)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (likely empty)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── CodeBlock.tsx    # NEW: Wrapper for syntax highlighter + copy button
│   └── MarkdownPreview.tsx # MODIFIED: Use CodeBlock renderer
```

**Structure Decision**: Option 1 (Single project) - Adding a component to existing structure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

- **Library Addition**: `react-syntax-highlighter` (or similar). Justified by feature requirement (syntax highlighting) and avoiding "Not Invented Here" syndrome for complex parsing logic.

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
