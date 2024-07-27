import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://127.0.0.1",
        changeOrigin: true,
      },
    },
  },
  base: "/ampu",
});
