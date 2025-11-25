/**
 * Word Wrap Toggle Feature Contracts
 *
 * Feature: 008-word-wrap-toggle
 * Date: November 25, 2025
 */

// =============================================================================
// Storage Service Extension
// =============================================================================

/**
 * Extended storage service interface with word wrap preference support
 */
export interface IStorageServiceWithWordWrap {
  // Existing methods
  saveDraft(content: string): void;
  getDraft(): string | null;
  clearDraft(): void;
  getTheme(): string | null;
  setTheme(theme: string): void;

  // New word wrap methods
  /**
   * Get the saved word wrap preference
   * @returns true if word wrap is enabled, false if disabled, null if not set
   */
  getWordWrap(): boolean | null;

  /**
   * Save word wrap preference
   * @param enabled - true to enable word wrap, false to disable
   */
  setWordWrap(enabled: boolean): void;
}

// =============================================================================
// Editor State
// =============================================================================

/**
 * Extended editor state including word wrap
 */
export interface EditorState {
  /** Current markdown content */
  markdown: string;
  /** Current layout mode */
  layoutMode: "split" | "editor" | "viewer";
  /** Whether word wrap is enabled */
  wordWrap: boolean;
  /** Whether content length exceeds warning threshold */
  isWarningLength: boolean;
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for a word wrap toggle button component (if extracted)
 */
export interface WordWrapToggleProps {
  /** Current word wrap state */
  enabled: boolean;
  /** Callback when toggle is clicked */
  onToggle: () => void;
  /** Optional className for styling */
  className?: string;
}

// =============================================================================
// Storage Keys
// =============================================================================

/**
 * Storage key for word wrap preference
 */
export const WORD_WRAP_STORAGE_KEY = "md-pastebin-word-wrap" as const;

/**
 * Default word wrap value for new users
 */
export const WORD_WRAP_DEFAULT = true;
