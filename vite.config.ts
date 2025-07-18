// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/httpies_web/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        fallback: "index.html", // we'll copy this later
      },
    },
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
