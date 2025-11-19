import LZString from 'lz-string';

/**
 * Service for compressing and decompressing markdown content
 */
export interface ICompressionService {
  compress(text: string): string;
  decompress(compressed: string): string | null;
}

class CompressionService implements ICompressionService {
  /**
   * Compress text using LZ-based compression
   * @param text - The text to compress
   * @returns Base64 encoded compressed string
   */
  compress(text: string): string {
    return LZString.compressToBase64(text);
  }

  /**
   * Decompress a previously compressed string
   * @param compressed - The compressed string to decompress
   * @returns The original text or null if decompression fails
   */
  decompress(compressed: string): string | null {
    return LZString.decompressFromBase64(compressed);
  }
}

export const compressionService = new CompressionService();
