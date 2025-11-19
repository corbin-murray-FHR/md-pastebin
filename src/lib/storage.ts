/**
 * Service for managing local storage operations
 */
export interface IStorageService {
  saveDraft(content: string): void;
  getDraft(): string | null;
  clearDraft(): void;
  getTheme(): string | null;
  setTheme(theme: string): void;
}

const STORAGE_KEYS = {
  DRAFT: 'md-pastebin-draft',
  THEME: 'md-pastebin-theme',
} as const;

class StorageService implements IStorageService {
  /**
   * Save markdown draft to localStorage
   * @param content - The markdown content to save
   */
  saveDraft(content: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAFT, content);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }

  /**
   * Retrieve saved markdown draft
   * @returns The saved draft or null if none exists
   */
  getDraft(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.DRAFT);
    } catch (error) {
      console.error('Failed to get draft:', error);
      return null;
    }
  }

  /**
   * Clear the saved draft from localStorage
   */
  clearDraft(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.DRAFT);
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  }

  /**
   * Get the saved theme preference
   * @returns The theme name or null if none is set
   */
  getTheme(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME);
    } catch (error) {
      console.error('Failed to get theme:', error);
      return null;
    }
  }

  /**
   * Save theme preference
   * @param theme - The theme name to save
   */
  setTheme(theme: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Failed to set theme:', error);
    }
  }
}

export const storageService = new StorageService();
