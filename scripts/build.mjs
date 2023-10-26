import { build } from 'esbuild'

build({
  entryPoints: ['src/index.ts'],
  outfile: './lib/index.js',
  sourcemap: 'linked',
  minify: true,
  bundle: true,
  tsconfig: './tsconfig.build.json',
  globalName: 'IpfsPlugin',
  define: {
    'process.env.NODE_DEBUG': 'false',
    global: 'globalThis',
  },
  loader: {
    '.ts': 'ts',
  },
}).catch(() => process.exit(1))
