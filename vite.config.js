import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',

      /**
       * 自定义插入位置
       * @default: body-last
       */
      inject: 'body-last' | 'body-first',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
  },
  server: {
    proxy: {
      '/gateway': {
        target: 'http://2izsat.natappfree.cc',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
      },
    },
  },
})
