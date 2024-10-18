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
import { VantResolver } from "@vant/auto-import-resolver";
// 生成绝对路径
function pathResolve(dir: string) {
    return resolve(__dirname, "./", dir);
}

function getViteEnv(mode, target) {
    return loadEnv(mode, process.cwd())[target];
}

// 转换 index.html 的专用钩子 transformIndexHtml, 在plugins中调用
const htmlPlugin = () => {
    return {
        name: "html-transform",
        transformIndexHtml(html) {
            return html.replace(
                /<title>(.*?)<\/title>/,
                `<title>Title replaced!</title>`,
            );
        },
    };
};

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
            proxy: {
                "/api": {
                    target: `${config.apiBaseUrl}`,
                    changeOrigin: true,
                },
            },

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
                resolvers: [ElementPlusResolver(), VantResolver()],
                // dts: "./auto-imports.d.ts", // 默认文件生成位置, 也可以自定义
            }),

            Components({
                // 指定自动导入的组件位置，
                dirs: ["src/components/Common"],
                // dts: './components.d.ts', // 默认文件生成位置
                resolvers: [VantResolver()],
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
        },
        optimizeDeps: {
            entries: ["index.html"],
        },
    });
