# Data Model: URL Compression Optimization

**Feature**: 007-url-compression  
**Date**: 2025-11-25  
**Status**: Complete

## Entities

### CompressionFormat (Enum)

Represents the compression encoding used for share links.

| Value         | Description                         | Character Set          |
| ------------- | ----------------------------------- | ---------------------- |
| `base64`      | Legacy format using Base64 encoding | A-Z, a-z, 0-9, +, /, = |
| `uri-encoded` | New format using URL-safe encoding  | A-Z, a-z, 0-9, -, \_   |

### ShareLink (Value Object)

A URL containing compressed markdown content.

| Property            | Type              | Description                            |
| ------------------- | ----------------- | -------------------------------------- |
| `origin`            | string            | Base URL (e.g., `https://example.com`) |
| `path`              | string            | Always `/#/view/`                      |
| `compressedContent` | string            | Compressed and encoded markdown        |
| `format`            | CompressionFormat | Detected or generated format           |

**Invariants**:

- `compressedContent` must be non-empty
- Total URL length should not exceed practical limits (~8-12KB)

### SafeCapacity (Configuration)

Defines the safe character limits for content.

| Property           | Value  | Description                                      |
| ------------------ | ------ | ------------------------------------------------ |
| `maxSafeLength`    | 10,000 | Characters before warning shown                  |
| `warningThreshold` | 8,000  | Characters when progress indicator appears (80%) |

## State Transitions

### Compression Flow

```text
[Raw Markdown]
    ↓ compress()
[Compressed String (URI-encoded)]
    ↓ buildShareUrl()
[Share URL]
```

### Decompression Flow (with backward compatibility)

```text
[Share URL]
    ↓ extractCompressedContent()
[Compressed String]
    ↓ detectFormat()
[Format: uri-encoded | base64]
    ↓ decompress(format)
[Raw Markdown | null]
    ↓ handleResult()
[Display Content | Show Error]
```

## Relationships

```text
Editor Page
    ├── uses → CompressionService.compress()
    ├── checks → SafeCapacity.maxSafeLength
    └── generates → ShareLink

Viewer Page
    ├── receives → ShareLink (from URL)
    ├── uses → CompressionService.decompress()
    └── displays → Raw Markdown | Error
```

## Validation Rules

| Entity    | Rule                                          | Error Message                                              |
| --------- | --------------------------------------------- | ---------------------------------------------------------- |
| ShareLink | Content must decompress successfully          | "Failed to decompress content. The link may be corrupted." |
| ShareLink | Content must be non-empty after decompression | "No content provided in URL"                               |
| Editor    | Content length check against SafeCapacity     | Warning displayed when exceeding threshold                 |
