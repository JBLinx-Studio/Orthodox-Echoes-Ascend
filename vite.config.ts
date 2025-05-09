
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Orthodox-Echoes-Ascend/' : './', // Updated repo name for GitHub Pages
  server: {
    host: "::",
    port: 8080,
    strictPort: true, // Fail if port is already in use
    open: true, // Open browser on server start
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    assetsInlineLimit: 4096, // 4kb
    cssCodeSplit: true,
    // Add enhanced cache busting for assets
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name].[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name].[hash]-${Date.now()}.[ext]`,
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
          motion: ['framer-motion'],
          charts: ['recharts'],
        }
      }
    },
    terserOptions: {
      // Terser specific options
      compress: {
        drop_console: mode === 'production', // Only drop console in production
        drop_debugger: true,
      }
    },
  },
}));
