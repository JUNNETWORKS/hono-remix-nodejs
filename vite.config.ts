import { defaultOptions } from "@hono/vite-dev-server";
import { nodeAdapter } from "@hono/vite-dev-server/node";
import { vitePlugin as remix } from "@remix-run/dev";
import serverAdapter from 'hono-remix-adapter/vite';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  build: {
    target: "esnext"
  },
  plugins: [
    remix({
      appDirectory: "./app",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    serverAdapter({
      adapter: nodeAdapter,
      entry: "server/index.ts",
      exclude: [...defaultOptions.exclude, "/assets/**", "/app/**"]
    }),
    tsconfigPaths(),
  ],
});
