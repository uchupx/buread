<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Header -->
        <header
            class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <BookOpen
                            class="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3"
                        />
                        <h1
                            class="text-2xl font-bold text-gray-900 dark:text-white"
                        >
                            WebReader
                        </h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            @click="openFileUpload"
                            class="btn-primary flex items-center hidden lg:flex"
                        >
                            <Upload class="w-4 h-4 mr-2" />
                            Upload Document
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
            <!-- Upload Area -->
            <div
                v-if="documents.length === 0"
                class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center"
                @dragover.prevent="handleDragOver"
                @dragleave.prevent="handleDragLeave"
                @drop.prevent="handleDrop"
                :class="{
                    'border-primary-500 bg-primary-50 dark:bg-primary-900/20':
                        isDragging,
                }"
            >
                <BookOpen
                    class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4"
                />
                <h3
                    class="text-lg font-medium text-gray-900 dark:text-white mb-2"
                >
                    No documents yet
                </h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">
                    Upload your first PDF or EPUB document to get started
                </p>
                <button @click="openFileUpload" class="btn-primary">
                    <Upload class="w-4 h-4 mr-2" />
                    Choose File
                </button>
            </div>

            <!-- Documents Grid -->
            <div v-else class="space-y-6">
                <div class="flex justify-between items-center">
                    <h2
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                        Your Library ({{ documents.length }})
                    </h2>
                    <div class="flex items-center space-x-2">
                        <button
                            @click="sortBy = 'title'"
                            :class="
                                sortBy === 'title'
                                    ? 'btn-primary'
                                    : 'btn-secondary'
                            "
                            class="text-sm"
                        >
                            Title
                        </button>
                        <button
                            @click="sortBy = 'date'"
                            :class="
                                sortBy === 'date'
                                    ? 'btn-primary'
                                    : 'btn-secondary'
                            "
                            class="text-sm"
                        >
                            Date
                        </button>
                    </div>
                </div>

                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <div
                        v-for="doc in sortedDocuments"
                        :key="doc.id"
                        class="card p-6 hover:shadow-md transition-shadow cursor-pointer"
                        @click="openDocument(doc)"
                    >
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center w-full">
                                <FileText
                                    v-if="doc.type === 'pdf'"
                                    class="w-8 h-8 text-red-500 mr-3"
                                />
                                <Book
                                    v-else-if="doc.type === 'epub'"
                                    class="w-8 h-8 text-green-500 mr-3"
                                />
                                <div style="flex-grow: 1; width: 20%">
                                    <h3
                                        class="font-medium text-gray-900 dark:text-white truncate"
                                    >
                                        {{ doc.title }}
                                    </h3>
                                    <p
                                        class="text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        {{ doc.type.toUpperCase() }} •
                                        {{
                                            DocumentService.formatFileSize(
                                                doc.size,
                                            )
                                        }}
                                    </p>
                                </div>
                            </div>
                            <button
                                @click.stop="removeDocument(doc.id)"
                                class="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 class="w-4 h-4" />
                            </button>
                        </div>
                        <div
                            class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
                        >
                            <span>{{
                                DocumentService.formatDate(doc.uploadedAt)
                            }}</span>
                            <span v-if="doc.progress"
                                >{{ Math.round(doc.progress * 100) }}%
                                read</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Upload More Button -->
                <div class="text-center pt-8 hidden lg:block">
                    <button
                        @click="openFileUpload"
                        class="btn-secondary inline-flex items-center"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Add More Documents
                    </button>
                </div>
            </div>
        </main>

        <!-- Hidden File Input -->
        <input
            ref="fileInput"
            type="file"
            accept=".pdf,.epub"
            multiple
            @change="handleFileSelect"
            class="hidden"
        />

        <!-- Bottom Navigation (Dark Mode Only) -->
        <BottomNavbar />

        <!-- Floating Action Button -->
        <FloatingActionButton :onClick="openFileUpload" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDocumentsStore } from "@/stores/documents";
import type { BookDocument } from "@/services/document.service";
import { DocumentService } from "@/services/document.service";
import ThemeToggle from "@/components/ThemeToggle.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import FloatingActionButton from "@/components/FloatingActionButton.vue";
import {
    BookOpen,
    Upload,
    FileText,
    Book,
    Trash2,
    Plus,
} from "lucide-vue-next";

const router = useRouter();
const documentsStore = useDocumentsStore();

const fileInput = ref<HTMLInputElement>();
const isDragging = ref(false);
const sortBy = ref<"title" | "date">("date");
const documents = computed(() => documentsStore.documents);

const sortedDocuments = computed(() => {
    const sorted = [...documents.value];
    return sorted.sort((a, b) => {
        if (sortBy.value === "title") {
            return a.title.localeCompare(b.title);
        } else {
            return (
                new Date(b.uploadedAt).getTime() -
                new Date(a.uploadedAt).getTime()
            );
        }
    });
});

const openFileUpload = () => {
    fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
        processFiles(Array.from(files));
    }
};

const handleDragOver = () => {
    isDragging.value = true;
};

const handleDragLeave = () => {
    isDragging.value = false;
};

const handleDrop = (event: DragEvent) => {
    isDragging.value = false;
    const files = event.dataTransfer?.files;
    if (files) {
        processFiles(Array.from(files));
    }
};

const processFiles = async (files: File[]) => {
    for (const file of files) {
        if (file.type === "application/pdf" || file.name.endsWith(".epub")) {
            await documentsStore.addDocument(file);
        }
    }
};

const openDocument = (doc: BookDocument) => {
    router.push(`/reader/${doc.type}/${doc.id}`);
};

const removeDocument = (id: string) => {
    documentsStore.removeDocument(id);
};

onMounted(() => {
    DocumentService.initialize(documentsStore);
    documentsStore.loadDocuments();
});
</script>
