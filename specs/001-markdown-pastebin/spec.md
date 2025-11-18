# Feature Specification: Markdown Pastebin Sharing

**Feature Branch**: `001-markdown-pastebin`  
**Created**: 2025-11-18  
**Status**: Draft  
**Input**: User description: "I want to create a next.js (tailwindcss) application that focuses on being a markdown 'pastebin'. The client-only application should allow for users to paste their markdown and create a shareable link. The idea is that people can collaborate and quickly share markdown (rendered) for quick and easy reading"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Generate Shareable Markdown View (Priority: P1)

A writer lands on the site, pastes markdown content, previews the rendering, and creates a link they can hand off immediately.

**Why this priority**: Enables the core value proposition—turning raw markdown into a readable artifact with minimal friction.

**Independent Test**: Open the experience, supply markdown, confirm a link is produced and renders identically when opened in a separate session.

**Acceptance Scenarios**:

1. **Given** a new visitor with markdown ready to paste, **When** they paste the markdown and request a share link, **Then** the experience shows the rendered markdown and produces a unique link to the same content.
2. **Given** a user reviewing their draft, **When** they toggle between raw and rendered views, **Then** the rendered view updates to reflect the latest markdown without data loss.

---

### User Story 2 - Read Shared Markdown (Priority: P2)

A recipient opens the shared link, reads the rendered markdown without distractions, and can copy or reference it on any modern device.

**Why this priority**: The shared-view experience must work flawlessly for recipients or the share loses purpose.

**Independent Test**: Open the shared link in multiple browsers and devices, verifying the content appears formatted and readable without the authoring UI.

**Acceptance Scenarios**:

1. **Given** a valid share link, **When** a recipient opens it on a modern browser, **Then** the markdown displays in a focused, readable format with the original structure preserved.
2. **Given** a shared link, **When** the recipient attempts to copy sections of the rendered markdown, **Then** the copied text preserves formatting (headings, lists, code blocks) that can be reused elsewhere.

---

### User Story 3 - Remix Shared Markdown (Priority: P3)

A collaborator opens a shared link, makes revisions, and creates an updated link so feedback cycles remain quick without needing version control setup.

**Why this priority**: Collaboration loops depend on frictionless iteration; recipients should not need author assistance to make revisions.

**Independent Test**: Start from a shared link, adjust the markdown, regenerate a new link, and confirm it reflects the edits when reopened.

**Acceptance Scenarios**:

1. **Given** an existing shared link, **When** a collaborator switches into edit mode and updates the markdown, **Then** they can generate a fresh link representing the revised content.
2. **Given** a collaborator revising a shared document, **When** they choose not to share immediately, **Then** the experience preserves their in-progress edits locally until they exit or clear the session.

### Edge Cases

- What happens when pasted markdown exceeds the supported character limit for a shareable link, triggering guidance on trimming or segmenting the content?
- How does the experience handle a recipient opening an expired, tampered, or malformed link so they receive a clear message and can request a fresh copy?
- What occurs when a user loses connectivity mid-creation, ensuring their draft content is not lost unexpectedly?
- How are embedded assets (images, external references) surfaced when the external resource is unavailable or blocked?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The experience MUST provide a dedicated space for users to input or paste markdown content without requiring sign-in.
- **FR-002**: The experience MUST render markdown into a reader-friendly view that stays in sync with the latest text entered by the user.
- **FR-003**: Users MUST be able to generate a shareable link that encapsulates the current markdown so it can be opened on other devices without accessing the original authoring session.
- **FR-004**: Recipients opening a shareable link MUST see the rendered markdown without editing controls by default, focusing on readability.
- **FR-005**: Users MUST be able to copy the generated link with a single action and receive confirmation it was copied successfully.
- **FR-006**: The experience MUST alert users when the compressed markdown payload approaches or exceeds the safe link size threshold (~6-7k characters), offering guidance on reducing or segmenting content.
- **FR-007**: Collaborators MUST be able to switch from a shared view into an editable view, modify the markdown, and create a fresh link representing their revision without altering the original link.
- **FR-008**: The experience MUST retain unsent edits locally during the current session so accidental navigation or reload does not erase work in progress.

### Key Entities _(include if feature involves data)_

- **Markdown Note**: Represents the authored content, including raw markdown text, derived rendered view, and metadata such as estimated reading time and character count.
- **Share Link**: Represents the portable reference to a markdown note, including encoded content payload, creation timestamp, and optional flags (e.g., read-only, edit-enabled).

### Assumptions

- Shareable links store content client-side because no always-on server is available; therefore link length practical limits apply.
- Collaboration is asynchronous: recipients create new links with their changes rather than editing the original link in place.
- Only modern browsers with JavaScript enabled are in scope for both authors and recipients.

### Technical Decisions

#### Compression Strategy (Option A - Selected 2025-11-18)

To reliably support documents up to 20,000 characters while using URL-based storage:

- **Compression**: Client-side compression (e.g., `lz-string`) will compress raw markdown before URL encoding, achieving ~50-60% size reduction.
- **Encoding**: Compressed payload uses URL-safe Base64 encoding (replacing `+`/`/` with `-`/`_`, trimming `=`) to minimize link length.
- **Size limits**: When compressed payload exceeds safe threshold (~6-7k characters), the experience alerts users with guidance to trim or segment content.
- **Versioning**: Share links include a version marker (e.g., `v1`) to support future encoding changes while maintaining backward compatibility.

#### Rationale

Uncompressed Base64 encoding would limit safe document size to ~2-5k characters, falling short of the 20k character goal. Compression is essential to meet capacity requirements within browser and platform URL length constraints.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: First-time users can create and copy a shareable markdown link within 30 seconds of landing on the page during usability tests.
- **SC-002**: Recipients opening a valid share link see the rendered markdown in under 2 seconds for documents up to 20,000 characters on standard broadband.
- **SC-003**: At least 90% of test participants report the shared markdown is easy to read without additional formatting adjustments.
- **SC-004**: At least 80% of collaborators can open a shared link, revise the content, and produce a new link without facilitator assistance.
