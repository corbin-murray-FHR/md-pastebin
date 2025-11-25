# Data Model: Word Wrap Toggle

**Feature**: 008-word-wrap-toggle
**Date**: November 25, 2025

## Entities

### WordWrapPreference

A boolean preference indicating whether word wrap is enabled in the editor.

| Attribute | Type    | Description                                    |
| --------- | ------- | ---------------------------------------------- |
| enabled   | boolean | `true` = word wrap on, `false` = word wrap off |

**Storage Key**: `md-pastebin-word-wrap`

**Default Value**: `true` (word wrap enabled)

**Persistence**: localStorage via storageService

---

### EditorState (Extended)

The runtime state of the editor component, extended to include word wrap.

| Attribute       | Type       | Description                               |
| --------------- | ---------- | ----------------------------------------- |
| markdown        | string     | Current editor content                    |
| layoutMode      | LayoutMode | Current layout mode (split/editor/viewer) |
| wordWrap        | boolean    | Current word wrap state                   |
| isWarningLength | boolean    | Whether content exceeds safe length       |

---

## State Transitions

### Word Wrap Toggle

```text
┌─────────────────┐     toggle()     ┌─────────────────┐
│ wordWrap: true  │ ───────────────► │ wordWrap: false │
│ (wrapped text)  │                  │ (scrollable)    │
└─────────────────┘ ◄─────────────── └─────────────────┘
                       toggle()
```

### Persistence Flow

```text
Page Load:
  1. storageService.getWordWrap() called
  2. If null → default to true
  3. Initialize state with value

Toggle Action:
  1. User clicks toggle button
  2. State updated (wordWrap = !wordWrap)
  3. storageService.setWordWrap(newValue) called
  4. CSS class applied to textarea immediately
```

---

## Validation Rules

| Rule                    | Description                                      |
| ----------------------- | ------------------------------------------------ |
| Boolean only            | Word wrap value must be boolean (true/false)     |
| Graceful default        | If storage returns invalid/null, default to true |
| No content modification | Toggle must not alter markdown content           |

---

## Relationships

```text
┌──────────────────┐
│   Editor.tsx     │
│   (component)    │
└────────┬─────────┘
         │ uses
         ▼
┌──────────────────┐     reads/writes     ┌──────────────────┐
│  wordWrap state  │ ◄──────────────────► │  storageService  │
│  (React state)   │                      │  (localStorage)  │
└────────┬─────────┘                      └──────────────────┘
         │ applies
         ▼
┌──────────────────┐
│    Textarea      │
│  (CSS classes)   │
└──────────────────┘
```
