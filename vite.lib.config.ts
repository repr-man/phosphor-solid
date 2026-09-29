import solid from '@solidjs/vite-plugin';
import solidSvg from 'vite-plugin-solid-svg';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solid(), solidSvg()],
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index.js',
    },
    rollupOptions: {
      external: (id) => id === 'solid-js' || id.startsWith('solid-js/') || id === '@solidjs/web' || id.startsWith('@solidjs/web/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
