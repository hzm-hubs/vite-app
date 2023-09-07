// @ts-nocheck

// 路由
import store from "@/store/index";
import middleware from "@/middleware/auth";
import defaultLayout from '@/layouts/defaultLayout.vue'
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // 首页
    {
        path: "/",
        name: "home",
        meta: {
            title: "首页",
        },
        component: () => import("@/pages/index.vue"),
    },
    {
        path: "/books",
        name: "books",
        meta: {
            title: "books",
        },
        component: defaultLayout,
        children: [
            {
                path: "index",
                name: "Index",
                meta: {
                    title: "Index",
                },
                component: () => import("@/pages/books/index.vue"),
            },
            {
                path: "tengwangge",
                name: "Tengwangge",
                meta: {
                    title: "tengwangge",
                },
                component: () => import("@/pages/books/tengwangge.vue"),
            }
        ]
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "页面未找到",
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



// 前端路由俩种方式 history(popstate,replaceState,pushState) 与 hash
const router = createRouter({
    history: createWebHistory(),
    routes, 
});

// 路由前检测函数
router.beforeEach = (routeInfo => {
    console.log('routeInfo',routeInfo)
    // middleware()
})

export default router