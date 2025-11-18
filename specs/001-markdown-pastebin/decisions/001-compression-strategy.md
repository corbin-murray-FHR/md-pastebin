# Decision Record: Client-Side Compression for Share Links

**Date**: 2025-11-18  
**Status**: Accepted  
**Decision Maker**: Product/Engineering (speckit.clarify phase)

## Context

The markdown pastebin must support shareable links encoding up to 20,000 characters of markdown content. Since the application is client-only (no backend persistence), content must be stored within the URL itself. Without compression, URL length constraints would severely limit document size.

## Options Considered

### Option A: Compress Payload (SELECTED)

Use client-side compression library (e.g., `lz-string`) to compress markdown before URL encoding.

**Pros**:

- Achieves ~50-60% size reduction on typical markdown documents
- Enables reliable support for 20k character target
- Well-established libraries available (`lz-string`)
- Maintains client-only architecture

**Cons**:

- Adds compression/decompression overhead (~5-20ms for typical docs)
- Slightly increases implementation complexity
- Requires additional dependency

### Option B: No Compression

Use only Base64 or URI encoding without compression.

**Pros**:

- Simpler implementation
- No additional dependencies
- Easier to debug (human-readable encoded content)

**Cons**:

- Limits safe document size to ~2-5k characters
- Fails to meet 20k character requirement
- Poor user experience when hitting limits

### Option C: Hybrid Approach

Compress only when content exceeds threshold (e.g., >5k chars).

**Pros**:

- Optimizes for common small documents
- Reduces unnecessary compression overhead

**Cons**:

- Increased complexity with dual code paths
- Edge cases around threshold boundary
- Marginal benefit over Option A

## Decision

**Option A: Client-Side Compression**

We will implement client-side compression for all share links to reliably support the 20k character requirement.

## Implementation Details

- **Library**: Use `lz-string` for UTF-16 string compression
- **Encoding**: URL-safe Base64 (replace `+`/`/` with `-`/`_`, trim `=`)
- **Threshold**: Alert users when compressed payload exceeds ~6-7k characters
- **Versioning**: Include `v1` marker in URLs for future compatibility
- **Location**: Implement in dedicated `lib/compress.ts` utility module

## Consequences

**Positive**:

- Meets 20k character capacity requirement
- Maintains client-only architecture
- Enables future encoding optimizations via versioning

**Negative**:

- Adds runtime overhead (minimal: ~5-20ms)
- Increases bundle size by ~2-3 KB (lz-string)
- Requires unit tests for encode/decode round-trips

## Validation Criteria

- [ ] Round-trip encoding/decoding preserves content exactly
- [ ] 20k character markdown documents compress to <6k characters (typical case)
- [ ] Compression/decompression completes in <50ms for 20k documents
- [ ] Malformed or tampered links fail gracefully with clear error messages
