import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { ConfigEnv, UserConfigExport, defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import postCssPxToRem from 'wa-postcss-pxtorem'
import tailwindCss from 'tailwindcss'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig(
  // @ts-ignore
  ({ command }: ConfigEnv): UserConfigExport => {
    return {
      base: '',
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
        }),
        AutoImport({
          // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
          imports: ['vue'],
          dts: path.resolve(__dirname, 'src/types/auto-import.d.ts'),
          eslintrc: {
            enabled: false, // 是否自动生成 eslint 规则，建议生成之后设置 false
            filepath: path.resolve(__dirname, './.eslintrc-auto-import.json'), // 指定自动导入函数 eslint 规则的文件
            globalsPropValue: true
          }
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
              rootValue: 32,
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
            additionalData: '@use "./src/styles/main.scss";'
          }
        }
      },
      envDir: 'env' // 注册进vite的参数
    }
  }
)
