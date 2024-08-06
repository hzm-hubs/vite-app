import { createApp } from "./main";

import store from "./store";
import router from "./router";
import globalMixin from "./mixins";
import config from "./config";

import setmeta from "@/plugins/setmeta";
import axios from "@/plugins/axios";

// 全局引入 element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// 全局的css
import "@/assets/styles/index.css";

const { app } = createApp();

// 安装路由
app.use(router);

// 使用 store， 页面中可以配合 useStore 访问数据
app.use(store);

// 静态文件
app.use("static", "./static");

// 应用
app.use(ElementPlus, {
    locale: zhCn,
});

// 应用一个全局 mixin  里面的数据可供所有页面使用
app.mixin(globalMixin);

// 提供一个值，可以在应用中的所有后代组件中注入使用。
app.provide("message", " welcome !");

// 将访问挂载到全局
app.config.globalProperties.$axios = axios;

// 设置一些头部信息
setmeta(document, config, router);

// 将应用实例挂载在一个容器元素中。返回根组件的实例, 可以理解为this或者上下文context。
const context = app.mount("#app");
