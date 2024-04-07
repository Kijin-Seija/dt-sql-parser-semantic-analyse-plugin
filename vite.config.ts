import { resolve } from 'path'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DtSqlParserSemanticAnalysePlugin',
      fileName: 'dt-sql-parser-semantic-analyse-plugin',
    }
  },
  plugins: [
    nodePolyfills({
      include: ['util'],
    }),
  ]
})
