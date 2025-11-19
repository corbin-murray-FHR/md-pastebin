# Data Model: Fix Anchor Links

**Feature**: Fix Anchor Links in Preview

## Entities

### UI Entities

#### Anchor Link

- **Description**: A link within the markdown content that points to a header in the same document.
- **Properties**:
  - `href`: string (starts with `#`)
  - `targetId`: string (the part of href after `#`)

#### Header

- **Description**: A markdown header (h1-h6) that serves as a target for anchor links.
- **Properties**:
  - `id`: string (generated slug from header text)
  - `text`: string
