import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Orthodox-Echoes-Ascend/' : './', // Adjusted base path for GitHub Pages deployment

  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 8080,
    strictPort: true, // Fail if port is already in use
    open: true, // Open browser on server start
  },

  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Conditionally apply componentTagger plugin in development
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias @ to src directory
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    assetsInlineLimit: 4096, // 4kb
    cssCodeSplit: true,

    // Enhanced cache busting for assets
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
          motion: ['framer-motion'],
          charts: ['recharts'],
        },
      },
    },

    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Drop console.log statements in production
        drop_debugger: true,
      },
    },
  },
}));
