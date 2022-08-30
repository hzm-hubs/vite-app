// 应用注册
import { createApp } from "vue";
// css 样式
// import "./style.css";
// @ts-ignore
import App from "./App.vue";
import store from "./store";
import router from "./router";
import globalMixin from "./mixins";
import config from "./config";

import middleware from "./middleware/auth";
import setmeta from "./plugins/setmeta";
import axios from "./plugins/axios";

// createApp(App).mount("#app");
// 存在 createSSRApp() 以 SSR 激活模式创建一个应用实例。用法与 createApp() 完全相同。

// 创建一个应用实例
const app = createApp(App);

// console.log("App", App);

// console.log("app", app);

// 安装插件
app.use(router);

// 应用一个全局 mixin  里面的数据可供所有页面使用
app.mixin(globalMixin);

// 提供一个值，可以在应用中的所有后代组件中注入使用。
app.provide("message", " welcome !");

/**
 *  将router的一些方法挂在到全局 供所有页面使用
 *  下面的方法提示只能get不能set方法，打印发现 router 中的方法已经绑定到实例中 app.config.globalProperties
 *  能查到已绑定到全局的方法或者变量
 *  可通过 this.$router/this.$route 访问
 */
// app.config.globalProperties.$route = {
//     push: router.push,
// };
// 将 store 挂载到全局
app.config.globalProperties.$store = store;

// 将访问挂载到全局
app.config.globalProperties.$axios = axios;

// 路由检测
await middleware({ router, store });

// 打印 router 能查到正确的路径信息， 但是router.currentRoute.value.meta.title就都是‘/’路径的信息
// 需要延迟获取才可
// let timer: any = null;
// timer = setInterval(() => {
//     console.log("router信息", router.currentRoute.value);
//     if (router.currentRoute.value.meta.title) {
//         clearInterval(timer);
//         timer = null;
//         setmeta(document, config, router);
//     }
// }, 10);

// 设置一些头部信息
await setmeta(document, config, router);

// 将应用实例挂载在一个容器元素中。返回根组件的实例, 可以理解为this或者上下文context。
const context = app.mount("#app");

/**
 *  app 中的一些挂载属性可以在 $.appContext.app 找到
 */
console.log("context", context);

/**
 *  app 可调用的实例方法
 *
 *  mount  将应用实例挂载在一个容器元素中。
 *
 *  unmount  卸载一个已挂载的应用实例。卸载一个应用会触发该应用组件树内所有组件的卸载生命周期钩子。
 *
 *  provide  提供一个值，可以在应用中的所有后代组件中注入使用。
 *
 *  component  如果同时传递一个组件名字符串及其定义，则注册一个全局组件；如果只传递一个名字，则会返回用该名字注册组件
 *
 *  directive  如果同时传递一个名字和一个指令定义，则注册一个全局指令；如果只传递一个名字，则会返回用该名字注册的指令 (如果存在的话)。
 *
 *  use  安装一个插件。
 *
 *  mixin   应用一个全局 mixin (适用于该应用程序的范围)。一个全局的 mixin 会作用于应用中的每个组件实例。
 *
 *  version  提供当前应用所使用的 Vue 版本号。这在插件中很有用，因为可能需要根据不同的 Vue 版本执行不同的逻辑。
 *
 *  config  每个应用实例都会暴露一个 config 对象，其中包含了对这个应用的配置设定。你可以在挂载应用前更改这些属性 (下面列举了每个属性的对应文档)。
 *
 *  config.errorHandler  用于为应用内抛出的未捕获错误指定一个全局处理函数。
 *
 *  config.warnHandler  用于为 Vue 的运行时警告指定一个自定义处理函数。
 *
 *  config.performance  设置此项为 true 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪。仅在开发模式和支持 performance.mark API 的浏览器中工作。
 *
 *  config.compilerOptions  配置运行时编译器的选项。设置在此对象上的值将会在浏览器内进行模板编译时使用，并会影响到所配置应用的所有组件。另外你也可以通过 compilerOptions 选项在每个组件的基础上覆盖这些选项。
 *
 *  config.globalProperties  一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。这是对 Vue 2 中 Vue.prototype 使用方*式的一种替代，此写法在 Vue 3 已经不存在了。与任何全局的东西一样，应该谨慎使用。如果全局属性与组件自己的属性冲突，组件自己的属性将具有 更高的优先级。
 *
 *  config.optionMergeStrategies 一个用于定义自定义组件选项的合并策略的对象。
 */
