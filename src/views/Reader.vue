<template>
    <div class="max-h-screen bg-gray-50 dark:bg-gray-900 flex h-dvh flex-col">
        <!-- Reader Header -->
        <header
            class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10 h-16"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-full">
                    <div class="flex items-center space-x-2">
                        <button
                            @click="goBack"
                            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <ArrowLeft class="w-5 h-5" />
                        </button>
                        <div>
                            <h1
                                class="text-lg font-semibold text-gray-900 dark:text-white truncate"
                            >
                                {{ currentDocument?.title || "Loading..." }}
                            </h1>
                        </div>
                    </div>

                    <div class="flex items-center space-x-2">
                        <!-- TOC Toggle Button -->
                        <button
                            v-if="tableOfContents.length > 0"
                            @click="toggleTOC"
                            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Table of Contents"
                            :class="{
                                'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400':
                                    showTOC,
                            }"
                        >
                            <Menu class="w-5 h-5" />
                        </button>

                        <button
                            @click="toggleFullscreen"
                            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Toggle fullscreen"
                        >
                            <Maximize2 v-if="!isFullscreen" class="w-5 h-5" />
                            <Minimize2 v-else class="w-5 h-5" />
                        </button>

                        <div class="relative">
                            <button
                                @click="showSettings = !showSettings"
                                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="Reading settings"
                            >
                                <Settings class="w-5 h-5" />
                            </button>

                            <!-- Settings Panel -->
                            <div
                                v-if="showSettings"
                                class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 p-4"
                            >
                                <h3
                                    class="font-medium text-gray-900 dark:text-white mb-4"
                                >
                                    Reading Settings
                                </h3>

                                <!-- Font Size -->
                                <div class="mb-4">
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Font Size
                                    </label>
                                    <div class="flex items-center space-x-2">
                                        <button
                                            @click="decreaseFontSize"
                                            class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Minus class="w-4 h-4" />
                                        </button>
                                        <span
                                            class="text-sm text-gray-600 dark:text-gray-400 w-12 text-center"
                                        >
                                            {{ fontSize }}px
                                        </span>
                                        <button
                                            @click="increaseFontSize"
                                            class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Plus class="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Line Height -->
                                <div class="mb-4">
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Line Height
                                    </label>
                                    <select
                                        value="{{ lineHeight }}"
                                        disabled
                                        class="w-full input-field text-sm"
                                    >
                                        <option value="1.4">Tight</option>
                                        <option value="1.6">Normal</option>
                                        <option value="1.8">Loose</option>
                                    </select>
                                </div>

                                <!-- Font Family -->
                                <div class="mb-4">
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Font Family
                                    </label>
                                    <select
                                        value="{{ fontFamily }}"
                                        disabled
                                        class="w-full input-field text-sm"
                                    >
                                        <option value="Inter">
                                            Inter (Sans-serif)
                                        </option>
                                        <option value="Georgia">
                                            Georgia (Serif)
                                        </option>
                                        <option value="JetBrains Mono">
                                            JetBrains Mono (Monospace)
                                        </option>
                                    </select>
                                </div>

                                <!-- Theme -->
                                <div class="mb-4">
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Theme
                                    </label>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Progress Bar -->
        <div class="h-1 bg-gray-200 dark:bg-gray-700">
            <div
                class="h-full bg-primary-600 transition-all duration-300"
                :style="{ width: `${progress * 100}%` }"
            ></div>
        </div>
        <!-- Reader Content -->
        <main class="flex-1 overflow-hidden relative h-[calc(100vh-5rem)]">
            <!-- Table of Contents Sidebar - Absolute Positioned -->
            <aside
                v-if="showTOC && tableOfContents.length > 0"
                class="absolute top-0 left-0 h-full w-80 max-w-xs bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 overflow-y-auto transition-all duration-300 ease-in-out"
            >
                <div class="p-4">
                    <h3
                        class="font-medium text-gray-900 dark:text-white mb-4 flex items-center justify-between"
                    >
                        Table of Contents
                        <button
                            @click="toggleTOC"
                            class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X class="w-4 h-4" />
                        </button>
                    </h3>
                    <nav>
                        <button
                            v-for="(item, index) in tableOfContents"
                            :key="index"
                            @click="navigateToChapter(item)"
                            class="block w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mb-1"
                            :style="{
                                paddingLeft: `${(item.level || 0) * 12 + 8}px`,
                            }"
                        >
                            {{ item.label }}
                        </button>
                    </nav>
                </div>
            </aside>

            <!-- Reading Area - Responsive novel book sizing -->
            <div
                class="reader-wrapper h-full transition-all duration-300"
                :style="{ backgroundColor: backgroundColor }"
            >
                <div ref="readingArea" class="reader-container">
                    <!-- EPUB Content -->
                    <div class="epub-container" ref="foliateView"></div>
                </div>
            </div>

            <!-- Navigation Controls -->
            <div
                class="fixed right-4 sm:right-8 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 z-50"
                :class="{
                    'bottom-24 sm:bottom-24': isDarkMode,
                    'bottom-4 sm:bottom-8': !isDarkMode,
                }"
            >
                <button
                    @click="previousPage"
                    :disabled="true"
                    class="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft class="w-5 h-5" />
                </button>
                <button
                    @click="nextPage"
                    :disabled="true"
                    class="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight class="w-5 h-5" />
                </button>
            </div>
        </main>

        <!-- Bottom Navigation (Dark Mode Only) -->
        <BottomNavbar />
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    watch,
    nextTick,
    reactive,
} from "vue";
import { LogService } from "@/services/log.service";
import { useRouter, useRoute } from "vue-router";
import { useDocumentsStore } from "@/stores/documents";
import { useSettingsStore } from "@/stores/settings";
import type { BookDocument, ReadProgress } from "@/services/document.service";
import { DocumentService } from "@/services/document.service";
import { ThemeService } from "@/services/theme.service";
import ThemeToggle from "@/components/ThemeToggle.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import {
    ArrowLeft,
    Settings,
    Maximize2,
    Minimize2,
    Minus,
    Plus,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
} from "lucide-vue-next";
import { onBeforeMount } from "vue";

interface TableOfContentsItem {
    level: number;
    label: string;
    href?: string;
}

const router = useRouter();
const route = useRoute();
const documentsStore = useDocumentsStore();
const settingsStore = useSettingsStore();

// Computed settings from ThemeService
const fontSize = computed(() => settingsStore.setting.fontSize);
const lineHeight = computed(() => settingsStore.setting.lineHeight.toString());
const fontFamily = computed(() => settingsStore.setting.fontFamily);
const textColor = ref("#000");
const backgroundColor = ref("#fff");

// Refs
const loading = ref(true);
const error = ref("");
const showSettings = ref(false);
const isFullscreen = ref(false);
const isDarkMode = computed(() =>
    document.documentElement.classList.contains("dark"),
);

const currentPage = ref(0);
const totalPages = ref(1);
const progress = ref(0);

const bookMetadata = ref(null);
const lastLocation = ref(null);
const canGoPrev = ref(false);
const canGoNext = ref(false);

// TOC sidebar state
const showTOC = ref(false);

// Temporary file tracking
const tempFileUrl = ref<string | null>(null);

// Element refs
const readingArea = ref<HTMLElement>();
const pdfCanvas = ref<HTMLCanvasElement>();
const foliateView = ref<any>(null);
const view = ref<any>(null);
const foliateBook = ref<any>(null);

onBeforeMount(async () => {
    DocumentService.initialize(documentsStore);
    ThemeService.initialize(settingsStore);
    await ThemeService.loadSetting();
});

// Computed
const currentDocument = computed(() => {
    const id = route.params.id as string;
    const document = documentsStore.getDocumentById(id);

    // Set the current document in the store
    if (document && documentsStore.currentDocument?.id !== document.id) {
        documentsStore.setCurrentDocument(document);
    }

    return document;
});

const tableOfContents = computed(() => {
    if (!foliateBook.value || !foliateBook.value.toc) return [];

    // Get table of contents from foliate-js
    const toc: TableOfContentsItem[] = [];
    const processTOC = (items: any[], level: number = 0) => {
        for (const item of items) {
            toc.push({
                level,
                label: item.label,
                href: item.href,
            });
            if (item.subitems && item.subitems.length > 0) {
                processTOC(item.subitems, level + 1);
            }
        }
    };
    processTOC(foliateBook.value.toc);
    return toc;
});

const canGoBack = computed(() => currentPage.value > 0);
const canGoForward = computed(() => currentPage.value < 1);

const readingStyles = reactive({
    backgroundColor: backgroundColor.value,
});

const goBack = () => {
    router.push("/");
};

const toggleFullscreen = () => {
    if (!(document.documentElement as any).fullscreenElement) {
        document.documentElement.requestFullscreen();
        isFullscreen.value = true;
    } else {
        // document.documentElement.exitFullscreen();
        isFullscreen.value = false;
    }
};

const toggleTOC = () => {
    showTOC.value = !showTOC.value;
};

const increaseFontSize = () => {
    if (fontSize.value < 24) {
        fontSize.value += 2;
        updateFoliateStyles();
    }
};

const decreaseFontSize = () => {
    if (fontSize.value > 12) {
        fontSize.value -= 2;
        updateFoliateStyles();
    }
};

const updateFoliateStyles = () => {
    if (foliateView.value) {
        const container = foliateView.value;
        container.style.color = textColor.value;
        container.style.backgroundColor = backgroundColor.value;
    }

    if (view.value?.renderer) {
        const css = `
      body {
        color: ${textColor.value} !important;
        background-color: ${backgroundColor.value} !important;
        font-size: ${fontSize.value}px !important;
        line-height: ${lineHeight.value} !important;
        font-family: ${fontFamily.value} !important;
      }
      `;
        console.log(css);
        view.value.renderer.setStyles(css);
    }
};

const nextPage = async () => {
    if (canGoForward.value && view.value) {
        await view.value.next();
    }
};

const previousPage = async () => {
    if (canGoBack.value && view.value) {
        await view.value.prev();
    }
};

const navigateToChapter = async (item: TableOfContentsItem) => {
    if (!view.value || !item.href) return;

    try {
        // Navigate to chapter using foliate's goTo method
        await view.value.goTo(item.href);
        // Close TOC after navigation on mobile
        if (window.innerWidth < 768) {
            showTOC.value = false;
        }
    } catch (err: any) {
        console.error("Error navigating to chapter:", err);
    }
};

const loadPage = async () => {
    if (!currentDocument.value) return;

    try {
        loading.value = false;
        if (currentDocument.value.type === "pdf") {
            await loadPDFPage();
        } else if (currentDocument.value.type === "epub") {
            await loadEPUBPage();
        }
        // updateProgress();
    } catch (err: any) {
        error.value = `Failed to load page: ${err.message || err}`;
    } finally {
        loading.value = false;
    }
};

const loadPDFPage = async () => {
    // PDF.js implementation would go here
    LogService.log("Loading PDF page...");
};

const handleBookLoad = async (e: any) => {
    LogService.log("Foliate book loaded", e.detail);
    const { doc, index } = e.detail || {};

    if (view.value) {
        bookMetadata.value = view.value.book?.metadata || {};
        // updateNavigationButtons();
    }
};

const updateNavigationButtons = () => {
    if (!view.value || !view.value.book) return;

    // canGoPrev.value = lastLocation.value && lastLocation.value.index! > 0;
    canGoNext.value = true;
};

const handleRelocate = (e: any) => {
    LogService.log("Relocate event:", e.detail);
    LogService.log(e);
    const { reason, range, index, fraction, cfi } = e.detail || {};

    updateProgress(cfi);
    currentPage.value = fraction;

    // Update navigation buttons
    updateNavigationButtons();
};

const loadEPUBPage = async () => {
    try {
        const doc = documentsStore.getDocument(currentDocument.value?.id!);

        if (!doc?.content) {
            throw new Error("Document content not found");
        }

        console.log(
            "Loading EPUB from ArrayBuffer, size:",
            doc.content?.byteLength,
        );

        // Wait for next tick to ensure foliate-view is ready
        await nextTick();

        if (!view.value) {
            throw new Error("Foliate view element not initialized");
        }

        // Create blob and temporary URL
        const blob = new Blob([doc.content], { type: "application/epub+zip" });
        tempFileUrl.value = URL.createObjectURL(blob);

        LogService.log("Opening EPUB from URL:", tempFileUrl.value);

        // Open EPUB file using Foliate JS
        await view.value.open(tempFileUrl.value);

        LogService.log("Foliate view book:", view.value.book);

        // Navigate to first section on initial load
        if (!lastLocation.value && view.value.book?.sections?.length > 0) {
            // await view.value.goTo(view.value.book.sections[0].href);
        }

        // Update the foliateBook ref
        foliateBook.value = view.value.book;

        LogService.log("Foliate book initialized:", foliateBook.value);
        LogService.log("Sections:", foliateBook.value?.sections?.length);
        LogService.log("TOC:", foliateBook.value?.toc);
        LogService.log("Metadata:", foliateBook.value?.metadata);

        // Update total pages
        if (foliateBook.value?.sections) {
            totalPages.value = foliateBook.value.sections.length;
        } else {
            totalPages.value = 1;
        }

        let title = currentDocument.value?.title || "Unknown";
        if (foliateBook.value?.metadata?.title) {
            title =
                typeof foliateBook.value.metadata.title === "string"
                    ? foliateBook.value.metadata.title
                    : foliateBook.value.metadata.title.en ||
                      foliateBook.value.metadata.title.ja ||
                      "Unknown";
        }

        LogService.log("EPUB loaded successfully:", title);
    } catch (err: any) {
        LogService.error("Error loading EPUB:", err);
        error.value = `Failed to load EPUB: ${err.message || err}`;
    }
};

const updateProgress = (cfi: string) => {
    progress.value = currentPage.value;
    if (currentDocument.value) {
        const readingProgress = {
            percentage: progress.value * 100,
            checkpoint: cfi,
        } as ReadProgress;

        documentsStore.updateProgress(
            currentDocument.value.id,
            readingProgress,
        );
    }
};

// Fullscreen change handler
const handleFullscreenChange = () => {
    isFullscreen.value = !!(document.documentElement as any).fullscreenElement;
};
const handleLayoutChange = (e: any) => {
    LogService.log("Layout changed:", e.detail);
    // Check if dynamic page count is in the event detail
    if (e.detail?.totalPages) {
        totalPages.value = e.detail.totalPages;
    }
};

// Lifecycle
onMounted(async () => {
    //DocumentService.initialize(documentsStore);
    if (documentsStore.documents.length === 0) {
        await documentsStore.loadDocuments();
        await ThemeService.loadSetting();
    }

    LogService.log(currentDocument.value);

    if (!currentDocument.value) {
        error.value = "Document not found";
        loading.value = false;
        return;
    }

    LogService.log("Reader mounted, loading Foliate JS...");

    // Wait for next tick to ensure DOM is ready
    await nextTick();

    // Load Foliate JS dynamically as module
    const loadFoliateJS = new Promise<void>((resolve, reject) => {
        if (window.customElements?.get("foliate-view")) {
            LogService.log("Foliate JS custom element already registered");
            resolve();
            return;
        }

        LogService.log("Loading Foliate JS module from /foliate-js/view.js");

        // Poll for custom element registration (better for ES modules)
        const checkInterval = setInterval(function () {
            if (window.customElements?.get("foliate-view")) {
                LogService.log("Foliate JS custom element registered!");
                clearInterval(checkInterval);
                resolve();
            }
        }, 50);

        // Timeout after 10 seconds
        const timeoutId = setTimeout(() => {
            clearInterval(checkInterval);
            LogService.error("Foliate JS loading timeout");
            reject(new Error("Failed to load Foliate JS: timeout"));
        }, 10000);

        // Create script element and set error handler
        const script = document.createElement("script");
        script.type = "module";
        script.src = "/foliate-js/view.js";
        script.onerror = () => {
            clearInterval(checkInterval);
            clearTimeout(timeoutId);
            LogService.error("Failed to load Foliate JS script");
            reject(new Error("Failed to load Foliate JS"));
        };
        document.body.appendChild(script);
    });

    await loadFoliateJS;

    LogService.log("Foliate JS loaded, creating foliate-view element");

    // Create foliate-view element
    view.value = document.createElement("foliate-view");
    view.value.setAttribute("flow", "paginated");
    view.value.style.width = "100%";
    view.value.style.height = "100%";

    LogService.log(view.value.layout);
    // Add event listeners to the foliate-view element
    view.value.addEventListener("load", ({ detail: { doc } }) => {
        handleBookLoad;
        const style = doc.createElement("style");
        style.textContent = `
      body {
        color: ${textColor.value} !important;
        background-color: ${backgroundColor.value} !important;
      }
    `;
        doc.head.append(style);
    });
    view.value.addEventListener("relocate", handleRelocate);
    view.value.addEventListener("layout", handleLayoutChange);
    view.value.addEventListener("ready", handleLayoutChange);

    // Wait again to ensure the container ref is available
    await nextTick();

    // Append foliate-view to the container
    if (foliateView.value) {
        foliateView.value.appendChild(view.value);
        LogService.log("foliate-view appended to container");
    } else {
        LogService.error("foliateView container not available");
        throw new Error("foliateView container not available");
    }

    documentsStore.setCurrentDocument(currentDocument.value);

    // Load reading settings from localStorage
    // const savedSettings = localStorage.getItem("webreader-settings");
    const setting = settingsStore.setting;
    if (setting) {
        // fontSize.value = setting.fontSize || 16;
        // lineHeight.value = setting.lineHeight || "1.6";
        // fontFamily.value = setting.fontFamily || "Inter";
        textColor.value = setting.textColor;
        backgroundColor.value = setting.backgroundColor;
    }

    console.log(setting);
    updateFoliateStyles();

    await loadPage();

    if (
        currentDocument.value.progress &&
        currentDocument.value.progress.checkpoint
    ) {
        await view.value.goTo(currentDocument.value.progress.checkpoint);
    } else {
        await view.value.renderer.goTo({ index: 0 });
    }

    // Add fullscreen event listener
    document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
    // Save reading settings
    const settings = {
        fontSize: fontSize.value,
        lineHeight: lineHeight.value,
        fontFamily: fontFamily.value,
    };
    localStorage.setItem("webreader-settings", JSON.stringify(settings));

    // Clean up foliate view
    if (view && view.value) {
        // view.value.close?.();
        if (foliateView.value) {
            foliateView.value.removeChild(view.value);
        }
    }

    // Clean up temporary file URL
    if (tempFileUrl.value) {
        URL.revokeObjectURL(tempFileUrl.value);
        LogService.log("Revoked temporary file URL:", tempFileUrl.value);
        tempFileUrl.value = null;
    }

    // Remove fullscreen event listener
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
});

// Watch ThemeService settings for style updates
watch(() => settingsStore.setting, updateFoliateStyles, { deep: true });
</script>

<style scoped>
.reader-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.reader-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    /*align-items: flex-start;*/
}

/* Novel book sizing - Portrait mode (default) */
@media (orientation: portrait) {
    .reader-container {
        padding: 1rem 0.5rem;
    }

    .epub-container {
        max-width: 100%;
        width: 100%;
    }
}

/* Novel book sizing - Landscape mode (two columns) */
@media (orientation: landscape) {
    .reader-container {
        padding: 1.5rem 1rem;
    }

    .epub-container {
        max-width: 90%;
        width: 100%;
    }
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
    .reader-container {
        padding: 0.75rem 0.25rem;
    }
}

@media (max-width: 768px) {
    .reader-wrapper {
        transition: margin-left 0.3s ease-in-out;
    }

    aside {
        width: 100%;
        max-width: none;
        border-r: none;
        border-b: 1px solid theme("colors.gray.200");
    }

    .dark aside {
        border-b: 1px solid theme("colors.gray.700");
    }
}

/* Tablet responsive */
@media (min-width: 769px) and (max-width: 1024px) {
    .reader-container {
        padding: 1.25rem 0.75rem;
    }
}

/* Desktop responsive */
@media (min-width: 1025px) {
    .reader-container {
        padding: 1.5rem 1rem;
        max-width: 700px;
    }
}

.pdf-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.epub-container {
    flex: 1;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

.epub-container :deep(foliate-view) {
    flex: 1;
    min-height: 100%;
    width: 100%;
    height: 100%;
}

.epub-container :deep(img) {
    max-width: 100%;
    height: auto;
}

.epub-container :deep(p) {
    margin-bottom: 1rem;
    text-align: justify;
}

.calibre2 {
    color: white !important;
}
</style>
