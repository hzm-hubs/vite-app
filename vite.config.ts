// vite 配置

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import config from "./src/config";
import dayjs from "./src/plugins/dayjs";

// 添加路径转译
function pathResolve(dir: string) {
    return resolve(__dirname, ".", dir);
}

export default defineConfig({
    server: {
        host: "0.0.0.0",

        // 要求 number 类型
        port: config.port,
    },
    resolve: {
        // 设置中间键名
        // 相对于 src 的路径访问如 ../assets/ 可以用 @/assets/
        alias: {
            "@": pathResolve("src"),
        },
    },
    plugins: [vue(), dayjs],
    // .jsx 和 .tsx 文件同样开箱即用。JSX 的转译同样是通过 esbuild。
    // esbuild: {
    // 	jsxFactory: "h",
    // 	jsxFragment: "Fragment",
    // },
});
