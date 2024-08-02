
vite 将应用模块分为 依赖 和 源码， 以此改进服务器启动时间。

* 依赖，大多为在开发时不会变动的纯 JavaScript。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。Vite 将会使用 esbuild 预构建依赖。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。
* 源码，通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

#### 使用到的插件

* vue-router： 页面路由及页面跳转
* vuex： 全局状态管理
* element-plus： UI库
* @vitejs/plugin-vue：vue
* eslint/prettier: 代码格式/风格
* less: vite中默认支持解析，但需要本地安装依赖
* @types/node: 在vite.config.ts文件中解析一些node变量
* styleImport：vite-plugin-style-import 是一个 Vite plugins 插件，用于按需加载样式文件。它的主要功能是优化打包体积，避免引入整个样式库，仅加载实际使用到的样式。这在使用组件库时特别有用，比如 Ant Design、Element Plus 等。
* vite-plugin-html： 一个vite插件，用于最小化index.html并在index.html中使用lodash.template模板语法.如为全页面注册标题
* unplugin-auto-import：unplugin-auto-import 这个插件是为了解决在开发中的导入问题，比如经常不清楚相对路径的问题，为项目页面自动导入一些插件的组件或者函数方法
* unplugin-vue-components：为项目页面自注册自己创建的组件或者图标、函数等
* @vue-flow/core: 节点流图