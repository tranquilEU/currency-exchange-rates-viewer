import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		open: true
	},
	resolve: {
		alias: {
			'@store': path.resolve(__dirname, 'src/shared/store'),
			'@': path.resolve(__dirname, 'src')
		}
	}
});
