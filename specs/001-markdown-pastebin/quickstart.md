# Quickstart

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Development Server**

   ```bash
   npm run dev
   ```

   Access the app at `http://localhost:5173`.

3. **Build for Production**

   ```bash
   npm run build
   ```

   Output will be in `dist/`.

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Project Structure

- `src/components`: React components (shadcn/ui + custom).
- `src/lib`: Utility functions (compression, storage).
- `src/pages`: Top-level route components (Editor, Viewer).
- `src/styles`: Tailwind CSS configuration.
