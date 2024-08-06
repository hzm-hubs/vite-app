import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";

console.log("process id:", process.pid);
console.log("process filePath:", process.cwd());

// 服务端入口 渲染HTML
export async function render() {
    const { app } = createApp();

    // passing SSR context object which will be available via useSSRContext()
    // @vitejs/plugin-vue injects code into a component's setup() that registers
    // itself on ctx.modules. After the render, ctx.modules would contain all the
    // components that have been instantiated during this render call.
    const ctx = {};
    const html = await renderToString(app, ctx);

    return { html };
}
