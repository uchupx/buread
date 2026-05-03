import {fileTypeFromBuffer} from 'file-type'
import {v4 as uuidv4} from 'uuid'
import type {useDocumentsStore} from '@/stores/documents'
import SparkMD5 from 'spark-md5'
import localforage from "localforage";
import { arrayBufferUtils } from "@/services/buffer.service.ts";

export interface BookDocument {
  id: string
  title: string
  type: 'pdf' | 'epub'
  size: number
  uploadedAt: string
  lastReadAt?: string
  progress: number
  content: string
  bookmark?: {
    page: number
    position: number
  }
}

export interface Book {
  id: string
  title: string
  type: 'pdf' | 'epub'
  size: number
  uploadedAt: string
  lastReadAt?: string
  progress: number
  content?: ArrayBuffer
  bookmark?: {
    page: number
    position: number
  }
}

export class DocumentService {
  private static readonly STORAGE_KEY = 'webreader-documents'
  private static store: ReturnType<typeof useDocumentsStore> | null = null

  /**
   * Initialize the service with the store instance
   */
  static initialize(store: ReturnType<typeof useDocumentsStore>): void {
    this.store = store
  }

  /**
   * Get store instance
   */
  private static getStore(): ReturnType<typeof useDocumentsStore> {
    if (!this.store) {
      throw new Error('DocumentService not initialized. Call initialize() first.')
    }
    return this.store
  }

  /**
   * Add a new document from a file
   */
  static async addDocument(file: File): Promise<BookDocument> {
    try {
      const buffer = await file.arrayBuffer()
      const fileType = await fileTypeFromBuffer(buffer)
      
      let type: 'pdf' | 'epub'
      if (file.type === 'application/pdf' || fileType?.ext === 'pdf') {
        type = 'pdf'
      } else if (file.name.endsWith('.epub') || fileType?.ext === 'epub') {
        type = 'epub'
      } else {
        throw new Error('Unsupported file type')
      }

      const hash = arrayBufferUtils.arrayBufferToBase64(buffer)
      const document: BookDocument = {
        id: uuidv4(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        progress: 0,
        content: hash,
      }

      return document
    } catch (error) {
      console.error('Error adding document:', error)
      throw error
    }
  }

  /**
   * Get a document by ID
   */
  static getDocument(id: string): Book | null {
    const store = this.getStore()
    const doc = store.documents.find(doc => doc.id === id) || null
    if (!doc) {
      return null
    }
    const buf = arrayBufferUtils.base64ToArrayBuffer(doc.content)
    return {
      id: doc.id,
      title: doc.title,
      type: doc.type,
      size: doc.size,
      uploadedAt: doc.uploadedAt,
      lastReadAt: doc.lastReadAt,
      progress: doc.progress,
      content: buf
    } as Book

  }

  /**
   * Remove a document by ID
   */
  static removeDocument(id: string): void {
    const store = this.getStore()
    store.documents = store.documents.filter(doc => doc.id !== id)
    if (store.currentDocument?.id === id) {
      store.currentDocument = null
    }
    this.saveDocuments()
  }

  /**
   * Update document progress
   */
  static updateProgress(id: string, progress: number): void {
    const store = this.getStore()
    const doc = store.documents.find(doc => doc.id === id)
    if (doc) {
      doc.progress = progress
      doc.lastReadAt = new Date().toISOString()
      this.saveDocuments()
    }
  }

  /**
   * Update document bookmark
   */
  static updateBookmark(id: string, bookmark: { page: number; position: number }): void {
    const store = this.getStore()
    const doc = store.documents.find(doc => doc.id === id)
    if (doc) {
      doc.bookmark = bookmark
      this.saveDocuments()
    }
  }

  /**
   * Get documents by type
   */
  static getDocumentsByType(type: 'pdf' | 'epub'): BookDocument[] {
    const store = this.getStore()
    return store.documents.filter(doc => doc.type === type)
  }

  /**
   * Get recent documents (sorted by last read or upload date)
   */
  static getRecentDocuments(limit: number = 5): BookDocument[] {
    const store = this.getStore()
    return store.documents
      .sort((a, b) => {
        const dateA = new Date(a.lastReadAt || a.uploadedAt).getTime()
        const dateB = new Date(b.lastReadAt || b.uploadedAt).getTime()
        return dateB - dateA
      })
      .slice(0, limit)
  }

  /**
   * Calculate total reading progress across all documents
   */
  static getTotalReadingProgress(): number {
    const store = this.getStore()
    if (store.documents.length === 0) return 0
    const totalProgress = store.documents.reduce((sum, doc) => sum + doc.progress, 0)
    return totalProgress / store.documents.length
  }

  /**
   * Get all documents
   */
  static getAllDocuments(): BookDocument[] {
    const store = this.getStore()
    return store.documents
  }

  /**
   * Set current document
   */
  static setCurrentDocument(document: BookDocument | null): void {
    const store = this.getStore()
    store.currentDocument = document
  }

  /**
   * Get current document
   */
  static getCurrentDocument(): BookDocument | null {
    const store = this.getStore()
    return store.currentDocument
  }

  /**
   * Save documents to localStorage
   */
  static saveDocuments(): void {
    const store = this.getStore()
    try {
      const documentsToSave = store.documents.map(doc => ({
        ...doc,
      }))
      localforage.setItem(this.STORAGE_KEY, JSON.stringify(documentsToSave))
    } catch (error) {
      console.error('Error saving documents:', error)
    }
  }

  /**
   * Load documents from localStorage
   */
  static async loadDocuments(): Promise<void> {
    try {
      const saved = await localforage.getItem(this.STORAGE_KEY) as string
      if (saved) {
        const documents = JSON.parse(saved) as BookDocument[]
        const store = this.getStore()
        store.documents = documents
      }
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  /**
   * Clear all documents from localStorage
   */
  static clearAllDocuments(): void {
    const store = this.getStore()
    store.documents = []
    store.currentDocument = null
    localforage.removeItem(this.STORAGE_KEY)
  }

  /**
   * Format file size to human-readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  /**
   * Format date to locale string
   */
  static formatDate(date: string): string {
    return new Date(date).toLocaleDateString()
  }
}
