import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { prerenderCases } from "./scripts/prerenderCases";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderCases()],
  build: {
    rolldownOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        projects: fileURLToPath(
          new URL("./projects/index.html", import.meta.url),
        ),
      },
    },
  },
});
