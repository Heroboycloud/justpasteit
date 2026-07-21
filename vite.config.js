import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // react-quill (and some of its dependencies) reference Node's `global`
    // object directly. Vite doesn't polyfill this like webpack/CRA did.
    global: "globalThis",
  },
  build: {
    outDir: "dist",
  },
});
