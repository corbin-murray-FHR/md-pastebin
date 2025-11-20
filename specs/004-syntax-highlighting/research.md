# Research: Syntax Highlighting

**Feature**: Syntax Highlighting
**Status**: Complete
**Date**: 2025-11-20

## Decisions

### 1. Syntax Highlighting Library

**Decision**: Use `react-syntax-highlighter`.
**Rationale**:

- **Integration**: Seamlessly integrates with `react-markdown` via the `components` prop.
- **Features**: Built-in support for line numbers (`showLineNumbers` prop).
- **Customization**: Easy to wrap in a custom component to add a "Copy" button.
- **Theming**: Supports JavaScript-based style objects, making dynamic theme switching (Light/Dark) straightforward via React Context/Props without managing external CSS files.
- **Performance**: Offers an `AsyncLight` build to load languages on demand and reduce initial bundle size.

**Alternatives Considered**:

- `rehype-highlight` / `rehype-prism-plus`: Good for static site generation, but harder to add interactive features like a "Copy" button because they output a tree of React elements. Extracting raw text for the clipboard is more complex than with `react-syntax-highlighter` where the input is the raw string.

### 2. Accessibility & Themes

**Decision**: Use `a11y-light` and `a11y-dark` themes from `react-syntax-highlighter`.
**Rationale**:

- Explicitly designed to meet accessibility standards.
- Provides high contrast for both light and dark modes, satisfying FR-006.

### 3. Copy Button Implementation

**Decision**: Implement a `CodeBlock` wrapper component.
**Rationale**:

- The `components.code` prop in `react-markdown` receives the raw code string as `children`.
- We can render a `div` container with `relative` positioning.
- Inside, render the `SyntaxHighlighter` and an absolute positioned `Button` (from shadcn/ui) in the top-right corner.
- This ensures the button is always associated with the block and accessible.

## Technical Details

### Dependencies

- `react-syntax-highlighter`: `^15.5.0` (or latest compatible)
- `@types/react-syntax-highlighter`: for TypeScript support.

### Implementation Pattern

```tsx
// src/components/CodeBlock.tsx
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// ... component logic to select style based on theme ...
```
