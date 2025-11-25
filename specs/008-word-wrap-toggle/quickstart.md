# Quickstart: Word Wrap Toggle

**Feature**: 008-word-wrap-toggle
**Date**: November 25, 2025

## Overview

This feature adds a toggle button to the markdown editor that allows users to switch word wrap on/off. The preference is persisted in localStorage and restored on page load.

## Files to Modify

| File                   | Change                                                           |
| ---------------------- | ---------------------------------------------------------------- |
| `src/lib/types.ts`     | Add `WordWrapPreference` type (optional, can use inline boolean) |
| `src/lib/storage.ts`   | Add `getWordWrap()` and `setWordWrap()` methods                  |
| `src/pages/Editor.tsx` | Add word wrap state, toggle button, and apply CSS to textarea    |

## Implementation Steps

### Step 1: Extend Storage Service

In `src/lib/storage.ts`:

1. Add `WORD_WRAP: "md-pastebin-word-wrap"` to `STORAGE_KEYS`
2. Add `getWordWrap(): boolean | null` method
3. Add `setWordWrap(enabled: boolean): void` method

### Step 2: Add Word Wrap State to Editor

In `src/pages/Editor.tsx`:

1. Import `WrapText` icon from lucide-react
2. Add `wordWrap` state initialized from `storageService.getWordWrap() ?? true`
3. Add toggle handler that updates state and calls `storageService.setWordWrap()`

### Step 3: Add Toggle Button

In `src/pages/Editor.tsx` editor section header:

1. Add toggle button next to layout mode buttons
2. Use `variant="ghost"` with conditional active styling
3. Add tooltip describing current action

### Step 4: Apply CSS to Textarea

In `src/pages/Editor.tsx`:

1. Add conditional className to Textarea:
   - When `wordWrap` is `true`: default behavior (Tailwind handles wrapping)
   - When `wordWrap` is `false`: add `whitespace-pre overflow-x-auto`

## Quick Verification

1. Start dev server: `pnpm dev`
2. Open editor in browser
3. Type a long line of text
4. Click word wrap toggle - text should switch between wrapping and scrolling
5. Refresh page - preference should persist

## Key Patterns to Follow

- **Button styling**: Match existing layout toggle buttons (`variant="ghost"`, `size="icon"`)
- **Storage pattern**: Follow `getTheme()/setTheme()` pattern exactly
- **Error handling**: Wrap localStorage calls in try/catch
- **Icons**: Import from `lucide-react` like other icons in the file
