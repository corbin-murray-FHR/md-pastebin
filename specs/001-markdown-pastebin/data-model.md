# Data Model

## Entities

### MarkdownNote

The core content entity created by the user.

| Field     | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| `content` | `string`            | The raw markdown text.                  |
| `created` | `number`            | Timestamp (Date.now()) of creation.     |
| `theme`   | `'light' \| 'dark'` | (Optional) Preferred theme for viewing. |

### SharePayload

The data structure encoded into the URL.

| Field | Type     | Description                                     |
| ----- | -------- | ----------------------------------------------- |
| `v`   | `string` | Version of the encoding (e.g., "1").            |
| `d`   | `string` | The compressed data string (lz-string encoded). |

## State Management

### Application State (Client-Side)

- **Draft**: Stored in `localStorage` to prevent data loss (FR-008).
- **Current View**: 'Editor' or 'Viewer'.
- **Theme**: User preference stored in `localStorage`.

## Validation

- **Content Length**: Warn if compressed length > 7000 chars.
- **Empty Content**: Cannot share empty note.
