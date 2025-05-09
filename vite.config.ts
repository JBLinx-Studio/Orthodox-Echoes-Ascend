
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
    // Add cache busting for assets
    rollupOptions: {
      output: {
        entryFileNames: mode === 'production' 
          ? 'assets/[name].[hash].[timestamp].js' 
          : 'assets/[name].[hash].js',
        chunkFileNames: mode === 'production'
          ? 'assets/[name].[hash].[timestamp].js'
          : 'assets/[name].[hash].js',
        assetFileNames: mode === 'production'
          ? 'assets/[name].[hash].[timestamp].[ext]'
          : 'assets/[name].[hash].[ext]',
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
  define: {
    // Add cache busting timestamp that will be available in the app
    __CACHE_BUSTER__: JSON.stringify(new Date().getTime()),
    __BUILD_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
}));
