import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "src", // Set the root directory to 'src'
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist", // Outputs React build to /dist
    emptyOutDir: true,
  },
});
