import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    base: import.meta.env.VITE_BASE_URL || '/fullsnack',
});
