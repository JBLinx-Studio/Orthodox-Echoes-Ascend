
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Orthodox-Echoes-Ascend/' : './',
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    open: true,
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
    sourcemap: false, // Disable for production
    minify: 'terser',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    // Enhanced cache busting for assets
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/img/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        },
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
          motion: ['framer-motion'],
          charts: ['recharts'],
          supabase: ['@supabase/supabase-js'],
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      }
    },
  },
  define: {
    // Add build timestamp for cache busting
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
}));
