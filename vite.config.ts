import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Vite config for TanStack Start, deployed on Vercel.
// `nitro` runs only on `vite build` and uses the `vercel` preset, which emits
// `.vercel/output` (Build Output API v3).
export default defineConfig(({ command, mode }) => {
  // Expose every VITE_* variable (from .env files and from the build
  // environment, e.g. Vercel) to client and server code.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const processEnv = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.startsWith("VITE_")),
  );
  const viteEnv = { ...env, ...processEnv };

  return {
    define: Object.fromEntries(
      Object.entries(viteEnv).map(([key, value]) => [
        `import.meta.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    server: { host: "::", port: 8080 },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
        server: { entry: "server" },
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
      }),
      ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
      viteReact(),
    ],
  };
});
