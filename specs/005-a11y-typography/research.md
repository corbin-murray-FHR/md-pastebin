# Research: Accessibility & Typography Best Practices

**Feature**: Accessibility & Typography Improvements
**Date**: 2025-11-21
**Status**: Complete

## Research Goals

1. Determine optimal line length for reading on large screens.
2. Identify recommended font sizes and scaling units.
3. Establish optimal line height and spacing.
4. Define contrast ratio requirements.
5. Review relevant WCAG guidelines.

## Findings

### 1. Optimal Line Length (Measure)

- **Recommendation**: **50–75 characters per line** (including spaces).
- **W3C Guideline**: Maximum of **80 characters** (40 for CJK characters) to meet WCAG 2.1 Level AAA (SC 1.4.8).
- **Implementation Strategy**: Use `max-width` with `ch` units (e.g., `max-width: 65ch` to `75ch`) on the content container. This ensures the line length remains optimal regardless of the font size.

### 2. Font Sizes and Scaling

- **Recommendation**: Use **`rem`** or **`em`** units for font sizes.
  - **Base Size**: **16px (1rem)** is the standard minimum for body text.
  - **Scaling**: Ensure text can be resized up to **200%** without loss of content or functionality.
- **Rationale**: `px` units can override user browser settings, whereas `rem` respects the user's root font size preference.

### 3. Optimal Line Height (Leading)

- **Body Text**: **1.5 (150%)** is the gold standard.
- **Headings**: Tighter leading, typically **1.1–1.3**.
- **Paragraph Spacing**: Space between paragraphs should be at least **1.5 times** the line spacing (approx `2em`).
- **W3C Guideline**: Line spacing of at least space-and-a-half (1.5) within paragraphs (SC 1.4.8).

### 4. Contrast Ratios

- **WCAG Level AA (Minimum Required)**:
  - **Normal Text**: **4.5:1** contrast ratio.
  - **Large Text**: **3:1** contrast ratio (≥18pt or ≥14pt bold).
- **Implementation**: Verify current theme colors against these ratios. Pure black on white is 21:1, which is safe, but dark gray (`#222` or similar) is often preferred for reduced eye strain.

### 5. Text Alignment

- **Recommendation**: **Left-aligned** text.
- **Avoid**: Justified text, as it creates uneven "rivers of white" that impair readability, especially for people with dyslexia (SC 1.4.8).

## Decisions

1.  **Container Width**: Set `max-width: 70ch` (approx 70 characters) for the markdown preview container. Center the container using `mx-auto`.
2.  **Typography Units**: Convert any `px` font sizes to `rem`. Ensure base size is at least `1rem`.
3.  **Line Height**: Enforce `leading-relaxed` (1.625) or `leading-7` (1.75rem) from Tailwind, or custom `1.5` value for body text.
4.  **Spacing**: Ensure `mb-4` or `mb-6` (1rem - 1.5rem) between paragraphs.
5.  **Contrast**: Audit current colors. If using `shadcn/ui` themes, they usually comply, but we will verify.

## References

- W3C Web Accessibility Initiative (WAI)
- WCAG 2.1 Guidelines (SC 1.4.3, 1.4.4, 1.4.8)
- Baymard Institute
- Practical Typography
