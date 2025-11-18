# Research: Markdown Pastebin

## Unknowns & Decisions

### 1. Compression Library

- **Decision**: Use `lz-string`.
- **Rationale**: It is the industry standard for client-side string compression, specifically designed for local storage and URLs.
- **Method**: `compressToEncodedURIComponent` and `decompressFromEncodedURIComponent` are safe for URL fragments (hash).
- **Alternatives**: `pako` (gzip) - typically produces binary output requiring Base64 encoding which adds overhead. `lz-string` is optimized for JS strings.

### 2. Styling System (Tailwind v4 + shadcn)

- **Decision**: Use Tailwind CSS v4.1 with `shadcn/ui`.
- **Rationale**: Tailwind v4 offers better performance and a simplified configuration (CSS-first). `shadcn/ui` provides accessible components.
- **Integration**: `shadcn` components are copy-paste. We will need to ensure the `tailwind.config.js` (or CSS variables in v4) matches the `shadcn` expectations for theming (CSS variables for colors).
- **Theme**: "Violet" theme requested. We will configure the CSS variables to match the violet color palette.

### 3. Animations (Motion)

- **Decision**: Use `motion` (formerly `framer-motion`).
- **Rationale**: Powerful, declarative animations for React.
- **Usage**:
  - Page transitions (if any).
  - "Playful" interactions: Button hovers, modal appearances, toast notifications.
  - Loading states for rendering.

### 4. Routing

- **Decision**: Hash-based routing (`HashRouter` from `react-router-dom` or manual hash handling).
- **Rationale**: As per spec, ensures compatibility with static hosting.
- **Structure**: `/#/` (Home/Editor), `/#/share/<payload>` (Viewer).

### 5. URL Length Limits

- **Constraint**: Browsers support long URLs (20k+ chars), but some proxies/tools might truncate.
- **Mitigation**: `lz-string` helps. We will implement a warning if the compressed string exceeds ~7k chars (safe limit for most practical sharing scenarios, though technically browsers handle more).
