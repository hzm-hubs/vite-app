// 应用注册
import { createSSRApp } from "vue";

// @ts-ignore
import App from "./App.vue";

export function createApp() {
    // 创建一个应用实例
    const app = createSSRApp(App);

    return { app };
}
