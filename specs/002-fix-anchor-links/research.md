# Research: Fix Anchor Links

**Feature**: Fix Anchor Links in Preview
**Status**: Complete

## Decisions

### 1. ID Generation for Headers

**Decision**: Use `rehype-slug` plugin for `react-markdown`.
**Rationale**: `react-markdown` does not generate IDs for headers by default. Anchor links (e.g., `[Link](#header)`) require a corresponding `id="header"` on the target element to work. `rehype-slug` is the standard, maintained plugin for this purpose in the unified/remark/rehype ecosystem.
**Constitution Compliance**: While Article III restricts new libraries, `rehype-slug` is a standard ecosystem companion to the already-approved `react-markdown` library, necessary for basic anchor functionality. It is a minor utility rather than a new framework or architectural shift.
**Alternatives Considered**:

- _Manual ID generation_: Parsing markdown manually or writing a custom plugin. Rejected as `rehype-slug` is robust and standard.
- _remark-slug_: Older package, `rehype-slug` is preferred for HTML AST transformations.

### 2. Link Interception Strategy

**Decision**: Use `react-markdown`'s `components` prop to override the `a` tag.
**Rationale**: This allows full control over link behavior within the React lifecycle. We can inspect the `href` prop:

- If it starts with `#`: Prevent default, query the DOM for the ID, and `scrollIntoView`.
- If it is external: Add `target="_blank"` and `rel="noopener noreferrer"`.
  **Alternatives Considered**:
- _Global event listener_: Listening for clicks on the container. Rejected because React's synthetic events and component composition provide a cleaner, more scoped solution.

### 3. Scrolling Behavior

**Decision**: Use `element.scrollIntoView({ behavior: 'smooth' })`.
**Rationale**: Provides a better user experience than an instant jump.
**Alternatives Considered**:

- _window.scrollTo_: Requires calculating offsets relative to the window, which can be complex with nested scroll containers. `scrollIntoView` works well on the element itself.

## Technical Context Updates

- **Testing**: No automated testing framework is present in the project. Testing will be manual as per the "Independent Test" in the spec.
- **Dependencies**: Need to add `rehype-slug` to `package.json`.

## Implementation Details

### `MarkdownPreview.tsx`

- Import `rehypeSlug` from `rehype-slug`.
- Add `rehypePlugins={[rehypeSlug]}` to `<Markdown>`.
- Define a custom `components` object:
  ```tsx
  components={{
    a: ({ href, children, ...props }) => {
      // Logic to handle #links vs external links
    }
  }}
  ```
