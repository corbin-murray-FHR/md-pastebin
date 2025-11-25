/**
 * URL Compression Optimization - API Contracts
 * Feature: 007-url-compression
 * Date: 2025-11-25
 */

// ============================================================================
// Compression Format Types
// ============================================================================

/**
 * Supported compression formats for share links
 */
export type CompressionFormat = "base64" | "uri-encoded";

/**
 * Result of format detection
 */
export interface FormatDetectionResult {
  format: CompressionFormat;
  confidence: "high" | "low";
}

// ============================================================================
// Compression Service Interface
// ============================================================================

/**
 * Enhanced compression service with backward compatibility
 */
export interface ICompressionService {
  /**
   * Compress text using URL-safe encoding (new format)
   * @param text - The text to compress
   * @returns URL-safe compressed string
   */
  compress(text: string): string;

  /**
   * Decompress content with automatic format detection
   * Tries new format first, falls back to legacy Base64
   * @param compressed - The compressed string to decompress
   * @returns The original text or null if decompression fails
   */
  decompress(compressed: string): string | null;

  /**
   * Decompress using specific format (for testing/debugging)
   * @param compressed - The compressed string
   * @param format - The compression format to use
   * @returns The original text or null if decompression fails
   */
  decompressWithFormat(
    compressed: string,
    format: CompressionFormat
  ): string | null;

  /**
   * Detect the compression format of a compressed string
   * @param compressed - The compressed string to analyze
   * @returns Detected format with confidence level
   */
  detectFormat(compressed: string): FormatDetectionResult;
}

// ============================================================================
// Capacity Configuration
// ============================================================================

/**
 * Safe capacity limits for content sharing
 */
export interface CapacityConfig {
  /** Maximum characters before warning is shown */
  maxSafeLength: number;

  /** Characters at which progress indicator appears (typically 80% of max) */
  warningThreshold: number;
}

/**
 * Default capacity configuration
 */
export const DEFAULT_CAPACITY_CONFIG: CapacityConfig = {
  maxSafeLength: 10000,
  warningThreshold: 8000,
};

// ============================================================================
// Capacity Indicator Types
// ============================================================================

/**
 * Capacity status for UI feedback
 */
export type CapacityStatus = "safe" | "warning" | "exceeded";

/**
 * Capacity information for editor UI
 */
export interface CapacityInfo {
  /** Current character count */
  currentLength: number;

  /** Maximum safe length */
  maxLength: number;

  /** Percentage of capacity used (0-100+) */
  percentUsed: number;

  /** Current status */
  status: CapacityStatus;

  /** Remaining characters before exceeding limit */
  remaining: number;
}

/**
 * Calculate capacity info from content length
 */
export function calculateCapacityInfo(
  contentLength: number,
  config: CapacityConfig = DEFAULT_CAPACITY_CONFIG
): CapacityInfo {
  const percentUsed = (contentLength / config.maxSafeLength) * 100;

  let status: CapacityStatus;
  if (contentLength > config.maxSafeLength) {
    status = "exceeded";
  } else if (contentLength > config.warningThreshold) {
    status = "warning";
  } else {
    status = "safe";
  }

  return {
    currentLength: contentLength,
    maxLength: config.maxSafeLength,
    percentUsed: Math.round(percentUsed * 10) / 10, // Round to 1 decimal
    status,
    remaining: Math.max(0, config.maxSafeLength - contentLength),
  };
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * Decompression error details
 */
export interface DecompressionError {
  type: "invalid" | "corrupted" | "empty";
  message: string;
  userFriendlyMessage: string;
}

/**
 * Standard error messages for decompression failures
 */
export const DECOMPRESSION_ERRORS: Record<string, DecompressionError> = {
  invalid: {
    type: "invalid",
    message: "Invalid compression format",
    userFriendlyMessage:
      "This link appears to be invalid. Please request a new link from the sender.",
  },
  corrupted: {
    type: "corrupted",
    message: "Decompression failed",
    userFriendlyMessage:
      "Failed to decompress content. The link may have been truncated or corrupted.",
  },
  empty: {
    type: "empty",
    message: "No content in URL",
    userFriendlyMessage: "No content provided in URL.",
  },
};
