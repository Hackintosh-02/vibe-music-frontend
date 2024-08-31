import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      "process.env.VITE_REACT_APP_BACKEND_ADDRESS": JSON.stringify(process.env.VITE_REACT_APP_BACKEND_ADDRESS),
    },
    plugins: [react(),svgr()],
  }
})