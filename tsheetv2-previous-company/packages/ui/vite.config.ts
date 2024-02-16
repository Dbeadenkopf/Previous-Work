import path from 'path';

import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@util': path.resolve(__dirname, 'src/util'),
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@selectors': path.resolve(__dirname, 'src/redux/selectors'),
      '@hooks': path.resolve(__dirname, 'src/redux/hooks'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/sass" as *;',
      },
    },
    devSourcemap: true,
  },
  server: {
    port: 2000,
  },
  cacheDir: '../../node_modules/.vite',
  define: {
    'process.env.TIMESHEET_MODE': JSON.stringify(mode),
    'process.env.TIMESHEET_API_URL': JSON.stringify(process.env.TIMESHEET_API_URL),
    'process.env.TIMESHEET_OAUTH2_CLIENT_ID': JSON.stringify(process.env.TIMESHEET_OAUTH2_CLIENT_ID),
  },
}));
