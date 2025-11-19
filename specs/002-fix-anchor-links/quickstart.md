# Quickstart: Fix Anchor Links

## Prerequisites

- Node.js 20+
- pnpm

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

## Testing the Feature

1. Open the application in your browser (usually `http://localhost:5173`).
2. In the editor pane, enter the following markdown:

   ```markdown
   # Table of Contents

   - [Section 1](#section-1)
   - [Section 2](#section-2)

   # Section 1

   Content for section 1.

   # Section 2

   Content for section 2.
   ```

3. Click the links in the "Table of Contents" in the preview pane.
4. Verify that the preview pane scrolls to the corresponding section.
5. Verify that the browser URL does NOT change to include `#section-1`.

### Edge Case Testing

1. Append the following to your markdown:
   ```markdown
   # Header & Symbols!

   [Link to Symbols](#header--symbols)
   ```
2. Click "Link to Symbols".
3. Verify it scrolls to "Header & Symbols!".
