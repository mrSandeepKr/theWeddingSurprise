import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["framer-motion"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-progress",
          ],
          carousel: ["embla-carousel-autoplay"],
          countdown: ["@leenguyen/react-flip-clock-countdown"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["framer-motion", "@leenguyen/react-flip-clock-countdown"],
  },
}));
