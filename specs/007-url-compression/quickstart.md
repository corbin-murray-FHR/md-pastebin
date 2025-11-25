# Quickstart: URL Compression Optimization

**Feature**: 007-url-compression  
**Date**: 2025-11-25

## Overview

This feature optimizes the compression of share links to support larger documents (~10,000 characters vs previous ~7,000) while maintaining full backward compatibility with existing links.

## Key Changes

### 1. Compression Service (`src/lib/compression.ts`)

**Before:**

```typescript
compress(text: string): string {
  return LZString.compressToBase64(text);
}

decompress(compressed: string): string | null {
  return LZString.decompressFromBase64(compressed);
}
```

**After:**

```typescript
compress(text: string): string {
  return LZString.compressToEncodedURIComponent(text);
}

decompress(compressed: string): string | null {
  // Try new format first
  const newResult = LZString.decompressFromEncodedURIComponent(compressed);
  if (newResult !== null) return newResult;

  // Fall back to legacy Base64 format
  return LZString.decompressFromBase64(compressed);
}
```

### 2. Editor Page (`src/pages/Editor.tsx`)

**Update constant:**

```typescript
// Old
const MAX_SAFE_LENGTH = 7000;

// New
const MAX_SAFE_LENGTH = 10000;
```

**Update share URL generation (remove redundant encoding):**

```typescript
// Old
const shareUrl = `...#/view/${encodeURIComponent(compressed)}`;

// New (compressToEncodedURIComponent output is already URL-safe)
const shareUrl = `...#/view/${compressed}`;
```

### 3. Viewer Page (`src/pages/Viewer.tsx`)

**Update decompression (handle URL decoding for legacy links):**

```typescript
// The compression service handles format detection internally
// Just pass the raw content from the URL
const decompressed = compressionService.decompress(encodedContent);
```

## Testing Checklist

1. [ ] Create document with 10,000 characters → Share → Open in incognito → Content displays correctly
2. [ ] Open an existing link created before this update → Content displays correctly
3. [ ] Create document with 8,500 characters → No warning appears
4. [ ] Create document with 11,000 characters → Warning appears
5. [ ] Open a corrupted/truncated link → User-friendly error message displays

## Files to Modify

| File                     | Change Type | Description                                             |
| ------------------------ | ----------- | ------------------------------------------------------- |
| `src/lib/compression.ts` | Modify      | Switch to URI-encoded compression, add format detection |
| `src/pages/Editor.tsx`   | Modify      | Update MAX_SAFE_LENGTH, simplify URL construction       |
| `src/pages/Viewer.tsx`   | Modify      | Simplify decompression call (service handles format)    |

## Dependencies

- `lz-string` (already installed, v1.5.0) - no new dependencies required
