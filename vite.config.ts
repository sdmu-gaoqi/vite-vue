import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { ConfigEnv, UserConfigExport, defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import postCssPxToRem from 'wa-postcss-pxtorem'
import tailwindCss from 'tailwindcss'
import { viteMockServe } from 'vite-plugin-mock'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      mkcert(),
      viteMockServe({
        mockPath: 'mock',
        injectFile:
          command === 'serve'
            ? path.resolve(process.cwd(), 'mock/test/*.ts')
            : path.resolve(process.cwd(), 'mock/prod/*.ts'),
        localEnabled: command === 'serve',
        prodEnabled: true
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        styles: path.resolve(__dirname, 'src/styles'),
        pages: path.resolve(__dirname, 'src/pages'),
        components: path.resolve(__dirname, 'src/components'),
        mocks: path.resolve(__dirname, 'mocks')
      }
    },
    server: {
      https: false,
      port: 5500
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 75,
            propList: ['*'],
            selectorBlackList: ['./to', 'html'], // to开头的不进行转换,
            exclude: '/node_modules',
            unit: 'wx'
          }),
          tailwindCss()
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/main.scss";'
        }
      }
    },
    envDir: 'env' // 注册进vite的参数
  }
})
