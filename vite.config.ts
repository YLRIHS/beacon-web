import { fileURLToPath, URL } from "node:url";
import { createRequire } from 'node:module';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"; 
 

import tailwindcss from '@tailwindcss/vite'
 

const require = createRequire( import.meta.url );
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port:4000, 
  },
  build: {
    chunkSizeWarningLimit: 5000, // chunk 大小警告的限制
    rollupOptions:{
      output:{
        manualChunks(id){ 
          if(id.includes('src/api')){
            return 'api-chunk';
          }
        }, 
      },
     
    }
    
  }
});
