import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno, presetIcons } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components(),
    AutoImport({
      imports: [
        'vue'
      ],
      dirs: [
        './src/composables'
      ],
      vueTemplate: true
    }),
    UnoCSS({
      shortcuts: {
        'bg-success': 'bg-[#0C6E61]',
        'bg-success-hover': 'bg-[#0C6E61]/80',
        'bg-cancel': 'bg-[#6E300C]',
        'bg-cancel-hover': 'bg-[#6E300C]/80'
      },
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            sans: 'Alegreya Sans'
          }
        })
      ]
    })
  ]
})
