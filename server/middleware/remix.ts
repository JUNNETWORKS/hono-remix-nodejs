
/**
 * Hono が Remix を扱うための Hono 設定
 */
import { createRequestHandler, ServerBuild } from "@remix-run/node";
import { createMiddleware } from "hono/factory";

/**
 * we pass user as context in remix, so
 * to get user data in loaders or in actions.
 * just call context.user
 */
declare module "@remix-run/node" {
  interface AppLoadContext {
    readonly extra: string
  }
}

/**
 * Load the dev server build and force reload it
 * @returns An up to date server build
 */
export async function importDevBuild() {
  /**
   * This server is only used to load the dev server build
   */
  const viteDevServer =
    process.env.NODE_ENV === "production"
      ? undefined
      : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      )

  return viteDevServer?.ssrLoadModule(
    "virtual:remix/server-build" + "?t=" + Date.now()
  )
}

export function remixMiddleware() {
  return createMiddleware(async (c, next) => {
    const build = (process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line import/no-unresolved
       await import("../../build/server")
      : (await importDevBuild()) 
    ) as unknown as ServerBuild

    const rmx = createMiddleware(async (c) => {
      const requestHandler = createRequestHandler(build, process.env.NODE_ENV);
      const loadContext = () => ({ extra: "extra" });
      return await requestHandler(
        c.req.raw,
        loadContext instanceof Promise ? await loadContext : loadContext,
      );
    })

    return rmx(c, next);
  })
}
