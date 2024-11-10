// esbuild build script
// Run: tsx build.ts

import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["server/index.ts"],
    bundle: true,
    platform: "node",
    external: ["fsevents", "lightningcss"],
    format: "esm",
    outdir: "build",
    outExtension: { ".js": ".mjs" },
    sourcemap: false,
    target: "node20",
    packages: "external"
});
