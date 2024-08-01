// vite 配置
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import config from "./src/config";
import dayjs from "./src/plugins/dayjs";
// vite-plugin-style-import 是一个 Vite plugins 插件，用于按需加载样式文件。它的主要功能是优化打包体积，避免引入整个样式库，仅加载实际使用到的样式。这在使用组件库时特别有用，比如 Ant Design、Element Plus 等。
import styleImport from "vite-plugin-style-import";

// 添加路径转译
function pathResolve(dir: string) {
    return resolve(__dirname, "./", dir);
}

export default defineConfig({
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
            "@": pathResolve("src"),
        },
    },
    // 静态资源文件
    publicDir: "public",
    plugins: [vue(), dayjs],
    css: {
        preprocessorOptions: {
            less: {
                // globalVars: {
                //     blue: "#1CC0FF",
                // },
                javascriptEnabled: true,
                additionalData: `@import "@/assets/styles/common.less";`,
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
});
