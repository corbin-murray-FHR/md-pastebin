# Feature Specification: Syntax Highlighting

**Feature Branch**: `004-syntax-highlighting`
**Created**: 2025-11-20
**Status**: Draft
**Input**: User description: "I want to add functionality that when markdown has explicit code block typing... Example: ... We can highlight the syntax within our preview panel so that our users obtain semnatic clues out of the box (also I believe this would help with accessibility [maybe not, needs verified])"

## Clarifications

### Session 2025-11-20

- Q: Are there specific accessibility concerns with the current or default themes? → A: Yes, light mode specifically has known low-contrast issues; the implementation must ensure light mode code blocks are strictly legible (WCAG AA).
- Q: Should we include additional code block features like a copy button or line numbers? → A: Yes, include both a "Copy" button and line numbers for better usability.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Highlighted Code (Priority: P1)

As a user viewing a markdown document, I want code blocks with explicit language tags to be syntax highlighted so that I can easily distinguish keywords, strings, and comments.

**Why this priority**: This is the core value proposition of the feature. Without this, the feature does not exist.

**Independent Test**: Can be tested by creating a markdown note with various code blocks (e.g., PowerShell, JavaScript) and verifying they render with colors.

**Acceptance Scenarios**:

1. **Given** a markdown document with a code block using the `powershell` tag, **When** the preview is rendered, **Then** the code within the block is displayed with syntax highlighting appropriate for PowerShell.
2. **Given** a markdown document with a code block using the `js` tag, **When** the preview is rendered, **Then** the code within the block is displayed with syntax highlighting appropriate for JavaScript.
3. **Given** a markdown document with a code block using an unknown or missing tag, **When** the preview is rendered, **Then** the code is displayed as plain text without broken styling.

---

### User Story 2 - Theme Adaptation (Priority: P2)

As a user who switches between light and dark modes, I want the syntax highlighting colors to adapt to the current theme so that the code remains readable and visually consistent with the rest of the application.

**Why this priority**: Essential for usability and visual consistency. A dark code block in a light theme (or vice versa) can be jarring or unreadable.

**Independent Test**: Can be tested by toggling the application theme and observing the code block colors.

**Acceptance Scenarios**:

1. **Given** the application is in light mode, **When** a code block is rendered, **Then** the background and syntax colors use a light-compatible color scheme.
2. **Given** the application is in dark mode, **When** a code block is rendered, **Then** the background and syntax colors use a dark-compatible color scheme.
3. **Given** the application is in light mode, **When** a code block is rendered, **Then** the text contrast ratio against the background is at least 4.5:1 (WCAG AA).

---

### User Story 3 - Accessible Contrast (Priority: P2)

As a user with visual impairments, I want the syntax highlighting colors to have sufficient contrast against the background so that I can read the code without strain.

**Why this priority**: Ensures the feature is usable by all users and meets accessibility standards mentioned in the request.

**Independent Test**: Can be tested using accessibility audit tools to check contrast ratios of the highlighted text.

**Acceptance Scenarios**:

1. **Given** a highlighted code block, **When** analyzed for accessibility, **Then** the text color contrast against the background meets WCAG AA standards (4.5:1 for normal text).

---

### User Story 4 - Enhanced Code Interaction (Priority: P2)

As a developer or technical user, I want to easily copy code snippets and reference specific lines so that I can use the code efficiently in my own work or discussions.

**Why this priority**: Improves the usability of the pastebin for its primary audience (developers sharing code).

**Independent Test**: Can be tested by clicking the copy button and pasting the result, and by visually verifying line numbers.

**Acceptance Scenarios**:

1. **Given** a code block, **When** I hover over it (or focus it), **Then** a "Copy" button appears.
2. **Given** I click the "Copy" button, **When** I paste into another application, **Then** the exact code content is pasted (without line numbers or extra formatting).
3. **Given** a code block with multiple lines, **When** rendered, **Then** line numbers are displayed on the left side.
4. **Given** a code block, **When** I copy the content, **Then** the line numbers are NOT included in the clipboard content.

### Edge Cases

- **Large Code Blocks**: How does the system handle very large code blocks (e.g., 1000+ lines)? It should not freeze the UI.
- **Mixed Content**: Code blocks nested within lists or other markdown structures should still highlight correctly.
- **Invalid Syntax**: Code that is syntactically incorrect for the specified language should still render (best effort highlighting) and not crash the preview.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST detect language identifiers specified in markdown code fences (e.g., ```language).
- **FR-002**: System MUST apply syntax highlighting to the content of the code block based on the detected language.
- **FR-003**: System MUST support a common set of languages, including at minimum: PowerShell, JavaScript, TypeScript, HTML, CSS, JSON, Python, Bash, and C#.
- **FR-004**: System MUST render code as plain text if the language tag is missing or not supported.
- **FR-005**: System MUST update syntax highlighting colors dynamically when the application theme changes (light/dark).
- **FR-006**: System MUST ensure that all syntax highlighting colors meet WCAG AA contrast guidelines against their background, with specific attention to correcting low contrast in Light Mode.
- **FR-007**: System MUST NOT significantly degrade rendering performance for documents with multiple or large code blocks.
- **FR-008**: System MUST display line numbers for all code blocks.
- **FR-009**: System MUST provide a "Copy" button for each code block that copies the raw code content to the clipboard.
- **FR-010**: The "Copy" button MUST be accessible via keyboard navigation.
- **FR-011**: Copied content MUST NOT include line numbers.

### Success Criteria

- **SC-001**: Code blocks with `powershell` tag are visually highlighted in the preview.
- **SC-002**: Code blocks with `javascript` tag are visually highlighted in the preview.
- **SC-003**: Switching themes updates the code block styling immediately.
- **SC-004**: Accessibility audit confirms contrast ratios > 4.5:1 for code text.
- **SC-005**: Users can copy code from any block with a single click.
- **SC-006**: Line numbers are visible for all code blocks.

### Assumptions

- The markdown parser used by the application supports accessing the language tag of code blocks.
- We will use a client-side library for syntax highlighting.
- "Explicit code block typing" refers to standard markdown fenced code blocks with language info strings.
