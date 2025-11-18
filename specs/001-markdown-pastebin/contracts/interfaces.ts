export interface MarkdownNote {
  content: string;
  created: number;
  theme?: "light" | "dark";
}

export interface SharePayload {
  v: string; // version, e.g., '1'
  d: string; // compressed data
}

export interface ICompressionService {
  compress(note: MarkdownNote): string;
  decompress(encodedString: string): MarkdownNote | null;
}

export interface IStorageService {
  saveDraft(content: string): void;
  loadDraft(): string | null;
  clearDraft(): void;
  saveTheme(theme: "light" | "dark"): void;
  loadTheme(): "light" | "dark" | null;
}

export interface IRouteHandler {
  getCurrentRoute(): "editor" | "viewer";
  getPayloadFromHash(): string | null;
  navigateToEditor(content?: string): void;
  navigateToViewer(payload: string): void;
}
