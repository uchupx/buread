import { defineStore } from "pinia";
import {
  DocumentService,
  type BookDocument,
  type Book,
} from "@/services/document.service";

export type { BookDocument };

export const useDocumentsStore = defineStore("documents", {
  state: () => ({
    documents: [] as BookDocument[],
    currentDocument: null as BookDocument | null,
  }),

  actions: {
    async addDocument(file: File): Promise<void> {
      const document = await DocumentService.addDocument(file);
      this.documents.push(document);
      DocumentService.saveDocuments();
    },

    removeDocument(id: string): void {
      DocumentService.removeDocument(id);
    },

    getDocument(id: string): Book | null {
      return DocumentService.getDocument(id);
    },

    updateProgress(id: string, progress: number): void {
      DocumentService.updateProgress(id, progress);
    },

    updateBookmark(
      id: string,
      bookmark: { page: number; position: number },
    ): void {
      DocumentService.updateBookmark(id, bookmark);
    },

    setCurrentDocument(document: BookDocument | null): void {
      DocumentService.setCurrentDocument(document);
    },

    saveDocuments(): void {
      DocumentService.saveDocuments();
    },

    async loadDocuments(): Promise<void> {
      await DocumentService.loadDocuments();
    },

    clearAllDocuments(): void {
      DocumentService.clearAllDocuments();
    },
  },

  getters: {
    getDocumentsByType: (state) => (type: "pdf" | "epub") => {
      return DocumentService.getDocumentsByType(type);
    },

    getRecentDocuments: (state) => {
      return DocumentService.getRecentDocuments();
    },

    getTotalReadingProgress: (state) => {
      return DocumentService.getTotalReadingProgress();
    },
    // Add this getter to retrieve a document by ID from the store's state
    getDocumentById: (state) => (id: string) => {
      return state.documents.find((doc) => doc.id === id) || null;
    },
  },
});
