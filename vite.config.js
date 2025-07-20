import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tripulaciones-730053494094.europe-west1.run.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
// https://vite.dev/config/
//export default defineConfig({
  //plugins: [react()],
//})
