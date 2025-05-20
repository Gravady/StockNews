import { defineConfig } from 'vite';
import "./CSS/style.css"

export default defineConfig({
  publicDir: 'Images', 

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html', 
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
});
