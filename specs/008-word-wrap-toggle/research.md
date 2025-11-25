# Research: Word Wrap Toggle

**Feature**: 008-word-wrap-toggle
**Date**: November 25, 2025

## Research Tasks

### 1. CSS Word Wrap Implementation

**Question**: How to implement word wrap toggle on a textarea element?

**Finding**: CSS provides two relevant properties:

- `white-space: pre-wrap` - Wraps text at word boundaries while preserving whitespace (word wrap ON)
- `white-space: pre` - Preserves whitespace, no wrapping, allows horizontal scroll (word wrap OFF)
- `overflow-x: auto` - Needed when word wrap is off to enable horizontal scrolling

**Decision**: Use CSS classes to toggle between `whitespace-pre-wrap` and `whitespace-pre overflow-x-auto`

**Rationale**: Pure CSS solution is performant, doesn't require JavaScript text manipulation, and integrates well with Tailwind CSS utilities.

**Alternatives considered**:

- JavaScript-based line breaking: Rejected - modifies content, complex, affects cursor position
- `word-break` property: Rejected - breaks words mid-character, not ideal for markdown

---

### 2. Existing Storage Pattern

**Question**: How does the app currently persist user preferences?

**Finding**: The `storageService` in `src/lib/storage.ts` provides a consistent pattern:

- Uses localStorage with prefixed keys (`md-pastebin-*`)
- Wraps all operations in try/catch for robustness
- Exposes getter/setter pairs (e.g., `getTheme()/setTheme()`)
- Keys defined in `STORAGE_KEYS` constant

**Decision**: Extend `storageService` with `getWordWrap()/setWordWrap()` methods following the existing pattern.

**Rationale**: Consistent with existing codebase, already handles edge cases (localStorage unavailable, errors).

**Alternatives considered**:

- Separate preference service: Rejected - unnecessary complexity, duplicates existing pattern
- React Context for preferences: Rejected - overkill for single boolean, localStorage already works

---

### 3. Icon Selection for Toggle

**Question**: What icon should represent word wrap toggle?

**Finding**: Lucide React (already used in the project) provides several options:

- `WrapText` - Explicitly shows text wrapping concept
- `AlignJustify` - Could work but less clear
- `TextCursorInput` - Too generic

**Decision**: Use `WrapText` icon from lucide-react.

**Rationale**: Most semantically correct, users will understand the meaning. Follows existing pattern of using lucide icons (e.g., `Share2`, `PanelLeftClose`).

**Alternatives considered**:

- Custom SVG icon: Rejected - unnecessary, lucide already has appropriate icon
- Text label only: Rejected - inconsistent with existing icon-based toggle buttons

---

### 4. Toggle Button Placement

**Question**: Where should the word wrap toggle be placed in the UI?

**Finding**: Editor.tsx has a toolbar area in the editor section header with existing layout mode toggles:

```tsx
<div className="flex items-center justify-between">
  <h3 className="text-lg font-semibold">Editor</h3>
  <div className="flex gap-2">{/* Layout toggle buttons here */}</div>
</div>
```

**Decision**: Add word wrap toggle button in the same toolbar area, before the layout toggle buttons.

**Rationale**: Groups all editor controls together, follows existing visual pattern, doesn't require new UI chrome.

**Alternatives considered**:

- Separate toolbar: Rejected - adds visual clutter, inconsistent
- Keyboard shortcut only: Rejected - poor discoverability, not accessible to all users
- Right-click context menu: Rejected - hidden, not discoverable

---

### 5. Default Value Strategy

**Question**: What should be the default word wrap setting for new users?

**Finding**: The spec states "default to word wrap enabled for new users" because:

- Prose-heavy markdown (most common) reads better with wrapping
- Prevents horizontal scrolling surprise for new users
- Can be easily toggled off for code/tables

**Decision**: Default to `true` (word wrap enabled) when no preference is stored.

**Rationale**: Better out-of-box experience for typical markdown editing use case.

**Alternatives considered**:

- Default to off: Rejected - less common preference, worse first impression
- Detect content type: Rejected - over-engineering, user can toggle manually

---

## Summary

All research questions resolved. No blockers identified. Implementation approach:

1. **CSS**: Tailwind classes for `whitespace-pre-wrap` (on) vs `whitespace-pre overflow-x-auto` (off)
2. **Storage**: Extend existing `storageService` with word wrap methods
3. **Icon**: Use `WrapText` from lucide-react
4. **Placement**: Editor section toolbar, grouped with layout toggles
5. **Default**: Word wrap enabled by default
