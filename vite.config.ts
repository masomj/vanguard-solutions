import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import type { ViteSSGOptions } from 'vite-ssg'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    strictPort: false,
  },
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes(paths: string[]) {
      // Both locale trees are static routes, so they arrive here already
      // enumerated (/, /about, ... and /cy, /cy/about, ...). Only the
      // catch-alls need excluding -- they have no concrete path to render.
      return paths.filter(path => !path.includes(':pathMatch'))
    },
  } satisfies ViteSSGOptions,
})
