# WebReader - Cross-Platform PDF & EPUB Reader

A modern, responsive web application for seamless reading of PDF and EPUB documents across multiple devices. Built with Vue 3, Vite, and TypeScript.

## Features

### 📖 Reading Experience
- **Multi-format Support**: Read both PDF and EPUB documents
- **Responsive Design**: Adaptive layout for desktop and mobile devices
- **Customizable Reading**: Adjustable font size, line height, and font family
- **Theme Support**: Light, dark, sepia, and high contrast themes
- **Fullscreen Mode**: Distraction-free reading experience

### 📚 Document Management
- **Drag & Drop Upload**: Easy file upload interface
- **Library Organization**: Sort and manage your document collection
- **Reading Progress**: Automatic save and resume reading position
- **File Information**: Display document metadata and file size

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface using Tailwind CSS
- **Navigation Controls**: Easy page navigation with keyboard support
- **Table of Contents**: Quick navigation within documents
- **Progress Tracking**: Visual reading progress indicators

## Technology Stack

- **Frontend**: Vue 3 with Composition API
- **Build Tool**: Vite 6.x for optimized development and production builds
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 3.x for utility-first CSS
- **State Management**: Pinia for centralized state management
- **Routing**: Vue Router 4 for navigation
- **PDF Processing**: PDF.js (Mozilla's PDF rendering library)
- **EPUB Processing**: EPUB.js library for electronic publication reading
- **File Detection**: File-type library for automatic format identification
- **Icons**: Lucide Vue for modern icon set

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd buread
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
webreader/
├── src/
│   ├── components/
│   │   ├── ThemeToggle.vue
│   ├── stores/
│   │   ├── documents.ts
│   ├── styles/
│   │   └── main.css
│   ├── views/
│   │   ├── Library.vue
│   │   └── Reader.vue
│   ├── router/
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## Usage

1. **Upload Documents**: Click "Upload Document" or drag and drop PDF/EPUB files
2. **Browse Library**: View your document collection with sorting options
3. **Open Document**: Click on any document to start reading
4. **Customize Reading**: Use the settings panel to adjust:
   - Font size (12px - 24px)
   - Line height (tight, normal, loose)
   - Font family (Inter, Georgia, JetBrains Mono)
   - Theme (light, dark, sepia, high contrast)
5. **Navigate**: Use navigation buttons or keyboard shortcuts to move between pages
6. **Track Progress**: Reading progress is automatically saved

## Keyboard Shortcuts

- `←` / `→`: Previous/Next page
- `Home`: First page
- `End`: Last page
- `F11`: Toggle fullscreen
- `Esc`: Exit fullscreen

## Browser Support

- Modern browsers supporting ES2020+ features
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Vue.js](https://vuejs.org/) - The progressive JavaScript framework
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering library
- [EPUB.js](https://github.com/futurepress/epub.js/) - EPUB rendering library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
