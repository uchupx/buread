<template>
  <div class="ebook-reader-container">
    <div class="controls">
      <input type="file" @change="loadFile" accept=".epub,.mobi,.azw3,.fb2,.cbz,.pdf" />
      <button @click="prevPage" :disabled="!canGoPrev">Previous</button>
      <button @click="nextPage" :disabled="!canGoNext">Next</button>
      <button @click="goToStart">Go to Start</button>
    </div>

    <div class="reader-wrapper">
      <div class="reader-container">
        <div ref="readerRef" id="foliate-reader" style="width: 100%; height: 100%;"></div>
      </div>
    </div>

    <div class="book-info" v-if="bookMetadata">
      <h3>{{ bookMetadata.title }}</h3>
      <p>Author: {{ formatAuthor(bookMetadata.author) }}</p>
    </div>

    <div class="progress" v-if="lastLocation">
      <div>Progress: {{ Math.round(lastLocation.fraction * 100) }}%</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'EBookReader',
  setup() {
    const readerRef = ref(null);
    const view = ref(null);
    const bookMetadata = ref(null);
    const lastLocation = ref(null);
    const canGoPrev = ref(false);
    const canGoNext = ref(false);

    // Load the Foliate.js modules
    const loadFoliate = async () => {
      // Import the view module
      await import('foliate-js/view.js');

      // Create the view element
      const foliateView = document.createElement('foliate-view');

      // Set initial attributes
      foliateView.setAttribute('flow', 'paginated');
      foliateView.style.width = '100%';
      foliateView.style.height = '100%';

      // Add event listeners
      foliateView.addEventListener('relocate', handleRelocate);
      foliateView.addEventListener('load', handleBookLoad);
      foliateView.addEventListener('link', handleLinkClick);

      return foliateView;
    };

    // Initialize the reader when component mounts
    onMounted(async () => {
      if (readerRef.value) {
        try {
          view.value = await loadFoliate();
          readerRef.value.appendChild(view.value);
        } catch (error) {
          console.error('Error initializing reader:', error);
        }
      }
    });

    // Clean up when component unmounts
    onBeforeUnmount(() => {
      if (view.value) {
        try {
          view.value.close();
        } catch (error) {
          console.error('Error closing reader:', error);
        }
      }
    });

    // Handle file selection
    const loadFile = async (event) => {
      const file = event.target.files[0];
      if (file && view.value) {
        try {
          // Open the file directly without using a loader
          await view.value.open(file);
        } catch (error) {
          console.error('Error opening e-book:', error);
        }
      }
    };

    // Handle location changes
    const handleRelocate = (e) => {
      const { reason, range, index, fraction, size } = e.detail;
      lastLocation.value = {
        index,
        fraction,
        range,
        reason
      };

      // Update navigation buttons
      updateNavigationButtons();
    };

    // Handle book loading
    const handleBookLoad = async (e) => {
      const { doc, index } = e.detail;
      if (view.value) {
        bookMetadata.value = view.value.book?.metadata || {};
        updateNavigationButtons();
      }
    };

    // Handle link clicks
    const handleLinkClick = (e) => {
      const { href } = e.detail;
      view.value.goTo(href);
    };

    // Update navigation buttons
    const updateNavigationButtons = () => {
      if (!view.value || !view.value.book) return;

      canGoPrev.value = lastLocation.value && lastLocation.value.index > 0;
      // We don't know the total number of sections, so we'll just enable next
      canGoNext.value = true;
    };

    // Navigation functions
    const prevPage = () => {
      if (view.value) {
        view.value.prev();
      }
    };

    const nextPage = () => {
      if (view.value) {
        view.value.next();
      }
    };

    const goToStart = () => {
      if (view.value) {
        view.value.goToTextStart();
      }
    };

    // Helper function to format author name(s)
    const formatAuthor = (author) => {
      if (!author) return 'Unknown';
      if (Array.isArray(author)) return author.join(', ');
      return author;
    };

    return {
      readerRef,
      bookMetadata,
      lastLocation,
      canGoPrev,
      canGoNext,
      loadFile,
      prevPage,
      nextPage,
      goToStart,
      formatAuthor
    };
  }
};
</script>

<style>
/* Global styles that apply to the foliate-view element */
#foliate-reader {
  width: 100%;
  height: 100%;
  position: relative;
}

#foliate-reader foliate-view {
  width: 100%;
  height: 100%;
  display: block;
}

#foliate-reader foliate-view::part(view) {
  width: 100%;
  height: 100%;
}

#foliate-reader foliate-view::part(filter) {
  width: 100%;
  height: 100%;
}

/* Component scoped styles */
.ebook-reader-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.controls {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f5f5f5;
}

.reader-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.reader-container {
  width: 100%;
  max-width: 800px;
  height: 100%;
  border: 1px solid #ddd;
}

.book-info {
  padding: 10px;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
}

.progress {
  padding: 10px;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
}
</style>
