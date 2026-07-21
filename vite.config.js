import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    // Several dependencies (react-quill and its transitive deps, older
    // packages like use-dark-mode/react-toggle) reference Node globals
    // (process, global, Buffer) that CRA/webpack polyfilled automatically.
    // Vite doesn't, so we polyfill them explicitly instead of patching
    // each one individually as they surface.
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  build: {
    outDir: "dist",
  },
});
