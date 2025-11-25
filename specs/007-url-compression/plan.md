# Implementation Plan: URL Compression Optimization

**Branch**: `007-url-compression` | **Date**: 2025-11-25 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/007-url-compression/spec.md`

## Summary

Optimize URL compression for share links by switching from `LZString.compressToBase64` to `LZString.compressToEncodedURIComponent`, enabling ~15-25% smaller URLs and increasing shareable document capacity from ~7,000 to ~10,000+ characters. Full backward compatibility with existing Base64-encoded links is maintained through automatic format detection.

## Technical Context

**Language/Version**: TypeScript 5.9.3  
**Primary Dependencies**: React 19.2, lz-string 1.5.0, react-router-dom 7.9.6  
**Storage**: N/A (client-only, URL hash + localStorage)  
**Testing**: Manual testing (no test framework currently configured)  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Single SPA (Vite + React)  
**Performance Goals**: Compression/decompression < 50ms for 20k character documents  
**Constraints**: URL length must stay under ~8-12KB for reliable cross-platform sharing  
**Scale/Scope**: Client-side only, single-user sessions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Security & Robustness | ✅ PASS | Input validation maintained, graceful error handling for corrupted links |
| II. Test-Friendly | ✅ PASS | CompressionService is isolated, testable interface maintained |
| III. Technology Stack | ✅ PASS | Uses existing lz-string (approved), no new dependencies |
| IV. Component Strategy | ✅ PASS | N/A - no new UI components, only logic changes |
| V. Corporate Network Compliance | ✅ PASS | N/A - no network dependencies |
| VI. Git Hygiene | ✅ PASS | Changes are atomic and focused |
| VII. Verification Standards | ⏳ PENDING | Will verify build + manual tests on completion |

**Gate Status**: ✅ PASSED - No violations, proceed with implementation.

## Project Structure

### Documentation (this feature)

```text
specs/007-url-compression/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output - compression research
├── data-model.md        # Phase 1 output - entity definitions
├── quickstart.md        # Phase 1 output - implementation guide
├── contracts/           # Phase 1 output - TypeScript interfaces
│   └── interfaces.ts
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (files to modify)

```text
src/
├── lib/
│   └── compression.ts   # MODIFY: Switch compression method, add format detection
├── pages/
│   ├── Editor.tsx       # MODIFY: Update MAX_SAFE_LENGTH, simplify URL construction
│   └── Viewer.tsx       # MODIFY: Simplify decompression (service handles format)
```

**Structure Decision**: Single SPA structure maintained. Changes are localized to 3 files with clear separation of concerns (compression logic in service, UI in pages).

## Implementation Phases

### Phase 1: Core Compression Changes

**Files**: `src/lib/compression.ts`

1. Update `compress()` to use `LZString.compressToEncodedURIComponent()`
2. Update `decompress()` to try new format first, fall back to Base64
3. Add `detectFormat()` helper for debugging/testing

**Acceptance**: Round-trip test passes for both new and legacy formats.

### Phase 2: Editor Integration

**Files**: `src/pages/Editor.tsx`

1. Update `MAX_SAFE_LENGTH` constant from 7000 to 10000
2. Remove `encodeURIComponent()` wrapper in share URL generation (new compression output is already URL-safe)
3. Update warning message to reflect new capacity

**Acceptance**: 10,000 character document can be shared without warnings.

### Phase 3: Viewer Compatibility

**Files**: `src/pages/Viewer.tsx`

1. Simplify decompression call (compression service handles format detection internally)
2. Verify error handling still works for corrupted links

**Acceptance**: Both old and new format links decompress correctly.

### Phase 4: Verification

1. Build project (`pnpm build`)
2. Manual testing:
   - Create 10,000 char document → Share → Open in incognito
   - Open existing Base64 link → Content displays
   - Open corrupted link → Error message displays

**Acceptance**: All tests pass, build succeeds.

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Legacy links break | Low | High | Format auto-detection with fallback |
| URL truncation on some platforms | Medium | Medium | Conservative 10K limit (not maximum) |
| Edge case in format detection | Low | Low | Try-new-then-fallback pattern handles ambiguity |

## Dependencies

- `lz-string` v1.5.0 (already installed) - no new dependencies required
- No breaking changes to public API
- No database or external service changes

## Rollback Plan

If issues arise post-deployment:

1. Revert compression.ts to use `compressToBase64` 
2. Revert MAX_SAFE_LENGTH to 7000
3. New links created during the incident will use Base64 format (still compatible)
