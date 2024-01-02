import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ragnaTimers",
        short_name: "ragnaTimers",
        theme_color: "#121212",
        icons: [
          {
            src: "/timers-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/timers-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/timers-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
