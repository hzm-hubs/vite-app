// 应用注册
import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import store from "./store";
import router from "./router";
import globalMixin from "./mixins";
import config from "./config";

import setmeta from "@/plugins/setmeta";
import axios from "@/plugins/axios";

// 引入Vant
import Vant from "vant";

// 全局引入 element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// 全局的css
import "@/assets/styles/index.css";

// 创建一个应用实例
const app = createApp(App);

// 安装插件
app.use(router);

// 使用 store， 页面中可以配合 useStore 访问数据
// 且可以通过 this.$store 访问，
app.use(store);

// 静态文件
app.use("static", "./static");

// 应用
app.use(ElementPlus, {
    locale: zhCn,
});

app.use(Vant);

// 应用一个全局 mixin  里面的数据可供所有页面使用
app.mixin(globalMixin);

// 提供一个值，可以在应用中的所有后代组件中注入使用。
app.provide("message", " welcome !");

// 将访问挂载到全局 this.$axios 访问
app.config.globalProperties.$axios = axios;

// 设置一些头部信息
setmeta(document, config, router);

const context = app.mount("#app");
