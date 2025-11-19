# Feature Specification: Fix Anchor Links in Preview

**Feature Branch**: `002-fix-anchor-links`  
**Created**: 2025-11-19  
**Status**: Draft  
**Input**: User description: "Fix markdown anchor links in preview to be contained within the app and not link to site root"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Navigate Internal Anchor Links (Priority: P1)

As a user viewing a markdown document with anchor links (e.g., Table of Contents), I want clicking them to scroll to the relevant section within the preview, so that I can navigate the document without leaving the page or reloading.

**Why this priority**: This is the core bug fix requested by the user.

**Independent Test**: Create a markdown document with headers and a Table of Contents. Click a TOC link and verify it scrolls to the header without changing the browser URL to the site root.

**Acceptance Scenarios**:

1. **Given** a markdown document with a header `# Section 1` and a link `[Go to Section 1](#section-1)`, **When** I click the link in the preview, **Then** the preview pane scrolls to show Section 1.
2. **Given** the same setup, **When** I click the link, **Then** the browser does NOT navigate to `https://site.com/#section-1` and does not reload the page.
3. **Given** a link to a non-existent anchor `[Broken](#broken)`, **When** I click it, **Then** nothing happens (or it stays on the same page).

---

### User Story 2 - Navigate External Links (Priority: P1)

As a user, I want external links to still work normally (open in new tab or navigate).

**Why this priority**: To ensure no regression in standard link behavior.

**Independent Test**: Click an external link in the preview.

**Acceptance Scenarios**:

1. **Given** a link `[Google](https://google.com)`, **When** I click it, **Then** it opens in a new tab (recommended for preview) or navigates to the URL.

### Edge Cases

- What happens when the anchor target is at the very bottom of the document? (Should scroll as far as possible).
- What happens with special characters in headers? (Ensure ID generation matches the link href).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The Markdown Preview component MUST intercept clicks on `<a>` tags that have an `href` starting with `#`.
- **FR-002**: For intercepted anchor links, the system MUST prevent the default browser navigation.
- **FR-003**: The system MUST attempt to find the HTML element within the preview container that matches the anchor ID (e.g., `id="section-1"`).
- **FR-004**: If the target element is found, the system MUST scroll the preview container to bring that element into view.
- **FR-005**: External links (starting with `http://` or `https://`) MUST continue to function normally (opening in a new tab is preferred).

### Key Entities _(include if feature involves data)_

- **Markdown Preview**: The component rendering the markdown.
- **Anchor Link**: A link pointing to a specific section within the document.

### Assumptions

- The markdown renderer generates `id` attributes for headers that correspond to the anchor links generated.
- The application is running in a browser environment where `window` and `document` are available.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Clicking an anchor link scrolls to the correct section 100% of the time when the section exists.
- **SC-002**: Clicking an anchor link never causes a full page reload or a 404 error.
- **SC-003**: External links continue to open correctly.
