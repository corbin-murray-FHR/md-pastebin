# Quickstart: Accessibility & Typography Improvements

## Prerequisites

- Node.js 18+
- pnpm (or npm)

## Setup

1. **Install Dependencies**

   ```bash
   pnpm install
   ```

2. **Development Server**

   ```bash
   pnpm dev
   ```

   Access the app at `http://localhost:5173`.

## Verification

### 1. Layout Verification

1. Open the application in a browser.
2. Resize the window to a width greater than 1200px.
3. Verify that the markdown content area is centered and does not span the full width (should be approx 700px wide).

### 2. Typography Verification

1. Inspect the text elements using browser developer tools.
2. Verify `font-size` is using `rem` units (e.g., `1rem` base).
3. Verify `line-height` is approx `1.5` for body text.
4. Verify spacing between paragraphs.

### 3. Accessibility Verification

1. Run a Lighthouse audit in Chrome DevTools.
2. Check the "Accessibility" score.
3. Ensure contrast ratios meet WCAG AA standards.

## Project Structure

- `src/components/Layout.tsx`: Main layout wrapper (updated max-width).
- `src/components/MarkdownPreview.tsx`: Markdown rendering component (updated typography).
