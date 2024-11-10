import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
import { remixMiddleware } from "./middleware/remix";

const app = new Hono();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

app.use(logger())

app.use("/assets/*", serveStatic({ root: "./build/client" }))

/**
 * Serve public files
 */
app.use("*", serveStatic({ root: "./build/client" })) // 1 hour


const routes = app
  .get("/api/hello", async (c) => {
    return c.json({ hello: `hello world at ${new Date(Date.now()).toTimeString()}` });
  })
  .post("/api/hello", zValidator("json", z.object({ name: z.string() })), async (c) => {
    const { name } = c.req.valid("json");
    return c.json({ hello: name });
  })

/**
 * remix handler
 */
app.use("*", remixMiddleware())

/**
 * [PRODUCTION ONLY] Serve assets files from build/client/assets
 */
if (process.env.NODE_ENV === "production") {
  const port = 5173;
  serve(
    {
      fetch: app.fetch,
      port
    },
    (info) => {
      console.log(`Server running on http://localhost:${info.port}`);
    }
  )
}

export default app;
// クライアント側で型情報を参照するために export
export type AppType = typeof routes;