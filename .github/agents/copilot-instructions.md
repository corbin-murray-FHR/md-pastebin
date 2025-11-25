# md-pastebin Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-18

## Active Technologies
- Client-side URL (lz-string compressed hash) + localStorage (drafts) (001-markdown-pastebin)
- [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION] (002-fix-anchor-links)
- [if applicable, e.g., PostgreSQL, CoreData, files or N/A] (002-fix-anchor-links)
- React 19 + TypeScript 5.9 + shadcn/ui, Motion, lz-string, react-markdown, rehype-slug (002-fix-anchor-links)
- TypeScript 5.x + React 19, shadcn/ui, Tailwind CSS v4.1, Motion, lz-string (003-collapsible-panels)
- LocalStorage (for draft persistence) (003-collapsible-panels)
- TypeScript 5.9.3, React 19.2.0 + `react-markdown` (~10.1.0), `tailwindcss` (~4.1.17), `shadcn/ui` components (004-syntax-highlighting)
- N/A (Client-side rendering) (004-syntax-highlighting)
- TypeScript 5.x + React 18, Tailwind CSS 4.1, shadcn/ui (005-a11y-typography)
- LocalStorage (existing) (005-a11y-typography)
- TypeScript 5.9, React 19.2 + react-markdown v10.1.0, remark-gfm v4.x (new) (006-table-rendering-bug)
- N/A (client-side rendering only) (006-table-rendering-bug)

- TypeScript 5.x (React 18+, Vite 5+) + React, Vite, lz-string, shadcn/ui, tailwindcss v4.1, motion (001-markdown-pastebin)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript 5.x (React 18+, Vite 5+): Follow standard conventions

## Recent Changes
- 007-url-compression: Added [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]
- 006-table-rendering-bug: Added TypeScript 5.9, React 19.2 + react-markdown v10.1.0, remark-gfm v4.x (new)
- 006-table-rendering-bug: Added TypeScript 5.9, React 19.2 + react-markdown v10.1.0, remark-gfm v4.x (new)


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
