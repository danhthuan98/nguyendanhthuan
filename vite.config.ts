import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: "src/index.ts",
      name: "MyUI",
      fileName: "my-ui",
      formats: ["es"],
    },

    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
