import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'Images', 

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html', 
    },
  },
});
