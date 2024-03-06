import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Sitemap from "vite-plugin-sitemap";

const categories = ["rock/pop/etc", "hip hop/r&b", "jazz", "ost", "k-pop", "j-pop/city pop/asia", "merchandise"];
const dynamicRoutes = ["/", ...categories.map((category) => `/category/${category}`)];
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), Sitemap({ dynamicRoutes })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
  build: {
    // 코드 분할 설정
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
});
