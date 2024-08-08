// vite 配置
import { defineConfig, loadEnv } from "vite";
import { resolve, join, dirname } from "path";
import vue from "@vitejs/plugin-vue";
import config from "./src/config";
import styleImport from "vite-plugin-style-import";
import { createHtmlPlugin } from "vite-plugin-html";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 生成绝对路径
function pathResolve(dir: string) {
    return resolve(__dirname, "./", dir);
}

function getViteEnv(mode, target) {
    return loadEnv(mode, process.cwd())[target];
}

export default ({ mode, command }) =>
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

            // hmr: {
            //     overlay: false,
            // },
        },
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
            createHtmlPlugin({
                inject: {
                    data: {
                        title: getViteEnv(mode, "VITE_APP_TITLE"),
                    },
                },
            }),
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ["vue", "vue-router"],
                // 自动导入element相关函数，如：ElMessage, ElMessageBox..
                resolvers: [ElementPlusResolver()],
                // dts: "./auto-imports.d.ts", // 默认文件生成位置, 也可以自定义
            }),

            Components({
                // 指定自动导入的组件位置，
                dirs: ["src/components/Common"],
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
                    additionalData: `@import url(@/assets/styles/common.less);`,
                    // additionalData: `@import "@/assets/styles/common.less";`,
                    // additionalData: `@import "${pathResolve(
                    //     "src/assets/styles/common.less",
                    // )}";`,
                },
            },
        },
        // .jsx 和 .tsx 文件同样开箱即用。JSX 的转译同样是通过 esbuild。
        // esbuild: {
        // 	jsxFactory: "h",
        // 	jsxFragment: "Fragment",
        // },
        ssr: {
            target: "node",
            // 对一些依赖启用外部化，以供服务端渲染（SSR）使用
            external: [],
        },
    });

// export default defineConfig({
// })
