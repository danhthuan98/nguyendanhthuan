import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MyUI",
      formats: ["es", "cjs"],
      fileName: (format) => `my-ui.${format === "es" ? "js" : "cjs"}`,
      cssFileName: "style",
    },

    rollupOptions: {
      // Peer dependencies that shouldn't be bundled into the library
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    sourcemap: true,
    copyPublicDir: false,
  },
});
