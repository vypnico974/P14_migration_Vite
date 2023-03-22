import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { dependencies } from './package.json';
// function renderChunks(deps) {
//   let chunks = {};
//   Object.keys(deps).forEach((key) => {
//     if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
//     chunks[key] = [key];
//   });
//   return chunks;
// }

const reactDeps = Object.keys(dependencies).filter(key => key === 'react' || key.startsWith('react-'))

const manualChunks = {
  vendor: reactDeps,
    ...Object.keys(dependencies).reduce((chunks, name) => {
      if (!reactDeps.includes(name)) {
        chunks[name] = [name]
      }
      return chunks
  },{}),
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom','react-datepicker',
          'react-redux','react-select'],
          // ...renderChunks(dependencies),
        },
      },
    },
  }
})
