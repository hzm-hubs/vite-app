// @ts-nocheck

// 路由
import store from "@/store/index";
import middleware from "@/middleware/auth";
import defaultLayout from "@/layouts/defaultLayout.vue";
import {
    createRouter,
    createWebHistory,
    useRoute,
    useRouter,
} from "vue-router";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

const routes = [
    // todo name 不能重复
    {
        path: "/",
        component: defaultLayout,
        children: [
            {
                path: "",
                name: "Home",
                meta: {
                    title: "首页",
                },
                component: () => import("@/pages/index.vue"),
            },
        ],
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "404",
        },
        component: () => import("@/pages/404.vue"),
    },
    {
        path: "/500",
        name: "500",
        meta: {
            title: "500",
        },
        component: () => import("@/pages/500.vue"),
    },
];

// 前端路由俩种方式 history(popstate,replaceState,pushState) 与 hash（#）
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由前检测函数
// to  : 要前往的
// from: 要到达的
// next: 约等于 router.push
router.beforeEach(async (to, from, next) => {
    const path = await middleware(router);
    // todo: 这里不加 to.path !== 会执行多次导致页面无响应
    // todo: next('/404') 与 next({name:'404'})
    if (path && to.path !== "/404") return next(path);
    return next();
});

export default router;
