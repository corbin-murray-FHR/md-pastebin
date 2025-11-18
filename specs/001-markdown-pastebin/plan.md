# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: TypeScript 5.x (React 18+, Vite 5+)
**Primary Dependencies**: React, Vite, lz-string, shadcn/ui, tailwindcss v4.1, motion
**Storage**: Client-side URL (lz-string compressed hash) + localStorage (drafts)
**Testing**: Vitest (Unit/Integration), Playwright (E2E)
**Target Platform**: Modern Web Browsers (PWA capable), GitHub Pages
**Project Type**: Web application (Client-only SPA)
**Performance Goals**: Render < 2s for 20k chars, TTI < 1s
**Constraints**: Offline-capable, URL length limits (~20k chars safe max), No server-side storage, Static Hosting (GitHub Pages)
**Scale/Scope**: Single page application, ~5-10 components, core logic in compression/routing

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

**Status**: PASS

- No specific constitution constraints provided in template.
- Architecture aligns with standard client-side SPA patterns.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/          # React components (shadcn + custom)
│   ├── ui/              # shadcn primitives
│   └── ...              # Feature components
├── lib/                 # Core logic
│   ├── compression.ts   # lz-string wrapper
│   ├── storage.ts       # localStorage wrapper
│   └── utils.ts         # shadcn utils
├── pages/               # Route views
│   ├── Editor.tsx
│   └── Viewer.tsx
├── styles/              # Global styles
│   └── globals.css      # Tailwind directives
├── App.tsx              # Root component & Routing
└── main.tsx             # Entry point
```

**Structure Decision**: Standard Vite + React + Tailwind structure. Separating `lib` for core logic (compression) ensures testability independent of UI. `components/ui` reserved for shadcn.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
