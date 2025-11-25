# Feature Specification: URL Compression Optimization

**Feature Branch**: `007-url-compression`  
**Created**: 2025-11-25  
**Status**: Draft  
**Input**: User description: "Optimize URL compression for share links: Switch to more efficient compression encoding (compressToEncodedURIComponent) and streamline URL format to increase shareable document capacity from ~7,000 to potentially 10,000+ characters while maintaining client-only architecture"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Share Larger Documents (Priority: P1)

A user writes a markdown document that is 8,000-12,000 characters (e.g., a detailed README, meeting notes, or technical documentation) and wants to share it with colleagues via a URL link without receiving warnings or encountering broken links.

**Why this priority**: This is the core value proposition—users currently hit a ~7,000 character wall. Expanding this capacity directly addresses user frustration and unlocks new use cases.

**Independent Test**: Can be fully tested by creating a 10,000-character markdown document, clicking Share, and successfully opening the link in a different browser/incognito window.

**Acceptance Scenarios**:

1. **Given** a user has written 10,000 characters of markdown, **When** they click Share, **Then** a valid shareable URL is generated and copied to clipboard
2. **Given** a recipient opens a share link containing 10,000 characters of compressed content, **When** the page loads, **Then** the full original markdown is displayed correctly
3. **Given** a user has written 8,500 characters of markdown, **When** they view the editor, **Then** no warning about URL length appears

---

### User Story 2 - Backward Compatibility with Existing Links (Priority: P1)

Users who have previously shared links (using the old compression format) should still be able to access their documents without any changes or broken links.

**Why this priority**: Breaking existing links would severely damage user trust and make the app unreliable. This is a P1 blocker alongside the main feature.

**Independent Test**: Can be tested by taking 5 existing share links created before this update and verifying they all still load correctly after the update.

**Acceptance Scenarios**:

1. **Given** a share link was created before this update using Base64 compression, **When** a user opens that link, **Then** the content displays correctly
2. **Given** a mix of old-format and new-format links exist, **When** the app parses any valid link, **Then** it automatically detects the format and decompresses appropriately

---

### User Story 3 - Clearer Capacity Feedback (Priority: P2)

Users should understand how much content they can safely share and receive proactive guidance when approaching or exceeding limits.

**Why this priority**: Good UX prevents frustration. Users should know limits before hitting them, not after.

**Independent Test**: Can be tested by incrementally adding content and observing the warning thresholds update appropriately.

**Acceptance Scenarios**:

1. **Given** a user has exceeded the safe sharing limit (10,000 characters), **When** they view the editor, **Then** a clear warning explains the content may be too large to share reliably
2. **Given** the updated compression is more efficient, **When** the warning threshold is evaluated, **Then** it reflects the new higher capacity (10,000 characters, not the old 7,000 limit)

---

### Edge Cases

- What happens when a user pastes content that exactly hits the new limit boundary?
- How does the system handle malformed URLs that look like they might be either format?
- What happens if decompression fails for any reason (corrupted link, truncated URL)?
- How does the app behave with non-markdown binary data or unusual Unicode content?
- What happens if a share link is opened in a browser that truncates URLs (some mobile browsers)?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST use `LZString.compressToEncodedURIComponent()` for new share links to maximize URL efficiency
- **FR-002**: System MUST support decompressing both old format (Base64) and new format (EncodedURIComponent) links
- **FR-003**: System MUST detect compression format automatically without requiring URL versioning markers
- **FR-004**: System MUST maintain existing URL path structure (`/view/` prefix) to preserve backward compatibility with shared links
- **FR-005**: System MUST update the warning threshold to reflect the new higher capacity (10,000 characters)
- **FR-006**: System MUST preserve exact content through compression/decompression round-trip for all valid markdown
- **FR-007**: System MUST display a clear error message if decompression fails, rather than showing corrupted content
- **FR-008**: _(Deferred)_ System SHOULD show remaining capacity or percentage indicator when content exceeds 80% of safe limit

### Key Entities

- **ShareLink**: A URL containing compressed markdown content in the hash fragment
- **CompressionFormat**: Either "base64" (legacy) or "uri-encoded" (new, more efficient)
- **SafeCapacity**: The maximum original content length that reliably survives URL sharing (~10,000-12,000 chars target)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Share links support at least 10,000 characters of original markdown content (up from ~7,000)
- **SC-002**: 100% of existing share links created before this update continue to work correctly
- **SC-003**: Compression/decompression round-trip preserves content exactly for documents up to 20,000 characters
- **SC-004**: New compression format produces URLs at least 15% shorter than the previous format for equivalent content
- **SC-005**: Users see updated warning threshold that matches the new capacity (no false warnings below 10,000 chars)
- **SC-006**: Error states for invalid/corrupted links display a user-friendly message within 500ms of page load

## Assumptions

- Browser URL hash limits remain consistent (~32KB in modern browsers, but practical limits around 8-12KB for reliable sharing)
- The `lz-string` library's `compressToEncodedURIComponent` function is already available (same package, different method)
- Social media platforms and messaging apps may still truncate very long URLs, so we target "reliable" limits, not theoretical maximums
- The existing `/view/:content` route structure can be modified without breaking the app's routing logic
