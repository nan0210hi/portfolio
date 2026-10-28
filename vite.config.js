import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  build: { rollupOptions: { input: {
    home: fileURLToPath(new URL('./index.html', import.meta.url)),
    schoolProjects: fileURLToPath(new URL('./school-projects.html', import.meta.url)),
  } } },
});
