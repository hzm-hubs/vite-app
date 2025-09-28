// vite 配置
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import config from "./src/config";
import {
    createStyleImportPlugin,
    ElementPlusResolve,
} from "vite-plugin-style-import";
import { createHtmlPlugin } from "vite-plugin-html";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 生成绝对路径
function pathResolve(dir: string) {
    /* eslint-disable */
    return resolve(__dirname, "./", dir);
}

function getViteEnv(mode: any, target: string) {
    return loadEnv(mode, process.cwd())[target];
}

// 转换 index.html 的专用钩子 transformIndexHtml, 在plugins中调用
const htmlPlugin = () => {
    return {
        name: "html-transform",
        transformIndexHtml(html: string) {
            return html.replace(
                /<title>(.*?)<\/title>/,
                `<title>Title replaced!</title>`,
            );
        },
    };
};

export default ({ mode, command }: any) =>
    defineConfig({
        //项目根目录
        //  root: process.cwd(),
        // 基础路由
        // base
        server: {
            host: "0.0.0.0",

            // 要求 number 类型
            port: config.port,

            // 代理
            proxy: {},

            // 默认不限制
            // cors:

            // hmr: {
            //     overlay: false,
            // },
        },
        // preview:{
        // port: 6002,
        // }
        resolve: {
            // 设置中间键名
            // 相对于 src 的路径访问如 ../assets/ 可以用 @/assets/
            alias: {
                "@/": pathResolve("src") + "/",
            },
        },
        // 静态资源文件
        publicDir: "public",
        plugins: [
            vue(),
            // 按需导入样式 - 使用 vite-plugin-style-import
            createStyleImportPlugin({
                resolves: [ElementPlusResolve()],
            }),
            createHtmlPlugin({
                minify: true,
                // entry: 'src/main.ts',
                // template: 'public/index.html',
                inject: {
                    data: {
                        title: getViteEnv(mode, "VITE_APP_TITLE"),
                    },
                    // 需要注入的标签列表
                    tags: [
                        {
                            // 'head-prepend'
                            // 'head' | 'body' | 'head-prepend' | 'body-prepend'
                            injectTo: "head",
                            tag: "meta",
                            attrs: {
                                id: "tag",
                            },
                        },
                    ],
                },
            }),
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ["vue", "vue-router"],
                // 自动导入element相关函数，如：ElMessage, ElMessageBox..
                resolvers: [ElementPlusResolver()],
                eslintrc: {
                    enabled: true, //自动根据 unplugin-auto-import 生成eslint得全局合法变量，生成一次后可以设为 false
                    // filepath: './.eslintrc-auto-import.json' // 生成的配置文件路径
                },
                // dts: "./auto-imports.d.ts", // 默认文件生成位置, 也可以自定义
            }),

            Components({
                // 指定自动导入的组件位置，
                dirs: ["src/components/Common"],
                // 自动导入 Element Plus 组件
                resolvers: [
                    ElementPlusResolver({
                        importStyle: false // 禁用自动导入样式，使用 styleImport 插件
                    })
                ],
                // dts: './components.d.ts', // 默认文件生成位置
            }),
        ],
        css: {
            preprocessorOptions: {
                less: {
                    // globalVars: {
                    //     blue: "#1CC0FF",
                    // },
                    javascriptEnabled: true,
                    // 添加单个
                    // additionalData: `$injectedColor: orange;`,
                    // 添加文件 以下三种方式都行
                    additionalData: `@import url(@/assets/styles/common.less);`,
                    // additionalData: `@import "@/assets/styles/common.less";`,
                    // additionalData: `@import "${pathResolve(
                    //     "src/assets/styles/common.less",
                    // )}";`,
                },
            },
            // 支持 CSS 嵌套语法
            postcss: {
                plugins: [
                    // 支持 CSS 嵌套语法，解决构建警告
                    // require('postcss-nesting')(),
                ]
            }
        },
        // .jsx 和 .tsx 文件同样开箱即用。JSX 的转译同样是通过 esbuild。
        esbuild: {
            jsxFactory: "h",
            jsxFragment: "Fragment",
            // include: []
        },

        build: {
            // 输出文件夹
            outDir: "dist",
            // 静态资源存放位置
            assetsDir: "assets",
            // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
            assetsInlineLimit: 4096,
            // minify: "terser",
            // terserOptions: {
            //     compress: {
            //         // 移除 console
            //         drop_console: true,
            //         // 移除 debugger
            //         drop_debugger: true,
            //     },
            // },
            // 代码分割配置
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 将 Vue 相关库分离到单独的 chunk
                        vue: ['vue', 'vue-router', 'vuex'],
                        // 将 Element Plus 分离到单独的 chunk
                        'element-plus': ['element-plus'],
                        // 将工具库分离到单独的 chunk
                        utils: ['axios', 'dayjs', 'qs']
                    }
                }
            },
            // 调整 chunk 大小警告限制
            chunkSizeWarningLimit: 1000,
            // CSS 代码分割
            cssCodeSplit: true
        },
        optimizeDeps: {
            entries: ["index.html"],
            // 预构建依赖配置
            include: [
                'vue',
                'vue-router',
                'vuex',
                'element-plus',
                'axios',
                'dayjs',
                'qs'
            ]
        },
    });

// export default defineConfig({
// })
