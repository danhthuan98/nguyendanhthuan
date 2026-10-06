import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "my-ui.js" : "my-ui.cjs"),
      cssFileName: "style",
    },
    rollupOptions: {
      // Không đóng gói React vào thư viện
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
